# Whisper 💬

A real-time chat application built to understand how messaging apps actually work behind the scenes.

---

## 🚀 Overview

Whisper is a full-stack chat app where users can send messages in real time, see who’s online, and get instant updates while chatting.

While building it, the main goal was to figure out how real-time communication actually works — things like how messages appear instantly, how typing indicators are synced, and how multiple users stay updated at the same time.

The app uses a mix of REST APIs and WebSockets to handle both stored data and live events, similar to how real-world chat applications work.

---

## 🏗️ How it works

The app uses two ways to communicate:

* **REST APIs** → for fetching chats, messages, and users
* **WebSockets (Socket.IO)** → for real-time updates like messages and typing

```text
Client → REST → Server → Database
Client ↔ WebSocket ↔ Server
```

This keeps things simple while still allowing real-time behavior.

---

## 🔌 Features

* Send and receive messages in real time
* See when a user is online or typing
* Chat list with last message preview
* Instant UI updates (messages appear immediately)
* Smooth syncing between multiple users

---

## 🧩 Backend logic 

* Users are authenticated using Clerk
* Chats are created between users dynamically
* Messages are stored in MongoDB
* Each chat works like a “room” for real-time events
* Socket events are used for:

  * new messages
  * typing indicators
  * online/offline status

---

## ⚙️ Tech Stack

**Backend**

* Node.js + Express
* MongoDB + Mongoose
* Socket.IO
* Clerk

**Frontend**

* React + Vite
* Tailwind CSS + DaisyUI
* Zustand
* React Query
* Axios

---

## 🧪 Running locally

```bash
git clone https://github.com/your-username/whisper.git
cd whisper

# backend
cd backend
bun install
bun start

# frontend
cd ../web
bun install
bun run dev
```

---
