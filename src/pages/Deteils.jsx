import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import lord from '../../axios'

const Deteils = () => {
    const param = useParams()
    const [more, setMore] = useState(false)
    const [books, setBooks] = useState({})

    useEffect(() => {
        lord.get(`/books/${param.id}`)
            .then((data) => {
                setBooks(data.data)
            })
    }, [param.id])

    return (
        <div className='container flex gap-5 justify-center items-start p-7 bg-transparent mt-20'>
            <img className='p-5 shadow-xl w-72 object-cover rounded-xl bg-transparent border' src={books.thumbnailUrl} alt="book img" />
            <div className="border p-5 shadow-xl w-max h-max rounded-xl cursor-pointer bg-transparent text-white">
                <h2 className="text-xl font-bold mb-2">{books.title}</h2>
                <p className={`w-[500px]  ${!more ? 'line-clamp-3' : ''}`}>{books.longDescription}</p>
                <button className='text-blue-500 text-xl my-2' onClick={() => setMore(!more)}>
                    {more ? 'Show less' : 'Learn more'}
                </button>
                <p className="mb-2"><strong>Page Count:</strong> {books.pageCount}</p>
                <div className='flex gap-5 '>
                    <div className="mb-2">
                        <strong>Authors:</strong>
                        <ul>
                            {books.authors && books.authors.map((author, index) => (
                                <li key={index}>{author}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mb-2">
                        <strong>Categories:</strong>
                        <ul>
                            {books.categories && books.categories.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deteils

