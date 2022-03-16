import '../NewGoalPage/NewGoalPage.css'
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function NewGoalPage(props) {
    const[name, setName] = useState('')
    const[description, setDescription] = useState('')
    const[type, setType] = useState('')
    const[frequency, setFrequency] = useState('')
    const[streak, setStreak] = useState('')


    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleType = (e) => setType(e.target.value)
    const handleFrequency = (e) => setFrequency(e.target.value)
    const handleStreak = (e) => setStreak(e.target.value)

    

    const handleSubmit = (e) => {
        e.preventDefault()
        const storedToken = localStorage.getItem("authToken");
        const body = { name, description, type, frequency, streak }

        axios
        .post(`${process.env.REACT_APP_API_URL}/goals`, body, { headers: { Authorization: `Bearer ${storedToken}` }})
        .then((response) => {
          setName('')
          setDescription('')
          props.refreshGoals()
        })
        .catch((err) => console.log(err))
    }

    const [showWeekly, setShowWeekly] = useState(true)
    const [showMonthly, setShowMonthly] = useState(false)

    const toggleShowWeekly = () => {
      setShowWeekly(!showWeekly)
    }

    const toggleShowMonthly = () => {
      setShowMonthly(!showMonthly)
    }



  return (
    <div className='form'>

    <h1>New Goal</h1>

      <form onSubmit={handleSubmit} id="goal-form">
        <div className='new-goal'>
          <Link to={"/home"}>back</Link>
          <div className='goals'>
              <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="un"
                placeholder="Goal Name"
              />
          </div>

          <div className='goals'>
              <textarea
                name="description"
                value={description}
                onChange={handleDescription}
                form="goal-form"
                className='un'
                cols={20}
                rows={5}
                placeholder="Description"
              >
              Description:              
              </textarea>
          </div>

          <div className='goals-radio' onChange={handleType}>
            

              <div>
                <input type="radio" id="daily" value='Daily'  name="type"/>
                <label htmlFor="daily">Daily</label>
              </div>  
              <div>
                <input type="radio" id="weekly" value='Weekly' name="type" onClick={toggleShowWeekly}/>
                <label htmlFor="weekly">Weekly</label>
              </div>
              <div>
                <input type="radio" id="monthly" value='Monthly'  name="type" onClick={toggleShowMonthly}/>
                <label htmlFor="monthly">Monthly</label>
              </div>
          </div>

          <div className='goals'>

          {showWeekly &&
              <input 
                type="number"
                name="weekly"
                value={frequency}
                onChange={handleFrequency}
                className="often"
                max={7}
              />
          }
          {showMonthly &&
              <input 
                type="number"
                name="monthly"
                value={frequency}
                onChange={handleFrequency}
                className="often"
                placeholder='/20'
                max={20}
              />
              
          }
          
          </div>

        </div>  
        <button type='submit' className='submit'>Add Goal!</button>   
      </form>
    </div>
  )
}

export default NewGoalPage