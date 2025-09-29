import { MongoClient } from "mongodb";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("base");
    const events = db.collection("events");

    const now = new Date();

    const featuredEvents = await events
      .find({
        date: { $gte: now },
        featured: true,
      })
      .sort({ date: 1 })
      .toArray();

    return new Response(JSON.stringify(featuredEvents), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error fetching featured events" }), { status: 500 });
  } finally {
    await client.close();
  }
}
