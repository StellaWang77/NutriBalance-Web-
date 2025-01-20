import logo from '../assets/logo.svg';
import '../style/login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import eye from '../assets/eye.png';
import hideEye from '../assets/eye-hide.png';
import { useState } from 'react';
const BACKEND = import.meta.env.VITE_BACKEND_IP;

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

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            // Send POST request to the backend
            const response = await fetch(`http://${BACKEND}:3000/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Login successful!');
                console.log('Response from server:', data);
            } else {
                // Handle backend error response
                const errorData = await response.json();
                setFieldError('general', errorData.message || errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
            setFieldError('general', 'Something went wrong. Please try again later.');
        } finally {
            setSubmitting(false); // Stop the submission spinner
        }
    };

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
                onSubmit={handleSubmit}
            >
                {({ isSubmitting,errors }) => (
                    <Form className='form-container'>
                        {errors.general && <div className="error-message">{errors.general}</div>}
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
                            <Link to='/forgotPassword'>Forgot Password</Link>
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
