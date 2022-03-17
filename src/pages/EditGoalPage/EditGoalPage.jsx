import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../NewGoalPage/NewGoalPage.css'



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
          navigate(`/home`)
        })
        .catch((err) => console.log(err))
    }

    const [showWeekly, setShowWeekly] = useState(false)
    

    const toggle = () => {
      setShowWeekly(!showWeekly)
    }

  return (
    <div className='form'>
    <h1 className='edit-title'>Edit Goal</h1>
      <div className='menu'>
        <Link to={"/home"}  className='back'>back</Link>
        <button onClick={deleteGoal}  className='delete'>Delete Goal</button>
      </div>
    

      <form onSubmit={handleSubmit} id="goal-form">
        <div className='new-goal'>
          
          <div className='goals'>
            <h3>Goal Name</h3>  <br />
              <input 
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="un"
                required
              />
          </div>

          <div className='goals'>
            <h3>Description</h3> <br />
              <textarea
                name="description"
                value={description}
                onChange={handleDescription}
                form="goal-form"
                className='un'
                cols={20}
                rows={5}
                required
              >
              Description:              
              </textarea>
          </div>

          <div className='goals-radio' onChange={handleType}>
            
              <div className='radio'>
                <input type="radio" id="daily" value='Daily'  name="type" required/>
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
                max={7}
              />
            </>  
          }
          </div>

        </div>  
        <button type='submit'  className='submit'>Confirm Changes</button>   
      </form>
      
    </div>
  )
}

export default EditGoalPage