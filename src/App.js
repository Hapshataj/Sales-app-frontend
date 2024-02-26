import './App.css';
import NarBar from './Components/NarBar';
import Add from './Pages/Add';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top5sales from './Pages/Top5sales';
import Login from './Pages/Login';
import Todaytotalrevenue from './Pages/Todaytotalrevenue';
import Register from './Pages/Register';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  function DynamicRouting() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        dispatch({ type: "LOGIN_SUCCESS", payload: userData });
        navigate("/addsale");
      }
      else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({ type: "LOGIN_ERROR" });
        navigate("/login");
      }
    }, [])
    return (
      <Routes>
        <Route exact path='/' element={<Add />}> </Route>
        <Route exact path='/addsale' element={< Add />}> </Route>
        <Route exact path='/top5sale' element={<Top5sales />}></Route>
        <Route exact path='/todaytotal' element={<Todaytotalrevenue />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/logout' element={<Login />}></Route>
      </Routes>
    )
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NarBar />
        <DynamicRouting />
      </BrowserRouter>
    </div>
  );
}

export default App;
