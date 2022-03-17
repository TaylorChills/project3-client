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

    const navigate = useNavigate()


    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleType = (e) => setType(e.target.value)
    const handleFrequency = (e) => setFrequency(e.target.value)

    

    const handleSubmit = (e) => {
        e.preventDefault()
        const storedToken = localStorage.getItem("authToken");
        const body = { name, description, type, frequency, streak }

        axios
        .post(`${process.env.REACT_APP_API_URL}/goals`, body, { headers: { Authorization: `Bearer ${storedToken}` }})
        .then((response) => {
          setName('')
          setDescription('')
          navigate(`/home`)
        })
        .catch((err) => console.log(err))

    }

    /* const [showDaily, setShowDaily] = useState(false) */
    const [showWeekly, setShowWeekly] = useState(false)
    

    const toggle = () => {
      setShowWeekly(!showWeekly)
    }

    
   /*  const toggleShowMonthly = () => {
      setShowMonthly(!showMonthly)
    } */

  return (
    <div className='form'>

    
      <h1 className='goal-title'>New Goal</h1>
    <div className='trash-css'>  
      <Link to={"/home"} className="back">back</Link>
    </div>
    
      <form onSubmit={handleSubmit} id="goal-form">
        <div className='new-goal'>
          
          <div className='goals'>
              <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="un"
                placeholder="Goal Name"
                required
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
                required
              >
              Description:              
              </textarea>
          </div>

          <div className='goals-radio' onChange={handleType}>
              <div className='radio'>
                <input type="radio"  id="daily" value='Daily'  name="type" required/>

                <label htmlFor="daily">Daily</label>
              </div>  

              <div className='radio'>
                <input type="radio" id="weekly" value='Weekly' name="type" required/>
                <label htmlFor="weekly" onClick={toggle}>Weekly</label>
              </div>

              <div className='radio'>
                <input type="radio" id="monthly" value='Monthly'  name="type" required/>

                <label htmlFor="monthly" onClick={toggle}>Monthly</label>
              </div>
          </div>

          <div className='goals'>

          <br />

          {showWeekly  &&
            <>
              <h3>How Often</h3>
              <input 
                type="number"
                name="weekly"
                value={frequency}
                onChange={handleFrequency}
                className="often"
                max={20}
              />
            </>  
          }
          </div>
         {/* {showMonthly &&} */}
              {/* <input 
                type="number"
                name="monthly"
                value={frequency}
                onChange={handleFrequency}
                className="often"
                placeholder='   /20'
                max={20}
              /> */}
        </div>  
        <button type='submit' className='submit'>Add Goal!</button>   
      </form>
    </div>
  )
}

export default NewGoalPage