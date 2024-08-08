import mongoose, { Schema, Model, Document } from 'mongoose';

interface ModelCache {
  [key: string]: Model<any>;
}

const models: ModelCache = {};

export function getModel<T extends Document>(
  name: string,
  schema: Schema
): Model<T> {
  if (models[name]) {
    return models[name] as Model<T>;
  }

  const model = mongoose.models[name] || mongoose.model<T>(name, schema);
  models[name] = model;
  return model;
}
