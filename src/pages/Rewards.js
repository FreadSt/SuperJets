import {MaterialTable} from "../components/Table";
import { TableContainer, Paper } from '@mui/material';
import {CLAIMS_HISTORY_COLUMNS, CLAIMS_HISTORY_HEADER, STAKER_DATA, STAKER_HEADER} from "../constants/rewardsConstants";
import Buttons from "../components/rewardsComponents/RewardsButtons";
import {Stacked} from "../components/rewardsComponents/XNLStatus";

export const Rewards = () => {
    const headers = CLAIMS_HISTORY_HEADER;
    const data = CLAIMS_HISTORY_COLUMNS;
    const stackerHeader = STAKER_HEADER;
    const stackerData = STAKER_DATA;
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
                    <TableContainer sx={{maxHeight:"120px"}}>
                        <MaterialTable headers={headers} data={data}/>
                    </TableContainer>
                </div>
            </div>
            <div className={'rewards-history'}>
                <h1>Rewards history</h1>
                <Buttons/>
            </div>
            <div className={'lower-tables'}>
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
                <div className={'stacker-history'}>
                    <TableContainer sx={{maxHeight:"100%"}}>
                        <MaterialTable headers={stackerHeader} data={stackerData}/>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}