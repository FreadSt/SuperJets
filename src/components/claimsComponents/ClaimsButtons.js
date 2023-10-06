import React, {useEffect, useState} from 'react';
import {CLAIMS_HISTORY_COLUMNS} from "../../constants/rewardsConstants";
import Loader from "../Loader";

const ClaimButtons = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [balance, setBalance] = useState({
        earned_rewards:"",
        claimed_rewards:"",
        claimable_rewards:""
    })

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            const fetchData = async () => {
                try {
                    setBalance({
                        earned_rewards: "10 ETH",
                        claimed_rewards: "0.5 ETH",
                        claimable_rewards: "9.5 ETH",
                    })
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, 2000);
    }, []);
    const data = [
        {
            title: "Total Rewards Earned",
            description: balance.earned_rewards,
        },
        {
            title: "Total Rewards Claimed",
            description: balance.claimed_rewards,
        },
        {
            title: "Claimable Rewards",
            description: balance.claimable_rewards,
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
                        {
                            isLoading ?
                                <Loader/>
                                :
                                <p>{item.description}</p>
                        }
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

export default ClaimButtons;