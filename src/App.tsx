import Home from './Pages.tsx/Home';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages.tsx/About';
import Cart from './Pages.tsx/Cart';
import Collection from './Pages.tsx/Collection';
import Contact from './Pages.tsx/Contact';
import Login from './Pages.tsx/Login';
import Orders from './Pages.tsx/Orders';
import Navbar from './Components/Navbar';
import Mainphoto from './Components/Mainphoto';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] xl:px-[8vw] 2xl:px-[9vw]'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
