import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalForMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalForMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalForMongo._mongoClientPromise;

export default clientPromise;