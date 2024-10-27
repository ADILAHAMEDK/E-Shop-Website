import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signin from './pages/Signin'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddProducts from './components/AddProducts'

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={ <Signin/>} />
      <Route path='/login' element={ <Login/>} />
      <Route path='/add' element={ <AddProducts />} />
    </Routes>
    <ToastContainer />
    </BrowserRouter>
   
    </>
  )
}

export default App
