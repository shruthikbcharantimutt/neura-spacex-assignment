# neura-robotics-assignment
# Overview
This project is a MEVN stack application (MongoDB, Express, Vue 3(Nuxt), Node.js) that displays data from the SpaceX API and allows users to save specific launches to a local database. The application consists of two main screens:

* Launches Table: Displays a table of the latest 30 SpaceX launches.
* Saved Launches: Displays saved launches in a card format, allowing users to remove them.

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
  1. Node.js: Make sure Node.js is installed on your system. You can download it from Node.js official website(https://nodejs.org/en).
  2. Ensure Git is installed on your system. You can download and install Git from Git official website(https://git-scm.com/).
  2. MongoDB: Make sure MongoDB is installed and running on your system. You can download it from MongoDB official website(https://www.mongodb.com/try/download/community).
  * Note:Ensure MongoDB server is running. You can start it using the following command:


# Cloning the Project
  * Open your terminal (on macOS or Linux) or Command Prompt (on Windows).
  * Change to the directory where you want to clone the repository. Use the cd command to navigate to the desired location.
    - cd /path/to/your/directory
    - git clone https://github.com/shruthikbcharantimutt/neura-spacex-assignment 
    - cd [repository-name](i.e., neura-spacex-assignment)
     
# How to run Backend:
1. cd backend
2. npm install
3. Please add your mongoDB URL to the .env file which is in root  of backend folder
4. MONGODB_URI=your_mongodb_connection_string (for example:"mongodb://localhost:27017/mevn-spacex")
5. npm start


# How to run Frontend:
1. cd frontend
2. npm install
3. npm run dev

# API Interaction

Base URL: http://localhost:3001/api/launches

1.Fetch Launches (/)

* URL: http://localhost:3001/api/launches/
* Description: Axios is used to fetch the latest 30 launches from the SpaceX API.
* Method: GET

2. Save Launch (/save)

* URL: http://localhost:3001/api/launches/save
* Description: Axios posts a launch to the backend to save in the database.
* Method: POST

3. Get Saved Launches (/savedLaunches)

* URL: http://localhost:3001/api/launches/savedLaunches
* Description: Axios gets saved launches from the backend.
* Method: GET

4. Remove Launch (/delete/:id)

* URL: http://localhost:3001/api/launches/delete/:id
* Description: Axios deletes a saved launch from the database.
* Method: DELETE
