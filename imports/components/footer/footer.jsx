import React, {Component} from 'react';
import './footer.scss';
import FooterForm from "./footerForm/footerForm";

class Footer extends Component {

    render() {
        return (
            <div id='footer'>
                <div id='footerLinks'>
                    <ul id='footerRoutes'>
                        <li>platnosci</li>
                        <li>dostawa</li>
                        <li>zwroty</li>
                        <li>regulamin</li>
                    </ul>
                    <div id='footerInsta'>
                        <ion-icon name="logo-instagram" id='instaIcon' />
                        <div id='instaName'>#geniusstore</div>
                    </div>
                </div>
                <FooterForm />
                <div id='footerCopyrights'>
                    <div id='copyrightsStore'>all rights reserved | geniusstore 2018</div>
                    <div id='copyrightsDev'>created by <a href='https://kacapka.github.io/portfolio/' target='_blank'>kacapka</a></div>
                </div>
            </div>
        );
    }
}

export default Footer;