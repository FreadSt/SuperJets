import './style.scss';
import {MENU_TABS} from "../constants/sidebarConstants";
import {useState} from "react";

export const Sidebar = () => {
    const [discordState, setDiscord] = useState()

    const handleClick = () => {
        setDiscord()
    }
    const renderedTabs = () => MENU_TABS.map((tab, index) => {
        return(
            <li key={index}>{tab.title}</li>
        )
    })
    return (
        <div className={'sidebar-wrapper'}>
            <button
                onClick={handleClick}
            >
                <div>Metamask</div>
            </button>
            <div className={'tab-box'}>
                <h1>Menu</h1>
                <ul className={'tabs'}>
                    {renderedTabs()}
                </ul>
            </div>
            <button>
                <div>Discord</div>
            </button>
        </div>
    )
}