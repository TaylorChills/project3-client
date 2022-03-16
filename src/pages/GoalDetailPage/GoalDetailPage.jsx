import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Calendar from 'react-calendar'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
/* import DatePicker from "react-multi-date-picker" */


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

    const currentDate = new Date()
    const maxDate = new Date(currentDate + 1)

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
    const Change = date => {
        setDates(date)
        console.log(date)
    }

    /* class StackOverflow extends React.Component {
        constructor(){
          super();
          this.state={
            selectedDate:moment(),
          }
        }
        onSelect=(e)=>{
          this.setState({selectedDate:e})
        }
    } */




    /* onClick={goalUpdate}
        selectRange
    
    */


    const [selectedDate, setSelectedDate] = useState(null)

    const [value, setValue] = useState(null)

    function handleChange(value){
        console.log(value)
        setValue(value)
      }

  return (
    
    <div >
    <Link to={`/goal/edit/${goalId}`}>Edit Goal</Link> <br />
    
        {goal && 
        <>
            <Link to={"/home"}>back</Link>
            <h1>{goal.name}</h1>
            <div className='calendar'>

            {/* <form onSubmit={completionSubmit}>
                <Calendar 
                showWeekNumbers 
                maxDate={maxDate}
                
                onChange={Change} value={dates}
                />

                <DatePicker 
                selected={selectedDate} 
                onChange={date => setSelectedDate(date)}/>

                <DatePicker 
                value={value}
                onChange={handleChange}
                />


                
                <button type='submit'>Make Changes</button>
            </form> */}

            </div>
            <p>{goal.description}</p>
            <p>{goal.type}</p>
        </>
        }

    </div>


  )
}

export default GoalDetails