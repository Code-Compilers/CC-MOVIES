import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { MovieProvider, MovieContext } from './context/MovieContext';

const App = () => {
  const { movies } = useContext(MovieContext);

  return (
    <MovieProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <HomePage movies={movies} />} />
          <Route path="/movie/:id" render={() => <MoviePage movies={movies} />} />
        </Switch>
      </Router>
    </MovieProvider>
  );
};

export default App;
