import app from "./src/app";
import { connectDB } from "./src/config/database";
import { createServer } from "http";

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

inilizeSocket(httpServer);

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log("Server is running", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server", error);
    process.exit(1);
  });
