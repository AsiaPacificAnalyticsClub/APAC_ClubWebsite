import { Filter, MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

interface DswFilter {
  year: number | string;
  type: string;
}

export async function GET(req: Request) {
  const client = new MongoClient(process.env.MONGODB_URI as string);

  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");
    const type = searchParams.get("type");

    await client.connect();
    const db = client.db("base");
    const collection = db.collection<DswFilter>("dsw");

    const filter: Filter<DswFilter> = {};

    if (year) {
      const parsedYear = Number(year);

      // Support legacy docs where year may be saved as a string.
      filter.year = Number.isNaN(parsedYear)
        ? year
        : { $in: [parsedYear, year] };
    }

    if (type) {
      const normalizedType = type.toLowerCase();
      const typeAliases =
        normalizedType === "events"
          ? ["event", "events"]
          : normalizedType === "games"
            ? ["game", "games"]
            : [normalizedType];

      // Support singular/plural variants in stored documents.
      filter.type = { $in: typeAliases };
    }

    const data = await collection.find(filter).toArray();

    return Response.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}