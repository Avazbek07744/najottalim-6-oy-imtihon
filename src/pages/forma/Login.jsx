import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import lord from '../../../axios'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    function validateForm() {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Email noto\'g\'ri kiritilgan');
            return false;
        }

        if (password.length < 4) {
            alert('Parol kamida 4 ta belgidan iborat bo\'lishi kerak');
            return false;
        }

        return true;
    }

    function hendelSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const userForm = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value
        }

        setLoading(true)

        if (emailRef.current.value == '' || passwordRef.current.value == '') {
            alert("Iltimos loginni to'ldiring")
            setLoading(false)
        }

        lord.post('/login', userForm)
            .then((response) => {
                const data = response.data;

                if (data.message === 'User Not found') {
                    alert("Username yoki parol noto'g'ri");
                }

                if (data.user) {
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('user', JSON.stringify(data));
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error);
                alert("Parol yoki email noto'g'ri");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className='bg-gradient-to-r from-orange-400 to-orange-500 text-white pt-10 h-[100vh]'>
            <form ref={formRef} onSubmit={hendelSubmit} className='w-1/3 p-5 flex flex-col mx-auto gap-5 shadow-md shadow-white rounded-md mt-10'>
                <input defaultValue={'javazbek88@gmail.com'} className='w-full p-2 border rounded-md bg-transparent' ref={emailRef} type="text" placeholder='Enter email...' />
                <input defaultValue={'Ab145'} className='w-full p-2 border rounded-md bg-transparent' ref={passwordRef} type="password" placeholder='Enter password...' />
                <button disabled={loading} className='bg-gradient-to-r from-amber-400 to-amber-500 hover:from-pink-500 hover:to-orange-500 py-2 text-xl rounded-md'>{loading ? 'Loading...' : 'Login'}</button>
                <Link to='/register'>Register ga o'tish</Link>
            </form>
        </div>
    )
}

export default Login;
