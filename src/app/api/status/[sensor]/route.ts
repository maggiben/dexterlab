// pages/api/snapshot.js
import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/libs/mongodb';
import Sensor, { IndoorSchema } from '@/models/sensor';

type Params = {
  sensor: string
}

// const sensorSchema = new mongoose.Schema({
//   script: {
//     version: { type: String },
//     file: { type: String },
//     lastUpdate: { type: String } // Use Date if you want to parse it as a Date object
//   },
//   snapshots: {
//     size: { type: String },
//     total: { type: Number } // Assuming "total" is a numeric value
//   },
//   hdd: {
//     total: { type: String },
//     used: { type: String },
//     free: { type: String },
//     usage: { type: String }
//   },
//   sensors: {
//     temperature: { type: String }
//   },
//   cpu: {
//     load: { type: String }
//   },
//   ram: {
//     total: { type: Number }, // Assuming "total", "used", and "free" are numeric values
//     used: { type: Number },
//     free: { type: Number }
//   },
//   network: {
//     RX: { type: String },
//     TX: { type: String },
//     ping: { type: String }
//   },
//   uptime: {
//     uptime: { type: String }
//   },
//   timestamp: { type: Date } // Use Date to store timestamps as Date objects
// }, { _id: false });

// // Define the schema definition interface
// interface IndoorSchema {
//   script: {
//     version: string;
//     file: string;
//     lastUpdate: string;
//   };
//   snapshots: {
//     size: string;
//     total: number;
//   };
//   hdd: {
//     total: string;
//     used: string;
//     free: string;
//     usage: string;
//   };
//   sensors: {
//     temperature: string;
//   };
//   cpu: {
//     load: string;
//   };
//   ram: {
//     total: number;
//     used: number;
//     free: number;
//   };
//   network: {
//     RX: string;
//     TX: string;
//     ping: string;
//   };
//   uptime: {
//     uptime: string;
//   };
//   timestamp: Date;
// }

interface SensorDocument extends Document {
  'indoor-small'?: IndoorSchema;
  'indoor-big'?: IndoorSchema;
}

export async function GET(request: NextRequest, context: { params: Params }) {
  try {
    // Connect to the database
    const db = await connectToDatabase();
    const collection = db.connection.db.collection('sensors');

    // Find all sensor documents
    // const status = await Sensor.find({
    //   sensor: { $in: [context.params.sensor] },
    // });

    const status = await Sensor.find({});

    // Return a JSON response with the result
    return NextResponse.json({ message: `results for ${context.params.sensor}`, status }, { status: 200 });
  } catch (error) {
    // Handle errors
    console.error(error);
    return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
  }
}

/*

    docker run -d --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 mongo

*/


