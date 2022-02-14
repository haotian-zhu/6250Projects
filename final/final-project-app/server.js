const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;



const sessions = require('./sessions');
const users = require('./users');
const CommentedFilmsList = require('./CommentedFilmsList')
app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if(!username) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if(username.toUpperCase() === 'VUE'||username.toUpperCase() === 'ANGULAR') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);
  if(!existingUserData) {
    users.setUserData(username, CommentedFilmsList.makeFilmList());
    
  }
  
  res.cookie('sid', sid);
  res.json(users.getUserData(username).getFilms());
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

// Commented Films
app.get('/api/commentedFilms', (req, res) => {
  
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getUserData(username).getFilms());
});

app.post('/api/commentedFilms', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { film } = req.body;
  if(!film) {
    res.status(400).json({ error: 'required-film' });
    return;
  }
  const filmList = users.getUserData(username);
  const id = filmList.addFilm(film);
  res.json(filmList.getFilm(id));
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
