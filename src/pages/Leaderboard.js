import { TableContainer } from '@mui/material';
import './style.scss';
import {MaterialTable} from "../components/Table";
import {LEADERBOARD_DATA, LEADERBOARD_HEADER} from "../constants/leaderboardConstants";
export const Leaderboard = ({headers, data}) => {
    const leaderboardHeader = LEADERBOARD_HEADER;
    const leaderboardData = LEADERBOARD_DATA;
    return(
        <div className={'leaderboard-wrapper'}>
            <h1>Leaderboard</h1>
            <p>Note: Planes are individually ranked by # of wins followed by total pts.</p>
            <TableContainer sx={{maxHeight:"700px"}}>
                <MaterialTable headers={leaderboardHeader} data={leaderboardData}/>
            </TableContainer>
        </div>
    )
}