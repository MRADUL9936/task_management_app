import { createContext,useContext } from "react"



export const TaskContext=createContext({
            tasks:[],
            taskToUpdate:null,
   addtask:(task)=>{},
   updatetask:(id,task)=>{},
   deletetask:(id)=>{},
   onUpdate:(taskUpdate)=>{}
})

export const TaskProvider=TaskContext.Provider

export const usetask=()=>{
   return useContext(TaskContext)
}