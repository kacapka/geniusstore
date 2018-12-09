import React from 'react';
import dateAgoPL from "../../../../functions/dateAgo";

const RenderCodeUses = ({code, onOrderNumberClick}) => {

    return (
        <div className='uses-list'>
            <div className='mobile-info'>
                <div className='mobile-item'>typ: <span>{code.type}</span></div>
                <div className='mobile-item'>wartość: <span>{code.value}</span></div>
                <div className='mobile-item'>jednorazowy: <span>{code.singleUse ? 'tak' : 'nie'}</span></div>
            </div>
            <div className='uses-list-item header'>
                <div className="lp">L.p.</div>
                <div className='mobile'>Użytkownik</div>
                <div>Nr Zamówienia</div>
                <div>Data realizacji</div>
            </div>
            {code.uses.map((use, i) => {
                return (
                    <div className='uses-list-item' key={use.orderNumber}>
                        <div className="lp">{i + 1}.</div>
                        <div className='mobile'>{use.user}</div>
                        <div onClick={() => onOrderNumberClick(use.orderId)}
                             className="link"
                        >
                            {use.orderNumber}
                        </div>
                        <div>{dateAgoPL(use.timestamp).full}</div>
                    </div>
                )
            })}
        </div>
    )

};

export default RenderCodeUses;