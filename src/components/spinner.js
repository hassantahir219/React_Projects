import Loader from 'react-loader-spinner'
import React, { useState } from 'react';
  
const Spinnerpage =() => {
  //other logic
    
     return(
      <Loader
         type="Oval"
         color="grey"
         height={200}
         width={200}

      />
     );
 }


 export default Spinnerpage;