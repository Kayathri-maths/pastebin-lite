# Pastebin-Lite

Pastebin-Lite is a simple web application that allows users to create
text pastes and share them via a unique URL. Each paste can optionally
expire based on time (TTL) or a maximum number of views.

This project is built as part of a take-home assignment and is designed
to work correctly in a serverless environment.

---

## Features

- Create a text paste with arbitrary content
- Generate a shareable URL for each paste
- View pastes via a public link
- Optional time-based expiry (TTL)
- Optional maximum view count
- Safe rendering of paste content (no script execution)
- Deterministic time support for automated testing

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios

---

## Persistence Layer

This application uses **MongoDB Atlas** as the persistence layer.
MongoDB Atlas ensures that paste data survives across requests, which is
required for serverless deployments and automated testing.

No in-memory storage is used for paste data.

---
## How to Run the Project Locally

### Backend Setup

Open a terminal and run the following commands:

```bash
cd backend
npm install
npm run dev

```


### Frontend Setup

Open a terminal and run the following commands:

```bash
cd frontend
npm install
npm run dev

```
