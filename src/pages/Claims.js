import {MaterialTable} from "../components/Table";
import { TableContainer } from '@mui/material';
import {CLAIMS_HISTORY_COLUMNS, CLAIMS_HISTORY_HEADER, STAKER_DATA, STAKER_HEADER} from "../constants/rewardsConstants";
import {Stacked} from "../components/rewardsComponents/XNLStatus";
import ClaimButtons from "../components/claimsComponents/ClaimsButtons";
import {useEffect, useState} from "react";
import Loader from "../components/Loader";
import {PAYTOEARN_DATA, PAYTOEARN_HEADER} from "../constants/claimConstants";

export const Claims = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);
    const [data, setData] = useState([]);
    const [rewardsHistory, setRewardsHistory] = useState([])
    const [balance, setBalance] = useState({
        earned_rewards:"",
        claimed_rewards:"",
        claimable_rewards:""
    })

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            const fetchData = async () => {
                try {
                    setData(CLAIMS_HISTORY_COLUMNS)
                    setRewardsHistory(PAYTOEARN_DATA)
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
    const rewardsHeaders = PAYTOEARN_HEADER
    const headers = CLAIMS_HISTORY_HEADER;
    const buttons = PAYTOEARN_DATA.map(item => {
        console.log(item, "item")
        return(
            item.buttons
        )
    })
    const stackerHeader = STAKER_HEADER;
    const stackerData = STAKER_DATA;

    return (
        <div className={'claims-rewards'}>
            <div className={'title-box'}>
                <div className={'description'}>
                    <h1>PLAY-TO-EARN CLAIM DASHBOARD</h1>
                    <p>40% of revenue generated from Super Jets goes into P2E Rewards.
                        Players can use this dashboard to view and claim their revenue share
                        rewards based on mission wins. Calculations are made based on your
                        share of wins multiplied by a 40% share of total revenue generated
                        across Super Jets across a 24 hour period.
                    </p>
                    <h3>Note: All your Super Jet NFTs are calculated here so that you only need to claim once.</h3>
                </div>
                <div className={'history-table'}>
                    <h1>Your Claims History</h1>
                    {
                        isLoading ?

                            <Loader/>
                            :
                            <TableContainer sx={{maxHeight:"120px"}}>
                                <MaterialTable headers={headers} data={data}/>
                            </TableContainer>
                    }
                </div>
            </div>
            <div className={'rewards-history'}>
                <h1>P2E Rewards history</h1>
                <ClaimButtons/>
            </div>
            <div className={'lower-table'}>
                <h1>P2E Rewards History</h1>
                {
                    isLoading ?
                            <Loader/>
                        :
                        <TableContainer sx={{maxHeight:"220px"}}>
                            <MaterialTable headers={rewardsHeaders} data={rewardsHistory} button={buttons}/>
                        </TableContainer>
                }
            </div>
        </div>
    )
}