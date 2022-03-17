import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../GoalDetailPage/GoalDetailPage.css'

import 'react-datepicker/dist/react-datepicker.css'
/* import DatePicker from "react-multi-date-picker" */
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
import Toolbar from "react-multi-date-picker/plugins/toolbar"
import colors from "react-multi-date-picker/plugins/colors"


function GoalDetails() {

    const [goal, setGoal] = useState(null)
    const [value, setValues] = useState([
        new Date(),
        //new DateObject({ year: 2022, month: 3, day: 9 }),
        // "March 09 2022",
        // 1597994736000 //unix time in milliseconds (August 21 2020)
      ])
    //const [selectedDate, setSelectedDate] = useState(null)

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


    const completionSubmit = (e) => {
        e.preventDefault()

        console.log(value)

        const body = { value }

        axios
        .put(`${process.env.REACT_APP_API_URL}/goals/${goalId}/send-dates`, body, { headers: { Authorization: `Bearer ${storedToken}` }} )
        .then((response) => {
          console.log(response)
        })
        .catch((err) => console.log(err))



    }


    function handleChange(selectedDates) {
        console.log('selecting dates')

        // console.log(`${selectedDates[0].month.number}/${selectedDates[0].day}/${selectedDates[0].year}`)
        setValues(selectedDates)
      } 

  return (
    
    <div className='main'>
     <br />
    
        {goal && 
        <>
        <div >

            <h1 className='detail-title'>{goal.name}</h1>

            <div className='menu'>
            <Link to={"/home"} className="button1">back</Link>
            
            <Link to={`/goal/edit/${goalId}`} className="button2">Edit Goal</Link>
            </div>
            
            <div className='calendar'>

            <form onSubmit={completionSubmit}>

                <Calendar 
                className='calendar'
                value={value}
                onChange={(e) => handleChange(e)}
                multiple
                format="MM/DD/YYYY"
                sort
                plugins={[
                    <DatePanel />
                ]}
                
                // maxDate={new Date()}
                // format="MM/DD/YYYY"
                //     plugins={[
                //     <DatePanel sort="date" />]}
                />
                
                <button type='submit' className="submit">Make Changes</button>
            </form>

            </div>
            <p>{goal.description}</p>
            <p>{goal.type}</p>
            </div>
        </>
        }

    </div>


  )
}

export default GoalDetails