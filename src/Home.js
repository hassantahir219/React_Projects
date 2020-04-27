import React, { useCallback, useContext, Component } from "react";
import app from "./firebase/index";
import { Redirect } from "react-router";
import { AuthContext } from "./Auth.js";
import Table from 'react-bootstrap/Table';
import Navbarpage from './components/navbar'
import {
  Form, FormControl, Button, Nav, Navbar, Image
} from 'react-bootstrap';


class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      databoard: [],
      checklogin: 0,
      userid: '',
    }
    this.handlesignout = this.handlesignout.bind(this);
    this.handleaddrecord = this.handleaddrecord.bind(this);
  }


  handlesignout() {
    app.auth().signOut();
  }

  handleaddrecord() {
    let path = `/addrecord`;
    this.props.history.push(path);
  }

  componentDidMount() {
    var that = this;
    app.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('This is the user: ', user.uid)
        that.setState({ userid: user.uid });
        console.log('save in userid var: ', that.state.userid);
        that.setState({ checklogin: '1' });
        return that.checkrecord();

      } else {
        console.log('No user: ');
        that.setState({ checklogin: '1' });
        return that.checkloginmethod();
      }
    });
  }

  checkrecord() {
    var that = this;
    if (that.state.checklogin) {
      app.database()
        .ref('/user_photos/' + that.state.userid).orderByKey().on('value', (snapshot) => {
          console.log(snapshot.val());
          let board = snapshot.val();
          let newboard = [];
          for (let boards in board) {
            newboard.push({
              id: boards,
              caption: board[boards].caption,
              img: board[boards].image_path,
              tags: board[boards].tags,
              date_created: board[boards].date_created,


            });
          }


          // console.log('board data', databoard);
          that.setState({ databoard: newboard });
          // console.log('setState', that.state.databoard);
        });
    }
  }

  checkloginmethod() {
    if (this.state.checklogin) {
      let path = `/login`;
      this.props.history.push(path);
    }
  }

  render() {

    const { databoard } = this.state;

    return (
   
      <div>
        <Navbarpage />
        <div style={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'right',
            justifyContent: 'right'}}>
        <Button style={{fontSize: '20px'}} onClick={this.handlesignout}>Sign out</Button>
        <br></br>
        </div>

        <Table striped bordered hover style={{fontSize: '16px'}}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Caption</th>
              <th>Tag</th>
              <th>Date Created</th>

            </tr>
          </thead>
          <tbody>
            {
              databoard.map((data, i) => (
                <tr key={i} >
                  <td>{i}</td>
                  <td ><img src={data.img} height='150px' width='200px' /></td>
                  <td >{data.caption}</td>
                  <td >{data.tags}</td>
                  <td >{data.date_created}</td>
                </tr>

              ))}
          </tbody>
        </Table>
      </div>
      
    );
  }
}

export default Home;