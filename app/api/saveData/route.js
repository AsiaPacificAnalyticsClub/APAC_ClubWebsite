import { MongoClient } from "mongodb";

export async function POST(req) {
  const { data } = await req.json(); // Parse incoming JSON body

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("user_data_db");
    const collection = database.collection("user_data_collection");

    await collection.insertOne({ data });

    return new Response(
      JSON.stringify({ message: "Data saved successfully!" }),
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  } finally {
    await client.close();
  }
}
