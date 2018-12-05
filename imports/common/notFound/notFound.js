import React from 'react';
import './notFound.scss';

const NotFoundText = (props) => {
    return (
        <div className='not-found-text'>
            {props.children}
        </div>
    );
};

export default NotFoundText;