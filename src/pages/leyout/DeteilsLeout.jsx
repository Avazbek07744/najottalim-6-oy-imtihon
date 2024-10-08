import { NavLink, useNavigate } from 'react-router-dom'

const DeteilsLeout = ({ children }) => {
    const navigate = useNavigate()

    function hendelHome(e) {
        e.preventDefault()
        const request = window.confirm("Rostan ham Home page qaytmoqchimisiz")
        if (request) {
            navigate('/')
        }
    }

    return (
        <div className='flex flex-wrap flex-col '>
            <header className='w-full bg-transparent bg-orange-300 border-b-2 fixed'>
                <nav className='max-w-[1400px] w-full p-5 mx-auto flex justify-between'>
                    <button onClick={hendelHome} className='text-3xl text-white font-bold cursor-pointer'>Book</button>
                    <button onClick={hendelHome} className='bg-orange-300 shadow-lg shadow-orange-700/50 text-white py-2 px-5 text-lg font-semibold rounded-md capitalize'>Home</button>
                </nav>
            </header>

            <div className='w-full bg-orange-300 pb-[90.5px] mt-20'>
                {children}
            </div>

            <footer className='bg-orange-300 text-white border-t-2 flex py-5 text-2xl gap-5 justify-center border-white'>
                <p>Email address of the person who created the site</p>
                <p><a href="javazbek87@gmeil.com"> javazbek87@gmeil.com</a></p>
            </footer>
        </div>
    )
}

export default DeteilsLeout
