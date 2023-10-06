import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SubTable from "./claimsComponents/SubTable";
export const MaterialTable = ({headers, data, button, expandedRow}) => {
    const [expandedRows, setExpandedRows] = React.useState({});

    const toggleRow = (rowId) => {
        setExpandedRows((prevExpandedRows) => ({
            ...prevExpandedRows,
            [rowId]: !prevExpandedRows[rowId],
        }));
    };
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
                {data.map((item, index) => (
                    <TableRow key={item.id}>
                        {headers.map((header) => (
                            <TableCell key={header.id}>{item[header.id]}</TableCell>
                        ))}
                        {
                            button && (
                                console.log(button, "button"),
                                <TableCell>
                                    <button
                                        onClick={() => toggleRow(item.id || index)}
                                    >
                                        {expandedRows[item.id || index] ? 'Hide Table' : 'Show Table'}
                                    </button>
                                </TableCell>
                            )
                        }
                        <>
                            {expandedRows[item.id || index] ? (
                                <TableRow>
                                    <TableCell colSpan={headers.length + 1}  style={{padding:"0"}}>
                                        <SubTable/>
                                    </TableCell>
                                </TableRow>
                            ) : null}
                        </>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}