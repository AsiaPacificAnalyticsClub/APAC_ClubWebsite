import clientPromise from "@/lib/mongodb";
import { Filter } from "mongodb";

interface DswFilter {
  year: number;
  type: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");
    const type = searchParams.get("type");

    const client = await clientPromise;
    const db = client.db("base");
    const collection = db.collection<DswFilter>("dsw");

    const filter: Filter<DswFilter> = {};

    if (year) filter.year = Number(year);
    if (type) filter.type = type;

    const data = await collection.find(filter).toArray();

    return Response.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
  console.error("DSW API ERROR FULL:", error);

  return Response.json(
    {
      message: "Something went wrong!",
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    },
    { status: 500 }
  );
}
}