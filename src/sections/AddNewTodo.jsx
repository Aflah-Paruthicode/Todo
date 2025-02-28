
const AddNewTodo = ({TodoList, SetTodoList , pendingRef ,Todo ,SetTodo ,importance ,setImportance }) => {

  const handleAddTodo = () => {
    if (Todo.trim() === "") {
      return Swal.fire({
        title: "Empty?",
        text: "Please Enter a Todo Task?",
        icon: "question"
      });
    } else if (importance.trim() ==='') {
      return Swal.fire({
        title: "Importance?",
        text: "Please Click Any Of The Importance?",
        icon: "question"
      });
    } else if (Todo.length > 22) {
      return Swal.fire({
        title: "Can You Make Todo a bit Shorter ?",
        text: "The Maximum Charecters is 22 !!",
        icon: "question"
      });
    }
  
    const newTodo = {
      id: Date.now(),
      text: `${Todo}`,
      completed: false,
      importance: importance, // Add importance to todo
    };
  
    SetTodoList([ newTodo, ...TodoList ]); // Add to state
    SetTodo(""); // Clear input
    setImportance("")

    setTimeout(() => {
      pendingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    
    <div className="flex justify-center items-center my-10 py-10">
        <div className="text-center">
            <h1 className="text-3xl max-sm:text-2xl
             font-bold text-center text-[#3d3028] dark:text-[#f1f1f1] py-4">Add New Todo</h1>
            <div>
        <input value={Todo} onChange={(e) => SetTodo(e.target.value)} type="text" placeholder="Enter todo..." className="outline-none p-5 m-3 border-b  
               dark:border-[#f1f1f1] dark:text-white  border-cyan-90 " />
        <button onClick={() => handleAddTodo()} className="bg-cyan-700 dark:bg-[#080808] dark:border font-bold text-amber-50 py-3 px-4 text-center rounded-2xl">Add Todo</button>
        </div>
            <div className="flex gap-5 p-5 items-center justify-center">
            <button className={`bg-red-500 p-3 dark:bg-[#8b0000]   background: darkred; rounded-2xl text-white font-semibold ${importance === "red" ? 'border-2 border-black dark:border-white' : 'border-none'} `} onClick={() => setImportance("red")}>No excuses!</button>
            <button className={` bg-orange-500 dark:bg-orange-700 p-3 rounded-2xl text-white font-semibold ${importance === "orange" ? 'border-2 border-black dark:border-white' : 'border-none'} `} onClick={() => setImportance("orange")}>Try to get it done today</button>
            <button className={` bg-yellow-400 dark:bg-yellow-600 p-3 rounded-2xl text-white font-semibold ${importance === "yellow" ? 'border-2 border-black dark:border-white' : 'border-none'} `} onClick={() => setImportance("yellow")}>Extra tasks if you have time</button>
            </div>
        </div>
    </div>
  )
}

export default AddNewTodo