import React, {Component} from 'react';
import './mainPage.scss';
//import bgImage from '/public/main_bg.jpg';

class MainPage extends Component {

    render() {
        return (
            <div id='mainPage'>
                <div id='mainHero' style={{backgroundImage: "url('/main_bg.jpg')"}}>
                    
                </div>
            </div>
        );
    }

}

export default MainPage;