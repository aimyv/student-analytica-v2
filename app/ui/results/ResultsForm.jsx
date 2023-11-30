'use client'

import React, { useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from 'axios'
import { DefaultButton } from '../Buttons'
import { Input, Select, TextArea } from '../Inputs'

const ResultForm = () => {

    const [result, setResult] = useState({
        "student_name": '',
        "subject": 'Maths',
        "score": '',
        "feedback": ''
    })
    const queryClient = useQueryClient()

    const { isLoading, error, mutate } = useMutation({
        mutationFn: async () => await axios.post('http://127.0.0.1:5000/results', result), 
        onSuccess: () => {
            queryClient.invalidateQueries(["results"]);
            setResult({
                "student_name": '',
                "subject": 'Maths',
                "score": '',
                "feedback": ''
            });
        },
    });

    const handleInputChange = (e)  => {
        let name = e.target.name
        let value =  e.target.value
        // sets a field in new result
        setResult({...result, [name]: value})
    }

    return (
        <div>
            <div style={{maxWidth: '80%', margin: 'auto'}}>
                <form onSubmit={ (e) => mutate(result) } className='bg-[white]' style={{border: 'solid 0.5px black', borderRadius: '5px', padding: '1em'}}>

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div>
                            <Input 
                                type='text' 
                                required 
                                name='student_name' 
                                placeholder='Enter student name'
                                value={result.student_name}
                                onChange={handleInputChange} 
                            />
                        </div>

                        <div>
                            <Select
                            required 
                            name="subject" 
                            onChange={handleInputChange}
                            >
                                <option value="Maths">Maths</option>
                                <option value="English">English</option>
                                <option value="Science">Science</option>
                                <option value="Art">Art</option>
                                <option value="History">History</option>
                            </Select>
                        </div>

                        <div>
                            <Input
                            type='number' 
                            required 
                            name='score' 
                            placeholder='Score (%)'
                            value={result.score}
                            onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    
                    <br />

                    <TextArea
                    required 
                    maxLength='300' 
                    placeholder='Write feedback' 
                    name='feedback'
                    value={result.feedback}
                    onChange={handleInputChange}
                    ></TextArea>
                    
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <DefaultButton type='submit' style={{margin: '10px auto 0 auto'}}>
                            Submit
                        </DefaultButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResultForm
