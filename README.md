# Case Study

## Overview

This project is a Case Study, built with a NestJS backend and a Vite-based React frontend. The application allows users to interact with a PostgreSQL database and manage user data through various API endpoints.

## Table of Contents

-   [Getting Started](#getting-started)
-   [Backend](#backend)
-   [Frontend](#frontend)
-   [API Endpoints](#api-endpoints)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Environment Variables](#environment-variables)

## Getting Started

To get started with this project, follow the instructions below:

1. Clone the repository to your local machine.
2. Navigate to the `backend` and `client` directories and install dependencies using:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory, copying the contents from `example.env` and filling in the appropriate values.
4. Start the backend server:

    ```bash
    npm run dev
    ```

5. Start the frontend application:

    ```bash
    npm run dev
    ```

## Backend

The backend is built using NestJS and utilizes Knex for query building with PostgreSQL as the database. Upon starting, the application automatically creates the database if it does not exist, and subsequently checks for the presence of the required user table. If the table is not found, it will be created and populated with mock user data.

## Frontend

The frontend application is developed using React with Vite, utilizing libraries like TanStack React Query for data fetching and Ant Design for UI components.

## API Endpoints

1. **GET /users**

    - Retrieves all user information with pagination.
    - Supports query parameters `page` and `pageSize` for pagination and `search` for searching user data.

2. **GET /users/<:id>**

    - Retrieves information for the user with the specified `id`.

3. **POST /users/save**

    - Accepts user data to save a new user in the database, ensuring passwords are encrypted.

4. **POST /users/update**
    - Updates the user data for the specified `id`.

## Features

-   Displays user data in a table format.
-   Allows searching for users based on input criteria.
-   Allows pagination of user data.
-   Supports user creation and updating through a modal dialog form.

## Technologies Used

-   **Backend**: NestJS, Knex, PostgreSQL, Bcrypt, Morgan, Class Validator
-   **Frontend**: React, Vite, TanStack React Query, Ant Design, React-Toastify, Axios

## Environment Variables

Ensure to configure the `.env` file with the following variables:

```plaintext
NODE_SERVER_PORT=3000

POSTGRES_DB_HOST=<host>
POSTGRES_DB_USER=<user>
POSTGRES_DB_PORT=<port>
POSTGRES_DB_PASSWORD=<password>
POSTGRES_DB_DATABASE=<database>
```
