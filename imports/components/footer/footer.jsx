import React, {Component} from 'react';
import './footer.scss';
import FooterForm from "./footerForm/footerForm";
import {FlowRouter} from 'meteor/kadira:flow-router';

const TABS = [
    {name: 'płatności', tab: 'payments'},
    {name: 'dostawa', tab: 'delivery'},
    {name: 'zwroty', tab: 'returns'},
    {name: 'regulamin', tab: 'regulations'}
]

class Footer extends Component {

    onTermsTabClick(tab) {
        window.scrollTo(0,0);
        FlowRouter.go(`/terms/${tab}`);
    }

    renderTabs() {
        return TABS.map(item => {
            return (
                <li key={item.name}
                    onClick={() => this.onTermsTabClick(item.tab)}
                >
                    {item.name}
                </li>
            )
        })
    }

    render() {
        return (
            <div id='footer'>
                <div id='footerLinks'>
                    <ul id='footerRoutes'>
                        {this.renderTabs()}
                    </ul>
                    <div id='footerInsta'>
                        <a href='https://www.instagram.com/genius__fitness/' target='_blank'>
                            <ion-icon name="logo-instagram" id='instaIcon' />
                            <div id='instaName'>#madeingenius</div>
                        </a>
                    </div>
                </div>
                <FooterForm />
                <div id='footerCopyrights'>
                    <div id='copyrightsStore'>all rights reserved | madeingenius 2018</div>
                    <div id='copyrightsDev'>created by <a href='https://kacapka.github.io/portfolio/' target='_blank'>kacapka</a></div>
                </div>
            </div>
        );
    }
}

export default Footer;