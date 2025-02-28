
import { useEffect  } from "react";
import { motion, AnimatePresence } from "framer-motion";


const Share = ({shareableLink , setShareableLink , TodoList , SetTodoList }) => {

    
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get("todos");
    

    if (sharedData) {
      try {
        const decodedTodos = JSON.parse(decodeURIComponent(sharedData));
        SetTodoList(decodedTodos);

        setTimeout(() => {
          window.history.replaceState({}, document.title, window.location.origin + window.location.pathname);
        }, 1000);

      } catch (error) {
        console.error("Error decoding shared todos:", error);
      }
    }
  }, []);


  const generateSharableLink = () => {
      const encodedTodos = encodeURIComponent(JSON.stringify(TodoList));
      const url = `${window.location.origin}?todos=${encodedTodos}`;
      if(shareableLink) {
        setShareableLink('');
      } else {

          setShareableLink(url);
      }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
        Swal.fire({
            title: "Copied",
            text: "Sharable link copied to clipboard!",
            icon: "success",
            draggable: true,
          });
    });
  };
      

  return (
    <div className="text-center py-14 px-3">
        <div className="shadow-2xl rounded-2xl p-2 m-2" >
        <h1 className="text-3xl max-sm:text-2xl font-bold text-[#3d3028] text-center p-4  dark:text-[#f1f1f1]  "> Share Your Todo List</h1>
        <p className="p-4 max-sm:text-start dark:text-[#545454c9] font-display " >Easily share your todo list with others! Click the "Generate Sharable Link" button to create a unique link. Copy and send it to anyone, and they can view your list instantly.</p>
        
        <div className="todo-container p-3">
      {/* Button to Generate Link */}
      <button 
        onClick={generateSharableLink} 
        className="bg-blue-500 dark:bg-[#080808] dark:border font-bold text-amber-50 py-3 px-4 mt-3 text-center rounded-2xl"
      >
        Generate Sharable Link
      </button>

      {/* Display Link & Copy Button */}
      {shareableLink && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} exit={{ opacity: 0 }}  className="mt-2 flex items-center gap-2 p-3">
          <input 
            type="text" 
            value={shareableLink} 
            readOnly 
            className="border px-3 py-2 w-full dark:text-white rounded-md"
          />
          <button 
            onClick={copyToClipboard} 
            className="bg-green-500 dark:bg-green-700 text-white px-3 py-2 rounded-md"
          >
            <i class="fa-solid fa-copy"></i>
          </button>
        </motion.div>
      )}
    </div>
    </div>
    </div>
  )
}

export default Share