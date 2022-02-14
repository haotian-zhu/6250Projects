import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import FilmPosterDisplay from './components/FilmPosterDisplay';
import FilmDetail from './components/FilmDetail';
import SearchFilm from './components/SearchFilm';
import LoginPage from './components/LoginPage';
import LogOut from './components/LogOut';
import CommentedFilms from './components/CommentedFilms';

const {
  fetchTopRatedFilmInfo, 
  fetchSingleFilmInfo,
  fetchFilmByName,
  fetchTranslation,
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchCommentedFilmList,
  fetchAddCommentedFilm
} = require('./service');

function App() {
  const CurrentTime = new Date().toLocaleString();
  const [page, setPage] = useState(1);
  const [done, setDone] = useState(false);
  const [searchPage, setSearchPage] = useState(1);
  const [filmName,setFilmName] = useState('');
  const [userName,setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fetchedFilms, setFetchedFilms] = useState({results:[]});
  const [onInfoPage, setonInfoPage] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [convertedComment, setConvertedComment] = useState('');
  const [commentedFilms, setCommentedFilms] = useState({});
  const [film,setFilm] = useState({
    original_title: '', 
    posterpath: '', 
    overview: '', 
    release_date: '',
    vote_average: '',
    vote_count: '',
    homepage: '',
    genres: '',
    myComment: []
})

  const REMINDER = '<- scroll to see more ->';
  useEffect(() => {
    fetchSession()
      .then(
        fetchCommentedFilmList()
    .then(results =>{
      setCommentedFilms(results);
    }))
    .catch(e => {
      //FIXME
      console.log(e);
      }) 
    
  }, [convertedComment,isLoggedIn,film])

  useEffect(()=>{
    fetchTopRatedFilmInfo(page)
  .then(films =>
    { if(films){
      console.log("Top Rated Films collected");   
    }else{
      console.log('No films');     
      }
      setSearchPage(1);
      setFetchedFilms(films);
      setOnSearch(false);
   
  })    
}, [page,isLoggedIn]) 

useEffect(()=>{
  fetchFilmByName(filmName, searchPage)
.then(films =>
  { if(films){
    console.log("Seachrd Results collected");   
  }else{
    console.log('No films');     
    }
    setOnSearch(true);
    setPage(1);
    setFetchedFilms(films);
  
})    
}, [filmName,searchPage]) 


 return (
    <div className="Final-Project-App">
      <h1>Multilingual Film Review App</h1>
      {!isLoggedIn && <LoginPage
          updateLoginStatus = {(status) => setIsLoggedIn(status)}
          updateUserName = {(username) =>{
            setUserName(username);
            fetchLogin(username)
                .catch(e => {
                  //FIXME
                  console.log(e);
                })
          }}
      />}
      {(!onInfoPage && isLoggedIn)&& <div className="HomePage">
        <SearchFilm
        updateInput = {filmName =>{
          setFilmName(filmName);
          setSearchPage(1);
          setPage(1);
          fetchFilmByName(filmName,searchPage)
          .then(films =>
            { if(films){
              console.log("Top Rated Films collected");   
            }else{
              console.log('No films');     
              }
              setFetchedFilms(films);
          })
        }}
        updateStatus = {status => setOnSearch(status)}
        />     
      <h3>{onSearch? "Search Results" : "Top Rated Films"}</h3>
      <div className = 'imageList'>
        <FilmPosterDisplay  
        films = {fetchedFilms.results}
        getFilmInfo = { id =>{
          fetchSingleFilmInfo(id)
          .then(film => {
            setFilm(film);
            setonInfoPage(true);
            
          })
        }}/>
        </div>  
        <span className = 'scrollReminder' >{REMINDER}</span>
        <div className="ControlPage">
          <button className="PrevPageBtn"
          disabled = {page===1&&searchPage===1?true:false}
          onClick = {()=>{
            if(onSearch){  setSearchPage(searchPage-1);
            }else{  setPage(page-1);
            }
          }}
          >Prev</button>
          <button className="NextPageBtn"
          onClick = {()=>{
            if(onSearch){ setSearchPage(searchPage+1);
            }else{setPage(page+1);
            }  
          }}
          >Next</button>
        </div>
        <h3 className = "CommentHeader">
          {Object.keys(commentedFilms).length ===0 ?
           `${userName}, You Have No Recently Commented Films`:`${userName}'s Recently Commented Film` }
          </h3>
        <div className = 'CommentedList'>
          <CommentedFilms  
        films = {commentedFilms}
        getFilmInfo = { id =>{
          setFilm(commentedFilms[id]);
          setonInfoPage(true);
        }}/>
        </div>
        
        <div className="LogOut">
        <LogOut changeStatus = {status => {
              setIsLoggedIn(status);
              setUserName('');
              fetchLogout()
              .catch(e => {
                //FIXME
                console.log(e);
              })
              }}/>
        </div>
        
        </div>}
        {onInfoPage && <FilmDetail 
        film = {film}
        userName = {userName}
        convertComment = {(language,comment)=>{         
          fetchTranslation(language,comment)
          .then(converted =>{
            const tmp_film = {...film};
            if(!tmp_film.myComment){
            tmp_film.myComment = [];
            tmp_film.myComment.push([converted.text[0],userName,CurrentTime]);
          }else{
            tmp_film.myComment.push([converted.text[0],userName,CurrentTime]);
          }
            setConvertedComment(converted.text[0]);
            return tmp_film;
            
          })
          .then( tmp_film => {fetchAddCommentedFilm(tmp_film)
            .then( tmp_film => {   
              console.log('added film id', tmp_film.id);
              setCommentedFilms({ ...commentedFilms, tmp_film });
              setFilm(tmp_film);
              setDone(true);
        })
        .catch(e => {
          //FIXME
          console.log(e);
        })}
          
          )
          
        }}
        Done = {done}
        goBack = {value => setonInfoPage(value)}
        />}
        <span className = 'Credit' >Powered by <a className = "Link" href = "https://www.themoviedb.org/">The Movie Database (TMDB)</a></span>
    </div>
  );
}

export default App;
