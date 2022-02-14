import React from 'react'
import { useState } from 'react';

function SearchFilm(props) {
    const [inputValue, setinputValue] = useState("");
    return (
        <div className="SearchDiv">
          <input className = 'InputFilmName' 
          placeholder = 'Search For Your Favorite Movie!'
          value = {inputValue}
          onInput={ (e) => setinputValue(e.target.value) }
          />
          <button className = 'SeacrhButton'
           onClick ={() => {
               props.updateStatus(true);
               props.updateInput(inputValue);
               setinputValue("");
               }}>Search</button>
        </div> 
    )
}

export default SearchFilm
