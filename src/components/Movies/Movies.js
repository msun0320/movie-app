import React from 'react';
import Movie from '../Movie/Movie';
import './Movies.css';

const Movies = ({ movies, IMG_API }) => {
	return (
		<div className='Movies'>
			{movies ? movies.map(movie => <Movie key={movie.id} { ...movie } IMG_API={IMG_API} />) : null}
		</div>
	);
};

export default Movies;