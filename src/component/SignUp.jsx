import logo from '../assets/logo.svg';
import '../style/signup.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import eye from '../assets/eye.png'
import hideEye from '../assets/eye-hide.png'

function Signup() {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    return (
        <>
            <div className='container'>
                <div className='text-container'>
                    <h1 className='h1'>Create Your Account</h1>
                    <h2 className='h2'>Join NutriBalance today!</h2>
                </div>
                <img src={logo} alt="logo" className='img' />
            </div>

            <Formik
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                validationSchema={SignupSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    
                    try {
                        // 发送 POST 请求到后端
                        const response = await fetch('http://192.168.1.66:3000/api/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: values.username,
                                email: values.email,
                                password: values.password,
                            }),
                        });
            
                        if (!response.ok) {
                            throw new Error(`Failed to register: ${response.message}`);
                        }
            
                        const data = await response.json();
                        alert('Signup successful!');
                        console.log('Response from server:', data);
                    } catch (error) {
                        console.log(error);
                        alert('Signup failed! Please try again.');
                    } finally {
                        setSubmitting(false); // 结束提交状态
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='form-container'>
                        <div className='form-group'>
                            <Field
                                type='text'
                                name='username'
                                placeholder='Enter your username'
                                className='form-input'
                            />
                            <ErrorMessage name='username' component='div' className='error-message' />
                        </div>

                        <div className='form-group'>
                            <Field
                                type='email'
                                name='email'
                                placeholder='Enter your email address'
                                className='form-input'
                            />
                            <ErrorMessage name='email' component='div' className='error-message' />
                        </div>

                        <div className='form-group'>
                            <div className='password-container'>
                                <Field
                                    type={passwordVisible ? 'password' : 'text'}
                                    name='password'
                                    placeholder='Enter your password'
                                    className='form-input'
                                />
                                <button
                                    type='button'
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className='toggle-button'
                                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                                >
                                    <img
                                        src={passwordVisible ? eye : hideEye}
                                        alt={passwordVisible ? 'Hide password' : 'Show password'}
                                        className='toggle-icon'  
                                    />
                                </button>
                            </div>
                            
                            <ErrorMessage name='password' component='div' className='error-message' />
                        </div>

                        <div className='form-group'>
                            <div className='password-container'>
                                <Field
                                    type={confirmPasswordVisible ? 'password' : 'text'}
                                    name='confirmPassword'
                                    placeholder='Confirm your password'
                                    className='form-input'
                                />
                                <button
                                    type='button'
                                    onClick={()=> setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    className='toggle-button'
                                    aria-label={confirmPasswordVisible ? 'Hide password' : 'Show password'}
                                >
                                    <img 
                                        src={confirmPasswordVisible ? eye : hideEye}
                                        alt={confirmPasswordVisible ? 'Hide password' : 'Show password'}
                                        className='toggle-icon'
                                    />
                                </button>
                            </div>
                            
                            <ErrorMessage name='confirmPassword' component='div' className='error-message' />
                        </div>

                        <button type='submit' className='submit-button' disabled={isSubmitting}>
                            Sign Up
                        </button>

                        <div className='login-link'>
                            <span>Already have an account?</span>
                            <Link to="/">Log In</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Signup;
