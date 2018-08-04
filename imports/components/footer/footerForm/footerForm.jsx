import React, {Component} from 'react';
import './footerForm.scss';
import emailValidation from '../../../functions/emailValidation';

class FooterForm extends Component {

    constructor(props) {
        super(props);
        this.state ={
            name: '',
            email: '',
            text: '',
            nameError: '',
            emailError: '',
            textError: ''
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSendEmailClick = this.onSendEmailClick.bind(this);
    }

    onInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
            [`${e.target.name}Error`]: ''
        });
    }

    validateForm() {
        let validEmail = true;
        let validName = true;
        let validText = true;
        const {name, email, text} = this.state;
        if(name.length < 2) {
            this.setState({nameError: 'błedne imię'});
            validName = false;
        }
        if(text.length < 10) {
            this.setState({nameText: 'zbyt krótka wiadomość'});
            validText = false;
        }
        if(!emailValidation(email)) {
            this.setState({emailError: 'błędny adres email'});
            validEmail = false;
        }

        return validEmail && validName && validText;
    }

    resetInputs() {
        this.setState({
            name: '',
            email: '',
            text: '',
            nameError: '',
            emailError: '',
            textError: ''
        });
    }

    onSendEmailClick() {
        if(this.validateForm()) {
            this.resetInputs();
            console.log('send email');
        }
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
                        {this.state.nameError && <p className='input-error'>{this.state.nameError}</p>}
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
                        <div id='footerBtnSubmit' onClick={this.onSendEmailClick}>
                            wyslij
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default FooterForm;