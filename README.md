<b>
This is a Personal Portfolio with CMS (Content Management System) where you can:
<br>
Features</b>

 Admin Login (Token-based Authentication)
 Add, Edit, Delete Projects
 Manage Blog Posts
 Update About Me Section
 Contact Page with User Messages
 MongoDB for persistent storage
 Responsive Frontend (React + Vite)

🛑 Note: This project is fully functional for local deployment only. It is not connected to any live hosting platforms.
<b>
The Stack
</b>
Frontend: React, Vite, Axios, Tailwind CSS
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT (JSON Web Token)
Image Uploads: Multer
API Testing: Postman


SET UP INSTRUCTIONS TO RUN THIS LOCALLY
1. Clone the Repository

git clone <your-github-repo-link>
cd Portfolio-CMS

2. Configure the Backend

a. Go to the Backend Folder:
cd backend
b. Install Dependencies:
npm install
c. Create a .env file inside the backend folder:
MONGO_URI = mongodb://127.0.0.1:27017/portfolio-cms
JWT_SECRET = your_secret_key
⚙️ MONGO_URI is the default local MongoDB connection.
🔒 JWT_SECRET can be any strong random string like mysecretkey123.

3. Run the Backend Server

npm start
The backend will run on:
  http://localhost:3000

4. Configure the Frontend

a. Open a new terminal and go to the client folder:
cd ../client
b. Install Dependencies:
npm install
c. Update the API URLs in your frontend to:
http://localhost:3000/api/
(If not already configured)

5. Run the Frontend

npm run dev
The frontend will run on:
  http://localhost:5173

6. Create an Admin User in MongoDB

Option 1: Using Postman (Recommended)
Send a POST request to:
http://localhost:3000/api/auth/register
Body Example (JSON):
{
  "email": "admin@example.com",
  "password": "admin123"
}
This will hash your password and store the user correctly.

Option 2: Manual Insertion in MongoDB
Go to your local MongoDB database (portfolio-cms).
Open the users collection.
Click Insert Document and add:
{
  "email": "admin@example.com",
  "password": "$2a$10$4fV5pSgH82fW7sHqkeXU9uR8IlW1J6VhF7JztVmyOAA.efvV6rN/m"
}
This is the bcrypt-hashed version of admin123.

7. Admin Login

Go to the frontend login page.
Use:
Email: admin@example.com
Password: admin123

8. API Testing (Optional)

You can use Postman to test the backend:

Login: POST http://localhost:3000/api/auth/login
Add Project: POST http://localhost:3000/api/projects
Get Projects: GET http://localhost:3000/api/projects
Other APIs for Blogs, About, Contact

 9. Important Notes

Keep both backend and frontend servers running.
MongoDB must be running locally on your system.
All frontend API URLs must point to http://localhost:3000/api/

HERE IS A VIDEO OF THE FULL WEBSITE RUNNING:


THANK YOU FOR READING!
