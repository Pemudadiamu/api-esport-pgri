import { prismaClient } from "./src/application/database.js";

async function run() {
  try {
    const result = await prismaClient.teamMember.findMany({
      where: { teamId: 1 },
    });
    console.log("Members of team 1:");
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prismaClient.$disconnect();
  }
}

run();
