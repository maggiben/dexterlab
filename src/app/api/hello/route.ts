import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/libs/mongodb';

type Params = {
  timestamp: string
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    const collection = db.connection.db.collection('test');

    // Insert a sample document
    const result = await collection.insertOne({ name: 'Hello, MongoDB!' });

    // Return a JSON response with the result
    return NextResponse.json({ message: 'Data inserted', result }, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
  }
}


export async function HEAD(request: Request) {
}
 
export async function POST(request: Request) {
  try {
    console.log('request.body', request.body);
    // Connect to the database
    const db = await connectToDatabase();
    const collection = db.connection.db.collection('test');

    // Insert a sample document
    const result = await collection.insertOne({ name: request.body });

    // Return a JSON response with the result
    return NextResponse.json({ message: 'Data inserted', result }, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
  }
}
 
export async function PUT(request: Request) {}
 
export async function DELETE(request: Request) {}
 
export async function PATCH(request: Request) {}

/*

    docker run -d --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 mongo

*/

