import React, {Component} from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configStore from '../redux/store';
const store = configStore();
import NavBar from './navBar/navBar';
import Footer from "./footer/footer";

class App extends Component {

    render() {
        return (
            <Provider store={store.store} >
                <PersistGate loading={null} persistor={store.persistor}>
                    <div id='app'>
                        <NavBar />
                        <div id='appContent'>
                            {this.props.content}
                        </div>
                        <Footer/>
                    </div>
                </PersistGate>
            </Provider>
        );
    }

}

export default App;