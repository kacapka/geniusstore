import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

const TERMS_ICONS = [
    {name: 'cash', tab: 'payments'},
    {name: 'cube', tab: 'delivery'},
    {name: 'hand', tab: 'returns'},
    {name: 'clipboard', tab: 'regulations'},
];

const TermsIcons = ({activeTab}) => {

    const onIconClick = (tab) => {
        window.scrollTo(0,0);
        FlowRouter.go(`/terms/${tab}`);
    };

    const renderIcons = () => {
        return TERMS_ICONS.map(icon => {
            return (
                <div key={icon.name} className={activeTab === icon.tab ? 'icon-wrap active' : 'icon-wrap'}>
                    <ion-icon name={icon.name}
                              onClick={() => onIconClick(icon.tab)}
                    >

                    </ion-icon>
                </div>
            )
        })
    }

    return (
        <div className='terms-nav'>
            {renderIcons()}
        </div>
    );

};

export default TermsIcons;