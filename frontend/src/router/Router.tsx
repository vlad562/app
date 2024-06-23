import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainScreen from '../components/mainScreen/MainScreen'
import Register from '../components/register/Register'
import Login from '../components/login/Login'
import AddPost from '../components/addPost/AddPost'
import FullPost from '../components/fullPost/FullPost'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<MainScreen />} />
      <Route path='/article/one/:id' element={<FullPost />} />
      <Route path='/article/one/:id/add-post' element={<AddPost />} />
      <Route path='/add-post' element={<AddPost />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<MainScreen/>} />
    </Routes>
  )
}

export default Router
