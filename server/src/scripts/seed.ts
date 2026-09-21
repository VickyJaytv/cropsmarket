import "dotenv/config";
import { AppDataSource } from "../data-source.js";
import { seedAdmin } from "../seed/admin.seed.js";
import { seedMockData } from "../seed/mockData.seed.js";

const run = async () => {
  try {
    await AppDataSource.initialize();

    await seedAdmin();
    await seedMockData();

    console.log("✅ All seeding completed successfully.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);

    process.exit(1);
  }
};

run();
