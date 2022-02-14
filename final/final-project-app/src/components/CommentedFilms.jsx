import React from 'react'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
function CommentedFilms(props) {
    
    const films = props.films;
    return (
        <div className = 'CommentedFilmsContainer'>
            
           {Object.keys(films).map(id => 
           <>
           
             <div className = 'film' key = {films[id].id} name = {films[id].original_title} 
             onClick = {() => props.getFilmInfo(films[id].id) }>
                   <img  src={IMAGE_BASE_URL + films[id].poster_path}
                       alt= {films[id].id}
                       key = {films[id].id}
                       width="190" 
                       
                       ></img>
                <span id ={films[id].id} className = "DisplayFilmName">{films[id].original_title}</span>
               </div>
               
             
           </>
               )}        
        </div>
    )
}

export default CommentedFilms
