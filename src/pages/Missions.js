import Dropdown from "react-dropdown";
import {JETS_NAMES} from "../constants/mainpageConstants";
import {useEffect, useState} from 'react';
import {CLAIMS_HISTORY_COLUMNS} from "../constants/rewardsConstants";
import {PAYTOEARN_DATA} from "../constants/claimConstants";
import Loader from "../components/Loader";
export const Missions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [ranking, setRanking] = useState('')
    const [jetActions, setJetActions] = useState({
        operator:"",
        age:"",
        attack:"",
        defence:"",
        damage:"",
    })
    const [planeStats, setPlaneStats] = useState({
        missions:"",
        kills:"",
        deaths:"",
        total_points_won:"",
        total_points_lost:"",
        best_perfomance:"",

    })
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            const fetchData = async () => {
                try {
                   setJetActions({
                       operator: "Australian Royal Airforce",
                       age:"0",
                       attack:"100 PTS",
                       defence: "10 PTS",
                       damage:"20 PTS",
                   })
                    setPlaneStats({
                        missions: "Australian Offensive",
                        kills:"0",
                        deaths:"1",
                        total_points_won: "10",
                        total_points_lost:"20",
                        best_perfomance:"123"
                    })
                    setRanking("1000")
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, 2000);
    }, []);
    const jetsNames = []

    JETS_NAMES.forEach((jet) => {
        jetsNames.push(jet.name);
    });
    return(
        <div className={'missions-container'}>
            <div className={'jet-stats'}>
                <Dropdown options={jetsNames} placeholder={jetsNames[0]}/>
                <div className={'jet-image'}></div>
                <div className={'action-list'}>
                    {
                        isLoading?
                            <Loader/>
                            :
                            <div className={'list'}>
                                {Object.entries(jetActions).map(([key, value]) => (
                                    <span key={key}>
                                <strong>{key}:</strong> {value}
                            </span>
                                ))}
                            </div>
                    }
                    <button>Upgrade in the HANGAR</button>
                </div>
                <h1>Overall ranking:{ranking}</h1>
                <div className={'plane-stats'}>
                    {
                        isLoading?
                            <Loader/>
                            :
                            <div className={'stats-list'}>
                                {Object.entries(planeStats).map(([key, value]) => (
                                    <span key={key}>
                                <strong>{key}:</strong> {value}
                            </span>
                                ))}
                            </div>
                    }
                </div>
            </div>
            <div className={'missions-list'}>
                <h1>Missions</h1>
            </div>
        </div>
    )
}