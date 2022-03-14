import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import UserPage from './pages/UserPage/UserPage';
import SignupPage from './pages/SignupPage/SignupPage';
import NewGoalPage from './pages/NewGoalPage/NewGoalPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/home' element={<UserPage/>}/>
        <Route path='/new-goal' element={<NewGoalPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
