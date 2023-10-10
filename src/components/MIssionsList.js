import {useEffect, useState} from "react";
import {MISSION_ACTIONS} from "../constants/missionsConstants";
import Loader from "./Loader";

export const MissionsList = () => {
    const [listItem, setListItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            const fetchData = async () => {
                try {
                    setListItem(MISSION_ACTIONS)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, 2500);
    }, []);
    return(
        <div className={'list-box'}>
            {
                isLoading ?
                    <Loader/>
                    :
                    MISSION_ACTIONS.map((mission, index) => (
                        <div key={index} className={'result-box'}>
                            <div>
                                <p>Date/Time:</p>
                                <span>{mission.date}</span>
                            </div>
                            <div>
                                <p>Mission ID:</p>
                                <span>{mission.missionId}</span>
                            </div>
                            <div>
                                <p>Opponent:</p>
                                <span>{mission.opponent}</span>
                            </div>
                            <div>
                                <p>Result:</p>
                                <span>{mission.result}</span>
                            </div>
                            <div>
                                <p>Damage Points:</p>
                                <span>{mission.damage_pts}</span>
                            </div>
                            <div>
                                <p>Hit Points:</p>
                                <span>{mission.hit_pts}</span>
                            </div>
                            <div>
                                <span>Total Points:</span>
                                <span>{mission.total_pts}</span>
                            </div>
                            <div className={'btns-container'}>
                                {mission.buttons.map((btn, btnIndex) => (
                                    <button key={btnIndex}>{Object.keys(btn)[0]}</button>
                                ))}
                            </div>
                            <button className={'share-btn'}>{Object.keys(mission.button)[0]}</button>
                        </div>
                    ))
            }
        </div>
    )
}