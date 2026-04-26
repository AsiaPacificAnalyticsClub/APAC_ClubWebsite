import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

function normalizeEventPayload(body) {
  // Backward compatibility: allow either { data: {...} } or direct object payload.
  return body?.data && typeof body.data === "object" ? body.data : body;
}

function buildFilter(payload) {
  if (payload?._id && ObjectId.isValid(payload._id)) {
    return { _id: new ObjectId(payload._id) };
  }

  if (payload?.title && payload?.start_date) {
    return { title: payload.title, start_date: payload.start_date };
  }

  return null;
}

async function saveEvent(req) {
  try {
    const body = await req.json();
    const payload = normalizeEventPayload(body);

    const filter = buildFilter(payload);
    if (!filter) {
      return new Response(
        JSON.stringify({
          message:
            "Invalid payload. Provide _id, or both title and start_date.",
        }),
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("base");
    const events = db.collection("events");

    const updateResult = await events.updateOne(
      filter,
      {
        $set: {
          ...payload,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true },
    );

    return new Response(
      JSON.stringify({
        message: "Event saved successfully",
        matchedCount: updateResult.matchedCount,
        modifiedCount: updateResult.modifiedCount,
        upsertedId: updateResult.upsertedId ?? null,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("saveData API error:", error);
    return new Response(
      JSON.stringify({
        message: "Something went wrong!",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function POST(req) {
  return saveEvent(req);
}

export async function PUT(req) {
  return saveEvent(req);
}
