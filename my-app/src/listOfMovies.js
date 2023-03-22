import MovieCard from './MovieCard';

const ListOfMovies = ({movies}) => {
    return (
        <>
        {  
            movies?.length > 0 ?
            (
                <div className='container'>
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
            ):(
                <div>
                    <h2> No movie found </h2>
                </div>
            )
        }
        </>
    );
}

export default ListOfMovies;