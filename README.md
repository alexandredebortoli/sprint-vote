# SprintVote

<div align="center">
  <img src="https://github.com/alexandredebortoli/sprint-vote/assets/70496543/d031e457-5178-4160-af5e-da50c22f2996" alt="Logo">
</div>

<br>

SprintVote is your all-in-one solution for agile planning, combining the best of Fullstack development to empower Scrum Masters, Product Owners, and Agile teams. Say goodbye to the hassles of manual estimation and voting on story points. With SprintVote, we've made sprint planning more efficient, collaborative, and accessible than ever.

### Key Features:

-   **Fullstack Power**: SprintVote is a Fullstack project, blending the strengths of NestJS and TypeScript for the backend and React Native Expo for the frontend. This dual-stack approach ensures a seamless experience from server to mobile devices.

-   **Planning Poker Simplified**: Experience the power of Planning Poker at your fingertips. SprintVote automates the estimation and voting process, allowing your team to focus on what matters—delivering valuable software.

-   **Enhanced Collaboration**: Foster collaboration within your Agile team. SprintVote's intuitive interface and real-time updates enable effective communication and consensus-building during sprint planning sessions.

-   **Efficiency First**: With SprintVote, increase the speed and efficiency of your sprint planning. Say goodbye to tedious manual processes and hello to a streamlined, automated solution.

Join the SprintVote community and revolutionize your agile planning process today!

## Project Status

**🚧 SprintVote 🚀 Under construction... 🚧**

## Table of Contents

-   [Navigation Example](#navigation-example)
-   [Setup and Prerequisites](#setup-and-prerequisites)
-   [Running the Application](#running-the-application)
    -   [Running the API (Backend)](#running-the-api-backend)
    -   [Running the App (Frontend)](#running-the-app-frontend)
-   [Dependencies](#dependencies)
-   [Contributing](#contributing)
-   [License](#license)

## Navigation Example

| Auth Navigation  | App Navigation |
| ------------- | ------------- |
| <video src="https://github.com/alexandredebortoli/sprint-vote/assets/70496543/f2b1dc32-b7ee-4186-9c42-e1d6fee3cc8e">  | <video src="https://github.com/alexandredebortoli/sprint-vote/assets/70496543/9d15ba0b-2c1a-4697-936b-325b752d511c">|

## Setup and Prerequisites

Before running the application, ensure you have the following tools installed:

-   [Node.js](https://nodejs.org/en) (recommended version 16 or greater)
-   [Yarn](https://yarnpkg.com/)
-   [Docker](https://www.docker.com/)

## Running the Application

To run the application, you'll need to set up and run both the API and the app components. The API is built with NestJS and TypeScript, serving as the backend, while the app is a React Native Expo project for the frontend.

### Running the API (Backend)

1. **Navigate to the API Directory**

Open your terminal and from the root directory navigate to the `server` directory.

```bash
cd server
```

2. **Install Dependencies**

Install the required dependencies for the server application.

```bash
yarn
```

3. **Set Up the Database**

While still in the `server` directory, start the PostgreSQL database in a Docker container.

```bash
docker-compose up -d
```

4. **Start the API**

To start the API in development mode, run:

```bash
yarn start:dev
```

The API should now be running on the specified port.

> The default port is 3333

### Running the App (Frontend)

1. **Navigate to the App Directory**

Open a new terminal window and from the root directory navigate to the `client` directory.

```bash
cd client
```

2. **Install Dependencies**

Install the required dependencies for the React Native Expo app.

```bash
yarn
```

3. **Start the App**

To start the app, run:

```bash
yarn start
```

This will launch the development server and provide options to visualize the app using Expo Go on a mobile device or an emulator/simulator.

You should now have both the API and the app up and running, allowing you to interact with the application.


#### Running the Application Example

https://github.com/alexandredebortoli/sprint-vote/assets/70496543/4584217e-6231-49d1-af99-1f69fbcdca9a

## Dependencies

### Backend Dependencies

### Frontend Dependencies

-   Babel Plugin Module Resolver
-   styled component
-   Expo google fonts (Roboto)
-   Phosphor react native
-   React native svg
-   React Hook Form
-   Yup
-   Axios
-   AsyncStorage

## Contributing

We welcome contributions from the community! If you'd like to contribute to SprintVote, please follow these guidelines:

1. [Fork the SprintVote repository](https://github.com/alexandredebortoli/sprint-vote/fork) to your own GitHub account.

2. Clone your forked repository to your local machine:

    ```bash
    git clone https://github.com/your-username/sprint-vote.git
    ```

3. Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

4. Make your changes, and ensure they follow our coding standards.

5. Commit your changes with clear and concise messages:

    ```bash
    git commit -m "Add feature or fix bug"
    ```

6. Push your changes to your fork on GitHub:

    ```bash
    git push origin feature/your-feature-name
    ```

7. Create a pull request (PR) to our `main` repository's main branch. Be sure to include a detailed description of your changes in the PR, and our team will review your contribution.

Thank you for contributing to SprintVote!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
