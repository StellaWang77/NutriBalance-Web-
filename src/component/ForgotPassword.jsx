import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../style/ForgotPassword.css'

function ForgotPassword() {
    const forgotPasswordValidationSchema = Yup.object({
        email:Yup.string().email('Please enter a valid email').required('Email is required'),
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
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('reset password request:', data);
                alert(`reset password link sent to ${values.email}`);
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
        <div>
            <div className='FP-nav'>
                <img src={logo} alt="logo" className='FP-img'/>
                <Link to="/">Log In</Link>
            </div>
            
            <Formik
                initialValues={{email: ''}}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={handleSubmit}
            >
                <form className='FP'>
                    <h1 className='FP-h1'>Request Password Reset</h1>
                    <div className='FP-form'>
                        <label  htmlFor="email">Please enter your email: </label>
                        <Field id='email' type='email' name='email' className='FP-form-input' />
                        <ErrorMessage name="email" component="div" className="error-message" />
                    </div>
                    <button type='submit' className='FP-submit-button'>Request Password Reset</button>
                </form>
            </Formik>
        </div>
    );
};

export default ForgotPassword;