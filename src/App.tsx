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
import { toast, ToastContainer } from 'react-toastify';
import Placeorder from './Pages.tsx/Placeorder';
import ReusableCart from './Pages.tsx/ReusableCart';
import Whishlist from './Pages.tsx/Whishlist';
import { useEffect } from 'react';
import { getToken, Messaging, onMessage } from 'firebase/messaging';
import { messaging } from './Firebase/firebase';
import Rate from './Pages.tsx/Rate';


function App() {
  const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log("firstPermission", permission);

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BEwnmk48dqFMX2MOz3ICzVeSxdGCqCG3vLXesV2GbnmL3I5q3AHau7BKXqc1VEoq1Zvrxg6or4bLVrS18g9l4FE",
      })
      console.log("token", token);

    }

    onMessage(messaging, (payload) => {

      console.log("firstMessage", payload);
      {
        payload.notification && (
          toast(<Message
            title={payload.notification.title || "no title"}
            body={payload.notification.body || "no body"}
            image={payload.notification.image}
          />)
        )
      }


    })
  };

  useEffect(() => {
    generateToken();
  })


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
          <Route path='/wishlist' element={<Whishlist />} />
          <Route path='/rate' element={<Rate />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;


const Message = ({ title, body, image }: { title: string; body: string; image?: string }) => {
  return (
    <>
      <div className='w-[1000px] flex flex-row items-center gap-2'>
        <div >
          {image && (
            <div className='w-[100px]  border-r-4'>
              <img src={image} width={100} className='border-r-2' />
            </div>
          )}

        </div>
        <div className='flex flex-col justify-start m-2'><span className='text-lg font-semibold' >{title}</span>
          <div >{body}</div></div>
      </div>
    </>
  );
};

export { Message };

