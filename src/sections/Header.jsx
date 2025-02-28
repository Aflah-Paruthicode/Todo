
const Header = ({ toggleDarkMode , darkMode }) => {
  return (
    
    <div className='flex justify-between px-10 max-sm:px-5 items-center  dark:text-[#424141]'>
        <img src="/aflu-list-high-resolution-logo-transparent.png" alt="Logo"
        className='w-15 py-3 max-sm:w-10 max-sm:py-5' />
        <button className='bg-blue-500 dark:bg-[#080808] dark:border  py-4 max-sm:py-3 px-7 max-sm:px-4 max-sm:text-[13px] rounded-full font-bold 
         text-white hover:scale-105 transition-all duration-300' onClick={toggleDarkMode}>{darkMode ? "Light Mode" : `Dark Mode`} </button>
    </div>

  )
}

export default Header