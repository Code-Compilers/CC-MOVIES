import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies] = useState([
    { id: 1, title: 'Inception', year: 2010, poster: '/path/to/inception.jpg', description: 'A mind-bending thriller.' },
    { id: 2, title: 'The Dark Knight', year: 2008, poster: '/path/to/dark-knight.jpg', description: 'A superhero film.' },
    { id: 3, title: 'Interstellar', year: 2014, poster: '/path/to/interstellar.jpg', description: 'A space exploration movie.' }
  ]);

  return (
    <MovieContext.Provider value={{ movies }}>
      {children}
    </MovieContext.Provider>
  );
};
