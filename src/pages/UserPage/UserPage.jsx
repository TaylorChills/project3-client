import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link,  useParams, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar'
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

function UserPage() {
  const [quotes, setQuotes] = useState(null);
  const [goals, setGoals] = useState([]);

  /* for delete */
  

  //Fetch Users and Goals? Should I only fetch one or both

  


  const fetchGoals = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/goals`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

      setGoals(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  
  useEffect(() => {
    fetchGoals();
  }, []);


  const fetchQuotes = async () => {
    try {
      let response = await axios.get("https://type.fit/api/quotes");
      let quotesFromApi = response.data;
      console.log(quotesFromApi);
      let randomQuote = quotesFromApi[Math.floor(Math.random() * quotesFromApi.length)]
      setQuotes(randomQuote)
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchQuotes();
  }, []);


  return (
    <div className="home-page">


      {/* Display users name here */}
      <h1>Home Page</h1>
      
      <Link to={"/new-goal"}>Add new Goal</Link>
      {/* User profile pic */}


      {/* Inspirational Quotes */}
      {quotes && (
        <div>
        <h4>{quotes.author}</h4>
        <p>{quotes.text}</p>
      </div>)}

      {/* User goals will be displayed here */}

      <div className="user-goals">
        {goals.map((goal) => {
          return (
            <div key={goal._id}>
              <h3>{goal.name}</h3>
              <p>{goal.description}</p>
              <p>{goal.type}</p>
              <p>{goal.frequency}</p>
              <p>{goal.steak}</p>
        
              <Link to={`/goal/${goal._id}`}>Details</Link>

              
            </div>
          )
        })}

      </div> 
    </div>
  );
}

export default UserPage;
