import React, {Component} from 'react';
import './navBar.scss';

const ROUTES = ['kobiety', 'mezsczyni', 'nowosci', 'promocje'];

class NavBar extends Component {
    
    render() {
        return(
            <div id='navBar'>
                <div id='navCart'>
                    <div id='cartWrapper'>
                        <img src='/cart.png' alt='shoping cart' id='cart' />
                    </div>
                </div>
                <div id='navLogo'>
                    <div id='logoWrapper'>
                        <img src='/logo.png' alt='genius logo' id='logo-img' />
                    </div>
                </div>
                <div id='navRoutes'>
                    <ul id='nav'>
                        <li>kobiety</li>
                        <li>mezczyxni</li>
                        <li>nowosci</li>
                        <li>promocje</li>
                    </ul>
                </div>
            </div>
        );
    }
    
} 

export default NavBar;