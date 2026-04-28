import { Router } from "express";

const router = Router();

// send a message
router.post("/", (req, res) => {
  res.send("Message sent");
});

// get all messages
router.get("/", (req, res) => {
  res.send("All messages");
});

export default router;
