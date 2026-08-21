

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
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  //NEVER mutate state
  // /searchTerm = 'something else'
  //mutate state only using set... func

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);




  const fetchMovies = async () => {
    
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; //descending order

      //fetch - js built-in func -> http request / response
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }


      // alert(response); //test

      // throw new Error('Failed to fetch movies'); //test

      
      const data = await response.json();

      // console.log(data);

      if(data.Response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

    } catch (error) {
      console.error(`Error fetching moviews: ${error}`);

      setErrorMessage('Error fetching movies. Please try again later.')
    }finally {
      setIsLoading(false);
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

          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

          {isLoading ? (<p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>

            {/* (movie)=>{return } */}

              {movieList.map((movie) => (
                <p key={movie.id} className='text-white'>{movie.title}</p>
              ))}
            
            </ul>
          )}

        </section>

      </div>

    </main>

  )
}

export default App