import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export const MaterialTable = ({headers, data}) => {
    return(
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headers.map((header) => (
                        <TableCell key={header.id}>{header.label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {headers.map((header) => (
                            <TableCell key={header.id}>{item[header.id]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}