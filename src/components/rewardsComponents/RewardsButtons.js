import React from 'react';

const Buttons = () => {
    const data = [
        {
            title: "Total Rewards Earned",
            description: "10 ETH"
        },
        {
            title: "Total Rewards Claimed",
            description: "0.5 ETH"
        },
        {
            title: "Claimable Rewards",
            description: "9.5 ETH",
            buttons: [
                {
                    label: "Claim now",
                    action: () => {
                        // Define the action for Button 1 here
                    }
                },
                {
                    label: "Claim as XNL",
                    action: () => {
                        // Define the action for Button 2 here
                    }
                }
            ]
        }
    ];

    return (
        <div className={'btns-component'}>
            {data.map((item, index) => (
                <div key={index} className={'btn'}>
                    <div className={'description'}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                    {item.buttons && (
                        <div className={'btns'}>
                            {item.buttons.map((button, buttonIndex) => (
                                <button
                                    key={buttonIndex}
                                    onClick={button.action}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Buttons;