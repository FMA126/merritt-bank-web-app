import React from 'react';

export function NavComponent() {
    return (
    <nav>
        <button onClick={() => {console.log('connect clicked!')}}>Connect</button>
    </nav>
    )
}