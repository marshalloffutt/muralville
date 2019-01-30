# Muralville

## Description
Muralville is my front end capstone project at NSS. It is a Nashville-centric community-based mural finder app & collaboration project that uses the React, Sass styling, and Leaflet as a map component.

Users can sign in via Google authentication, and then use the interface to look through all the different murals that have been added to the database. User can also add new murals, and edit or delete previous murals that they have added.

Muralville uses the Leaflet API, in conjunction with Esri provider for geosearch capabilities.

Current production build: (https://muralville.firebaseapp.com/home)

## Screenshots

![homeview](src/images/screenshot-1.png)
![muralview](src/images/screenshot-2.png)
![editview](src/images/screenshot-3.png)

## Technologies Used
* React
* Sass
* Axios
* Create-React-App
* Reactstrap
* Prop-Types
* Leaflet
* React-Leaflet
* Leaflet-Geosearch

## How to run this app
Note: To run this app you will need a firebase account and a new project.

### 1. Configure Firebase
1. Clone the repository to your local machine.
2. Run the following command in terminal to download the web dependencies: `npm install`
3. In the db folder, rename apiKeys.json.example to apiKeys.json.
4. In Firebase, create a new project.
5. Navigate to your config object, and copy the keys from Firebase into the apiKeys.json file.
6. Create a realtime databse in Firebase, and start in test mode.

### 2. Serve up the app
#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
