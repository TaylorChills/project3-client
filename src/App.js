import './React-Calendar.css'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import UserPage from './pages/UserPage/UserPage';
import SignupPage from './pages/SignupPage/SignupPage';
import NewGoalPage from './pages/NewGoalPage/NewGoalPage';
import LoginPage from './pages/LoginPage/LoginPage';
import GoalDetails from './pages/GoalDetailPage/GoalDetailPage';
import EditGoalPage from './pages/EditGoalPage/EditGoalPage';
import IsPrivate from './components/IsPrivate/IsPrivate';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}/>


        {/* <Route path='/home' element={<UserPage/>}/> */}

        <Route
        path='/home' 
        element={
            
          <UserPage/>
          }/>
        
        <Route path='/new-goal' element={<NewGoalPage/>}/>
        <Route path='/goal/:goalId' element={<GoalDetails/>}/>
        <Route path='/goal/edit/:goalId' element={<EditGoalPage/>} />
      </Routes>

    </div>
  );
}

export default App;
