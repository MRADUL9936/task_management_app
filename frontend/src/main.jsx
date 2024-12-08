import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,Route,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AllTasks from './components/AllTasks.jsx'
import TaskForm from './components/TaskForm.jsx'


const router=createBrowserRouter(
  createRoutesFromElements([
    <Route path='/' element={<App/>}>
      <Route path='' element={<AllTasks/>}></Route>
      <Route path='addtask'  element={<TaskForm/>}/>

    </Route>

  ])
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}/>
    {/* <App />
    </RouterProvider> */}
  </StrictMode>,
)
