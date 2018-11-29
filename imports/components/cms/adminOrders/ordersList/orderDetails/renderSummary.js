import React from 'react';
import dateAgoPL from "../../../../../functions/dateAgo";
import renderOrderStatus from "../renderStatus";

const OrderSummary = ({order: {deliveryType, promoCode, timestamp, status, deliveryStatus, price}}) => {
    return (
        <div className='order-wrapper'>
            <div className='section-title'>Podsumowanie</div>
            <div className='info-item-wrap'>
                <div className='info-label'>Dostawa</div>
                <div className='info-value'>{deliveryType}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Kod promocyjny</div>
                <div className='info-value'>{promoCode || 'brak'}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Data zamowienia</div>
                <div className='info-value'>{dateAgoPL(timestamp).full}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Status transakcji</div>
                <div className='info-value'>{renderOrderStatus(status, 'tran')}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Status wysylki</div>
                <div className='info-value'>{renderOrderStatus(deliveryStatus, 'delivery')}</div>
            </div>
            <div className='info-item-wrap'>
                <div className='info-label'>Cena zamowienia</div>
                <div className='info-value'>{price} PLN</div>
            </div>
        </div>
    )
};

export default OrderSummary;