import {MaterialTable} from "../components/Table";
import { TableContainer } from '@mui/material';
import {CLAIMS_HISTORY_COLUMNS, CLAIMS_HISTORY_HEADER, STAKER_DATA, STAKER_HEADER} from "../constants/rewardsConstants";
import Buttons from "../components/rewardsComponents/RewardsButtons";
import {Stacked} from "../components/rewardsComponents/XNLStatus";
import {useEffect, useState} from "react";
import Loader from "../components/Loader";

export const Rewards = () => {
    const [claimsHistoryData, setClaimsHistoryData] = useState([])
    const [stakerData, setStakerData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [balance, setBalance] = useState({
        earned_rewards: "",
        claimed_rewards: "",
        claimable_rewards: "",
    })
    const headers = CLAIMS_HISTORY_HEADER;
    const data = CLAIMS_HISTORY_COLUMNS;
    const stackerHeader = STAKER_HEADER;

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            const fetchData = async () => {
                try {
                    setClaimsHistoryData(CLAIMS_HISTORY_COLUMNS)
                    setStakerData(STAKER_DATA)
                    setBalance({
                        earned_rewards: "10 ETH",
                        claimed_rewards: "0.5 ETH",
                        claimable_rewards: "9.5 ETH",
                    })
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }, 2000);
    }, []);
    return (
        <div className={'stacking-rewards'}>
            <div className={'title-box'}>
                <div className={'description'}>
                    <h1>XML Stacking rewards dashboard</h1>
                    <p>40% of revenue generated from Super Jets goes into XNL Staking Rewards.
                        XNL holders can use this dashboard to stake (and unstake) XNL,
                        view and claim their revenue share rewards. Calculations are made
                        based on your XNL staked share multiplied by a 40% share of
                        total revenue generated across Super Jets across a 24 hour period.</p>
                    <span>Claiming rewards claims all available unclaimed rewards.</span>
                    <h3>Note: There is a 24 hour cool off period. Unstaking your XNL forfeits any pending claims.</h3>
                </div>
                <div className={'history-table'}>
                    <h1>Your Claims History</h1>
                    {
                        isLoading ?
                            <Loader/>
                            :
                            <TableContainer sx={{maxHeight:"120px"}}>
                                <MaterialTable headers={headers} data={claimsHistoryData}/>
                            </TableContainer>
                    }
                </div>
            </div>
            <div className={'rewards-history'}>
                <h1>Rewards history</h1>
                <Buttons/>
            </div>
            <div className={'lower-tables'}>
                {
                    isLoading ?
                        <Loader/>
                        :
                        <div className={'xnl-status'}>
                            <Stacked/>
                            <div className={'xnl-stats'}>
                                <div className={'total-staked'}>
                                    <span>Total XNL Staked</span>
                                    <span>500,000</span>
                                </div>
                                <div>
                                    <span>Total stakers</span>
                                    <span>450</span>
                                </div>
                                <div>
                                    <span>You share</span>
                                    <span>1%</span>
                                </div>
                            </div>
                        </div>
                }
                <div className={'stacker-history'}>
                    {
                        isLoading ?
                            <Loader/>
                            :
                            <TableContainer sx={{maxHeight:"100%"}}>
                                <MaterialTable headers={stackerHeader} data={stakerData}/>
                            </TableContainer>
                    }
                </div>
            </div>
        </div>
    )
}