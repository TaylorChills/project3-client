import '../NewGoalPage/NewGoalPage.css'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';



function EditGoalPage(props) {
    const[name, setName] = useState('')
    const[description, setDescription] = useState('')
    const[type, setType] = useState('')
    const[frequency, setFrequency] = useState('')
    const[streak, setStreak] = useState('')

    const navigate = useNavigate();
    const { goalId } = useParams();

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleType = (e) => setType(e.target.value)
    const handleFrequency = (e) => setFrequency(e.target.value)
    const handleStreak = (e) => setStreak(e.target.value)

    const storedToken = localStorage.getItem("authToken");


    const deleteGoal = () => {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/goals/${goalId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
          .then(() => navigate('/home'))
      }

      const fetchGoals = async () => {
        try {
          let response = await axios.get(`${process.env.REACT_APP_API_URL}/goals/${goalId}`, { headers: { Authorization: `Bearer ${storedToken}` }});
          let { name, description, type, frequency } = response.data;
          setName(name);
          setDescription(description);
          setType(type)
          setFrequency(frequency)
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        fetchGoals();
      }, []);

    

    const handleSubmit = (e) => {
        e.preventDefault()

        const body = { name, description, type, frequency, streak }

        axios
        .put(`${process.env.REACT_APP_API_URL}/goals/${goalId}`, body, { headers: { Authorization: `Bearer ${storedToken}` }} )
        .then((response) => {
          setName('')
          setDescription('')
          navigate(`/goals/${goalId}`)
        })
        .catch((err) => console.log(err))
    }

  return (
    <div>

    <h1>Edit Goal</h1>

    

      <form onSubmit={handleSubmit} id="goal-form">
        <div className='new-goal'>
          <Link to={"/home"}>back</Link>
          <div className='goals'>
            <label>Goal Name:</label>  <br />
              <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />
          </div>

          <div className='goals'>
            <label>Description:</label> <br />
              <textarea
                name="description"
                value={description}
                onChange={handleDescription}
                form="goal-form"
                cols={20}
                rows={5}
              >
              Description:              
              </textarea>
          </div>

          <div className='goals' onChange={handleType}>
            <label>Goal Type:</label> <br />

              <input type="radio" id="daily" value='Daily'  name="type"/>
              <label htmlFor="daily">Daily</label>  <br />

              <input type="radio" id="weekly" value='Weekly' name="type"/>
              <label htmlFor="weekly">Weekly</label>  <br />

              <input type="radio" id="monthly" value='Monthly'  name="type"/>
              <label htmlFor="monthly">Monthly</label>
          </div>

          <div className='goals'>
            <label>How Often:</label> <br />
            
              <input 
                type="number"
                name="weekly"
                value={frequency}
                onChange={handleFrequency}
              /> / 7 times a week

              <br />

              <input 
                type="number"
                name="monthly"
                value={frequency}
                onChange={handleFrequency}
              /> / 20 times a month
          </div>

        </div>  
        <button type='submit'>Confirm Changes</button>   
      </form>
      <button onClick={deleteGoal}>Delete Goal</button>
    </div>
  )
}

export default EditGoalPage