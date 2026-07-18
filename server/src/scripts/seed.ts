import "dotenv/config";
import { AppDataSource } from "../data-source.js";
import { seedAdmin } from "../seed/admin.seed.js";

const run = async () => {
  try {
    await AppDataSource.initialize();

    await seedAdmin();

    console.log("✅ Seeding completed.");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

run();
