
import React from 'react'
import { useState } from 'react';

function FilmDetail(props) {
    const [language, setLanguage] = useState("en");
    const [originalComment, setoriginalComment] = useState('');
    const film = props.film;
    if(!film.myComment){film.myComment = [];}
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const Rating = `Average Rating: ${film.vote_average} \n Voted By ${film.vote_count} User(s)`;
    let Genre = 'Genre: ';
    // eslint-disable-next-line array-callback-return
    film.genres.map((genre)=>{
        Genre += `${genre.name}, `;
    })
    Genre = Genre.slice(0,-2); 
    return (
        <div className="DetailPage">
            <div className = 'FilmContainer'>
                <div className="FilmImage">
                    <img src={IMAGE_BASE_URL + film.poster_path}
                        className ='InfoPoster'
                        alt= {film.id}
                        key = {film.id}
                        width="200" 
                        ></img>
                </div>
                <div className = 'FilmDescription'> 
                    <span className="Original_Title">{film.original_title}</span>
                    <span className="Release_Date">{film.release_date}</span> 
                    <span className = 'Genre'>{Genre}</span>                  
                    <span className="Vote_Average">{Rating}</span>
                    <span className="FilmHomepageUrl">Film Homepage: {film.homepage===''? 'N/A': film.homepage }</span>
                    <span className="FilmOverview">{film.overview}</span>                   
                </div>
                
            </div>
                <div className = "CommentContent">
                {film.myComment.map((comment) =>
                    <>
                    <div>
                    <span className = "CommentContent" >{comment[0]}</span>
                    <span className = "CommentUserTime" >By {comment[1]}     {comment[2]}</span>
                    </div>
                    </>
                )}
                </div>
            <select className = 'LanguageDropDownMenu' 
            onChange = {(e) => {setLanguage(e.target.value)}} >
                
                <option className = "Option" value="en" >English</option>
                <option className = "Option" value="zh" >Chinese</option>
                <option className = "Option" value="fr" >French</option>
                <option className = "Option" value="ja" >Japanese</option>
                <option className = "Option" value="la" >Latin</option>
                <option className = "Option" value="ar" >Arabic</option>
                <option className = "Option" value="es" >Spanish</option>
                <option className = "Option" value="ko" >Korean</option>
                <option className = "Option" value="el" >Greek</option>
                <option className = "Option" value="uk" >Ukranian</option>
                <option className = "Option" value="th" >Thai</option>
                <option className = "Option" value="cs" >Czech</option>
                <option className = "Option" value="is" >Icelandic</option>
                <option className = "Option" value="ga" >Irish</option>
                <option className = "Option" value="vi" >Vietnamese</option>   
            </select>
            
            <div className="CommentDiv">
                <input type="text" 
                value = {originalComment}
                className = "CommentInput"
                onInput={ (e) => {
                    setoriginalComment(e.target.value);                
                }}
                placeholder = {language? `Comment with language code: ${language}`:`Comment here`}
                />  
                <button 
                onClick = {() =>{
                    
                    
                    props.convertComment(language,originalComment);
                    setoriginalComment("");   
                }}>comment</button>        
            </div>
            <div><button className = "GoBackBtn" onClick = {() => props.goBack(false)}>back</button></div>
            <span className = 'YandexCredit' >Powered by <a className = "Link" href = "https://translate.yandex.com/">Yandex.Translate</a></span>
        </div>
    )
}

export default FilmDetail
