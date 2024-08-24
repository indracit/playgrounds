import {  Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/home/home';
import LoginPage from './components/login/Login'
import SignupPage from './components/signup/signup';
import Redux from './components/redux/redux';
function App() {

  return (
    <>
    <Routes>
        <Route path="/" element={<Redux/>} />
        <Route path="/login" element={<LoginPage/>} />
         <Route path="home" element={<HomePage/>} />
         <Route path ="signup" element={<SignupPage />} />
          <Route path="*" element={<h1>page not found bro 😈</h1>}/>
    </Routes>
    </>
  )
}

export default App
