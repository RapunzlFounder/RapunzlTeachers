# Rapunzl Web App

This project is Rapunzl's React Web App. Below are instructions on getting started developing.

To learn React, check out the https://reactjs.org/.

## Getting Started

All of the main files related to this project can be found in the 'src' directory. Under no circumstances should you rename this directory or the 'public' folder since these are specific to React.

During development, we do not commit our node modules directory because it is too large for Github to track changes. This means that you will need to install all of the packages that are in the project to date in the node modules folder. In order to install the node modules, go to the root directory and run `npm install`.

If you then run `npm start` a browser window will start, displaying the project at [http://localhost:3000], which begins with App.js and displays src/screens/AuthLoadingScreen.js, which begins with a loading screen before determining which path to route the current user. The page will reload when make changes and any lint errors will display in the console.

In most cases, we should rely upon Material UI for all visual components, including forms, layout, styles, etc.

## Creating Builds

In order to build the Web App for production to the `build` folder, run the command `GENERATE_SOURCEMAP=false npm run build` in the terminal. This will correctly bundle React in production mode and optimizes the build for the best performance. Every time that you create a build bundle, it will overwrite the contents in the `build` folder. The build is minified and the filenames include the hashes, which means that the app is ready to be deployed. For further information about deployment, please check https://facebook.github.io/create-react-app/docs/deployment.

In order to upload a staging build, you must use SFTP to the staging server. Login using credentials provided by your system admin, change to the 'docker/djangorest/ReactWebApp' directory and copy the contents of the 'build' directory into the ReactWebApp directory on the Staging Server.  If you then go to 'https://rapunzlstaging.com:8080/index.html' you should see the App.

If you encounter issues running `GENERATE_SOURCEMAP=false npm run build` and the issue is that the project fails to minify, please check out this resource: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify.

In order to manage the bundle size, check out this section related to analyzing the bundle size: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size.

## More Information

Below includes more information provided from the initial create react project.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
