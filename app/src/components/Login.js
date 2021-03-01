import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

import {AppContext} from './context'




const Login = () => {

    const { setInfo ,setToken,grantAuth } = useContext(AppContext);    //global

      const [state, setState] = useState({ signInErr: ''})
  
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailErr, setemailErr] = useState('');
  const [passwordErr, setpasswordErr] = useState('');
  let history = useHistory(); //to use redirect

  const handleChange = (e, name) => {
    const user = {};
    const emailRegEx = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    user[name] = e.target.value;
    // validations
    switch (name) {
      case 'email':
        setemail(user.email);
        !emailRegEx.test(user.email) ? setemailErr('Invalid Email!') : setemailErr('');
        break;
      case 'password':
        setpassword(user.password);
        user.password.length < 6 ? setpasswordErr('Password must be at least 6 characters!') : setpasswordErr('');
        break;
      default:
        break;
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (email && password && !emailErr && !passwordErr) {

            //clear
          setemailErr("")
          setpasswordErr("")
          setState({signInErr: ""})
      

        
    try {
      const res = await fetch('http://localhost:5000/login', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
        headers: {'Content-Type': 'application/json'},
       
      });
      const data = await res.json();
      console.log(data);

      if (data.errors) {
        console.log("HERE");

            setemailErr(data.errors.email)
            setpasswordErr(data.errors.password)

            setState({signInErr: "Issue with Sign in"})

            //wrong password
            Cookies.remove('dw-token');
            setToken("")
            // grantAuth(false)
            
       
      } else
      if (data.user) {
          console.log("HERE1");
           let in5Minute = new Date(new Date().getTime() + 5 * 60 * 1000);
         Cookies.set('dw-token', data.token, {expires: in5Minute} );

                        
                 setToken(data.token)
                 grantAuth(true)
                 setInfo(data.user.name)
                  
            history.push('/dashboard');
               
      }

    }
    catch (err) {
      console.log(err);
    }















    }
  }

  return (
   
    <div className="container ">

        <div className="row mt-5  justify-content-center align-items-center  " >

          <div className="col-xs-12  sign-in" >

                    <h2 className="text-start mt-3">Sign In</h2>
                    {state.signInErr && <div className="alert alert-danger text-center">
                      <span className="text-danger text-capitalize">{state.signInErr}</span>
                    </div>}

                    <form className="mt-4 " onSubmit={handleSignIn}>
                      <div className="form-group">
                            <label className="mr-3" htmlFor="email">Enter Email Address</label>
                            <input
                              type="email"
                              name="email"
                              className={ emailErr ? "form-control-lg is-invalid":
                                    !emailErr && email.length ? "form-control is-valid":"form-control"
                                }
                          
                              id="email"
                              placeholder="Email Address"
                              onChange={(e) => handleChange(e, 'email')}
                            />
                            {emailErr && <small className="text-danger">{emailErr}</small>}
                      </div>

                      <div className="form-group">
                            <label className="" htmlFor="password">Enter Password</label>
                            <input
                              type="password"
                              name="password"
                              className={ passwordErr ? "form-control is-invalid":
                                    !passwordErr && password.length ? "form-control is-valid":"form-control"
                                }
                            
                              id="password"
                              placeholder="Password"
                              onChange={(e) => handleChange(e, 'password')}
                            />
                            {passwordErr && <small className="text-danger">{passwordErr}</small>}
                      </div>
                      <input type="submit" className="btn btn-primary" value="Sign In" />
                    </form>
                    <p className="float-left mt-2">    
                          Don't yet have an account?<Link to='/signup'>Sign up</Link>
                    </p>

                </div>    

        </div>
  
    </div>
  )
}

export default Login
