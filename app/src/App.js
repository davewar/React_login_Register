import React,{useEffect, useContext, Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Error from './components/Home'
import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import 'bootstrap/dist/css/bootstrap.css'
import Cookies from 'js-cookie';


import {AppContext} from './components/context'

const App = () => {

const { auth,setToken,grantAuth } = useContext(AppContext);  

  // user manually refesher browser after login
   useEffect(() => {

          const logUser = Cookies.get("dw-token");
          // console.log(logUser);
          if (logUser ) {
          
            setToken(logUser);
            grantAuth()
          }
   }, [auth]);

  return (
           <div className="container app">
       
          <Router> 
          
              <Navbar auth={auth}  /> 
             <Switch>
               
                  
                  <Route path="/Home">
                        <Home/>
                  </Route>

                  <Route path="/Register">
                              {!auth ?  <Register />:  <Redirect to="/dashboard" /> }
                       
                  </Route>
                  
                   <Route path="/login">
                        {/* <Login/> */}
                     {!auth ? <Login/>:  <Redirect to="/dashboard" /> }
                  
                     
                  </Route>



                 
                  
                  
                   <Route path="/dashboard">
               
                     {auth ? <Dashboard/> : 
                        <Redirect to="/login"/>}
                  
                     
                  </Route>
                   
                                  
                  <Route path='*'>
                         <Error />
                </Route>

          
              </Switch>

      </Router>
      </div>
      )






    

}

export default App;
