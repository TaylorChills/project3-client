import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar'


function GoalDetails() {

    const [goal, setGoal] = useState(null)
    const {goalId} = useParams()

    const fetchGoal = async () => {
        
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/goals/${goalId}`)
            setGoal(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGoal();
    }, [])



  return (
    
    <div >
    <Link to={`/goal/edit/${goalId}`}>Edit Goal</Link> <br />
    
        {goal && 
        <>
            <Link to={"/home"}>back</Link>
            <h1>{goal.name}</h1>
            <Calendar />

            <p>{goal.description}</p>
            <p>{goal.type}</p>
        </>
        }

    </div>


  )
}

export default GoalDetails