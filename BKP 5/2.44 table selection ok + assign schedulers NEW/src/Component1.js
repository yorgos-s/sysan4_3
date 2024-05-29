import React, { useState, useRef } from 'react';

function ClickLogger() {
    // useState to show the click count on the UI.
    const [displayCount, setDisplayCount] = useState(0);
    const [loggedCount, setLoggedCount] = useState(0);

    // useRef to persist the actual click count across renders
    //without causing re - renders.
    const clickCount = useRef(0);

    const handleButtonClick = () => {
        clickCount.current += 1;

        // Log the click count on every click.
        console.log(`Button clicked ${clickCount.current} times`);

        setLoggedCount(clickCount.current);

        // Update the display count (causing a re-render) every 5 clicks.
        if (clickCount.current % 5 === 0) {
            setDisplayCount(clickCount.current);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Click Me!</button>
            <p>Button has been clicked:
                {loggedCount} times (updated on every click)</p>
            <p>UI updates every 5 clicks: {displayCount}</p>
        </div>
    );
}

export default ClickLogger;
