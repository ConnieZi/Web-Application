import React from 'react';
import { useState,useEffect } from 'react';
import AppTitle from './AppTitle.js';
import ListOfMovies from './listOfMovies';
import Search from './Search';
import './App.css';

const API_URL = 'http://www.omdbapi.com?apikey=f7a2253b';


// App is our main functional component
const App = () => {
    const [movies, setMovies] = useState([]);

    // async() means it takes some time to fetch these movies
    const searchMovies = async(title) => {
        fetch(`${API_URL}&s=${title}`)
        .then( response => response.json())
        .then(data => setMovies(data.Search))
    }

    // we want to grab data as soon as the component loads
    useEffect(() => {
        searchMovies('Spiderman');
    },[]);


    return (
        <div className='app'>
            <AppTitle/>
            <Search searchMovies={searchMovies} />
            <ListOfMovies movies={movies} />
        </div>
    );
}

export default App;
