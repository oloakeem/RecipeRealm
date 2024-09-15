# 📖Recipe Website
A web-based application that allows users to create, share, and manage recipes. This platform provides an easy-to-use interface where users can submit new recipes, view existing ones, and upload images of their dishes. Admin users have additional privileges to add, edit, or delete recipes.

# 🚀 Features
Recipe Submission: Users can submit new recipes with ingredients, instructions, and images.
Recipe Management: Admin users can manage recipes, including adding, updating, and deleting them.
Ingredient & Step Management: Allows users to add, remove, and manage ingredients and cooking directions interactively.
Image Upload: Recipes can include images to provide a visual representation of the final dish.
Responsive Design: Works seamlessly across various screen sizes, including desktop and mobile devices.
# 🛠️ Tech Stack
## Frontend:

React (JavaScript)
TypeScript
CSS Modules for styling
React Router for navigation
## Backend:

Node.js
Express.js
Database:

MongoDB (for storing recipes and user data)
Image Storage:

Cloudinary (or similar service) for managing images
State Management:

React's useState and useReducer hooks
# 📦 Installation
### 1. Clone the repository: 
Copy code
git clone https://github.com/oloakeem/recipe-website.git<br>
cd recipe-website
### 2. Install dependencies for both client and server:

Copy code
#### Client dependencies
cd client
npm install

#### Server dependencies
cd ../server
npm install
### 3. Set up environment variables: Create a .env file in the root of the server directory with the following variables:

![image](https://github.com/user-attachments/assets/535bc0ff-4673-44ee-ac0c-14ab64b8c0d3)

### 4. Run the development servers:
Copy code
#### Run the client (React)
cd client
npm run dev

#### Run the backend (Express)
cd ../server
nodemon index.js<br>
The client will run on http://localhost:3000, and the server will run on http://localhost:5000.

# 🔧 Usage
For Admin Users:
Admin users can submit new recipes, add images, and manage the recipe collection.
For Regular Users:
Users can browse recipes and submit new recipes. They won’t be able to manage or delete existing recipes unless they are admins.
# 🖼️ Screenshots
# Recipe Form

# Recipe List

# 🛠️ Development Workflow
Directory Structure:
bash
Copy code
![image](https://github.com/user-attachments/assets/e1f98b49-72d8-4020-927d-20a282346fa9)
🚧 Future Enhancements
User Authentication: Implement user login, registration, and authentication for more personalized features.
Rating System: Allow users to rate recipes and leave reviews.
Search Functionality: Improve search capabilities to allow filtering recipes by ingredients, cuisine, and more.
Comments Section: Users can comment on each recipe.

# 🤝 Contributions
Contributions are welcome! Feel free to submit a pull request or open an issue if you find any bugs or have feature requests.

# Contact
If you have any questions or suggestions, feel free to contact me at olokunakeem88@gmail.com
