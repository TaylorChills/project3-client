import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar'

function UserPage() {
  const [quotes, setQuotes] = useState([]);
  const [goals, setGoals] = useState([]);

  //Fetch Users and Goals? Should I only fetch one or both

  const fetchGoals = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/projects`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
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

      setQuotes(quotesFromApi)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="home-page">

    <Calendar />

      {/* Display users name here */}
      <h1>Home Page</h1>
      <Link to={"/new-goal"}>Add new Goal</Link>
      {/* User profile pic */}

      {/* <div>
        <h4>{randomQuote.author}</h4>
        <p>{randomQuote.text}</p>
      </div> */}

      {/* User goals will be displayed here */}
    </div>
  );
}

export default UserPage;
