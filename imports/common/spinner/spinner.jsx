import React from 'react';
import Spinner from 'react-spinkit';
import './spinner.scss';

const GeniusSpinner = ({client}) => {
    return <Spinner name="ball-clip-rotate" color={client ? '#E30069' : "#10D3CD"} className='genius-spinner' />;
};

export default GeniusSpinner;