import React, { useState } from 'react';
import {
  Form, FormControl, Button, Nav, Navbar, Image
} from 'react-bootstrap';

const Navbarpage = (props) => {


  return (
    <div>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand style={{ 'fontSize': '32px' }} href="/">FashionBook</Navbar.Brand>
        <Nav className="mr-auto">

          <Nav.Link style={{ 'fontSize': '32px' }} href="/login">Login</Nav.Link>
          <Nav.Link style={{ 'fontSize': '32px' }} href="/home">Home</Nav.Link>
          <Nav.Link style={{ 'fontSize': '32px' }} href="/addrecord">Add Post</Nav.Link>
          

        </Nav>
      </Navbar>

    </div>
  );
}

export default Navbarpage;