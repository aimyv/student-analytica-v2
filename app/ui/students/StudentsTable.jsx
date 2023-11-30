'use client'

// mui imports
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// tanstack query imports
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

function createData(subject, score, feedback) {
    return { subject, score, feedback };
}

export default function DenseTable({ student_name }) {
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ['studentsTable', student_name],
        queryFn: async () => {
            const r = await axios.get(`http://127.0.0.1:5000/students/${student_name}/results`)
            console.log(r.data)
            return r.data
        }
    })
    const rows = data?.map(d => createData(d["subject"], d["score"], d["feedback"]))

    if (isLoading) return <p className='text-[white]'>Loading...</p>

    if (error) return <p className='text-[white]'>{`An error has occurred: ${error.message}`}</p>
    
    return (
        <>
        <TableContainer className='w-4/5 m-auto' component={Paper}>
        <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell>Score (%)</TableCell>
                <TableCell>Feedback</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows?.map((item, index) => (
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {item.subject}
                </TableCell>
                <TableCell>{item.score}</TableCell>
                <TableCell>{item.feedback}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
    );
}
