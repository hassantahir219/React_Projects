import React, { useCallback, useContext, Component } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./firebase/index";
import firebase from "./firebase/index";
import { ZonedDate } from '@progress/kendo-date-math';
import '@progress/kendo-date-math/tz/Canada/Pacific';
import Navbarpage from './components/navbar';
import {
    Form, FormControl, Button, Nav, Navbar, Image
} from 'react-bootstrap';
import { AuthContext } from "./Auth.js";
import Spinnerpage from "./components/spinner";
import moment from "moment-timezone";
// import {BrowserRouter, Link, Route} from 'react-router-dom';

class Addrecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checklogin: 0,
            userid: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            image5: '',
            description1: '',
            description2: '',
            description3: '',
            description4: '',
            description5: '',

            imageurl1: '',
            currentdate: '',
            tag1: '',

            imageurl2: '',
            currentdate2: '',
            tag2: '',

            imageurl3: '',
            currentdate3: '',
            tag3: '',

            imageurl4: '',
            currentdate4: '',
            tag4: '',

            imageurl5: '',
            currentdate5: '',
            tag5: '',

            loading: true,

        }
        this.handleimage1 = this.handleimage1.bind(this);
        this.handledescription1 = this.handledescription1.bind(this);

        this.handleimage2 = this.handleimage2.bind(this);
        this.handledescription2 = this.handledescription2.bind(this);

        this.handleimage3 = this.handleimage3.bind(this);
        this.handledescription3 = this.handledescription3.bind(this);

        this.handleimage4 = this.handleimage4.bind(this);
        this.handledescription4 = this.handledescription4.bind(this);

        this.handleimage5 = this.handleimage5.bind(this);
        this.handledescription5 = this.handledescription5.bind(this);

        this.handleupload = this.handleupload.bind(this);

    }

    handleimage1 = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image1: image });
        }
    }

    handleimage2 = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image2: image });
        }
    }

    handleimage3 = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image3: image });
        }
    }

    handleimage4 = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image4: image });
        }
    }

    handleimage5 = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image5: image });
        }
    }

    handledescription1 = e => {
        this.setState({ description1: e.target.value });
    }

    handledescription2 = e => {
        this.setState({ description2: e.target.value });
    }

    handledescription3 = e => {
        this.setState({ description3: e.target.value });
    }

    handledescription4 = e => {
        this.setState({ description4: e.target.value });
    }

    handledescription5 = e => {
        this.setState({ description5: e.target.value });
    }

    componentDidMount() {

        var that = this;
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('This is the user: ', user.uid)
                var userid = user.uid;
                that.setState({ userid: userid });
                console.log('save in userid var: ', userid);
            }
            else {
                console.log('No user: ');
                that.setState({ checklogin: '1' });
                return that.checkloginmethod();
            }
        });

    }

    checkloginmethod() {
        if (this.state.checklogin) {
            let path = `/login`;
            this.props.history.push(path);
        }
    }

    async handleupload() {

        this.setState({ loading: false });

        if (this.state.image1 == '') {
            alert('Atleast one images is required');

            await this.setState({ loading: true });
        }
        else {

            const { image1 } = this.state;
            const { userid } = this.state;

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds

            await this.setState({
                currentdate:
                    year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
            });

            console.log('time', this.state.currentdate);
            var timechange = moment(this.state.currentdate);
            var newt = timechange.tz('Canada/Pacific').format('YYYY-MM-DDTHH:mm:ss');
            var ty = newt + 'Z';
            console.log("new time", ty);

            await this.setState({
                currentdate: ty
            })
            console.log(this.state.currentdate);

            var i;
            var description1 = this.state.description1;
            console.log('description in var:', description1);

            var ar1 = description1.split(' ');
            console.log('description in char:', ar1);

            var tag = '';

            for (i = 0; i < ar1.length; i++) {
                if (ar1[i].startsWith('#')) {

                    tag += ar1[i] + ',';
                }
                else {
                    console.log('not found');
                }
            }
            if (tag == '') {
                await this.setState({ tag1: this.state.description1 });
            }
            else {
                await this.setState({ tag1: tag });
            }

            console.log('concat data of tag: ', this.state.tag1);


            const storage = firebase.storage();
            const uploadtask = storage.ref('photos/users/' + userid + '/' + image1.name).put(image1);


            uploadtask.on('state_changed',
                (snapshot) => {
                    //progress function
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    //error function
                    console.log(error);
                }, () => {
                    //complete function
                    const { image1 } = this.state;
                    storage.ref('photos/users/' + userid + '/').child(image1.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ imageurl1: url });
                    });
                    setTimeout(() => {
                        this.insertdata1();
                    }, 8000);
                }
            );


            const { image2 } = this.state;

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds

            await this.setState({
                currentdate2:
                    year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
            });

            console.log('time', this.state.currentdate2);
            var timechange = moment(this.state.currentdate2);
            var newt = timechange.tz('Canada/Pacific').format('YYYY-MM-DDTHH:mm:ss');
            var ty = newt + 'Z';
            console.log("new time", ty);

            await this.setState({
                currentdate2: ty
            })
            console.log(this.state.currentdate2);

            var i;
            var description2 = this.state.description2;
            console.log('description2 in var:', description2);

            var ar2 = description2.split(' ');
            console.log('description in char:', ar2);

            var tag2 = '';

            for (i = 0; i < ar2.length; i++) {
                if (ar2[i].startsWith('#')) {

                    tag2 += ar2[i] + ',';
                }
                else {
                    console.log('not found');
                }
            }
            if (tag2 == '') {
                await this.setState({ tag2: this.state.description2 });
            }
            else {
                await this.setState({ tag2: tag2 });
            }

            console.log('concat data of tag2: ', this.state.tag2);

            const uploadtask2 = storage.ref('photos/users/' + userid + '/' + image2.name).put(image2);


            uploadtask2.on('state_changed',
                (snapshot) => {
                    //progress function
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    //error function
                    console.log(error);
                }, () => {
                    //complete function
                    const { image2 } = this.state;
                    storage.ref('photos/users/' + userid + '/').child(image2.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ imageurl2: url });
                    });
                    setTimeout(() => {
                        this.insertdata2();
                    }, 8000);
                }
            );

            const { image3 } = this.state;

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds

            await this.setState({
                currentdate3:
                    year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
            });

            console.log('time', this.state.currentdate3);
            var timechange = moment(this.state.currentdate3);
            var newt = timechange.tz('Canada/Pacific').format('YYYY-MM-DDTHH:mm:ss');
            var ty = newt + 'Z';
            console.log("new time", ty);

            await this.setState({
                currentdate3: ty
            })
            console.log(this.state.currentdate3);

            var i;
            var description3 = this.state.description3;
            console.log('description3 in var:', description3);

            var ar3 = description3.split(' ');
            console.log('description in char:', ar3);

            var tag3 = '';

            for (i = 0; i < ar3.length; i++) {
                if (ar3[i].startsWith('#')) {

                    tag3 += ar3[i] + ',';
                }
                else {
                    console.log('not found');
                }
            }
            if (tag3 == '') {
                await this.setState({ tag3: this.state.description3 });
            }
            else {
                await this.setState({ tag3: tag3 });
            }

            console.log('concat data of tag3: ', this.state.tag3);

            const uploadtask3 = storage.ref('photos/users/' + userid + '/' + image3.name).put(image3);


            uploadtask3.on('state_changed',
                (snapshot) => {
                    //progress function
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    //error function
                    console.log(error);
                }, () => {
                    //complete function
                    const { image3 } = this.state;
                    storage.ref('photos/users/' + userid + '/').child(image3.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ imageurl3: url });
                    });
                    setTimeout(() => {
                        this.insertdata3();
                    }, 8000);
                }
            );


            const { image4 } = this.state;

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds

            await this.setState({
                currentdate4:
                    year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
            });

            console.log('time', this.state.currentdate4);
            var timechange = moment(this.state.currentdate4);
            var newt = timechange.tz('Canada/Pacific').format('YYYY-MM-DDTHH:mm:ss');
            var ty = newt + 'Z';
            console.log("new time", ty);

            await this.setState({
                currentdate4: ty
            })
            console.log(this.state.currentdate4);

            var i;
            var description4 = this.state.description4;
            console.log('description4 in var:', description4);

            var ar4 = description4.split(' ');
            console.log('description in char:', ar4);

            var tag4 = '';

            for (i = 0; i < ar4.length; i++) {
                if (ar4[i].startsWith('#')) {

                    tag4 += ar4[i] + ',';
                }
                else {
                    console.log('not found');
                }
            }
            if (tag4 == '') {
                await this.setState({ tag4: this.state.description4 });
            }
            else {
                await this.setState({ tag4: tag4 });
            }

            console.log('concat data of tag4: ', this.state.tag4);

            

            const uploadtask4 = storage.ref('photos/users/' + userid + '/' + image4.name).put(image4);


            uploadtask4.on('state_changed',
                (snapshot) => {
                    //progress function
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    //error function
                    console.log(error);
                }, () => {
                    //complete function
                    const { image4 } = this.state;
                    storage.ref('photos/users/' + userid + '/').child(image4.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ imageurl4: url });
                    });
                    setTimeout(() => {
                        this.insertdata4();
                    }, 8000);
                }
            );


            const { image5 } = this.state;

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds

            await this.setState({
                currentdate5:
                    year + '-' + month + '-' + date + ' ' + hours + ':' + min + ':' + sec,
            });

            console.log('time', this.state.currentdate5);
            var timechange = moment(this.state.currentdate5);
            var newt = timechange.tz('Canada/Pacific').format('YYYY-MM-DDTHH:mm:ss');
            var ty = newt + 'Z';
            console.log("new time", ty);

            await this.setState({
                currentdate5: ty
            })
            console.log(this.state.currentdate5);

            var i;
            var description5 = this.state.description5;
            console.log('description4 in var:', description5);

            var ar5 = description5.split(' ');
            console.log('description in char:', ar5);

            var tag5 = '';

            for (i = 0; i < ar5.length; i++) {
                if (ar5[i].startsWith('#')) {

                    tag5 += ar5[i] + ',';
                }
                else {
                    console.log('not found');
                }
            }
            if (tag5 == '') {
                await this.setState({ tag5: this.state.description5 });
            }
            else {
                await this.setState({ tag5: tag5 });
            }

            console.log('concat data of tag5: ', this.state.tag5);

            

            const uploadtask5 = storage.ref('photos/users/' + userid + '/' + image5.name).put(image5);


            uploadtask5.on('state_changed',
                (snapshot) => {
                    //progress function
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                },
                (error) => {
                    //error function
                    console.log(error);
                }, () => {
                    //complete function
                    const { image5 } = this.state;
                    storage.ref('photos/users/' + userid + '/').child(image5.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ imageurl5: url });
                    });
                    setTimeout(() => {
                        this.insertdata5();
                    }, 8000);
                }
            );

        }
    }

    insertdata1() {

        const db = firebase.database();

        const postKey = db.ref().child('photos').push().key;
        console.log('key: ', postKey);

        db.ref('user_photos/' + this.state.userid + '/' + postKey + '/').set({
            caption: this.state.description1,
            date_created: this.state.currentdate,
            image_path: this.state.imageurl1,
            photo_id: postKey,
            tags: this.state.tag1,
            user_id: this.state.userid,
        });


        db.ref('photos/' + postKey + '/').set({
            caption: this.state.description1,
            date_created: this.state.currentdate,
            image_path: this.state.imageurl1,
            photo_id: postKey,
            tags: this.state.tag1,
            user_id: this.state.userid,
        });

        if (this.state.image2 == ''); {

            this.setState({ loading: true });

            let path = `/home`;
            this.props.history.push(path);
        }
    }


    insertdata2() {

        const db = firebase.database();

        const postKey = db.ref().child('photos').push().key;
        console.log('key: ', postKey);

        db.ref('user_photos/' + this.state.userid + '/' + postKey + '/').set({
            caption: this.state.description2,
            date_created: this.state.currentdate2,
            image_path: this.state.imageurl2,
            photo_id: postKey,
            tags: this.state.tag2,
            user_id: this.state.userid,
        });


        db.ref('photos/' + postKey + '/').set({
            caption: this.state.description2,
            date_created: this.state.currentdate2,
            image_path: this.state.imageurl2,
            photo_id: postKey,
            tags: this.state.tag2,
            user_id: this.state.userid,
        });

        if (this.state.image3 == ''); {

            this.setState({ loading: true });

            let path = `/home`;
            this.props.history.push(path);
        }
    }

    insertdata3() {

        const db = firebase.database();

        const postKey = db.ref().child('photos').push().key;
        console.log('key: ', postKey);

        db.ref('user_photos/' + this.state.userid + '/' + postKey + '/').set({
            caption: this.state.description3,
            date_created: this.state.currentdate3,
            image_path: this.state.imageurl3,
            photo_id: postKey,
            tags: this.state.tag3,
            user_id: this.state.userid,
        });


        db.ref('photos/' + postKey + '/').set({
            caption: this.state.description3,
            date_created: this.state.currentdate3,
            image_path: this.state.imageurl3,
            photo_id: postKey,
            tags: this.state.tag3,
            user_id: this.state.userid,
        });

        if (this.state.image4 == ''); {

            this.setState({ loading: true });

            let path = `/home`;
            this.props.history.push(path);
        }
    }


    insertdata4() {

        const db = firebase.database();

        const postKey = db.ref().child('photos').push().key;
        console.log('key: ', postKey);

        db.ref('user_photos/' + this.state.userid + '/' + postKey + '/').set({
            caption: this.state.description4,
            date_created: this.state.currentdate4,
            image_path: this.state.imageurl4,
            photo_id: postKey,
            tags: this.state.tag4,
            user_id: this.state.userid,
        });


        db.ref('photos/' + postKey + '/').set({
            caption: this.state.description4,
            date_created: this.state.currentdate4,
            image_path: this.state.imageurl4,
            photo_id: postKey,
            tags: this.state.tag4,
            user_id: this.state.userid,
        });

        if (this.state.image5 == ''); {

            this.setState({ loading: true });

            let path = `/home`;
            this.props.history.push(path);
        }
    }

    insertdata5() {

        const db = firebase.database();

        const postKey = db.ref().child('photos').push().key;
        console.log('key: ', postKey);

        db.ref('user_photos/' + this.state.userid + '/' + postKey + '/').set({
            caption: this.state.description5,
            date_created: this.state.currentdate5,
            image_path: this.state.imageurl5,
            photo_id: postKey,
            tags: this.state.tag5,
            user_id: this.state.userid,
        });


        db.ref('photos/' + postKey + '/').set({
            caption: this.state.description5,
            date_created: this.state.currentdate5,
            image_path: this.state.imageurl5,
            photo_id: postKey,
            tags: this.state.tag5,
            user_id: this.state.userid,
        });
            this.setState({ loading: true });
            let path = `/home`;
            this.props.history.push(path);   
    }


    handlesignout() {
        app.auth().signOut();
    }

    renderbutton() {
        if (this.state.loading) {
            return (
                <input style={{ fontSize: '20px' }} type="submit" value="Submit" onClick={this.handleupload} />
            )
        }
    }

    render() {

        if (this.state.loading) {

            return (

                <div>
                    <Navbarpage />

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'right',
                        justifyContent: 'right'
                    }}>
                        <Button style={{ fontSize: '20px' }} onClick={this.handlesignout}>Sign out</Button>
                        <br></br>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} >
                        <h1 style={{ fontSize: '35px', fontWeight: 'bold' }}>Please enter your posts</h1> <br></br><br></br>

                        <div>

                            <label style={{ fontSize: '20px' }}>
                                Description 1:
                                <input type="text" placeholder="Enter description" onChange={this.handledescription1} required />
                            </label>
                            <label style={{ fontSize: '20px' }}>
                                <input type="file" onChange={this.handleimage1} required />
                            </label>
                            {/* {this.renderbutton()} */}
                        </div>

                        <div>

                            <label style={{ fontSize: '20px' }}>
                                Description 2:
                                <input type="text" placeholder="Enter description" onChange={this.handledescription2} required />
                            </label>
                            <label style={{ fontSize: '20px' }}>

                                <input type="file" onChange={this.handleimage2} required />
                            </label>

                        </div>

                        <div>

                            <label style={{ fontSize: '20px' }}>
                                Description 3:
                                <input type="text" placeholder="Enter description" onChange={this.handledescription3} required />
                            </label>
                            <label style={{ fontSize: '20px' }}>

                                <input type="file" onChange={this.handleimage3} required />
                            </label>

                        </div>

                        <div>

                            <label style={{ fontSize: '20px' }}>
                                Description 4:
                                <input type="text" placeholder="Enter description" onChange={this.handledescription4} required />
                            </label>
                            <label style={{ fontSize: '20px' }}>

                                <input type="file" onChange={this.handleimage4} required />
                            </label>

                        </div>

                        <div>

                            <label style={{ fontSize: '20px' }}>
                                Description 5:
                                <input type="text" placeholder="Enter description" onChange={this.handledescription5} required />
                            </label>
                            <label style={{ fontSize: '20px' }}>

                                <input type="file" onChange={this.handleimage5} required />
                            </label>

                        </div>

                        <div>
                            <br></br>
                            {this.renderbutton()}

                        </div>

                    </div>

                </div>
            )
        }

        else {

            return (
                <div>
                    <Navbarpage />
                    <div style={{
                        display: 'flex',
                        paddingTop: '150px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }} >
                        <Spinnerpage />

                    </div>
                </div>
            );
        }
    }
}

export default Addrecord;