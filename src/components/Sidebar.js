import './style.scss';
import {MENU_TABS} from "../constants/sidebarConstants";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { getAccount, getBalance, signData } from '../utils/MetaMask';
import logo from "../assets/images/Frame 977620.svg";
import metamask from "../assets/images/meta-test-2.svg";

export const Sidebar = () => {
    const [ethBalance, setEthBalance] = useState("0")
    const [xnlBalance, setXnlBalance] = useState("0")
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        // Set the active tab based on the current pathname when the component mounts
        const currentPath = window.location.pathname;
        const activeTab = MENU_TABS.find(tab => tab.path === currentPath);
        setActiveTab(activeTab);
    }, []);

    const handleRemove = () => {
        setActiveTab(null); // Remove active tab when clicking outside
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

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
        return (
            <li key={index} onClick={() => handleTabClick(tab)} className={activeTab === tab ? "active" : null}>
                {activeTab === tab && (
                    <div className="active-mark"></div>
                )}
                <img src={tab.img} alt={'image-link'}/>
                <Link to={tab.path}>
                    {tab.title}
                </Link>
            </li>
        );
    });

    return (
        <div className={'sidebar-wrapper'}>
            <img src={logo}/>
            {/*<div className={'balance'}>*/}
            {/*    <span>{ethBalance} ETH</span>*/}
            {/*    <span>{xnlBalance} XNL</span>*/}
            {/*</div>*/}
            <div className={'tab-box'}>
                <h1>Menu</h1>
                <ul className={'tabs'}>
                    {renderedTabs()}
                </ul>
            </div>
            <div className={'metamask'}>
                <div className={'meta-des'}>
                    <span>sign in with</span>
                    <p>metamask</p>
                </div>
                <img src={metamask} alt={'sidebar-metamask'} onClick={handleLogin}/>
            </div>
        </div>
    )
}