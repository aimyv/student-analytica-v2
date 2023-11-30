'use client'

import React, { useState } from 'react'
import Select from 'react-select'
import RadarChart from './RadarChart'
// tanstack query imports
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import StudentsTable from './StudentsTable'

export default function SelectStudent() {
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
        queryKey: ['options'],
        queryFn: async () => {
            const r = await axios.get('http://127.0.0.1:5000/students')
            console.log(r.data)
            return r.data
        }
    })

    let options = []
    for (let i = 0; i < data?.length; i++) {
        options.push({value: data[i]["name"], label: data[i]["name"]})
    }

    const [selected, setSelected] = useState(null);
    
    const handleChange = (choice) => {
        setSelected(choice.value);
    };
    
    return (
        <div>
            <Select className='w-4/5 m-auto' options={options} onChange={handleChange} autoFocus={true} />
            <br />
            {selected && (
                <div>
                    <RadarChart student_name={selected} />
                    <br/>
                    <StudentsTable student_name={selected} />
                </div>
            )}
        </div>
    );
}
