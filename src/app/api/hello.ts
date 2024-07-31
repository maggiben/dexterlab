import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/libs/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDatabase();
    const collection = db.connection.db.collection('test');

    const result = await collection.insertOne({ name: 'Hello World' });

    res.status(200).json({ message: 'Data inserted', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
}

/*

    docker run -d --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 mongo

*/

