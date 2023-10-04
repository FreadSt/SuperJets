import React from 'react';

export const Stacked = () => {
    const data = [
        {
            title: "Staked XNL",
            description: "5000",
            button: [
                {
                    label: "Unstake XNL",
                    action: () => {
                        // Define the action for Button 1 here
                    }
                },
            ]
        },
        {
            title: "Unstaked XNL",
            description: "500",
            button: [
                {
                    label: "Stake XNL",
                    action: () => {
                        // Define the action for Button 1 here
                    }
                },
            ]
        },
    ];

    return (
        <div className={'btns-component'}>
            {data.map((item, index) => (
                <div key={index} className={'btn'}>
                    <div className={'description'}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    {item.button && (
                        <>
                            {item.button.map((button, buttonIndex) => (
                                <button
                                    key={buttonIndex}
                                    onClick={button.action}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};