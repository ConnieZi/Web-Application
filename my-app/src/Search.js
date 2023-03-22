import { useState } from 'react';
import SearchIcon from './SearchIcon.svg'

const Search = ({searchMovies}) => {

    const[searchTerm, setSearchTerm] = useState("")

    return (
        <div className='search'>
            <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
            />
            <img
                src={SearchIcon}
                alt='search'
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
    )
}

export default Search;