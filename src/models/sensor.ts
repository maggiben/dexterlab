import mongoose, { Document, Schema, SchemaDefinition, SchemaTypeOptions } from 'mongoose';
import { getModel } from './cache';

// Define the schema definition interface
export interface IndoorSchema extends Document {
  sensor: string;
  script: {
    version: string;
    file: string;
    lastUpdate: string;
  };
  snapshots: {
    size: string;
    total: number;
  };
  hdd: {
    total: string;
    used: string;
    free: string;
    usage: string;
  };
  sensors: {
    temperature: string;
  };
  cpu: {
    load: string;
  };
  ram: {
    total: number;
    used: number;
    free: number;
  };
  network: {
    RX: string;
    TX: string;
    ping: string;
  };
  uptime: {
    uptime: string;
  };
  timestamp: Date;
}

const sensorSchemaDefinition: Record<string, SchemaTypeOptions<any>> = {
  sensor: { type: String, required: true },
  script: {
    version: { type: String, required: true },
    file: { type: String, required: true },
    lastUpdate: { type: String, required: true }
  },
  snapshots: {
    size: { type: String, required: true },
    total: { type: Number, required: true }
  },
  hdd: {
    total: { type: String, required: true },
    used: { type: String, required: true },
    free: { type: String, required: true },
    usage: { type: String, required: true }
  },
  sensors: {
    temperature: { type: String, required: true }
  },
  cpu: {
    load: { type: String, required: true }
  },
  ram: {
    total: { type: Number, required: true },
    used: { type: Number, required: true },
    free: { type: Number, required: true }
  },
  network: {
    RX: { type: String, required: true },
    TX: { type: String, required: true },
    ping: { type: String, required: true }
  },
  uptime: {
    uptime: { type: String, required: true }
  },
  timestamp: { type: Date, required: true }
};

const sensorSchema = new Schema(sensorSchemaDefinition);
const Sensor = getModel<IndoorSchema>('Sensor', sensorSchema);

export default Sensor;