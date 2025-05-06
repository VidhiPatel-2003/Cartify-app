import Home from './Pages.tsx/Home';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages.tsx/About';
import Collection from './Pages.tsx/Collection';
import Contact from './Pages.tsx/Contact';
import Login from './Pages.tsx/Login';
import Orders from './Pages.tsx/Orders';
import Navbar from './Components/Navbar';
import Mainphoto from './Components/Mainphoto';
import Footer from './Components/Footer';
import Search from './Components/Search';
import Signup from './Pages.tsx/Signup';
import Product from './Pages.tsx/Product';
import Myprofile from './Pages.tsx/Myprofile';
import Addcart from './Pages.tsx/Addcart';
import { ToastContainer } from 'react-toastify';
import Placeorder from './Pages.tsx/Placeorder';
import ReusableCart from './Pages.tsx/ReusableCart';
import Whishlist from './Pages.tsx/Whishlist';

function App() {
  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[6vw] lg:px-[7vw] xl:px-[8vw] 2xl:px-[9vw]'>
        <ToastContainer />
        <Navbar />
        <Search />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/placeorder' element={<Placeorder />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/product/:productid' element={<Product />} />
          <Route path='/myProfile' element={<Myprofile />} />
          <Route path='/addcart' element={<ReusableCart />} />
          <Route path='/wishlist' element={<Whishlist/>}/>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
