import React, { useEffect, useState } from 'react';
import lord from '../../axios';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const Home = () => {
    const [info, setInfo] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [sear, setSear] = useState("");
    const [minPages, setMinPages] = useState('');
    const [maxPages, setMaxPages] = useState('');

    useEffect(() => {
        setLoader(true);
        lord.get('/books')
            .then((response) => {
                setInfo(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoader(false);
            });
    }, []);

    useEffect(() => {
        if (sear) {
            lord.get(`books/search?query=${sear}`)
                .then((data) => {
                    setInfo(data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [sear]);


    function hendelClik(id) {
        navigate(`books/${id}`);
    }

    function filterFunc(e) {
        e.preventDefault()

        if (minPages || maxPages) {
            lord.get(`books/filter?minPages=${minPages}&maxPages=${maxPages}`)
                .then((res) => {
                    setInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }

    return (
        <div className='bg-gradient-to-r from-orange-500 to-orange-600 pt-4 mt-20 pb-5'>
            <div className="max-w-[1360px] mx-auto flex mb-5 justify-between">
                <input
                    type="text"
                    placeholder="Search book title"
                    value={sear}
                    onChange={(e) => setSear(e.target.value)}
                    className="placeholder:text-white bg-transparent text-white border-b p-2 border-white outline-none"
                />
                <div className='flex gap-3'>
                    <input
                        className='placeholder:text-white capitalize bg-transparent text-white border-b p-2 border-white outline-none'
                        type="number"
                        placeholder='min'
                        value={minPages}
                        onChange={(e) => setMinPages(e.target.value)}
                    />

                    <input
                        className='placeholder:text-white capitalize bg-transparent text-white border-b p-2 border-white outline-none'
                        type="number"
                        placeholder='max'
                        value={maxPages}
                        onChange={(e) => setMaxPages(e.target.value)}
                    />

                    <button onClick={filterFunc} disabled={loader} className='border py-2 px-5 text-white text-xl rounded-md hover:bg-amber-500 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-400 '>{loader ? 'Loading...' : 'Filter'}</button>
                </div>
            </div>

            <div className="container mx-auto p-5 flex flex-wrap gap-7 justify-center">
                <span className='text-center flex justify-center'>
                    {loader && <HashLoader color='#fcd34d' size={300} />}
                </span>
                {
                    info.length > 0 && info.map((v) => (
                        <div
                            key={v.id}
                            onClick={() => { hendelClik(v.id); }}
                            className="border p-5 mb-4 shadow-lg w-72 object-cover bg-transparent shadow-white text-white  rounded-xl cursor-pointer hover:shadow-blue-400 hover:shadow-xl"
                        >
                            <img className='mx-auto mb-2 h-56 object-cover' src={v.thumbnailUrl} alt="book img" />
                            <h2 className="text-xl font-bold mb-2">{v.title}</h2>
                            <p className="mb-2"><strong>Page Count:</strong> {v.pageCount}</p>
                            <div className='flex gap-5 '>
                                <div className="mb-2">
                                    <strong>Authors:</strong>
                                    <ul>
                                        {v.authors && v.authors.map((author, index) => (
                                            <li key={index}>{author}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mb-2">
                                    <strong>Categories:</strong>
                                    <ul>
                                        {v.categories && v.categories.map((category, index) => (
                                            <li key={index}>{category}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
