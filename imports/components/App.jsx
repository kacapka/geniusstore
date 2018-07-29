import React, {Component, Fragment} from 'react';
import './App.scss';
import MainPage from './mainPage/mainPage';
import NavBar from './navBar/navBar';
import Footer from "./footer/footer";

class App extends Component {

    render() {
        return (
            <div id='app'>
                <NavBar />
                <div id='appContent'>
                    {this.props.content}    
                </div>
                <Footer/>
            </div>
        );
    }

}

export default App;