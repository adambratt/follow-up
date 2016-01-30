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

Open up your browser to `http://localhost:3000`

This will allow you to edit your Stylus and React components and immediately see
your changes take place within your browser without having to reload.

## Project Layout

All source code resides in the *src* directory, the compiled static application
will reside in the *dist* directory.

### Initialization

The *src/init.jsx* file configures the application's environment, includes the
application's routes, and runs the React Router on `#root`.

## Notes

This project is setup with the following key libraries:
* *react-router:* Used to manage the routes for Login, People, and Person pages
* *redux:* Used as a global store for all data and as a paradigm for actions and reducers
* *immutable:* Overkill for a simple project like this but I love using this library in every React app as it makes it impossible to improperly modify the store. And if we were receiving live updates on data it makes it really easy to efficiently check to see if components need to be re-rendered.
* *font-awesome:* Used for icon fonts

It's also important to note that we store login information in local storage so that you can reload the page without issue.

There are a few areas in this app that could be improved:
* Stylesheets are a bit messy and could use some more organization
* We don't GET the person again (we use the cache from people list) when loading the person page so if another user was editing it could cause conflicts.
* Login/Logout are not synced across browser windows. Could be done easily with a listener on localStorage
* People page is responsive but could use improvement
* When refreshing on a Person page we don't properly store the history while trying to redirect to login so you are always brought back to the People page
* Currently the Person and People routes check to see if the user is logged in rather than having an overall auth wrapper. In a more improved setup, I wouldn't have to check the user state and use a router mix-in in both of these as that would be handled by a main auth wrapper.
* Other than basic login failure, there isn't any error handling for any of the HTTP requests
* No tests :(
