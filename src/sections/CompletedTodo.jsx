
import { motion, AnimatePresence } from "framer-motion";


const CompletedTodo = ({ TodoList , completedRef , SetTodoList }) => {

  const playSound = (src) => {  
    const audio = new Audio(src);  
    audio.play();  
  };

  return (
   <AnimatePresence className="my-5 lg:min-h-[21vh] max-sm:my-8 " ref={completedRef} >
        <div className="flex items-center justify-center flex-col gap-5 px-4 dark:gap-7 ">
            <h1 className="text-3xl max-sm:text-2xl font-bold text-[#3d3028] text-center  dark:text-[#f1f1f1]  ">Completed</h1>
    {TodoList.map((Todo) => {

    if(Todo.completed) {

      return (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} >
        <div div className="  text-end  ">
        <div className="w-2xl p-5  text-white font-bold capitalize  shadow-2xl rounded-lg bg-green-600 dark:border-2 dark:bg-[darkgreen] max-sm:w-sm  dark:text-[#f1f1f1] ">
                <h1 className="text-center">
                    {Todo.text}
                </h1>
                
        </div>

        <button onClick={() => {Swal.fire({
  title: "Are you sure?",
  text: "Want to delete this Todo!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your Todo has been deleted.",   
      icon: "success",
    });
    setTimeout(() => {
      SetTodoList(TodoList.filter((object) => Todo.id !== object.id));
      playSound("/public/delete.mp3"); 
    }, 1500);
  }
})}} className=" bg-red-600 dark:bg-red-800 dark:border-2 mx-5 cursor-pointer hover:scale-105 rounded-full py-2 px-3 m-2 text-white"><i class="fa-solid fa-trash"></i></button>

      </div>
      </motion.div>
)

}

})

  }
</div>

  </AnimatePresence>
  )
}

export default CompletedTodo