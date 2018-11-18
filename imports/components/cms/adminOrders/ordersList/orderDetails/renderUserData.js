import React from 'react';

const OrderUserData = ({user}) => {
    return (
        <div className='order-wrapper'>
            <div className='section-title'>Dane uzytkownika</div>
            <div className='info-item-wrap'>
                <div className='info-label'>Imie i nazwisko</div>
                <div className='info-value'>{user.name + ' ' + user.surname}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Email</div>
                <div className='info-value'>{user.email}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Telefon</div>
                <div className='info-value'>{user.phone}</div>
            </div>
        </div>
    )
};

export default OrderUserData;