import './style.scss';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import {useEffect, useState} from "react";
import { setLoadJetsCallback } from "../utils/GlobalState";
import { runTransaction } from "../utils/MetaMask";

let jets = [];
let jet_names = [];
let currentJetId = 0;

export const Hangar = () => {
    const [jetsNames, setJetsNames] = useState([])
    const [paidTournament, setPaidTournament] = useState(false)
    const [pilotInfo, setPilotInfo] = useState({})
    const [selectedJet, setJet] = useState({
        id: 0,
        metadata: {},
        block_id: 0,
        attack: 0,
        defense: 0,
        damage: 0,
        rank: 0,
        missions: 0,
        kills: 0,
        deaths: 0,
        total_points_won: 0,
        total_points_lost: 0,
        best_performance: 0,
        is_trainer: false,
    })
    const [jetStats, setJetStats] = useState({
        age: 0,
        repair_time: 0,
        state: "",
    })

    const mintSuperJet = async () => {
        const tx = await (await fetch(`/jets/mint?trainer=0`, { credentials: "include" })).json();
        const hash = await runTransaction(tx);
        console.log("hash:", hash)
    }

    const mintTrainerJet = async () => {
        const tx = await (await fetch(`/jets/mint?trainer=1`, { credentials: "include" })).json();
        const hash = await runTransaction(tx);
        console.log("hash:", hash)
    }

    const mintPilot = async () => {
        if (pilotInfo.fearlessness === undefined) {
            const tx = await (await fetch(`/pilots/mint`, { credentials: "include" })).json();
            const hash = await runTransaction(tx);
            console.log("hash:", hash)
        }
    }

    const upgradeAttack = async () => {
        const tx = await (await fetch(`/jets/upgrade/attack?jetId=${selectedJet.id}`, { credentials: "include" })).json();
        const hash = await runTransaction(tx);
        console.log("hash:", hash)
        selectJet(jet_names[currentJetId]);
    }

    const upgradeDefense = async () => {
        const tx = await (await fetch(`/jets/upgrade/defense?jetId=${selectedJet.id}`, { credentials: "include" })).json();
        const hash = await runTransaction(tx);
        console.log("hash:", hash)
        selectJet(jet_names[currentJetId]);
    }

    const repair = async () => {
        const tx = await (await fetch(`/jets/repair?jetId=${selectedJet.id}`, { credentials: "include" })).json();
        const hash = await runTransaction(tx);
        console.log("hash:", hash)
        selectJet(jet_names[currentJetId]);
    }

    const flyNow = async () => {
        console.log(jetStats.state, jetStats.age, selectedJet.damage)
        if (jetStats.state === "in_hangar" && jetStats.age < 100 && selectedJet.damage < 100) {
            console.log("flyNow:", selectedJet.id)
            const req = await fetch(`/matches/join?jetId=${selectedJet.id}`, {
                method: 'POST',
                credentials: "include"
            });
            console.log("req:", req)
            const res = await req.text();
            console.log("res:", res)

            selectJet(jet_names[currentJetId]);
        }
    }

    const joinTournament = async () => {
        console.log(jetStats.state, jetStats.age, selectedJet.damage)
        if (jetStats.state === "in_hangar" && jetStats.age < 100 && selectedJet.damage < 100) {
            if (paidTournament) {
                console.log("flyNow:", selectedJet.id)
                const req = await fetch(`/matches/join/tournament?jetId=${selectedJet.id}`, {
                    method: 'POST',
                    credentials: "include"
                });
                console.log("req:", req)
                const res = await req.text();
                console.log("res:", res)

                selectJet(jet_names[currentJetId]);
            } else {
                const tx = await (await fetch(`/matches/pay-tournament?jetId=${selectedJet.id}`, { credentials: "include" })).json();
                const hash = await runTransaction(tx);
                console.log("hash:", hash)
                selectJet(jet_names[currentJetId]);
            }
        }
    }

    const loadJets = async () => {
        try {
            setPilotInfo(await (await fetch(`/pilots/info`, { credentials: "include" })).json());
            jets = await (await fetch(`/jets/list`, { credentials: "include" })).json();
            jet_names = []

            for (let jet of jets) {
                const jet_name = jet.metadata["NFT Name"] + " #" + jet.block_id;
                jet_names.push(jet_name)
            }

            if (jets.length === 0) {
                return;
            }
            setJetsNames(jet_names)
            selectJet(jet_names[0])
        } catch (e) {
            console.log(e)
        }
    }

    const selectJet = (jet_name) => {
        currentJetId = jet_names.indexOf(jet_name);
        const jet = jets[currentJetId];
        console.log(jet_name, currentJetId, jet)
        setJet(jet);
        if (jet) {
            fetch(`/matches/paid-tournament?jetId=${jet.id}`, { credentials: "include" }).then(async (res) => {
                const paid = (await res.json()).paid;
                setPaidTournament(paid);
            });
            fetch(`/jets/stats?jetId=${jet.id}`, { credentials: "include" }).then(async (res) => {
                const stats = await res.json();
                setJetStats(stats);
            });
        }
    }

    useEffect(() => {
        loadJets().then().catch();
    }, []);

    return(
        <div className={'hangar-wrapper'}>
            <div className={'interface-box'}>
                <div className={'stats'}>
                    <Dropdown
                        options={jetsNames}
                        placeholder={jetsNames[0]}
                        onChange={(e) => {
                            selectJet(e.value);
                        }}
                    />
                    {
                        pilotInfo.fearlessness !== undefined ? (
                            <div className={'pilot-stats'}>
                                <span>Pilot unique name: {pilotInfo.name}</span><br/>
                                <span>Fearlessness: {pilotInfo.fearlessness}</span><br/>
                                <span>Precision: {pilotInfo.precision}</span><br/>
                                <span>Stamina: {pilotInfo.stamina}</span><br/>
                                <span>Instinct: {pilotInfo.instinct}</span><br/>
                                <span>Awareness: {pilotInfo.awareness}</span><br/>
                            </div>
                        ) : (
                            <div className={'pilot-stats'}>
                                <span>Pilot name: {pilotInfo.name}</span><br/>
                                <span>Pilot not minted yet</span>
                            </div>
                        )
                    }
                    {
                            <div className={'stats-container'}>
                                <div className={'age'}>
                                    <span>{ selectedJet.is_trainer ? "Trainer Jet" : "Super Jet" }</span>
                                </div>
                                <div className={'age'}>
                                    <span>Age: {jetStats.age}</span>
                                    <span>years</span>
                                </div>
                                <div className={'age'}>
                                    <span>Repair time: {jetStats.repair_time}</span>
                                    <span>seconds</span>
                                </div>
                                <div className={'attack'}>
                                    <span>Attack: {selectedJet.attack}</span>
                                    <button
                                        onClick={upgradeAttack}
                                    >Boost</button>
                                </div>
                                <div className={'defence'}>
                                    <span>Defense: {selectedJet.defense}</span>
                                    <button
                                        onClick={upgradeDefense}
                                    >Boost</button>
                                </div>
                                <div className={'damage'}>
                                    <span>Damage: {selectedJet.damage}</span>
                                    <button
                                        onClick={repair}
                                    >Repair</button>
                                </div>
                            </div>
                    }
                    <button className={'fly-now'}
                            onClick={joinTournament}
                    >
                        <div>{jetStats.state === "in_repair" ? "Jet is under repair" : jetStats.state === "in_match_queue" ? "Jet in the match queue" : jetStats.state === "in_match_progress" ? "Jet on a match mission" : paidTournament ? "Join to tournament" : "Pay tournament" }</div>
                    </button>
                    <button className={'fly-now'}
                            onClick={flyNow}
                    >
                        <div>{jetStats.state === "in_repair" ? "Jet is under repair" : jetStats.state === "in_match_queue" ? "Jet in the match queue" : jetStats.state === "in_match_progress" ? "Jet on a match mission" : "FLY NOW" }</div>
                    </button>
                    <h1>Rank: {selectedJet.rank}</h1>
                    <div className={'plane-stats'}>
                        <span>Missions: {selectedJet.missions}</span>
                        <span>Kills: {selectedJet.kills}</span>
                        <span>Deaths: {selectedJet.deaths}</span>
                        <span>Total points won: {selectedJet.total_points_won}</span>
                        <span>Total points lost: {selectedJet.total_points_lost}</span>
                        <span>Best perfomance: {selectedJet.best_performance}</span>
                    </div>
                </div>
            </div>
            <div className={'jet-box'}>
                <div className={'wrapper'}>
                    <button className={'no-plane'}>
                        No plane? Mint now
                    </button>
                    <div className={'choices'}>
                        <button
                            onClick={mintSuperJet}
                        >Mint Super Jet 0.05 ETH</button>
                        <button
                            onClick={mintTrainerJet}
                        >Mint Trainer Jet FREE</button>
                        <button
                            onClick={mintPilot}
                        >Mint Pilot FREE (once)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};