import React from 'react';
const LOREM_TITLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
const LOREM_DESC = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'

const RETURNS_DATA = [
    {title: LOREM_TITLE, desc: LOREM_DESC},
    {title: LOREM_TITLE, desc: LOREM_DESC},
    {title: LOREM_TITLE, desc: LOREM_DESC},
    {title: LOREM_TITLE, desc: LOREM_DESC},
    {title: LOREM_TITLE, desc: LOREM_DESC},
    {title: LOREM_TITLE, desc: LOREM_DESC},
    {title: LOREM_TITLE, desc: LOREM_DESC}
];

const Returns = () => {

    const renderTerms = () => {
        return RETURNS_DATA.map((reg,i) => {
            return (
                <div className='term-item-desc' key={i}>
                    <div className='term-desc-title'>
                        <p className='title-num'>{i + 1}.</p>
                        <p className='title-text'>{reg.title}</p>
                    </div>
                    <p className='term-desc-text'>{reg.desc}</p>
                </div>
            )
        })
    };

    return(
        <div className='term-wrap'>
            <h3 className='term-title'>Zwroty</h3>
            {renderTerms()}
        </div>
    );

};

export default Returns;