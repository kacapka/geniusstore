import React from 'react';

export default function renderOrderStatus(status, type) {
    switch (status) {
        case 'pending':
            return <span className='status-pending' style={{color: '#f1c40f'}}>oczekujacy</span>;
        case 'completed':
            return <span className='status-completed' style={{color: '#009432'}}>{type === 'delivery' ? 'wyslano' : 'zaplacono'}</span>;
        case 'rejected':
            return <span className='status-rejected' style={{color: '#ba0c2f'}}>odrzucono</span>;
    }
}