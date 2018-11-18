import React from 'react';

const OrderAddress = ({address}) => {
    return (
        <div className='order-wrapper'>
            <div className='section-title'>Adres wysylki</div>
            <div className='info-item-wrap'>
                <div className='info-label'>Miasto</div>
                <div className='info-value'>{address.city}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Kod pocztowy</div>
                <div className='info-value'>{address.zipCode}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Ulica, nr domu</div>
                <div className='info-value'>{address.street}</div>
            </div>
        </div>
    )
};

export default OrderAddress;