import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner' 

import axiosWithAuth from '../axios/index';

import axios from 'axios';

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
        navigate('/');
}
  const redirectToArticles = () => { /* ✨ implement */ 
        navigate('/articles');

}

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    if(localStorage.getItem('token')) {    
        localStorage.removeItem('token');
    // and a message saying "Goodbye!" should be set in its proper state.
        setMessage('Goodbye');
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    }
       redirectToLogin();

  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    setMessage('');
    setSpinnerOn(true);
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!

     axios.post(loginUrl, {username: username, password: password})
            .then(res => {
                  console.log(res)
                  localStorage.setItem('token', res.data)
                  setMessage(res.data.message)
                  redirectToArticles()
                              
          })   
            .catch (err => { 
              console.log(err, err.response)
              setMessage(err.message)
          })
            .finally(() => {
              setSpinnerOn(false)
            })

  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
          setMessage('');
          setSpinnerOn(true);
    // and launch an authenticated request to the proper endpoint.

    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
      axiosWithAuth().get(articlesUrl)
            .then(res => {
                  console.log(`article res`, res)
                  setArticles(res.data.articles)
                  setMessage(res.data.message)

      })     // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner! 
            .catch (err => {
                  console.log(err, err.response)
                  redirectToLogin();
                  })
            .finally(() => {
                    setSpinnerOn(false)
                  })
  
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.

    setSpinnerOn(true)
    setMessage('')
    axiosWithAuth().post(articlesUrl, article)
      .then(res => {
        setArticles(articles => articles.concat(res.data.article)
        )
        setMessage(res.data.message)
      })
      .catch(err => {
        console.log(err)  
      })
      .finally(() =>
        setSpinnerOn(false)
      )
  }




  const updateArticle = ({ article_id, article }) => {
    //for the edit/update button in the article elemenent
    // ✨ implement
    // You got this
    axiosWithAuth().put(articlesUrl+ '/' + article_id, article)
    .then(res => {
      console.log(res)
      setArticles(articles.map(art => article_id != art.article_id ?  art : article ))
      setMessage(res.data.message)
    })
    .catch(err => console.log(err))
  }

  const deleteArticle = article_id => {
    //for the delete button inside the article element
    // ✨ implement
    setSpinnerOn(true)
    setMessage('')
    axiosWithAuth().delete(`http://localhost:9000/api/articles/${article_id}`)
    .then(res => {
      console.log(res)
    setArticles(articles.filter(art => article_id != art.article_id))
    setMessage(res.data.message)
    })
    .catch(err => {
      console.log(err)
      setMessage(err.message)
    })
    .finally(() => setSpinnerOn(false))
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn} />
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} logout={logout}/>} />
          <Route path="articles" element={
            <>
              <ArticleForm 
              articles={articles}
              getArticles={getArticles}
              postArticle={postArticle} 
              updateArticle={updateArticle} 
              setCurrentArticleId={setCurrentArticleId} 
              currentArticleId={currentArticleId}
              
              />
              <Articles 
              articles={articles}
              currentArticleId={currentArticleId}
              getArticles={getArticles} 
              deleteArticle={deleteArticle} 
              setCurrentArticleId={setCurrentArticleId} 
              redirectToLogin={redirectToLogin}
               />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2024</footer>
      </div>
    </>
  )
}
