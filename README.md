# 6250Projects
# Final Project: Multilingual Film Review App

## Overview
* This is a application that:
    * Have information about a comprehnesove collection of films, from oldest to newest
    * Display the top rated films by default
    * Allow the users to search for films by name
    * Give the user the ability to translate their comment in a variety of languages of their choice
    * Stores the user's previously commented film and comments;
    

## How to Start:
* run run with `npm install`, `npm run start`, and  `npm run dev`
* Enter a `username` to login. Remember the `username` cannot be vue or angular, nor can it be null

## Details
* The first section of the homepage after the user log in will be the serach section. You can enter the name of the film you are searching for and press search.
* The second section of the homepage will be the film display. By default it will show the top rated films, But after the user seaches, it will display the search results. The film display will show 20 films on each page, and you can go to previous/next page by pressing the prev/next button. 
* The third section will be the user's recently commented film, including his or her comments. The user can also add new comments there. 
* Afer the user clicks on the film's poster, the detail of the clicked film will be displayed on a visually separated page. The user can have a look a the general informtion of the film, and he/she can also comment on the film in multiple languages, including but not limited to: English, Chinese, French, Japanese, and more.
* The user will have his/her comments stored in the server, and he/she can review the comments under the recently commented film section

## dependent APIs of This Project
* TMDB (The Movie Data Base) https://www.themoviedb.org/
* Yandex.Translate  https://translate.yandex.com/

## Final Words
* Thank you Professor Ritter for all the helps and support through out the semester!
* Thank you Yating for all your advices on Github as well as slack, they helped me a lot!
* My code may looks quite messy, Because I was planning on putting a lot of codes in separate components, and utilize `useReducer` and `useContext` to make my code looks neater and more logical, but it turns out that I don't have enough time to do so... I will work on it after the submission. But don't worry, the functionality of the app is intact. 
* Happy Holiday!!!!!!


