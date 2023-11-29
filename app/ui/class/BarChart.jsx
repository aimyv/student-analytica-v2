'use client'

// chart.js imports
import React, { useState } from 'react';
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
        queryKey: ['results'],
        queryFn: async () => {
            const r = await axios.get(`http://127.0.0.1:5000/results/${subject}/average`)
            setNames(r.data[0])
            setScores(r.data[1])
            return r.data
        }
    })

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
        <div className='border-[0.5px] pt-5 pb-[30px] px-[30px] rounded-[10px] border-solid border-[white] bg-[white]' style={{width: '100%', margin: 'auto'}}>
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
