import React from 'react';
import dateAgoPL from "../../../../functions/dateAgo";

const RenderCodeUses = ({uses, onOrderNumberClick}) => {

    console.log(uses);

    return (
        <div className='uses-list'>
            <div className='uses-list-item header'>
                <div className="lp">L.p.</div>
                <div>Użytkownik</div>
                <div>Nr Zamówienia</div>
                <div>Data realizacji</div>
            </div>
            {uses.map((use, i) => {
                return (
                    <div className='uses-list-item' key={use.orderNumber}>
                        <div className="lp">{i + 1}.</div>
                        <div>{use.user}</div>
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