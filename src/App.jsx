import { useState } from 'react'
import Todo_List from './Components/Todo_List'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Todo_List/>
    </>
  )
}

export default App
