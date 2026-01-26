/* import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); */
/* const leads = await prisma.lead.findMany({
  orderBy: { created_at: "desc" },
}); */

export default async function handler(req: any, res: any) {
  try {
    console.log("hola");

    const leads = [
      {
        name: "Santiago",
      },
    ];

    res.status(200).json(leads);
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
}
