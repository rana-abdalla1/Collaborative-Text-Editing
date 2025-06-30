# Collaborative Text Editing Platform

A real-time collaborative text editing application built with React, Node.js, Spring Boot, and MongoDB. This platform enables multiple users to simultaneously edit documents with conflict-free operations using CRDT (Conflict-free Replicated Data Type) technology.

## 🚀 Features

- **Real-time Collaborative Editing**: Multiple users can edit documents simultaneously without conflicts
- **CRDT Implementation**: Ensures consistency across all clients without requiring operational transforms
- **User Authentication**: Secure login and registration system
- **Document Management**: Create, save, and manage multiple documents
- **Socket.io Integration**: Real-time synchronization across all connected clients
- **Modern UI**: Built with React, Material-UI, and Tailwind CSS
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern UI framework
- **Material-UI** - Component library for consistent design
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Socket.io Client** - Real-time communication
- **Quill.js** - Rich text editor
- **React Router** - Client-side routing

### Backend
- **Node.js + Express** - Real-time server with Socket.io
- **Spring Boot 3.2.5** - REST API and business logic
- **MongoDB** - Document database
- **Socket.io** - WebSocket communication
- **Mongoose** - MongoDB object modeling

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container deployment
- **Nginx** - Web server and reverse proxy
- **Jest** - Testing framework

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **Java** (JDK 21)
- **Maven** (3.6 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Docker** (optional, for containerized deployment)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Collaborative-Text-Editing
```

### 2. Backend Setup (Spring Boot)

```bash
cd APT_Backend_SpringBoot

# Start MongoDB using Docker Compose
docker-compose up -d

# Run the Spring Boot application
./mvnw spring-boot:run
```

The Spring Boot server will start on `http://localhost:8080`

### 3. Real-time Backend Setup (Node.js)

```bash
cd APT_Backend_Nodejs_Real_Time

# Install dependencies
npm install

# Start the server with nodemon for development
npx nodemon app.js

# Or start normally
node app.js
```

The Node.js server will start on `http://localhost:3001`

### 4. Frontend Setup (React)

```bash
cd APT_Frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The React application will start on `http://localhost:3000`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start MongoDB and related services
cd APT_Backend_SpringBoot
docker-compose up -d

# Build and run the frontend container
cd ../APT_Frontend
docker build -t collaborative-editor-frontend .
docker run -p 3000:3000 collaborative-editor-frontend
```

## 🏗️ Project Structure

```
Collaborative-Text-Editing/
├── APT_Frontend/                 # React frontend application
│   ├── src/
│   │   ├── App/                 # Main application component
│   │   ├── pages/               # Page components
│   │   ├── layouts/             # Layout components
│   │   ├── store/               # Redux store configuration
│   │   └── __tests__/           # Test files
│   ├── public/                  # Static assets
│   └── Dockerfile               # Frontend containerization
├── APT_Backend_Nodejs_Real_Time/ # Real-time backend (Socket.io)
│   ├── app.js                   # Main server file
│   ├── CRDTStructure.js         # CRDT implementation
│   ├── CRDTNode.js              # CRDT node structure
│   └── models/                  # Database models
└── APT_Backend_SpringBoot/       # REST API backend
    ├── src/main/java/com/       # Java source code
    ├── docker-compose.yaml      # MongoDB setup
    └── pom.xml                  # Maven dependencies
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in each backend directory with the following variables:

**APT_Backend_SpringBoot:**
```env
MONGODB_URI=mongodb://localhost:27017/APTDatabase
SERVER_PORT=8080
```

**APT_Backend_Nodejs_Real_Time:**
```env
MONGODB_URI=mongodb+srv://your-connection-string
SOCKET_PORT=3001
```

### Database Setup

1. **MongoDB Atlas (Cloud)**: Update the connection string in the Node.js backend
2. **Local MongoDB**: Use the provided Docker Compose setup

## 🧪 Testing

### Frontend Tests

```bash
cd APT_Frontend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Backend Tests

```bash
cd APT_Backend_SpringBoot

# Run Spring Boot tests
./mvnw test
```

## 📚 API Documentation

### REST API Endpoints (Spring Boot - Port 8080)

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/documents` - Get user documents
- `POST /api/documents` - Create new document
- `PUT /api/documents/{id}` - Update document
- `DELETE /api/documents/{id}` - Delete document

### Socket.io Events (Node.js - Port 3001)

- `document-join` - Join a document room
- `document-leave` - Leave a document room
- `text-change` - Broadcast text changes
- `cursor-position` - Share cursor positions
- `user-connected` - User connection event
- `user-disconnected` - User disconnection event

## 🎯 Usage

1. **Start the Application**: Follow the installation steps to start all services
2. **Register/Login**: Create an account or login with existing credentials
3. **Create Document**: Click "New Document" to create a collaborative document
4. **Collaborate**: Share the document link with others to start real-time collaboration
5. **Edit Together**: Multiple users can edit simultaneously with real-time synchronization

## 🏛️ Architecture

### CRDT Implementation

The application uses Conflict-free Replicated Data Types (CRDTs) to ensure:
- **Convergence**: All replicas eventually reach the same state
- **No Conflicts**: Operations can be applied in any order
- **Real-time Sync**: Changes are immediately propagated to all clients

### Data Flow

1. User types in the React editor (Quill.js)
2. Changes are converted to CRDT operations
3. Operations are sent via Socket.io to the Node.js server
4. Server broadcasts operations to all connected clients
5. Clients apply operations to their local CRDT structure
6. Document state is persisted to MongoDB


## 📝 Development Notes

- The application uses a hybrid architecture with both REST APIs and WebSocket connections
- CRDT operations ensure consistency without operational transforms
- Redux manages client-side state with persistence
- Material-UI and Tailwind CSS provide a modern, responsive interface
- Comprehensive test coverage ensures reliability
