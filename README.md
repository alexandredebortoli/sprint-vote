<div align="center">
  <img src="https://github.com/alexandredebortoli/sprint-vote/assets/70496543/d031e457-5178-4160-af5e-da50c22f2996" alt="Logo">
</div>

# sprint-vote

SprintVote is an open-source React Native Expo app designed to streamline and enhance the agile planning process by bringing the power of Planning Poker to your fingertips. Whether you're a Scrum Master, Product Owner, or a member of an Agile development team, SprintVote simplifies the task of estimating and voting on story points, making your sprint planning sessions more efficient and collaborative.


<h3 align="center"> 
	🚧  SprintVote 🚀 In construction...  🚧
</h3>

## Setup 🛠️
- [ ] [Node.js](https://nodejs.org/en) (recommended version 16 or greater)
- [ ] [Yarn](https://yarnpkg.com/)
- [ ] [Docker](https://www.docker.com/)

## Running the Application 🏃

To run the application, you'll need to set up and run both the API and the app components. The API is built with NestJS and TypeScript, serving as the backend, while the app is a React Native Expo project for the frontend.

### Running the API (Backend)

1. **Install Dependencies**

Open your terminal and from the root directory navigate to the api directory.

``` bash
cd api
```

Install the necessary dependencies using Yarn. 

``` bash
yarn
```

2. **Set Up the Database**
   
While still in the api directory, start the PostgreSQL database in a Docker container using the following command:

``` bash
docker-compose up -d
```

3. **Start the API**
   
To start the API in development mode, run:

``` bash
yarn start:dev
```

The API should now be running on the specified port.

### Running the App (Frontend)

1. **Navigate to the App Directory**
   
Open a new terminal window and from the root directory navigate to the app directory.

``` bash
cd app
```

2. **Install Dependencies**
   
Install the required dependencies for the React Native Expo app.

``` bash
yarn
```

3. **Start the App**
   
To start the app, run:

``` bash
yarn start
```

This will launch the development server, and you will be presented with two options to visualize the app:

1. Expo Go App (On Mobile Device): Install the "Expo Go" app from the App Store (iOS) or Play Store (Android) on your mobile device. Scan the generated QR code using the Expo Go app, and your app will be built and accessible on your phone.

2. Emulator/Simulator: If you prefer to run the app on a simulator (Android or iPhone), follow the instructions displayed in the terminal. This will open the app on the emulator/simulator on your machine.

You should now have both the API and the app up and running, allowing you to interact with your application.


## Dependencies

-   Babel Plugin Module Resolver
-   styled component
-   Expo google fonts (Roboto)
-   Phosphor react native
-   React native svg
-   React Hook Form
-   Yup
-   Axios
-   AsyncStorage
