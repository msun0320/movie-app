import React, { useState, useEffect } from 'react';
import './MovieDetail.css';

const MovieDetail = ({ match, history }) => {
	const [movieDetail, setMovieDetail] = useState({});

	const API_KEY = 'c3ed94545b381cd59ee060f8d40ebc54';
	const BASE_URL = 'https://api.themoviedb.org/3/';
	const DETAILS_API = `${BASE_URL}movie/${match.params.id}?api_key=${API_KEY}&append_to_response=videos`;
	const IMG_API = "https://image.tmdb.org/t/p/w500";

	const fetchMovieDetailData = async api => {
		const movieDetailResponse = await fetch(api);
		const movieDetailData = await movieDetailResponse.json();

		setMovieDetail(movieDetailData);
	};

	useEffect(() => {
		fetchMovieDetailData(DETAILS_API);	
	}, []);

	const goBack = () => history.goBack();

	return (
		<div className='MovieDetail'>
			<div className='bg-image' style={{backgroundImage: movieDetail.backdrop_path ? `url(${IMG_API}${movieDetail.backdrop_path})` : null}}></div>
			<div className='content'>
				<img src={movieDetail.poster_path ? `${IMG_API}${movieDetail.poster_path}` : 'https://images.unsplash.com/photo-1529798856831-427dfd0a1ab1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'} alt={movieDetail.title} />
				<div className='movie-info'>
					<h2>{movieDetail.title}</h2>
					<div>
						<p>{movieDetail.release_date}</p>
						<ul>
							{movieDetail.genres ? movieDetail.genres.map(genre => <li key={genre.id}>{genre.name}</li>) : null}
						</ul>
						<p>{`${movieDetail.vote_average}/10`}</p>
					</div>
					<p>{movieDetail.overview}</p>
					<button onClick={goBack}>Go Back</button>
					<a href={(movieDetail.videos && movieDetail.videos.results[0]) ? `https://www.youtube.com/embed/${movieDetail.videos.results[0].key}` : null} rel='noreferrer' target='_blank'><button>Play Trailer</button></a>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;