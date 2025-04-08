# JavaScript + Mongoose + MongoDB
This folder powers our server-side logic using robust tools.

  ## Setup and Installation
To get started with the project, follow these steps:

1. **Clone the Repository**  
   Clone the repository to your local machine:
   ```bash
   git clone https://github.com/netmifi/netmifi/
2. **Setup the Backend**
Navigate to the backend folder, install dependencies, and start the server:
    ```bash
    cd backend
    npm install
    npm run dev
3. **Thunder Client**
   Install the THUNDER CLIENT vscode extension for quick route testing. Just like post man but for local development.

## Architecture 

### Backend (Node.js, MongoDb)
The backend is built using Node.js with the following key libraries:
- **Nodemon:** Automatically restarts the server during development. [Nodemon Website](https://nodemon.io/)
- **Bcrypt:** For hashing passwords. [Bcrypt on GitHub](https://github.com/kelektiv/node.bcrypt.js/)
- **Mongoose:** For MongoDB object modeling. [Mongoose Documentation](https://mongoosejs.com/)
- **Dotenv:** For managing environment variables. [Dotenv on GitHub](https://github.com/motdotla/dotenv)
- **Helmet:** To secure HTTP headers. [Helmet Documentation](https://helmetjs.github.io/)
- **JWT (jsonwebtoken):** For token-based authentication. [jsonwebtoken on GitHub](https://github.com/auth0/node-jsonwebtoken)
- **Nodemailer:** For sending emails. [Nodemailer Documentation](https://nodemailer.com/about/)
- **Multer:** For handling file uploads. [Multer on GitHub](https://github.com/expressjs/multer)
- **Cookie-parser:** For parsing cookies. [Cookie-parser on GitHub](https://github.com/expressjs/cookie-parser)

### Database (MongoDB)
This project uses MongoDB for data storage. For installing MongoDB Compass (ideal for offline machines), please refer to this [YouTube video](https://youtu.be/gB6WLkSrtJk).

## Environment Variables
To view or request the environment variable settings, please refer to this Google Document:  
[Environment Variables Document](https://docs.google.com/document/d/1r3eqYQSELndVlbU_-MZZrr3xGZfoGgciFwKxZ9BG5o/edit?usp=drivesdk)

---
## <div style="color: red;">For any references and naming conventions please visit the [APPLICATION STRUCTURE](./app-structure.txt)
</div>