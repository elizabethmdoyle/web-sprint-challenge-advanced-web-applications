import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner' 

import axiosWithAuth from '../axios/index';

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { /* ✨ implement */ 
        navigate('/login');
}
  const redirectToArticles = () => { /* ✨ implement */ 
        navigate('/articles');

}

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
     //axios.get(``)
    //     .then(res {
      //          console.log(res)
   // })   .catch (err => { console.log(err, err.response)})
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!

    setMessage('');
    setSpinnerOn(true);
     axiosWithAuth.post(`/login`, {username, password})
        .then(res => {
               console.log(res)
      })   
        .catch (err => { 
          console.log(err, err.response)
      })


   setSpinnerOn(false);
  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
     //axios.get(``)
    //     .then(res {
      //          console.log(res)
   // })   .catch (err => { console.log(err, err.response)})
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    //axios.post(``)
    //     .then(res {
      //          console.log(res)
   // })   .catch (err => { console.log(err, err.response)})
  }

  const updateArticle = ({ article_id, article }) => {
    // ✨ implement
    // You got this!
     //axios.put(``)
    //     .then(res {
      //          console.log(res)
   // })   .catch (err => { console.log(err, err.response)})
  }

  const deleteArticle = article_id => {
    // ✨ implement
     //axios.delete(``)
    //     .then(res {
      //          console.log(res)
   // })   .catch (err => { console.log(err, err.response)})
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner setSpinnerOn={setSpinnerOn} />
      <Message setMessage={setMessage}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm setArticles={setArticles} setCurrentArticleId={setCurrentArticleId} />
              <Articles articles={articles}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2024</footer>
      </div>
    </>
  )
}
