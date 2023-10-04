import './style.scss';
import {MENU_TABS} from "../constants/sidebarConstants";
import {useState} from "react";
import {Link} from "react-router-dom";

export const Sidebar = () => {
    const [discordState, setDiscord] = useState()
    const [login, setLogin] = useState()

    const handleClickDiscord = () => {
        setDiscord()
    }

    const handleLogin = () => {
        setLogin(login)
    }
    const renderedTabs = () => MENU_TABS.map((tab, index) => {
        return(
            <li>
                <Link to={tab.path} key={index}>{tab.title}</Link>
            </li>
        )
    })

    return (
        <div className={'sidebar-wrapper'}>
            <button
                onClick={handleLogin}
            >
                <div>Metamask</div>
            </button>
            <div className={'tab-box'}>
                <h1>Menu</h1>
                <ul className={'tabs'}>
                    {renderedTabs()}
                </ul>
            </div>
            <button
                onClick={handleClickDiscord}
            >
                <div>Discord</div>
            </button>
        </div>
    )
}