import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import Register from './pages/Registration'
import Description from './pages/Description'
import Details from './pages/Details'
import ChatLayout from './pages/ChatLayout'
import Contact from './pages/Contact'
import { Toaster } from 'react-hot-toast'
import Match from './pages/Match'
import Interest from './pages/Interests'
import Footer from './components/Footer'
import Topusers from './pages/Topusers'
import { UserDetails } from './pages/UserDetails'
import MpesaPayment from './pages/MpesaPayment'
import Login from './components/Login'
import { useState } from 'react'
const App = () => {
  
  const [showLogin, setShowLogin] = useState(false)


  return (
    <div>
      <Navbar setShowLogin={setShowLogin}/>
           {showLogin && <Login onClose={() => setShowLogin(false)} />}


      <div className='px-6 md:px-16 lg:px-24 xl:px-24'>
           <Toaster/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/description' element={<Description/>}/>
          <Route path='/details' element={<Details/>}/>
          <Route path='/chatlayout' element={<ChatLayout/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/match' element={<Match/>}/>
          <Route path='/interest' element={<Interest/>}/>
          <Route path="/" element={<Topusers />} />
         <Route path="/user/:id" element={<UserDetails />} />
         <Route path='/mpesa' element={<MpesaPayment/>}/>
        </Routes>
        <Footer/>
      
      </div>
    </div>
  )
}

export default App
