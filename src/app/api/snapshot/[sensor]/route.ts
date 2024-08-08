// pages/api/snapshot.js
import { NextResponse, NextRequest } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';

// Define a temporary directory and file path
const tmpDir = path.join(process.cwd(), 'temp');
// const tmpFilePath = path.join(tmpDir, 'lastsnap.jpg');

// Promisify exec to use async/await
const execPromise = util.promisify(exec);

const remoteRawPath = '/snapshots/lastsnap.jpg';
const remoteCompressedPath = '/tmp/lastsnap_resized_compressed.jpg';
const remoteUser = 'bmaggi'; // Replace with your SSH username
const size = '800x448';
const quality = '65';

type Params = {
  sensor: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    // Ensure the temp directory exists
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    const tmpFilePath = path.join(tmpDir, `lastsnap-${context.params.sensor}.jpg`);
    // Compress
    const sshCommand = `ssh ${remoteUser}@${context.params.sensor} "convert ${remoteRawPath} -resize ${size} -quality ${quality} ${remoteCompressedPath}"`;
    await execPromise(sshCommand);
    // Use scp to copy the file from the remote server
    const scpCommand = `scp ${remoteUser}@${context.params.sensor}:${remoteCompressedPath} ${tmpFilePath}`;
    await execPromise(scpCommand);

    // Read the file and return it
    
    const fileBuffer = fs.readFileSync(tmpFilePath);
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');

    // Clean up: remove the file after serving it
    fs.unlinkSync(tmpFilePath);

    return new NextResponse(fileBuffer, {
      headers,
      status: 200
    });
  } catch (error) {
    console.error('Error fetching or serving snapshot:', error);
    return NextResponse.json({ error: 'Failed to capture snapshot' }, { status: 500 });
  }
}
