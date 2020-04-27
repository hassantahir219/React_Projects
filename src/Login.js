import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import {
  Form, FormControl, Button, Nav, Navbar, Image
} from 'react-bootstrap';
import app from "./firebase/index";
import { AuthContext } from "./Auth.js";
import Navbarpage from './components/navbar'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value).then(function (user) {
            if (user) {
              app.auth().onAuthStateChanged(function (user) {
                if (user.emailVerified) {
                  //console.log('verifed');
                  history.push("/home");
                }
                else {
                  // No user is signed in.
                  app.auth().signOut();
                  alert("Please verify email");
                  history.push("/");

                }
              });
            }
          });

      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <div>

      <Navbarpage />
      <div style={{
            paddingTop: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

}}>
      <h1 style={{fontSize: '35px', fontWeight: 'bold'}}>Please enter your credential </h1> <br></br>
      <Form inline onSubmit={handleLogin} >
      <FormControl style={{fontSize: '28px'}} name="email"  type="email" placeholder="Email" className="mr-sm-2" />
      <FormControl style={{fontSize: '28px'}} name="password"  type="password" placeholder="Password" className="mr-sm-2" />
      <Button style={{fontSize: '28px'}} type="submit" variant="outline-info">Login</Button>
    </Form>
      </div>
    </div>
  );
};

export default withRouter(Login);