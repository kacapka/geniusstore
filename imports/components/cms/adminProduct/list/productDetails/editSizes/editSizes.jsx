import React, {Component} from 'react';

const SIZES = ['unisex', 'S', 'M', 'L', 'XL'];

class EditSizes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unisex: props.sizes.find(size => size.name === 'unisex') || {
                name: 'unisex',
                value: 0,
                active: true
            },
            S: props.sizes.find(size => size.name === 'S') || {
                name: 'S',
                value: 0,
                active: true
            },
            M: props.sizes.find(size => size.name === 'M') || {
                name: 'M',
                value: 0,
                active: true
            },
            L: props.sizes.find(size => size.name === 'L') || {
                name: 'L',
                value: 0,
                active: true
            },
            XL: props.sizes.find(size => size.name === 'XL') || {
                name: 'XL',
                value: 0,
                active: true
            }
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitBtnClick = this.onSubmitBtnClick.bind(this);
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
    }

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: {...this.state[name], value: Number(value)}});
    }

    onSizeClick(size) {
        this.setState({[size]: {...this.state[size], active: !this.state[size].active}});
    }

    onSubmitBtnClick() {
        const productId = this.props.productId;
        const {unisex, S, M, L, XL} = this.state;
        const sizes = [unisex, S, M, L, XL];
        Meteor.call('editProductSizes', productId, sizes, err => {
            if(!err) {
                this.props.closeModal();
            } else {
                window.alert(err.error);
            }
        });
    }

    onCancelBtnClick() {
        this.props.closeModal();
    }

    render() {
        console.log(this.state);
        return (
            <div className='edit-modal-wrap'>
                <div className='modal-title'>edytuj rozmiary</div>
                <div className='modal-input-wrap'>
                    {SIZES.map(size => {
                        const labelClassName = this.state[size].active ? 'size-label active' : 'size-label';
                        return (
                            <div className='size-wrap' key={size}>
                                <div className={labelClassName}
                                     onClick={() => this.onSizeClick(size)}
                                >
                                    {size}
                                </div>
                                {this.state[size].active &&
                                    <input className='edit-input size-input'
                                           value={this.state[size].value}
                                           type='number'
                                           name={size}
                                           onChange={this.onInputChange}
                                    />
                                }
                            </div>
                        );
                    })}
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

export default EditSizes;