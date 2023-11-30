'use client'

// chart.js imports
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// tanstack query imports
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

const BarChart = ({ subject }) => {
    const queryClient = useQueryClient();
    const [names, setNames] = useState([]);
    const [scores, setScores] = useState([]);
    const { isLoading, error, data } = useQuery({
        queryKey: ['classResults', subject],
        queryFn: async () => {
            const r = await axios.get(`http://127.0.0.1:5000/results/${subject}/average`)
            const res = await r.data
            setNames(res[0])
            setScores(res[1])
            return res
        }
    })

    if (isLoading) return <p className='text-[white]'>Loading...</p>

    if (error) return <p className='text-[white]'>{`An error has occurred: ${error.message}`}</p>

    const state = {
        labels: names,
        datasets: [{
            label: `${subject} Average`,
            data: scores,
            borderWidth: 1,
        }]
    }

    // returns class average for each subject
    function checkMean() {
        let sum = 0
        for (let i  of scores) {
            sum += i
        }
        return Math.round(sum / scores.length)
    }

    return (
        <div className='w-4/5 m-auto border-[0.5px] pt-5 pb-[30px] px-[30px] rounded-[10px] border-solid border-[white] bg-[white]'>
            <h2>{subject}</h2>
            <br/>
            <Bar
                data={state}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
            <br/>
            <h3>Mean Average of Class: {checkMean()}</h3>
        </div>
    )
}

export default BarChart
