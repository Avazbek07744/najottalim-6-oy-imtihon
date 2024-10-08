import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lord from '../../../axios';

const Register = () => {
    const [salom, setSalom] = useState(true);
    const FirstnameRef = useRef();
    const LastnameRef = useRef();
    const ageRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const FormRef = useRef();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        const isValid = /^(?=.*[a-zA-Z]).{4,}$/;
        return isValid.test(password);
    };

    function validate() {
        if (FirstnameRef.current.value.length < 3) {
            alert('Firstname is not valid');
            FirstnameRef.current.focus();
            return false;
        }

        if (!validateEmail(emailRef.current.value)) {
            alert('Email is not valid');
            emailRef.current.focus();
            return false;
        }

        if (!validatePassword(passwordRef.current.value)) {
            alert("Parol kamida 4 ta belgidan iborat bo'lishi va unda kamida bitta harf bo'lishi kerak.");
            passwordRef.current.focus();
            return false;
        }

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            alert("Parollar mos kelmaydi");
            rePasswordRef.current.focus();
            return false;
        }

        return true;
    }

    function handleClick(e) {
        e.preventDefault();
        let isValid = validate();
        setSalom(false);

        if (!isValid) {
            return;
        }

        const user = {
            "email": emailRef.current.value,
            "firstName": FirstnameRef.current.value,
            "lastName": LastnameRef.current.value,
            "age": ageRef.current.value,
            "password": passwordRef.current.value,
            "confirmPassword": rePasswordRef.current.value
        };

        lord.post('/register', user)
            .then((response) => {
                const data = response.data;
                if (data.message) {
                    navigate('/login');
                }
                FormRef.current.reset();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='bg-gradient-to-r from-orange-400 to-orange-500 text-white pt-10 h-[100vh]'>
            <form ref={FormRef} className='container max-w-[500px] p-5 flex flex-col gap-3 mx-auto  shadow-lg rounded-md shadow-white'>
                <h2 className='text-2xl font-bold capitalize text-center'>forma</h2>
                <input defaultValue={'azizbek'} className='border-b-2 border-white bg-transparent p-3 w-full outline-none' ref={FirstnameRef} type="text" placeholder='Enter firstname...' />
                <input defaultValue={'abdurahimov'} className='border-b-2 border-white bg-transparent p-3 w-full outline-none' ref={LastnameRef} type="text" placeholder='Enter lastname...' />
                <input defaultValue={'16'} className='border-b-2 border-white bg-transparent p-3 w-full outline-none' ref={ageRef} type="number" placeholder='Enter age...' />
                <input defaultValue={'javazbek@gmail.com'} className='border-b-2 border-white bg-transparent p-3 w-full outline-none' ref={emailRef} type="email" placeholder='Enter email...' />
                <input defaultValue={'Ab145'} className='border-b-2 border-white bg-transparent p-3 w-full outline-none' ref={passwordRef} type="password" placeholder='Enter password...' />
                <input defaultValue={'Ab145'} className='border-b-2 border-white bg-transparent p-3 w-full outline-none' ref={rePasswordRef} type="password" placeholder='Re-enter password...' />
                <Link to='/login' className='py-5'>Login ga o'tish</Link>
                <button onClick={handleClick} className='bg-gradient-to-r from-amber-300 to-amber-500 hover:from-pink-500 hover:to-orange-500 py-3 text-2xl rounded-md'>{salom ? 'Register' : 'Loading...'}</button>
            </form>
        </div>
    );
}

export default Register;
