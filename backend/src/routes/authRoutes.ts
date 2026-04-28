import { Router } from "express";

const router = Router();

// Register user
router.post("/register", (req, res) => {
  res.send("User registered");
});

// Login user
router.post("/login", (req, res) => {
  res.send("User logged in");
});

// Logout user
router.post("/logout", (req, res) => {
  res.send("User logged out");
});

export default router;
