import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {FaGoogle } from "react-icons/fa6";
import './authentication.css';
import { register, signInWithGoogle } from './firebase';

export default function Register() {
    const { register: formRegister, handleSubmit, formState: { errors } } = useForm();
    const formRef = useRef();

    const onSubmit = data => {
        register(data.email, data.password);
    };

    const handleKeypadClick = (event) => {
        if (event.key === "Enter") {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
        }
    };

    return (
        <div className="form-container">
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeypadClick} className='register'>
                <label>Full Name</label>
                <input {...formRegister("username", { required: true })} />
                {errors.username && <p className='errorMsg'>This field is required</p>}

                <label>Phone Number</label>
                <input type="tel" {...formRegister("phoneNumber", { required: true, pattern: /^[0-9]{10}$/ })} />
                {errors.phoneNumber && <p className='errorMsg'>Please provide a valid phone number (10 digits)</p>}

                <label>Email</label>
                <input type="email" {...formRegister("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && <p className='errorMsg'>Please provide a valid email</p>}

                <label>Password</label>
                <input 
                type="password" autoComplete='off'
                {...formRegister("password", { 
                required: "Password is required",
                minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters"
                },
                pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Password must contain at least an uppercase letter, a number and special character"
                }
                })}/>
                { errors.password && <p className='errorMsg'>{errors.password.message}</p>}

                <button type="submit" value="Register" className='registerBtn'>Register</button>

                <h4>Or use Google</h4>
                <div className='ssoBtns'>
                    <button className='ssoBtn' onClick={signInWithGoogle}>
                        <FaGoogle />
                    </button>
                </div>
                <p className='links'>Already have an account? <Link to="/login" className='log'>Login</Link></p>
            </form>
        </div>
    );
}
