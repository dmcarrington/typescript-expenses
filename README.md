# Expenses React app #
This application is a simple expense report example application built using typescript and React. It consists of three main components:
1. MongoDB data store
2. API Server
3. React front end

## Building and running the application ##
Dependencies: `Docker, docker-compose`

The application is intended to be run as a set of Docker containers. All necessary files have been included. First, it will be necessary to set up the environment variable files for the API server and UI containers. I have provided example .env files for both, which will work for demo purposes:
```
cp .env.example .env
cp client/typescript-expenses-ui/.env.example client/typescript-expenses-ui/.env
```
After this, build and start the application with the command:
```docker-compose up```
which will build and start all 3 docker containers.

## Application Usage ##
To access the web UI, once all Docker containers have started, open a browser at `http://localhost:3000`. The application currently has a dummy login screen, where you can just enter your name to login. 
After logging in, you will be presented with a personal dashboard screen, which shows a list of your expense claims, initially empty. Use the "Add Expense" button to display a dialog where you can enter the description and amount for a new expense claim. On saving the new claim, the dialog will close and the new claim will be displayed on the dashboard. 
From the dashboard, you can logout, and then login a a different user and access a different set of reports.

## API Access ##
The UI makes use of two API endpoints on the server container, which can be invoked directly via Postman. A Postman collection and environment file have been provided in the `/api` folder in the project root. These APIs are:
* `GET /users/:username/expenses` - returns any existing expense reports for the given user
* `POST /users/:username/add_expense` - creates a new expense report for the current user

## Database ##
All records are stored in the MongoDB started as a Docker container along with the other services. The database is initialised whrn the API server first start, so no initialisation scripts are required.

## Notes and known issues ##
* As per instructions, no authentication has been applied, either to the user login, APIs, or database access. The 'login' page serves only as a method of getting a username.
* Username id simply passed via `props` to the rest of the application. With the introduction of real authentication, this would likely be replaced by `AuthContext`.
* No exception handling on API calls and responses.
* UI is minimal but functional.
* Minimal validation of fields - I have made the `amount` field be a number, but no restriction on decimal places. All other fields are unvalidated
* No automated tests