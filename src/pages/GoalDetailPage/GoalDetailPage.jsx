import "../GoalDetailPage/GoalDetailPage.css";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

function GoalDetails() {
  const [goal, setGoal] = useState(null);
  const [value, setValues] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  //const [selectedDate, setSelectedDate] = useState(null)

  const { goalId } = useParams();

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const fetchGoal = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/goals/${goalId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setGoal(response.data);
      setValues(response.data.dates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, []);

  //Calendar stuff

  const completionSubmit = (e) => {
    e.preventDefault();

    console.log(value);

    const body = { value };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/goals/${goalId}/send-dates`,
        body,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        fetchGoal();
        navigate(`/goal/${goalId}`);
      })
      .catch((err) => console.log(err));
  };

  function handleChange(selectedDates) {
    console.log("selecting dates");

    // console.log(`${selectedDates[0].month.number}/${selectedDates[0].day}/${selectedDates[0].year}`)
    setValues(selectedDates);
  }

  return (
    <div className="main">
      <br />

      {goal && (
        <>
          <div>
            <h1 className="detail-title">{goal.name}</h1>
            <div className="menu">
              <Link to={"/home"} className="button1">
                back
              </Link>
              <Link to={`/goal/edit/${goalId}`} className="button2">
                Edit Goal
              </Link>
            </div>
            <div className="calendar">
              <form onSubmit={completionSubmit}>
                <Calendar
                  maxDate={new Date()}
                  className="calendar"
                  value={value}
                  onChange={(e) => handleChange(e)}
                  multiple
                  format="MM/DD/YYYY"
                  sort
                  plugins={[<DatePanel />]}
                />
                <button type="submit" className="submit">
                  Make Changes
                </button>
              </form>
            </div>
            <div className="edit-details">
                <div className="edit-streak">
                    <p><b>Goal Type</b>: {goal.type}</p>
                    <p><b>Streak</b>: {goal.streak} days</p>
                </div>
                <div className="edit-description">
                    <p><b>Description:</b> </p>
                    <p>{goal.description}</p>
                </div>    
                
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalDetails;
