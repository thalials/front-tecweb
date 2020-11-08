import React from 'react';

export default function Feedback({ feedback }) {
    const { message, color, bgColor } = feedback;
    return (
        <p
            className='error-message'
            style={{ backgroundColor: bgColor, color: color }}>
            {message}
        </p>
    );
}
