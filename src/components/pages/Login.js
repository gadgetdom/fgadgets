    import React from 'react';
    import { useForm } from 'react-hook-form';
    import { Link } from 'react-router-dom';
    import { FaFacebookF, FaApple, FaGoogle } from "react-icons/fa";
    import './authentication.css';
    import { login, signInWithPhoneNumber, signInWithGoogle, signInWithFacebook, signInWithApple } from './firebase'; // Path to your firebase.js file

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

            <p className='links'>Don't have an account? <Link to="/register" className='reg'>Register</Link></p>

            <h4>Or</h4>

            <div className='ssoBtns'>
            <button className='ssoBtn' onClick={signInWithGoogle}>
                <FaGoogle />
            </button>
            <button className='ssoBtn' onClick={signInWithApple}>
                <FaApple />
            </button>
            <button className='ssoBtn' onClick={signInWithFacebook}>
                <FaFacebookF />
            </button>
            </div>
        </form>
        </div>
    );
    }
