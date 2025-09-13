import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [finished, setFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS =(params) =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFInished = (e) =>{
   setFinished(!finished)
  }

  const handleEdit =(e,id) =>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
    return item.id !== id
   });
   setTodos(newTodos)
   saveToLS()
  }

  const handleDelete =(e,id) =>{
   let newTodos = todos.filter(item=>{
    return item.id !== id
   });
   setTodos(newTodos)
saveToLS()
  }
  const handleAdd =() =>{
   setTodos([...todos, { id: uuidv4(), todo, isCompleted: false}])
   setTodo("")
saveToLS()
  }
  const handleChange =(e) =>{
   setTodo(e.target.value)
  }

  const handleCheckbox =(e) =>{
   let id = e.target.name;
   let index = todos.findIndex(item =>{
    return item.id === id;
    
   })
   let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   saveToLS()
  }

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-3  border rounded-xl bg-[#DCDCDC] p-3 
      min-h-[80vh]  md:min-w-[80%]">
        <div className="addTodo my-8">
          <h2 className='font-semibold text-xl mb-5'>
            <span className='cursor-pointer hover:font-bold  transition-all '>Add a Todo</span>
            </h2>
            <div className='flex justify-between'>
            <input onChange={handleChange} value={todo} type="text" className='w-1/2 pl-4 border rounded-2xl'/>
            <button onClick={handleAdd}  disabled={todo.length<3} className='bg-[#E62727] hover:bg-[#b42121] px-7 py-2 border rounded-full text-white font-bold mx-5'>Save</button>
            </div>
        </div>
        
        <input type="checkbox" onChange={toggleFInished}  checked={finished}  className='mb-5 hover:font-semibold cursor-pointer'/>  <span className=' font-semibold  hover:font-bold cursor-pointer'>Show Finished</span>
        
        <h2 className="font-semibold text-xl mb-3">
          <span className='cursor-pointer hover:font-bold  transition-all'> Your Todos</span>
          </h2>
          <div className="todos">
            {todos.length === 0 && <div className='font-bold text-xl text-center my-8'>Nothing is planned!!!!</div>}
            {todos.map(item =>{

            return (finished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between">
            <div className='flex  items-center gap-5 font-semibold'>
               <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} 
              name={item.id} id="" />
              <div className= {item.isCompleted?"line-through":"" }>{item.todo}</div>
              </div> 
              <div className="buttons py-2 flex">
              <button  onClick={(e)=>handleEdit(e,item.id)}  className='bg-[#E62727] hover:bg-[#b42121] px-5 py-1 border rounded-2xl text-white font-bold mx-3'>Edit</button>
              <button  onClick={(e)=>handleDelete(e,item.id)}  className='bg-[#E62727] hover:bg-[#b42121] px-5 py-1 border rounded-2xl text-white font-bold mx-3'>Delete</button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
