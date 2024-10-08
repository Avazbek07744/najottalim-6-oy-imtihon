import { NavLink, useNavigate } from 'react-router-dom'

const Mainleout = ({ children }) => {
    const navigate = useNavigate()

    function hendelLogin(e) {
        e.preventDefault()
        const request = window.confirm("Rostan ham loginga qaytmoqchimisiz")
        if (request) {
            navigate('/login')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }

    function hendelClick(e) {
        e.preventDefault()
        navigate('/')
    }
    return (
        <div className='flex flex-wrap flex-col'>
            <header className='w-full bg-transparent bg-gradient-to-r from-orange-800 to-orange-600 border-b-2 fixed'>
                <nav className='max-w-[1400px] w-full p-5 mx-auto flex justify-between'>
                    <button onClick={hendelClick} className='text-3xl text-white font-bold cursor-pointer'>Books</button>
                    <div className='flex items-center gap-8 font-semibold text-xl text-white'>
                        <NavLink to='/'>Home</NavLink>
                    </div>
                    <button onClick={hendelLogin} className='bg-amber-700 shadow-lg shadow-amber-200/50 text-white py-2 px-5 text-lg font-semibold rounded-md capitalize hover:bg-amber-500 transition duration-300'>Log out</button>
                </nav>
            </header>
            <div className='w-full h-full'>
                {children}
            </div>
            <footer className='bg-gradient-to-r from-orange-800 to-orange-600 text-white border-t-2 flex py-5 text-2xl gap-5 justify-center border-white'>
                <p>Email address of the person who created the site</p>
                <p><a href="javazbek87@gmeil.com"> javazbek87@gmeil.com</a></p>
            </footer>
        </div>
    )
}

export default Mainleout
