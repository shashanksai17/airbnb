const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6946e11962fe596a89234348",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");

};

async function run() {
  try {
    await main();
    await initDB();
  } catch (err) {
    console.error("DB init error:", err);
  } finally {
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore disconnect errors
    }
    process.exit(0);
  }
}

run();