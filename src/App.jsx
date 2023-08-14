import { useState } from 'react';
import {BsPlusSquareFill} from 'react-icons/bs';
import {FiEdit2} from 'react-icons/fi';
import {AiOutlineDelete} from 'react-icons/ai'
function App() {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);
  const [isediting, setIsEditing] = useState(false)
   const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
   e.preventDefault();
   if(text && isediting) {
    setTodo(todo.map((item) => {
      if(item.id === editID) {
        return {...item, title: text}
      }
      return item
    }))
    setText('');
    setEditID(null);
    setIsEditing(false);

   }else {
    const newItem = {id:new Date().getTime().toString(), title: text};
    setTodo([...todo, newItem]);
    setText('')
   }
  }
const removeItem = (id) => {
setTodo(todo.filter((item) => item.id !== id))
}

const editItem = (id) => {
  const specificItem = todo.find((item)=> item.id === id);
  setIsEditing(true);
   setEditID(id);
  setText(specificItem.title)
}

  return (
    <>
    <section className="flex flex-col justify-center items-center my-4 esm:my-6 lg:my-10 2xl:my-12  2xl:mx-auto box-border  ">
      <h1 className="font-display xsm:text-base sm:text-xl md:text-xl 2xl:text-2xl">To-do List</h1>
      <p className="font-body  xsm:text-xs lg:text-base md:text-xl 2xl:text-2xl">Simple website to manage your daily to-do</p>
      <div className=" xsm:w-60 h-60 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96  bg-blue-100 mt-4 ">
        
          <form onSubmit={handleSubmit} className='pt-4 flex flex-row justify-center items-center gap-1'>
          <input type="text" placeholder='Write new to-do' className='xsm:text-sm md:text-base 2xl:text-xl xsm:w-44 2xl:w-64 2xl:p-1 ' value={text} onChange={(e) => setText(e.target.value)} />
          <button type='submit'>
          <BsPlusSquareFill className='xsm:text-xl md:text-2xl  2xl:text-3xl ' onClick={handleSubmit} />
          </button>
          
          </form>
        
        

        {/* the different to-dos */}
        <div className='pt-8 flex flex-col gap-2 justify-center items-center'>
          {todo.map((item) => {
            const {id, title} = item;
            return (
            <article key={id} className='xsm:w-52 lg:w-60 2xl:w-72 h-10 rounded-md bg-blue-400 flex flex-row  justify-center items-center shadow-md xsm:gap-24 2xl:gap-32'>
             <p>{title}</p>

             <div className='flex flex-row'>
              <button className='mr-2' type='button' onClick={() => editItem(id)} ><FiEdit2 /></button>
              <button  type='button' onClick={() => removeItem(id)}><AiOutlineDelete/></button>
             
            </div>
            </article>
            )
            
          })}
          

           
        </div>
      </div>
    </section>
    </>
  )
}

export default App
