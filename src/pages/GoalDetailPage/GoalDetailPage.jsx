import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css'
/* import DatePicker from "react-multi-date-picker" */
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import colors from "react-multi-date-picker/plugins/colors"


function GoalDetails() {

    const [goal, setGoal] = useState(null)
    const {goalId} = useParams()

    const storedToken = localStorage.getItem("authToken");

    const fetchGoal = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/goals/${goalId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
            setGoal(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGoal();
    }, [])


    //Calendar stuff
    /* const[dates, setDates] = useState(new Date()) */

    const [dates, setDates] = useState()


    const completionSubmit = (e) => {
        e.preventDefault()

        const body = { dates }

        axios
        .put(`${process.env.REACT_APP_API_URL}/goals/${goalId}`, body, { headers: { Authorization: `Bearer ${storedToken}` }} )
        .then((response) => {
          console.log(response)
        })
        .catch((err) => console.log(err))



    }
   
    const click = (e) => {
        e.preventDefault()
        console.log(e.target.value)

    }


    const [selectedDate, setSelectedDate] = useState(null)


    function handleChange(e){
        console.log(e.target.value)
        setDates(dates)
      }

  return (
    
    <div >
    <Link to={`/goal/edit/${goalId}`}>Edit Goal</Link> <br />
    
        {goal && 
        <>
            <Link to={"/home"}>back</Link>
            <h1>{goal.name}</h1>
            <div className='calendar'>

            <form onSubmit={completionSubmit}>

                <Calendar 
                value={dates}
                onChange={e => setDates(e.target.value)}
                multiple
                maxDate={new Date()}
                format="MM/DD/YYYY"
                    plugins={[
                    <DatePanel sort="date" />]}
                />
                
                <button type='submit'>Make Changes</button>
            </form>

            </div>
            <p>{goal.description}</p>
            <p>{goal.type}</p>
        </>
        }

    </div>


  )
}

export default GoalDetails