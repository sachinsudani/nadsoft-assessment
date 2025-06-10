import dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./db";

dotenv.config({
    path: "./.env",
});

const startServer = () => {
    app.listen(process.env.PORT, () => {
        console.log("⚙️  Server is running on port: " + process.env.PORT);
    });
};

try {
    connectDB().then(() => {
        startServer();
    });
} catch (err) {
    console.log("Postgres connect error: ", err);
}
