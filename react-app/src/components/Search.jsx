import React from 'react'


// const Search = (props) => {
//props are readonly
//-> should not change in child component
// even you could do this.
//  searchTerm='something else'
// even more -> never mutate state

//destrictre
const Search = ({searchTerm, setSearchTerm}) => {
  return (
    // <div className="text-white text-3xl">{props.searchTerm}</div>
    // <div className="text-white text-3xl">{searchTerm}</div>
    <div className="search">
      <img src="search.svg" alt="search" />
      <input
        type="text"
        placeholder="Search through thousands of movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        // onChange={(event) => setSearchTerm(event.target.value)}
      />

      
    </div>
  )
}

export default Search