import { DndContext, closestCenter } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useEffect  } from "react";

const Todos = ({ TodoList, pendingRef, completedRef , SetTodoList , showNotification  }) => {

 


  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = TodoList.findIndex((todo) => todo.id === active.id);
    const newIndex = TodoList.findIndex((todo) => todo.id === over.id);

    SetTodoList(arrayMove(TodoList, oldIndex, newIndex));
  };

  
const completedCount = TodoList.filter(todo => todo.completed).length;
const totalCount = TodoList.length;
const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    SetTodoList(storedTodos);
  }, []);
  
  useEffect(() => {
    if (TodoList.length > 0) {
      localStorage.setItem("todos", JSON.stringify(TodoList));
    }
  }, [TodoList]);


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={TodoList} strategy={verticalListSortingStrategy}>
      {TodoList.length > 0 &&   (<motion.div initial={{ opacity: 0, scale: 0.5 }} className="fixed bottom-4 right-4 bg-cyan-700 text-white dark:text-[#545454c9] px-5 py-3 rounded-2xl font-bold dark:border-2 dark:border-[#545454c9] dark:bg-transparent "
       animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} >
        Completed : {completionPercentage}%
        </motion.div>)}
          <div className="p-4" >
        <div ref={pendingRef} className="flex items-center justify-center flex-col gap-5">
          <h1 className="text-3xl max-sm:text-2xl font-bold text-center text-[#3d3028] dark:text-[#f1f1f1] py-4">
            Todo List
          </h1>

          

          {TodoList.map((TODO) => {
            if(!TODO.completed) {
                return (
                  <motion.div key={TODO.id} 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}>

                    <SortableItem key={TODO.id} todo={TODO} SetTodoList={SetTodoList} TodoList={TodoList} completedRef={completedRef} showNotification={showNotification} />
                    
                  </motion.div>
                ) 
              }
          })

          
          
          }


        </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};


// Sortable Item Component
const SortableItem = ({ todo, SetTodoList, TodoList, completedRef , showNotification }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const playSound = (src) => {  
    const audio = new Audio(src);  
    audio.play();  
  };

  let bg = todo.importance === "red" ? "red-600" : todo.importance === "orange" ? "orange-500" : "yellow-400";
  let bgDark = todo.importance === "red" ? "[#8b0000]" : todo.importance === "orange" ? "orange-800" : "yellow-800";

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to delete this Todo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Todo has been deleted.",   
          icon: "success",
        });
        setTimeout(() => {
          SetTodoList(TodoList.filter((object) => todo.id !== object.id));
          playSound("/public/delete.mp3"); 
        }, 1500);
      }
    });
  };

  const handleRename = (todo) => {
    const isDarkMode = document.documentElement.classList.contains("dark"); // ✅ Check if dark mode is enabled
  
    Swal.fire({
      title: " Update Todo! ",
      html: `
        <input id="swal-input-text" class="swal2-input ${isDarkMode ? 'dark:bg-gray-800 dark:text-white dark:border-gray-600' : ''}" value="${todo.text}" placeholder="Enter new name">
        <select id="swal-input-color" class="swal2-select ${isDarkMode ? 'dark:bg-gray-800 dark:text-white dark:border-gray-600' : ''}">
          <option value="red" ${todo.importance === "red" ? "selected" : ""}>High (Red)</option>
          <option value="orange" ${todo.importance === "orange" ? "selected" : ""}>Medium (Orange)</option>
          <option value="yellow" ${todo.importance === "yellow" ? "selected" : ""}>Low (Yellow)</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#4A90E2",
      cancelButtonColor: "#d33",
      customClass: {
        popup: isDarkMode ? "bg-gray-900 text-white" : "",
        title: isDarkMode ? "text-white" : "",
        confirmButton: isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "",
        cancelButton: isDarkMode ? "bg-red-600 hover:bg-red-700" : "",
      },
      preConfirm: () => {
        const newText = document.getElementById("swal-input-text").value.trim();
        const newColor = document.getElementById("swal-input-color").value;
  
        if (!newText) {
          Swal.showValidationMessage("Todo name cannot be empty!");
        }
  
        return { newText, newColor };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        SetTodoList(TodoList.map((object) =>
          object.id === todo.id
            ? { ...object, text: result.value.newText, importance: result.value.newColor }
            : object
        ));
  
        Swal.fire({
          title: "Updated!",
          text: "Your Todo has been updated.",
          icon: "success",
          customClass: {
            popup: isDarkMode ? "bg-gray-900 text-white" : "",
          },
        });
      }
    });
  };

  const handleComplete = () => {
    playSound("/public/click.mp3"); 

    Swal.fire({
      title: "Good Job!",
      icon: "success",
      draggable: true,
    });

    SetTodoList(
      TodoList.map((object) => {
        if (todo.id === object.id) {
          return { ...object, completed: true };
        }
        return object;
      })
    );

    showNotification("Task completed! 🎉")

    setTimeout(() => {
      completedRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };



  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="px-5 dark:border-b-gray-900 flex flex-col justify-center items-center">
      <div className={`py-5 px-10 shadow-2xl dark:bg-${bgDark} rounded-2xl bg-${bg} dark:text-white dark:border-2 w-2xl max-sm:w-sm `}>
        <h1 className="text-center rounded-2xl text-white font-semibold capitalize tracking-wide">{todo.text}</h1>
      </div>
      <div className="w-full flex justify-center p-3 mb-5">
        {/* ✅ FIXED: Stop drag interference with onPointerDown */}
        <button onPointerDown={(e) => e.stopPropagation()} onClick={handleDelete} className="bg-red-600 dark:bg-red-800 dark:border-2 cursor-pointer hover:scale-105 rounded-full py-2 px-3 m-2 text-white">
          <i className="fa-solid fa-trash"></i>
        </button>
        <button onPointerDown={(e) => e.stopPropagation()} onClick={() => handleRename(todo)} className="bg-cyan-600 dark:bg-cyan-700 dark:border-2 cursor-pointer hover:scale-105 text-white rounded-full py-2 px-3 m-2">
          <i className="fa-solid fa-pencil"></i>
        </button>
        <button onPointerDown={(e) => e.stopPropagation()} onClick={handleComplete} className="bg-green-600 dark:bg-green-700 dark:border-2 cursor-pointer hover:scale-105 text-white rounded-full py-2 px-3 m-2">
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>

    
  );
};


export default Todos;