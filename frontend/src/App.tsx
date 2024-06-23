import React from 'react';
import Header from './components/header/Header';
import Router from './router/Router';
import { useAppDispatch } from './hooks/redux';
import { fetchAuthMe } from './redux/store/reducers/isAuthSlice';
import AddPost from './components/addPost/AddPost';

function App() {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  },[])
  return (
    <div>
      <Header/>
      <Router/>
    </div>
  );
}

export default App;
