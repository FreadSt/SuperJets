import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import {SUBHEADER_DATA, SUBTABLE_HEADER} from "../../constants/claimConstants/subtableConstants";

const SubTable = () => {
    const headers = SUBTABLE_HEADER
    const data = SUBHEADER_DATA
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {headers.map((header) => (
                        <TableCell key={header.id} style={{padding:"0"}}>{header.label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        {headers.map((header) => (
                            <TableCell key={header.id}  style={{padding:"0"}}>{item[header.id]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default SubTable;