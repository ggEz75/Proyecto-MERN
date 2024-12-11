import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TasksPage from './pages/TasksPage'
import TasksFormPage from './pages/TasksFormPage'
import Profile from './pages/Profile'


function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/Register' element={<RegisterPage />}/>

      <Route path='/tasks' element={<TasksPage/>}/>
      <Route path='/tasks/new' element={<TasksFormPage/>}/>
      <Route path='/tasks/1/edit' element={<TasksFormPage/>}/>
      <Route path='/profile' element={<Profile/>}/>

    </Routes>
    
  )
}

export default App