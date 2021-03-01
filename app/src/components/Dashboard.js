import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";


const getHeader = () => {

   const token = Cookies.get("dw-token");
        const logUser = token ? token : ""
        return logUser

}



const Dashboard = () => {

      const [id, setId] = useState("")
      const history = useHistory() 


    const userPage= async ()=>{
        
        const logUser = getHeader()

        try {
      const res = await fetch('http://localhost:5000/protected', { 
                 headers: {"Content-type": "application/json; charset=UTF-8",
                        'x-auth-token': logUser},
       
      });
     
      const data = await res.json();
      // console.log(data.message);
      setId(data.message)
      
   
    }
    catch (err) {
      console.log(err.message);
    }

    }

   

    return (
        <div className="container mt-5">

                <div className="row">

                     <button className="btn btn-primary" onClick={userPage}>Press</button>
                    <h1>user-id: {id} </h1>

              </div>
        </div>
    )
}

export default Dashboard
