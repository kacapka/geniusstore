import React from 'react';

export default function renderOrderStatus(status, type) {
    switch (status) {
        case 'pending':
            return <span className='status-pending'>oczekujacy</span>;
        case 'completed':
            return <span className='status-completed'>{type === 'delivery' ? 'wyslano' : 'zaplacono'}</span>;
        case 'rejected':
            return <span className='status-rejected'>odrzucono</span>;
    }
}