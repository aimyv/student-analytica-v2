'use client'

// chart.js imports
import React, { useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
// tanstack query imports
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarChart = ({ student_name }) => {
    const queryClient = useQueryClient();
    // to read and set student results for each subject
    const [maths, setMaths] = useState({
        'score': 0,
        'feedback': ''
    })
    const [english, setEnglish] = useState({
        'score': 0,
        'feedback': ''
    })
    const [science, setScience] = useState({
        'score': 0,
        'feedback': ''
    })
    const [art, setArt] = useState({
        'score': 0,
        'feedback': ''
    })
    const [history, setHistory] = useState({
        'score': 0,
        'feedback': ''
    })

    const { isLoading, error, data } = useQuery({
        queryKey: ['students'],
        queryFn: async () => {
            const r = await axios.get(`http://127.0.0.1:5000/students/${student_name}/results`)
            // filter all maths results
            let m = r.data.filter(d => d.subject==='Maths')
            // update state with latest maths result
            if (m.length !== 0) {
                setMaths({
                    'score': m[m.length-1].score,
                    'feedback': m[m.length-1].feedback
                })
            }
            let e = r.data.filter(d => d.subject==='English')
            if (e.length !== 0) {
                setEnglish({
                    'score': e[e.length-1].score,
                    'feedback': e[e.length-1].feedback
                })
            }
            let s = r.data.filter(d => d.subject==='Science')
            if (s.length !== 0) {
                setScience({
                    'score': s[s.length-1].score,
                    'feedback': s[s.length-1].feedback
                })
            }
            let a = r.data.filter(d => d.subject==='Art')
            if (a.length !== 0) {
                setArt({
                    'score': a[a.length-1].score,
                    'feedback': a[a.length-1].feedback
                })
            }
            let h = r.data.filter(d => d.subject==='History')
            if (h.length !== 0) {
                setHistory({
                    'score': h[h.length-1].score,
                    'feedback': h[h.length-1].feedback
                })
            }
            return
        }
    })

    const data_ = {
        labels: ['Maths', 'English', 'Science', 'Art', 'History'],
        datasets: [
            {
                label: `${student_name}'s latest exam result`,
                data: [maths['score'], english['score'], science['score'], art['score'], history['score']],
                borderWidth: 1,
            },
        ],
    };

    function checkMin() {
        let weak = Math.min(maths['score'], english['score'], science['score'], art['score'], history['score'])
        if (weak === maths['score']) {
            return 'Maths'
        } else if (weak === english['score']) {
            return 'English'
        } else if (weak === science['score']) {
            return 'Science'
        } else if (weak === art['score']) {
            return 'Art'
        } else if (weak === history['score']) {
            return 'History'
        }
    }

    function checkMax() {
        let strong = Math.max(maths['score'], english['score'], science['score'], art['score'], history['score'])
        if (strong === maths['score']) {
            return 'Maths'
        } else if (strong === english['score']) {
            return 'English'
        } else if (strong === science['score']) {
            return 'Science'
        } else if (strong === art['score']) {
            return 'Art'
        } else if (strong === history['score']) {
            return 'History'
        }
    }
    
    return (
        <div className='border-[0.5px] pt-5 pb-[30px] px-[30px] rounded-[10px] border-solid border-[white] bg-[white]' style={{width: '100%', margin: 'auto'}}>
            <h2>{student_name}</h2>
            <br/>
            <Radar 
                data={data_}
                options={{
                    scales: {
                        r: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                        }
                    }
                }}
            />
            <div className='studentResultsFooter'>
                <h3>Strongest area: {checkMax()}</h3>
                <h3>Weakest area: {checkMin()}</h3>
            </div>
        </div>
    )
}

export default RadarChart

