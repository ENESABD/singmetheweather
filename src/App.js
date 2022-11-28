import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home/Home';
import About from './pages/About';
import Logo from './Logo';
import Footer from './Footer';
import './App.css';



function App() {
  
  const [photoUrl, setPhotoUrl] = useState("");
  const [hasWelcomed, setWelcomed] = useState(false);
  const [bgClass, setBgClass] = useState('background')


  useEffect(() => {
    if (photoUrl !== '' && photoUrl !== null) {
      if (hasWelcomed) {
        setBgClass('background blur adjust-overflow');
      }
      else {
        setBgClass('background blur adjust-overflow-for-welcome')
      }
    }
    else {
      if (hasWelcomed) {
        setBgClass('background adjust-overflow');
      }
      else {
        setBgClass('background adjust-overflow-for-welcome')
      }
    }
  }, [hasWelcomed, photoUrl])
  
  
  return (
      <main className="app">

        <div
          className = {bgClass}

          style={photoUrl !== '' && photoUrl !== null ? {
            backgroundImage: `url(${photoUrl})`        
          } : null}
        
        ></div>

        <header className="header">
          <Logo />
          <Navbar />
        </header>
        

        <Routes>
          <Route path="/" element={<Home setPhotoUrl={setPhotoUrl} hasWelcomed={hasWelcomed} setWelcomed={setWelcomed}/>}/>
          <Route path="/about" element={<About/>} />
        </Routes>

        <Footer />

      </main>   

  );
}

export default App;
