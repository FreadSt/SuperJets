import './style.scss';
import {MENU_TABS} from "../constants/sidebarConstants";
import {useState} from "react";
import {Link} from "react-router-dom";
import { getAccount, getBalance, signData } from '../utils/MetaMask';

export const Sidebar = () => {
    const [ethBalance, setEthBalance] = useState("0")
    const [xnlBalance, setXnlBalance] = useState("0")

    const handleLogin = async () => {
        const account = await getAccount();
        const data = (await (await fetch(`/auth/data?address=${account}`, { credentials: "include" })).json()).data;
        const sign = await signData(data);
        console.log("data:", data)
        console.log("sign:", sign)
        await fetch(`/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: account,
                sign: sign
            }),
            credentials: "include",
        });
        setXnlBalance((await (await fetch(`/xnl/balance`, { credentials: "include" })).json()).balance);
        setEthBalance(await getBalance());
    }
    const renderedTabs = () => MENU_TABS.map((tab, index) => {
        return(
            <li key={index}>
                <Link to={tab.path} key={index}>{tab.title}</Link>
            </li>
        )
    })

    return (
        <div className={'sidebar-wrapper'}>
            <button
                onClick={handleLogin}
                className={'metamask-btn'}
            >
                <div>Metamask</div>
            </button>
            <div className={'balance'}>
                <span>{ethBalance} ETH</span>
                <span>{xnlBalance} XNL</span>
            </div>
            <div className={'tab-box'}>
                <h1>Menu</h1>
                <ul className={'tabs'}>
                    {renderedTabs}
                </ul>
            </div>
            <button
                className={'discord-btn'}
            >
                <div>Discord</div>
            </button>
        </div>
    )
}