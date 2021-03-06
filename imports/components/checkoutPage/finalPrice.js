// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {setInputError, setInputValue} from "../../redux/actions";
// import {selectDeliveryType, setPromoCode} from "../../redux/actions/checkout";
//
// class FinalPrice extends Component  {
//
//     componentDidMount() {
//         this.calcFinalPrice();
//     }
//
//     componentWillReceiveProps(nextProps) {
//         this.calcFinalPrice();
//     }
//
//     calcFinalPrice() {
//         const props = this.props;
//         console.log(props);
//         let totalPrice = 0;
//         for(let cartItem of props.cart ) {
//             if(cartItem.product.sales.isActive) {
//                 totalPrice += cartItem.product.sales.salePrice * cartItem.amount;
//             } else {
//                 totalPrice += cartItem.product.price * cartItem.amount;
//             }
//         }
//         const promoCode = props.promoCode;
//         if(promoCode) {
//             if(promoCode.type === 'PLN') {
//                 totalPrice -= promoCode.value;
//             } else if(promoCode.type === '%') {
//                 totalPrice = totalPrice - (totalPrice * promoCode.value / 100);
//             }
//         }
//         if(totalPrice < 0) {
//             totalPrice = 0;
//         }
//
//         this.setState({price: Math.round((totalPrice + props.delivery) * 100) / 100});
//     };
//
//     getFinalPrice() {
//         return this.state.price;
//     }
//
//     render() {
//         return(
//             <div className='final-amount'>
//                 <span>Razem</span>
//                 {this.state.price} PLN
//             </div>
//         )
//     }
//
// };
//
// const mapStateToProps = state => ({
//     cart: state.cart.products,
//     checkout: state.checkout
// });
//
// export default connect(mapStateToProps, {setFinalPrice})(FinalPrice);