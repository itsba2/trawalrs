# Trawalrs

Trawalrs is a map-based memory app, consisting of:
- ExpressJS API
- MongoDB
- React app, using Material UI components, created with Vite

## Prerequisites

Before running the app locally, you need the following:

- Git
- Node.js
- MongoDB ([MongoDB Compass](https://www.mongodb.com/products/tools/compass) is suggested.)
  - A MongoDB server should run in the background locally.
  - Or you can just connect to MongoDB Atlas running on the cloud.
- [Mapbox](https://www.mapbox.com/) access token

## Running the App Locally

1.  Clone this repository:

    ```shell
    git clone https://github.com/yourusername/trawalrs.git
    ```

2.  Go to project directory:

    ```shell
    cd trawalrs
    ```

3.  Go to `/server` directory.

    Inside `/server` folder, create `.env` file and fill up the following environmental variables:

    ```text
    DB_URL=mongodb://127.0.0.1:27017/trawalrs
    API_PORT=3131
    UPLOAD_DIR=public
    CLIENT_URL=http://localhost:3132
    SESSION_SECRET=<your-secret-key>
    SESSION_COOKIE_MAX_AGE=3600000
    MONGO_STORE_MAX_AGE=3600
    ```

    > Use `public` value for `UPLOAD_DIR` variable. Otherwise, change `public/` line inside `.gitignore` file.

    Then, run:

    - With nodemon:

    ```shell
    npm run dev
    ```

    - Or without nodemon:

    ```shell
    npm run start
    ```

    > You must have a valid MongoDB connection to run the server.

4.  Go to `/client` directory.

    Inside `/client` folder, create a `.env` file and enter your Mapbox access token. You can obtained it by a free sign-up on [Mapbox](https://www.mapbox.com/)

    ```text
    VITE_MAPBOX_ACCESS_TOKEN=<yourMapboxAccessToken>

    ```

    Then, run:

    ```shell
    npm run dev
    ```

> You are highly encouraged to set your own environmental variable values.

3.  Access the Trawalrs at http://localhost:3132.

## Usage

- Allow browser to know your location.

- Create an account using top-left user menu.

- Log into your acount.

- Search for a location.

- Double click where you want to put a Walr.

- Submit your Walr.

- View your Walrs on the map or list them using top-left menu.

- Toggle theme as you need.

## Development TODO List

Last updated: 06-Oct-23

| TODO                                                | Work on       | Status  |
| :-------------------------------------------------- | :------------ | :-----: |
| Validate data models                                | server        | &cross; |
| Login on registration                               | server        | &cross; |
| Validate forms                                      | client        | &cross; |
| `Profile` view                                      | client        | &cross; |
| `About` view                                        | client        | &cross; |
| Better `WalrList` view                              | client        | &cross; |
| Get rid of error message on page load without login | client+server | &cross; |
