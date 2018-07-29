import React, {Component} from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import configStore from '../redux/store';
const store = configStore();
import NavBar from './navBar/navBar';
import Footer from "./footer/footer";

class App extends Component {

    render() {
        return (
            <Provider store={store} >
                <div id='app'>
                    <NavBar />
                    <div id='appContent'>
                        {this.props.content}
                    </div>
                    <Footer/>
                </div>
            </Provider>
        );
    }

}

export default App;