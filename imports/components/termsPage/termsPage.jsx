import React, {Component} from 'react';
import './termsPage.scss';
import termsData from './termsData';

const TERMS_ICONS = [
    {name: 'cash'},
    {name: 'cube'},
    {name: 'hand'},
    {name: 'clipboard'},
];

class TermsPage extends Component {

    renderIcons() {
        return TERMS_ICONS.map(icon => {
            return (
                <div key={icon.name} className='icon-wrap'>
                    <ion-icon name={icon.name}>

                    </ion-icon>
                </div>
            )
        })
    }

    renderDesc() {
        return termsData.map(item => {
            return (
                <div className='term-wrap' key={item.title} id={item.name}>
                    <div className='term-title'>{item.title}</div>
                    <div className='term-desc'>{item.desc}</div>
                </div>
            )
        })
    }

    render() {
        return (
            <div id='termsPage'>
                <div className='terms-desc'>
                    {this.renderDesc()}
                </div>
                <div className='terms-nav'>
                    {this.renderIcons()}
                </div>
            </div>
        );
    }

}

export default TermsPage;