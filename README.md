# 🎬 Movie Database

This is a React-based movie database application that allows users to search for movies and view details about them. The application fetches data from The Movie Database (TMDB) API.

## ✨ Features

- 🔍 Search for movies by title
- 🌟 View popular movies on the home page
- 📝 Click on a movie to view detailed information, including genres, overview, release date, and rating
- 📱 Responsive design

## 🛠️ Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Code-Compilers/CC-MOVIES.git
    cd CC-MOVIES
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your TMDB API key:

    ```sh
    REACT_APP_TMDB_API_KEY=your_api_key_here
    ```

### 🚀 Running the Application

1. Start the development server:

    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### 📦 Building the Application

1. Build the app for production to the `build` folder:

    ```sh
    npm run build
    ```

2. It correctly bundles React in production mode and optimizes the build for the best performance.

### 🧪 Running Tests

1. Launch the test runner in the interactive watch mode:

    ```sh
    npm test
    ```

## 📂 Project Structure

CC-MOVIES/
├── public
│   ├── index.html
├── src
│   ├── components
|   |   ├── HeroSlide.css
|   |   ├── HeroSlide.js
|   |   ├── MovieCard.css
|   |   ├── MovieCard.js
|   |   ├── MovieList.css
|   |   ├── MovieList.js
|   |   ├── SearchBar.js
│   ├── pages
│   │   ├── HomePage.css
|   |   ├── HomePage.js
|   |   ├── MovieDetails.css
|   |   └── MovieDetails.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

