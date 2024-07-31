# neura-robotics-assignment
# Overview
This project is a MEVN stack application (MongoDB, Express, Vue 3(Nuxt), Node.js) that displays data from the SpaceX API and allows users to save specific launches to a local database. The application consists of two main screens:

Launches Table: Displays a table of the latest 30 SpaceX launches.
Saved Launches: Displays saved launches in a card format, allowing users to remove them.

# Features
Fetch and display the latest 30 SpaceX launches in a table view.
Save specific launches to a local database.
Display saved launches in a card view with the option to remove them.
State management using Pinia.
Interaction with the SpaceX API and local database abstracted via the state manager.

# Technologies Used
* Frontend: Vue 3, Nuxt, Pinia, TypeScript
* Backend: Node.js, Express.js
* Database: MongoDB, Mongoose
* API: SpaceX API v4


# Prerequistries:
  1. Please make sure you have installed nodeJS.
  2. Make sure your MongoDB server is running and accessible from your application.<br/>
     To download mongoDB server : Go to the MongoDB Download Center(https://www.mongodb.com/try/download/community).
     
# How to run Backed:
1. cd backend
2. npm install
3. Please add your mongoDB URL to the .env file which is in root  of backend folder
4. MONGODB_URI=your_mongodb_connection_string (for example:"mongodb://localhost:27017/mevn-spacex")
npm start

# How to run Frontend:
1. cd frontend
2. npm install
3. npm run dev

# API Interaction
1. Fetch Launches(/): Axios is used to fetch the latest 30 launches from the SpaceX API.
2. Save Launch(/save): Axios posts a launch to the backend to save in the database.
3. Get Saved Launches(/savedLaunches): Axios gets saved launches from the backend.
4. Remove Launch(/delete/:id): Axios deletes a saved launch from the database.
