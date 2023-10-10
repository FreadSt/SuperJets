import React from 'react';
import { runTransaction } from '../../utils/MetaMask';
import { setUpdateStakingValue } from '../../utils/GlobalState';

export const Stacked = () => {
    const data = [
        {
            title: "Staked XNL",
            description: "10",
            button: [
                {
                    label: "Unstake XNL",
                    action: async () => {
                        const tx = await (await fetch(`/staking/unstake?amount=${10}`, { credentials: "include" })).json();
                        const hash = await runTransaction(tx);
                        console.log("hashUnstake:", hash)
                        await setUpdateStakingValue();
                    }
                },
            ]
        },
        {
            title: "Unstaked XNL",
            description: "10",
            button: [
                {
                    label: "Stake XNL",
                    action: async () => {
                        const txApprove = await (await fetch(`/xnl/approve?amount=${10}`, { credentials: "include" })).json();
                        const hashApprove = await runTransaction(txApprove);
                        console.log("hashApprove:", hashApprove)
                        
                        const tx = await (await fetch(`/staking/stake?amount=${10}`, { credentials: "include" })).json();
                        const hash = await runTransaction(tx);
                        console.log("hashStake:", hash)
                        await setUpdateStakingValue();
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