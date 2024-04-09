import connectDb from "./config/db.js";
import { Notification } from "./models/Arist.js";
import { Bid, Order } from "./models/Order.js";
import User from "./models/User.js";
connectDb();

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Notification.deleteMany();
    await Bid.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
}
