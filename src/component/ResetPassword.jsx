import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../style/ResetPassword.css';
import eye from '../assets/eye.png';
import hideEye from '../assets/eye-hide.png';
import { useLocation } from 'react-router-dom';

const BACKEND = import.meta.env.VITE_BACKEND_IP;

function ResetPassword() {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
    const location = useLocation();
    const email = location.state?.email;

    const SignupSchema = Yup.object().shape({
            password: Yup.string()
                .matches(
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  "Password must 8 characters must include one uppercase, one lowercase, one number, one special character"
                )
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        });

    return (
            <div>
                <div className='FP-nav'>
                    <img src={logo} alt="logo" className='FP-img'/>
                    <Link to="/">Log In</Link>
                    <Link to="/signup">Register</Link>
                </div>

                <Formik
                    initialValues={{password: '', confirmPassword: '' }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        
                        try {
                            // send POST request to backend
                            const response = await fetch(`http://${BACKEND}:3000/api/reset-password`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: email,
                                    newPassword: values.password,
                                }),
                            });
                
                        if (response.ok) {
                            alert('Password reset successful! You can now login using your new password.')
                        } 
                        else {
                            // Handle backend error response
                            const errorData = await response.json();
                            console.log(errorData);
                            setFieldError('general', errorData.error || "Something went wrong.");
                        }
                        } catch (error) {
                            console.error('Error:', error);
                            setFieldError('general', 'Something went wrong. Please try again later.');
                        } finally {
                            setSubmitting(false); // Stop the submission spinner
                        }
                    }}
                >
                    {({isSubmitting})=>(
                        <Form>
                            <div className='form-group'>
                                <div className='password-container'>
                                    <Field
                                        type={passwordVisible ? 'password' : 'text'}
                                        name='password'
                                        placeholder='Enter your new password'
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
                                        placeholder='Confirm your new password'
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
                                Reset Password
                            </button>
                        </Form>
                    )}
                    
                </Formik>
                
                 
            </div>
        );
};

export default ResetPassword;