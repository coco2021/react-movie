

import React from 'react'
import Search from './components/Search'
import {useEffect, useState} from 'react'

//API - Application Programming Interfaces  - a set of rules that allows one 
// software appllication (react) to talk to another (db, server in somewhere)

// const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMBD_API_KEY; // VITE_TMBD_API_KEY in .env.local

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ${API_KEY}'
  }
}

const App = () => {
  //NEVER mutate state
  // /searchTerm = 'something else'
  //mutate state only using set... func

  const [searchTerm, setSearchTerm] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async () => {
    
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; //descending order

      //fetch - js built-in func -> http request / response
      const response = await fetch(endpoint, API_OPTIONS);

      alert(response);

    } catch (error) {
      console.error(`Error fetching moviews: ${error}`);
    }
  }

  useEffect(()=>{
    fetchMovies();
  }, [])  // run only once when this component loads


  return (

    <main>
      <div className='pattern'>

      </div>
      <div className='wrapper'>
        <header>
          <img src='./hero.png' alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movie</span> You'll Enjoy Wihout the Hassle</h1>
          

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {/* <h1 className="text-white">{searchTerm}</h1> */}

        <section className="all-movies">
          <h2>All Movies</h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>

      </div>

    </main>

  )
}

export default App