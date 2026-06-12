import { prismaClient } from "./src/application/database.js";

async function run() {
  try {
    const result = await prismaClient.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        status: true,
        otp: true,
        role: true
      }
    });
    console.log("Users in DB:");
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prismaClient.$disconnect();
  }
}

run();
