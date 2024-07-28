# Toy-Library
Library but for toys!
A simple toy library application built with React.js and JSON Server.

## Features

- Browse available toys
- Borrow and return toys
- View borrowed toys

## Installation

### Prerequisites

- Node.js
- npm or yarn

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/toy-library-app.git
    cd toy-library-app
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start JSON Server:
    ```bash
    npx json-server --watch data/db.json --port 3500
    ```

4. Start the React application:
    ```bash
    npm start
    # or
    yarn start
    ```

The React app will be available at [http://localhost:3000](http://localhost:3000), and JSON Server will run at [http://localhost:3500](http://localhost:3500).

## Usage

1. **Browse Toys**: View the list of available toys.
2. **Borrow Toys**: Select toys to borrow from the library.
3. **Return Toys**: Return borrowed toys back to the library.
4. **View Borrowed Toys**: See a list of toys currently borrowed.
