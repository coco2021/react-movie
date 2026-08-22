

// import React from 'react'
import Search from './components/Search'
import {useEffect, useState} from 'react'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import { useDebounce} from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite';

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

  const [trendingMovies, setTrendingMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

// handle debounce --------------
// https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
// https://github.com/streamich/react-use/blob/master/docs/useDebounce.md
// install react-use
// https://www.npmjs.com/package/react-use
// npm i react-use
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // 500 ms -> wait for 500 milliseconds before changing the value in the state -> not api call every letter typed 
  //      -> prevent making too many request by waiting for the user to stop typing for 500 ms (30 seconds)
  //-> improve performance
  useDebounce( () => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  //-> fetchMovies(debouncedSearchTerm)


//---------------------------
  //useActionState
  //useOptimistic
  //useFormStatus
  //useTransition


  const fetchMovies = async (query = '') => {
    
    setIsLoading(true);
    setErrorMessage('');

    try{
      // const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; //descending order

      const endpoint = query
        // ?  `${API_BASE_URL}/search/movie?query=${query}`

        // make sure this query is optimized to be displayed in thd URL or to be called as an API call
        // encodeURI - Encodes a text string as a valid Uniform Resource Identifier (URI)
        //e.g. some specific characters in query, -> will process properly
        ?  `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        :  `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`; 

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


      //updateSearchCount(); //test keys

      if(query && data.results.length > 0){
        await updateSearchCount(query, data.results[0]);
      }


    } catch (error) {
      console.error(`Error fetching moviews: ${error}`);

      setErrorMessage('Error fetching movies. Please try again later.')
    }finally {
      setIsLoading(false);
    }
  }

//---end fetchMovies ----------------------------------------------------

const loadTrendingMovies = async () => {
  try{
    //
    const movies = await getTrendingMovies();

    setTrendingMovies(movies);

  }catch(error){
    console.error(`Error fetching trending movies: ${error}`);
  }
}




//-- end loadTrendingMovies ------






// [] -> run only once when this component loads
  // useEffect(()=>{
  //   fetchMovies(searchTerm);
  // }, [])

// run when searchTerm changes
  // useEffect(()=>{
  //   fetchMovies(searchTerm);
  // }, [searchTerm]) //dependency -> searchTerm

  useEffect( ()=>{
      fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])


  useEffect( () =>{
    loadTrendingMovies();
  }, [trendingMovies])

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

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map( (movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>

                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          {/* <h2 className="mt-4">All Movies</h2> */}
          <h2>All Movies</h2>



          {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}

          {/* {isLoading ? (<p className="text-white">Loading...</p> */}

          {isLoading ? (
            <Spinner />

          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>

            {/* (movie)=>{return } */}

              {movieList.map((movie) => (
                // <p key={movie.id} className='text-white'>{movie.title}</p>
                <MovieCard key={movie.id} movie={movie} />

              ))}
            
            </ul>
          )}

        </section>

      </div>

    </main>

  )
}

export default App