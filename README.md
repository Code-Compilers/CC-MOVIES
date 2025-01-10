# Movie Database

This is a React-based movie database application that allows users to search for movies and view details about them. The application fetches data from The Movie Database (TMDB) API.

## Features

- Search for movies by title
- View popular movies on the home page
- Click on a movie to view detailed information, including genres, overview, release date, and rating
- Responsive design

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/movie-database.git
   cd movie-database

   ```

1. Install the dependencies:

npm install

3. Create a .env file in the root directory and add your TMDB API key:

REACT_APP_TMDB_API_KEY=your_api_key_here

Running the Application

1. Start the development server:

npm start

2. Open your browser and navigate to http://localhost:3000.

Building the Application

1. Build the app for production to the build folder:

npm run build

2. It correctly bundles React in production mode and optimizes the build for the best performance.

Running Tests

1. Launch the test runner in the interactive watch mode:

npm test

Project Structure:

.
├── public
│ ├── index.html
│ ├── manifest.json
│ └── robots.txt
├── src
│ ├── components
│ │ ├── Header.js
│ │ ├── Header.css
│ │ ├── MovieCard.js
│ │ ├── MovieCard.css
│ │ ├── MovieList.js
│ │ ├── MovieList.css
│ │ ├── SearchBar.js
│ │ ├── SearchBar.css
│ │ └── ...
│ ├── pages
│ │ ├── HomePage.js
│ │ ├── HomePage.css
│ │ ├── MovieDetails.js
│ │ ├── MovieDetails.css
│ │ └── ...
│ ├── App.js
│ ├── index.js
│ └── ...
├── .env
├── .gitignore
├── package.json
├── README.md
└── ...
