# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Docker Instructions

If you prefer to run the application in a Docker container, follow these steps:

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository

### 2. Build the Docker image

To build the Docker image for this project, run the following command in the root of the project:

### `docker build -t my-react-app .`

This will create a Docker image with the name my-react-app.

### 3. Run the Docker container

Once the image is built, you can run the app in a container by using the following command:

### `docker run -p 3000:3000 my-react-app`

This command will map port 3000 on your local machine to port 80 inside the container. You can now open the app in your browser at http://localhost:3000.

### 4. (Optional) Running in detached mode

If you want to run the container in detached mode, you can use the following command:

### `docker run -d -p 3000:3000 my-react-app`

This command will run the container in detached mode and map port 3000 on your local machine to port 80 inside the container. 

You can now open the app in your browser at http://localhost:3000.

### 5. Stop and remove the container

If you want to stop and remove the container, you can use the following command:

### `docker stop my-react-app && docker rm my-react-app`