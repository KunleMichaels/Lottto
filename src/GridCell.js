import React from 'react';

const GridCell = ({ size, filled, onClick, count }) => {

    let colorState = filled ? ' filled' : '';

    return (
        <div
            className={`GridCell${colorState}`} style={{ width: `${size}px`, height: `${size}px` }}
            onClick={onClick}
        >
            <div className='text-count'><p><b>{count}</b></p></div>
        </div>
    )
}

export default GridCell;