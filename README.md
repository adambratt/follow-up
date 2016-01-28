# Follow Up Boss - People Admin


## Build

In order to build the project you will first need to install all necessary node
modules:

```
npm install
```

To build a production version of the project execute:

```
npm run build
```

To clean the directory execute:

```
npm run clean
```

## Development Server

To launch the development server with hot module swap enabled execute:

```
npm start
```

This will allow you to edit your Stylus and React components and immediately see
your changes take place within your browser without having to reload.

## Project Layout

All source code resides in the *src* directory, the compiled static application
will reside in the *dist* directory.

### Initialization

The *src/init.jsx* file configures the application's environment, includes the
application's routes, and runs the React Router on `#root`.
