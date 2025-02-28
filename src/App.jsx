
import { useRef , useState , useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import './index.css'
import AddNewTodo from './sections/AddNewTodo'
import CompletedTodo from './sections/CompletedTodo'
import Footer from './sections/Footer'
import Header from './sections/header'
import Todos from './sections/Todos'
import Share from './sections/Share';

function App () {

  const [shareableLink, setShareableLink] = useState("");

  const pendingRef = useRef(null);
  const completedRef = useRef(null);

  let [TodoList,SetTodoList] = useState([]);
  let [Todo,SetTodo] = useState('')
  let [importance,setImportance] = useState('')

  let [darkMode,setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  
  const showNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("Aflu List", { body: message });
    }
  };
  

  
  
  return (
    <main className={`min-h-screen bg-[#f2f0e4] dark:bg-[#080808] ${darkMode && "dark"} `}>
      <section className=''>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} TodoList={TodoList} />
      </section>

      <section>
        <Todos TodoList={TodoList} pendingRef={pendingRef} completedRef={completedRef} SetTodoList={SetTodoList} 
        DragDropContext={DragDropContext} Droppable={Droppable} Draggable={Draggable} showNotification={showNotification} />
      </section>

      <section>
        <AddNewTodo TodoList={TodoList} pendingRef={pendingRef} SetTodoList={SetTodoList} Todo={Todo} SetTodo={SetTodo}
                    importance={importance} setImportance={setImportance} />
      </section>

      <section>
        <CompletedTodo TodoList={TodoList} completedRef={completedRef} SetTodoList={SetTodoList} />
      </section>

      <section>
        <Share shareableLink={shareableLink} setShareableLink={setShareableLink} TodoList={TodoList} SetTodoList={SetTodoList} />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  )
}

export default App
