import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './page/Home'
import About from './page/About'

function App() {
  return (
    <BrowserRouter>
      <nav className='flex gap-[30px] h-[50px] items-center max-w-[920px] m-auto bg-amber-50' >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App