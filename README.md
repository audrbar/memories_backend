# Memories App - Backend API

A RESTful API backend for the Memories application built with Node.js, Express, and MongoDB. This server provides authentication, CRUD operations for posts, pagination, search functionality, and social features like likes and comments.

## 🚀 Features

- **User Authentication**
  - Email/Password signup and signin
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Google OAuth support (token decoding)

- **Post Management**
  - Create, read, update, and delete posts
  - Image upload support (base64)
  - Post tagging system
  - User authorization for post modifications

- **Social Features**
  - Like/Unlike posts
  - Comment on posts
  - View posts by creator

- **Advanced Search & Filtering**
  - Search posts by title
  - Filter posts by tags
  - Search by creator name
  - Pagination support (8 posts per page)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd memories_backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
CONNECTION_URL=your_mongodb_connection_string
PORT=5500
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server:
```bash
npm run dev
```

Or start the production server:
```bash
npm start
```

## 📁 Project Structure

```
memories_backend/
├── controllers/          # Request handlers
│   ├── posts.js         # Post-related operations
│   └── user.js          # Authentication logic
├── middleware/          # Custom middleware
│   └── auth.js         # JWT authentication middleware
├── models/             # Database schemas
│   ├── postMessage.js  # Post schema
│   └── user.js         # User schema
├── routes/             # API routes
│   ├── posts.js        # Post endpoints
│   └── users.js        # User endpoints
├── index.js            # Application entry point
├── package.json        # Dependencies and scripts
└── README.md          # Documentation
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signup` | Register new user | No |
| POST | `/user/signin` | Login existing user | No |

**Signup Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Signin Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | Get paginated posts | No |
| GET | `/posts/:id` | Get single post by ID | No |
| GET | `/posts/search` | Search posts by title/tags | No |
| GET | `/posts/creator` | Get posts by creator name | No |
| POST | `/posts` | Create new post | Yes |
| PATCH | `/posts/:id` | Update post | Yes |
| DELETE | `/posts/:id` | Delete post | Yes |
| PATCH | `/posts/:id/likePost` | Like/unlike post | Yes |
| POST | `/posts/:id/commentPost` | Add comment to post | Yes |

**Query Parameters for GET /posts:**
- `page` - Page number for pagination (default: 1)

**Query Parameters for GET /posts/search:**
- `searchQuery` - Search term for title
- `tags` - Comma-separated tags

**Query Parameters for GET /posts/creator:**
- `name` - Creator's name

**Create Post Request Body:**
```json
{
  "title": "My Memory",
  "message": "Description of the memory",
  "tags": ["travel", "adventure"],
  "selectedFile": "base64_encoded_image_string"
}
```

**Add Comment Request Body:**
```json
{
  "value": "Great post!"
}
```

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 1 hour and must be refreshed by signing in again.

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required),
  password: String (required, hashed),
  id: String
}
```

### Post Schema
```javascript
{
  title: String,
  message: String,
  name: String,
  creator: String (User ID),
  tags: [String],
  selectedFile: String (base64),
  likes: [String] (User IDs),
  comments: [String],
  createdAt: Date
}
```

## 🔧 Technologies Used

- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **body-parser** - Request body parsing
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon (auto-reload)

## 🚀 Deployment

This backend is designed to be deployed on platforms like:
- Heroku
- Railway
- Render
- DigitalOcean

Make sure to set the environment variables in your deployment platform.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**audrbar**

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⚠️ Security Notes

- Always use a strong JWT_SECRET in production
- Ensure MongoDB connection string is kept secure
- Use HTTPS in production environments
- Regularly update dependencies for security patches