
// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function makeFilmList() {
  // These are hardcoded initial state when we restart the server
  

  const filmList = {};
  let films = {};

  filmList.contains = function contains(id) {
    
    return !!films[id];
  };

  filmList.getFilms = function getFilms() {
    return films;
  };

  filmList.addFilm = function addFilm(film) {
    
    const id = film.id;
    if(films[id]){
      delete films[id];
    }
    films[id] = film;
    
    return id;
  };

  filmList.getFilm = function getFilm(id) {
    return films[id];
  };

 return filmList;
};

module.exports = {
  makeFilmList,
};
