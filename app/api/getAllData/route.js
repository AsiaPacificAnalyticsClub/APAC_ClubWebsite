import { MongoClient } from "mongodb";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("base");
    const collection = database.collection("events");
    const allData = await collection.find({}).toArray();

    return new Response(JSON.stringify(allData), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
