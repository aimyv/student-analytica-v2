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
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from 'axios';
// icon
import { Trash2 } from 'react-feather'

function createData(student_name, subject, score, id) {
    return { student_name, subject, score, id };
}

export default function DenseTable() {
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ['results'],
        queryFn: async () => {
            const r = await axios.get('http://127.0.0.1:5000/results')
            return r.data
        }
    })
    const rows = data?.map(d => createData(d["student_name"], d["subject"], d["score"], d["id"]))

    async function deleteResult(id) {
        try {
            await axios.delete(`http://127.0.0.1:5000/results/${id}`)
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    const { mutate } = useMutation({
        mutationFn: deleteResult,
        onSuccess: () => {
            queryClient.invalidateQueries("results");
        },
    });
    
    return (
        <>
        <TableContainer component={Paper} style={{width: '80%', margin: 'auto'}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
                <TableCell>Student</TableCell>
                <TableCell align="right">Subject</TableCell>
                <TableCell align="right">Score (%)</TableCell>
                <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows?.map((item, index) => (
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {item.student_name}
                </TableCell>
                <TableCell align="right">{item.subject}</TableCell>
                <TableCell align="right">{item.score}</TableCell>
                <TableCell>
                    <Trash2 
                        className='text-blue-600 cursor-pointer w-4 hover:text-[red] ml-auto mr-0 my-auto'
                        onClick={(id) => mutate(item.id)}
                    />
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
    );
}
