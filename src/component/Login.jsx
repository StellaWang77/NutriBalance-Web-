import logo from '../assets/logo.svg';
import '../style/login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import eye from '../assets/eye.png';
import hideEye from '../assets/eye-hide.png';
import { useState } from 'react';

function Login() {
    const [passwordVisible, setPasswordVisible] = useState(true);

    // Validation schema using Yup
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    return (
        <>  
            <div className='container'>
                <div className='text-container'>
                    <h1 className='h1'>Welcome to NutriBalance</h1>
                    <h2 className='h2'>Get your personalized advice now!</h2>
                </div>
                <img src={logo} alt="logo" className='img'/>
            </div>

            <Formik
                initialValues={{ email: '', password: '', rememberMe: false }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    console.log(values); // Handle form submission here
                    alert('Login successful!');
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='form-container'>
                        <div className='form-group'>
                            <Field type='email' name='email' placeholder='Enter your email address' className='form-input' />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        
                        <div className='form-group'>
                            <div className='password-container'>
                                <Field type={passwordVisible ? 'password' : 'text'} name='password' placeholder='Enter your password' className='form-input' />
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
                            
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        <div className='form-options'>
                            <label className='check-option'>
                                <Field type='checkbox' name='rememberMe' className='checkbox' />
                                <span className='checkboxcontext'>Remember me</span>
                            </label>
                            <a href='/forgot-password' className='forgot-password'>Forgot Password</a>
                        </div>

                        <button type='submit' className='submit-button' disabled={isSubmitting}>Sign In</button>

                        <div className='divider'>
                            <hr />
                            <span>Or login with</span>
                            <hr />
                        </div>

                        <div className='social-login'>
                            <button type='button' className='google-button'>Google</button>
                            <button type='button' className='facebook-button'>Facebook</button>
                        </div>

                        <div className='register-link'>
                            <span>Don't have an account?</span>
                            <Link to="/signup">Register</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Login;
