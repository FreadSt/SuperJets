import './style.scss';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import {JETS_NAMES} from "../constants/mainpageConstants";
import {useState, useEffect} from "react";
import Loader from "../components/Loader";

export const Hangar = () => {
    const [stats, setStats] = useState({
        operator: "",
        age:"",
        attack:"",
        defence:"",
        damage:"",
    });
    const [actionHistory, setActionHistory] = useState({
        missions:"",
        kills:"",
        deaths:"",
        total_points_won:"",
        total_points_lost:"",
        best_perfomance:"",
    })
    const [getRanked, setGetRanked] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [jetCheck, setJetCheck] = useState(false)

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoading(true);
        }, 2000);
        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {
        fetch('/localhost:3000/stats')
            .then(() => setStats({
                    operator:"Australian Air Force",
                    age:"0",
                    attack: "100 PTS",
                    defence: "50 PTS",
                    damage: "20 PTS"
                    }
                )
            )
            .catch(err => console.log(err))
        fetch('http://localhost:3000/getranked')
            .then(() => setGetRanked('859'))
            .catch(err => console.log(err))
        fetch('http://localhost:3000/actionhistory')
            .then(() => setActionHistory({
                missions: "1235",
                kills: "2000",
                deaths: "600",
                total_points_lost: "200",
                total_points_won: "600",
                best_perfomance: "12",
            }))
    },[])

    const jetsNames = []

    JETS_NAMES.forEach((jet) => {
        jetsNames.push(jet.name);
    });

    return(
        <div className={'hangar-wrapper'}>
            <div className={'interface-box'}>
                <div className={'stats'}>
                    <Dropdown
                        options={jetsNames}
                        placeholder={jetsNames[0]}
                    />
                    <p>Operator:{stats.operator}</p>
                    {
                        isLoading ?
                            <div className={'stats-container'}>
                                <div className={'age'}>
                                    <span>Age:{stats.age}</span>
                                    <span>Minted at block</span>
                                </div>
                                <div className={'attack'}>
                                    <span>Attack: {stats.attack}</span>
                                    <button>Boost</button>
                                </div>
                                <div className={'defence'}>
                                    <span>Defence: {stats.defence}</span>
                                    <button>Boost</button>
                                </div>
                                <div className={'damage'}>
                                    <span>Damage: {stats.damage}</span>
                                    <button>Repair</button>
                                </div>
                            </div>
                            :
                            <Loader/>
                    }
                    <button className={'fly-now'}>
                        <div>{"FLY NOW"}</div>
                    </button>
                    <h1>Overall ranking:{getRanked}</h1>
                    <div className={'plane-stats'}>
                        <span>Missions:{actionHistory.missions}</span>
                        <span>Kills:{actionHistory.kills}</span>
                        <span>Deaths:{actionHistory.deaths}</span>
                        <span>Total points won:{actionHistory.total_points_won}</span>
                        <span>Total points lost:{actionHistory.total_points_lost}</span>
                        <span>Best perfomance:{actionHistory.best_perfomance}</span>
                    </div>
                </div>
            </div>
            <div className={'jet-box'}>
                <div className={'wrapper'}>
                    <button className={'no-plane'}>
                        No plane? Mint now
                    </button>
                    <div className={'choices'}>
                        <button>Mint Super Jet 0.05 ETH</button>
                        <button>Mint Trainer Jet FREE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};