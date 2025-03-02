    import React from 'react';
    import { useForm } from 'react-hook-form';
    import { Link } from 'react-router-dom';
    import { FaGoogle } from "react-icons/fa";
    import './authentication.css';
    import { login, signInWithPhoneNumber, signInWithGoogle } from './firebase'; // Path to your firebase.js file

    export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        const { username, password } = data;
        if (username.includes('@')) {
        // User entered an email address
        await login(username, password);
        } else {
        // User entered a phone number
        const appVerifier = window.recaptchaVerifier; // This assumes you've set up reCAPTCHA
        await signInWithPhoneNumber(username, appVerifier);
        }
    };

    const handleKeypadClick = (event, action) => {
        if (event.key === "Enter") {
        // Trigger the button click event when the "Enter" key is pressed
        action();
        }
    };

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email or Phone Number</label>
            <input {...register("username", { required: true })} placeholder="Email or phone number" />
            {errors.username && <p className='errorMsg'>This field is required</p>}

            <label>Password</label>
            <input type="password" autoComplete='on' {...register("password", { required: true })} placeholder="Password..." />
            {errors.password && <p className='errorMsg'>This field is required</p>}

            <button
            type="submit" 
            value="login"
            className='loginBtn'
            onKeyDown={(e) => handleKeypadClick(e, handleSubmit(onSubmit))}
            >
            Login
            </button>

            <h4>Or use Google</h4>

            <div className='ssoBtns'>
            <button className='ssoBtn' onClick={signInWithGoogle}>
                <FaGoogle />
            </button>
            </div>
            <p className='links'>Don't have an account? <Link to="/register" className='reg'>Register</Link></p>
        </form>
        </div>
    );
    }
