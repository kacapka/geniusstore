import React, {Component} from 'react';
import './addCode.scss';
import Datetime from 'react-datetime';
import '../../../../common/datetime.scss';
import moment from 'moment';
import SelectInput from "../../../../common/selectInput/selectInput";
import SwitchInput from "../../../../common/switchInput/switchInput";
import {Meteor} from 'meteor/meteor';

const SELECT_DATA = [
    {name: 'PLN'},
    {name: '%'}
];

class AddCode extends Component {

    constructor(props) {
        super(props);
        this.now = moment();
        this.state = {
            name: '',
            type: 'PLN',
            value: 0,
            singleUse: false,
            exp: moment(),

            nameErr: false,
            valueErr: false,
            expErr: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSwitchHandle = this.onSwitchHandle.bind(this);
    }

    onInputChange(e) {
        const {name, value} = e.target;
        const val = name === 'value' ? Number(value) : value;
        this.setState({[name]: val, [`${name}Err`]: false});
    }

    onDateChange(date) {
        this.setState({exp: date, expErr: false});
    }

    onSelectType(opt) {
        this.setState({type: opt.name});
    }

    onSwitchHandle(bool) {
        this.setState({singleUse: bool});
    }

    validateCode() {
        const {name, type, value, exp} = this.state;
        let isValid = true;
        if(name.length < 3) {
            this.setState({nameErr: true});
            isValid = false;
        }
        if((type === '%' && value > 99) || value < 1) {
            this.setState({valueErr: true});
            isValid = false;
        }
        if(!moment.isMoment(exp) || exp.isBefore(this.now)) {
            this.setState({expErr: true});
            isValid = false;
        }

        return isValid
    }

    onSubmitBtnClick() {
        if(this.validateCode()) {
            const state = this.state;
            const code = {
                name: state.name.toUpperCase(),
                type: state.type,
                value: state.value,
                singleUse: state.singleUse,
                exp: state.exp.toDate(),
                uses: []
            };

            Meteor.call('insertPromoCode', code, err => {
               if(!err) {
                   console.log('promo code added');
                   this.props.closeModal();
               } else {
                   if(err.error === 'codeNameExists') {
                       alert('kod o tej nazwie juz instieje');
                   } else {
                       alert(err.error);
                   }
               }
            });
        }
    }


    onCancelBtnClick() {
        this.props.closeModal();
    }

    render() {
        return (
            <div className='code-modal-wrap'>
                <div className='modal-title'>Dodaj kod promocyjny</div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Nazwa</div>
                    <input className='modal-input'
                           value={this.state.name}
                           type='text'
                           name='name'
                           onChange={this.onInputChange}
                    />
                    <p>{this.state.nameErr && 'zbyt krotka nazwa'}</p>
                </div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Typ</div>
                    <SelectInput selectedValue={this.state.type}
                                 options={SELECT_DATA}
                                 selectValue={this.onSelectType}
                    />
                </div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Wartosc</div>
                    <input className='modal-input'
                           value={this.state.value}
                           type='number'
                           name='value'
                           onChange={this.onInputChange}
                    />
                    <p>{this.state.valueErr && 'niepoprawna wartosc'}</p>
                </div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Jednorazowy</div>
                    <SwitchInput isActive={this.state.singleUse}
                                 selectValue={this.onSwitchHandle}
                    />
                </div>
                <div className='modal-input-wrap'>
                    <div className='input-label'>Data waznosci</div>
                    <Datetime onChange={this.onDateChange}
                              defaultValue={this.state.exp}
                              locale="pl"
                              timeFormat='HH:mm'
                    />
                    <p>{this.state.expErr && 'niepoprawna data'}</p>
                </div>
                <div className='modal-buttons-wrap'>
                    <div className='modal-btn-submit'
                         onClick={this.onSubmitBtnClick}
                    >
                        zapisz
                    </div>
                    <div className='modal-btn-cancel'
                         onClick={this.onCancelBtnClick}
                    >
                        cofnij
                    </div>
                </div>
            </div>
        )
    }

}

export default AddCode;