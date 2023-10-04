import './style.scss';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import {JETS_NAMES} from "../constants/mainpageConstants";

export const Hangar = () => {

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
                    <p>Operator:</p>
                    <div className={'stats-container'}>
                        <div className={'age'}>
                            <span>Age:</span>
                            <span>Minted at block</span>
                        </div>
                        <div className={'attack'}>
                            <span>Attack:</span>
                            <button>Boost</button>
                        </div>
                        <div className={'defence'}>
                            <span>Defence</span>
                            <button>Boost</button>
                        </div>
                        <div className={'damage'}>
                            <span>Damage:</span>
                            <button>Repair</button>
                        </div>
                    </div>
                    <button className={'fly-now'}>
                        <div>FLY NOW</div>
                    </button>
                    <h1>Overall ranking:</h1>
                    <div className={'plane-stats'}>
                        <span>Missions:</span>
                        <span>Kills:</span>
                        <span>Deaths:</span>
                        <span>Total points won:</span>
                        <span>Total points lost:</span>
                        <span>Best perfomance:</span>
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