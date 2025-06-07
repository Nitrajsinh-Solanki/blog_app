# Blog Application

A full-stack blog application built with React.js frontend and Node.js/Express backend, featuring user authentication, CRUD operations for blogs, and a responsive design using Tailwind CSS.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Blog Management**: Create, read, update, and delete blog posts
- **Category Filtering**: Filter blogs by categories (Career, Finance, Travel, Technology, Lifestyle, Other)
- **Author Search**: Search blogs by author name
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Image Support**: Add images to blog posts via URL
- **User Dashboard**: Personal blog management for authenticated users
- **Toast Notifications**: Real-time feedback for user actions

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Formik & Yup** - Form handling and validation
- **React Toastify** - Toast notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
blog_app/
├── client/                     # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── Blog/          # Blog-related components
│   │   │   ├── common/        # Shared components
│   │   │   └── Layout/        # Layout components
│   │   ├── context/           # React Context
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   └── App.js
│   └── package.json
├── server/                     # Backend Node.js application
│   ├── controllers/           # Route controllers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── config/                # Configuration files
│   └── server.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nitrajsinh-Solanki/blog_app.git
   cd blog_app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blogapp
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Start the application**
   
   **Backend (from server directory):**
   ```bash
   npm run dev
   ```
   
   **Frontend (from client directory):**
   ```bash
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Usage

### Authentication
- Register a new account or login with existing credentials
- JWT tokens are used for secure authentication
- Protected routes require authentication

### Blog Management
- **Create Blog**: Navigate to "Create Blog" to write new posts
- **View Blogs**: Browse all blogs on the main page
- **Filter & Search**: Use category filters and author search
- **Edit/Delete**: Manage your own blogs from "My Blogs" section

### Features Overview
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Feedback**: Toast notifications for all user actions
- **Form Validation**: Client-side validation using Formik and Yup
- **Image Support**: Add images to blogs via URL input

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (protected)
- `PUT /api/blogs/:id` - Update blog (protected)
- `DELETE /api/blogs/:id` - Delete blog (protected)

## 🎨 Components

### Core Components
- **BlogCard**: Displays individual blog preview
- **BlogForm**: Reusable form for create/edit operations
- **BlogList**: Grid layout for displaying multiple blogs
- **Filters**: Category and author filtering interface
- **Navbar**: Navigation with authentication state
- **ProtectedRoute**: Route protection for authenticated users

### Pages
- **Home**: Landing page with featured blogs
- **BlogList**: All blogs with filtering
- **BlogDetail**: Individual blog view
- **CreateBlog**: Blog creation form
- **EditBlog**: Blog editing form
- **MyBlogs**: User's personal blogs
- **Login/Register**: Authentication pages

## 🔒 Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nitrajsinh Solanki**
- GitHub: [@Nitrajsinh-Solanki](https://github.com/Nitrajsinh-Solanki)


## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub or contact the maintainer.

---

⭐ **Star this repository if you found it helpful!**
