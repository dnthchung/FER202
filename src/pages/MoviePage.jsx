
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MoviePage() {
	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState('');
	const [genre, setGenre] = useState('');
	const [year, setYear] = useState('');
	const [genres, setGenres] = useState([]);
	const [years, setYears] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:9999/movies').then(res => {
			const sorted = [...res.data].sort((a, b) => b.rating - a.rating);
			setMovies(sorted);
			setGenres([...new Set(sorted.map(m => m.genre))]);
			setYears([...new Set(sorted.map(m => m.releaseYear))].sort((a, b) => b - a));
		});
	}, []);

	const filtered = movies.filter(m => {
		const matchTitle = m.title.toLowerCase().startsWith(search.toLowerCase());
		const matchGenre = genre ? m.genre === genre : true;
		const matchYear = year ? m.releaseYear === parseInt(year) : true;
		return matchTitle && matchGenre && matchYear;
	});

	return (
		<div className="container mt-4">
			<h2 className="mb-4">Movie List</h2>
			<div className="row mb-3">
				<div className="col-md-4 mb-2">
					<select className="form-select" value={year} onChange={e => setYear(e.target.value)}>
						<option value="">All Years</option>
						{years.map(y => (
							<option key={y} value={y}>{y}</option>
						))}
					</select>
				</div>
				<div className="col-md-4 mb-2">
					<select className="form-select" value={genre} onChange={e => setGenre(e.target.value)}>
						<option value="">All Genres</option>
						{genres.map(g => (
							<option key={g} value={g}>{g}</option>
						))}
					</select>
				</div>
                <div className="col-md-4 mb-2">
					<input
						type="text"
						className="form-control"
						placeholder="Search by title..."
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<div className="row">
				{filtered.map(movie => (
					<div className="col-md-4 mb-4" key={movie.id}>
						<div className="card h-100">
							<img src={process.env.PUBLIC_URL + '/images/' + movie.poster} alt={movie.title} className="card-img-top" style={{height: '300px', objectFit: 'cover'}} />
							<div className="card-body">
								<h5 className="card-title">{movie.title}</h5>
								<p className="card-text">
									<strong>Genre:</strong> {movie.genre}<br />
									<strong>Year:</strong> {movie.releaseYear}<br />
									<strong>Duration:</strong> {movie.duration} min<br />
									<strong>Rating:</strong> {movie.rating}<br />
									<strong>Booked:</strong> {movie.booked}
								</p>
								<button className="btn btn-primary w-100" onClick={() => navigate('/booking/create')}>Book Ticket</button>
							</div>
						</div>
					</div>
				))}
				{filtered.length === 0 && (
					<div className="col-12 text-center">No movies found.</div>
				)}
			</div>
		</div>
	);
}

export default MoviePage;
