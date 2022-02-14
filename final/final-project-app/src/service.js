const TMDB_API_KEY = 'cafd6cd4719d144ceca562aaa9ae0f0a';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie';
const SEARCH_BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const TRANSLATION_BASE_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const TRANSLATION_API_KEY = "trnsl.1.1.20211212T030529Z.c87dad5e0d5e167b.89ee37b405a5ceb522dd38e49c21248d16d3693b"

function fetchTopRatedFilmInfo(page) {
    return fetch(`${TMDB_BASE_URL}/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`)
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  function fetchFilmByName(name,page){
    return fetch(`${SEARCH_BASE_URL}?api_key=${TMDB_API_KEY}&query=${name}&page=${page}`, 
    {method: 'GET'})
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
       return response.json();
      }
      return response.json()
      .catch( error => {Promise.reject({ error }) 
      console.log(error)})
      .then( err => Promise.reject(err) );
    });
  }
  function fetchSingleFilmInfo(filmId) {
    return fetch(`${TMDB_BASE_URL}/${filmId}?api_key=${TMDB_API_KEY}`, 
    {method: 'GET'})
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
       return response.json();
      }
      return response.json()
      .catch( error => {Promise.reject({ error }) 
      console.log(error)})
      .then( err => Promise.reject(err) );
    });
  }
  function fetchTranslation(language, comment) {
    return fetch(`${TRANSLATION_BASE_URL}?key=${TRANSLATION_API_KEY}&text=${comment}&lang=${language}`, 
    {method: 'GET'})
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
       return response.json();
      }
      return response.json()
      .catch( error => {Promise.reject({ error }) 
      console.log(error)})
      .then( err => Promise.reject(err) );
    });
  }
  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  function fetchCommentedFilmList() {
    return fetch('/api/commentedFilms')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  function fetchAddCommentedFilm(film) {
    return fetch('/api/commentedFilms', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( { film } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }
  const service = {
    fetchTopRatedFilmInfo,
    fetchSingleFilmInfo,
    fetchFilmByName,
    fetchTranslation,
    fetchSession,
    fetchLogin,
    fetchLogout,
    fetchAddCommentedFilm,
    fetchCommentedFilmList
};
  module.exports = service;