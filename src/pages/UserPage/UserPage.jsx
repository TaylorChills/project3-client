import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../UserPage/UserPage.css";

function UserPage() {
  const [quotes, setQuotes] = useState(null);
  const [goals, setGoals] = useState([]);
  /* const [user, setUser] = useState([]) */

  const storedToken = localStorage.getItem("authToken");

  const fetchGoals = async () => {
    try {
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
      let randomQuote =
        quotesFromApi[Math.floor(Math.random() * quotesFromApi.length)];
      setQuotes(randomQuote);
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
      <h1 className="header">Your Goals</h1>

      {/* <Link to={"/new-goal"} className="submit">Add new Goal</Link> */}
      {/* User profile pic */}

      {/* Inspirational Quotes */}
      {quotes && (
        <div className="quote-box">
          <div className="quote">
            <h4>{quotes.author}</h4> <br />
            <p>{quotes.text}</p>
          </div>
        </div>
      )}

      {/* User goals will be displayed here */}
      <div className="container">
        {goals.map((goal) => {
          return (
            <>
              <Link to={`/goal/${goal._id}`}>
                <div className="card">

                  <div>
                    <h3>{goal.name}</h3>
                    <p>{goal.description}</p>
                  </div>

                  <div className="goal-type">
                    <p><b>Type</b>: {goal.type}</p>
                    <p><b>Streak</b>: {goal.streak}</p>
                    <p><b>Frequency</b>: {goal.frequency} days</p>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default UserPage;


   //Cloudinary
/* 
   const [imageUrl, setImageUrl] = useState('')

    const uploadData = new FormData();
    uploadData.append("file", imageUrl);

    const upload = async () => await axios.post(`${process.env.REACT_APP_API_URL}/upload`,uploadData, { headers: { Authorization: `Bearer ${storedToken}` } }
    );

    , imageUrl: upload.data.fileUrl */