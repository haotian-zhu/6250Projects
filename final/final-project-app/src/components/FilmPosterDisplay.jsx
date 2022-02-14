import React from 'react'
// const API_KEY = 'cafd6cd4719d144ceca562aaa9ae0f0a';
// const BASE_URL = 'https://api.themoviedb.org/3/movie';
//onClick = {props.getFilmInfo(film.id)}
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
function FilmPosterDisplay(props) {
    return (
        <div className = 'TopRatedFilmContainer'>
            
           {props.films.map((film) => 
           <>
           
             <div className = 'film' key = {film.id} name = {film.original_title} 
             onClick = {() => props.getFilmInfo(film.id) }>
                   <img  src={IMAGE_BASE_URL + film.poster_path}
                       alt= {film.id}
                       key = {film.id}
                       width="190" 
                       
                       ></img>
                <span id ={film.id} className = "DisplayFilmName">{film.original_title}</span>
               </div>
               
             
           </>
               )}
        </div>
    )
}

export default FilmPosterDisplay
