'use client'

import React, { useState } from 'react'
import Select from 'react-select'
import BarChart from './BarChart'
import ClassTable from './ClassTable'

export default function SelectSubject() {

    // single-select
    const options = [
        { value: "Maths", label: "Maths" },
        { value: "English", label: "English" },
        { value: "Science", label: "Science" },
        { value: "History", label: "History" },
        { value: "Art", label: "Art" },
    ];
    
    const [selected, setSelected] = useState(null);
    
    const handleChange = (choice) => {
        setSelected(choice.value);
    };
    
    return (
        <div>
            <Select className='w-4/5 m-auto' options={options} onChange={handleChange} autoFocus={true} />
            <br />
            {selected && 
                (<div>
                    <BarChart subject={selected} />
                    <br/>
                    <ClassTable subject={selected} />
                </div>)
            }
        </div>
    );
}
