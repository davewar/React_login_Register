
import { Link } from 'react-router-dom';
import React, {useContext, } from 'react'
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import {AppContext} from './context'

const Navbar = ({auth}) => {

     const { stopAuth, setToken } = useContext(AppContext); 
     const history = useHistory()
    // 
     const closeLogin = ()=>{
    
           stopAuth() // turn off auth
           setToken("") // reset 
           Cookies.remove("dw-token")

          
           //redirect
            history.push('/home');
        }


    return (

        <div className="container">

            <div className="row">

                <div className="col-12">

                            <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-light" >
                                    <h1 className="text-uppercase text-spacing" >Welcome</h1>
                                                                    
                                        <ul className="navbar-nav" >
                                        
                                            <li className="nav-item active"><Link className="nav-link" to='/Home'>Home</Link></li>
                                        {!auth ? <li className="nav-item"><Link className="nav-link" to='/login'>Log in</Link></li> : null} 
                                            {!auth ? <li className="nav-item"><Link className="nav-link" to='/register'>Register</Link></li>: null} 
                                            

                                            <li className="nav-item"><Link className="nav-link"  to='/dashboard'>Dashboard</Link></li>
                                            {auth ? <li className="nav-item"><Link className="nav-link" onClick={closeLogin} to='/'>Logout</Link></li>: null }
                                                
                                    

                                    </ul>

                            </nav>
                    </div>
            </div>
        </div>
    )
}

export default Navbar
