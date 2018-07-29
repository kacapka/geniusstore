import React, {Component} from 'react';
import './footerForm.scss';

class FooterForm extends Component {

    constructor(props) {
        super(props);
        this.state ={
            name: '',
            email: '',
            text: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div id='footerForm'>
                <div id='footerFormLeft'>
                    <div className='footer-input-wrapper'>
                        <label className='footer-label'>imie</label>
                        <input className='footer-input'
                               name='name'
                               placeholder='janek kowalski'
                               value={this.state.name}
                               type='text'
                               onChange={this.onInputChange}
                        />
                    </div>
                    <div className='footer-input-wrapper'>
                        <label className='footer-label'>email</label>
                        <input className='footer-input'
                               name='email'
                               placeholder='jestemjanek@gmail.com'
                               value={this.state.email}
                               type='email'
                               onChange={this.onInputChange}
                        />
                    </div>
                </div>
                <div id='footerFormRight'>
                    <div className='footer-input-wrapper'>
                        <label className='footer-label'>wiadomosc</label>
                        <textarea className='footer-input footer-textarea'
                               name='text'
                                placeholder='napisz do nas'
                               value={this.state.text}
                               onChange={this.onInputChange}
                        />
                    </div>
                    <div id='footerFormSubmit'>
                        <div id='footerBtnSubmit'>
                            wyslij
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default FooterForm;