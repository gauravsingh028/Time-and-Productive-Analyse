# Time and Productivity Analysis

A full-stack application for tracking tasks and analyzing productivity, built with React (Vite) frontend and Node.js/Express backend.

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Clone the Repository

```bash
cd Time-and-productivity-analysis
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

Open a new terminal window and run:

```bash
cd client
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Example `.env` file:**
```env
MONGO_URI=mongodb://localhost:27017/productivity-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**For MongoDB Atlas (cloud):**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/productivity-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 5. Start the Backend Server

From the `server` directory:

```bash
# Using Node.js directly
node server.js

# Or using nodemon (if installed globally or via npm scripts)
npx nodemon server.js
```

The server will run on **http://localhost:5001** (port 5000 is used by macOS AirPlay Receiver)

### 6. Start the Frontend Development Server

From the `client` directory in a new terminal:

```bash
npm run dev
```

The client will run on **http://localhost:5173** (or another port if 5173 is occupied)

## Running the Project

You need to run both the server and client simultaneously:

### Terminal 1 - Backend Server
```bash
cd server
npm run dev
# or: node server.js
```

### Terminal 2 - Frontend Client
```bash
cd client
npm run dev
```

## Available Scripts

### Server Scripts
- `node server.js` - Start the server

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
Time-and-productivity-analysis/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service functions
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /` - Server health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `/api/tasks` - Task management endpoints
- `/api/analytics` - Analytics endpoints

## Troubleshooting

1. **MongoDB Connection Error**: Ensure MongoDB is running and the `MONGO_URI` in your `.env` file is correct.

2. **Port Already in Use**: If port 5001 or 5173 is already in use, you can:
   - Stop the process using that port
   - Change the port in the respective configuration files

3. **Module Not Found**: Make sure you've run `npm install` in both `server` and `client` directories.

4. **Environment Variables Not Loading**: Ensure your `.env` file is in the `server` directory and you're using `dotenv` correctly.

