import React from "react";
import app from "./firebase/index";
import Navbarpage from './components/navbar'


const Home = () => {
  return (
   
     <div>
       <Navbarpage />
       <div style={{ display: 'flex',
                    paddingTop: '50px',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', }}>
        <img src='bg.png' fluid />
      </div>
     </div>
  
  )
};

export default Home;