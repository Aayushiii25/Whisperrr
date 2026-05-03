import { Router } from "express";

const router = Router();

router.post("/test", (req, res) => {
  res.send("POST route working");
});

export default router;
