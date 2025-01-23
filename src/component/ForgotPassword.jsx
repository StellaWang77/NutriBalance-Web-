import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate}from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../style/ForgotPassword.css'
const BACKEND = import.meta.env.VITE_BACKEND_IP;

function ForgotPassword() {
    const navigate = useNavigate();
    const [isVerificationStep, setIsVerificationStep] = useState(false);

    const forgotPasswordValidationSchema = Yup.object({
        email:Yup.string().email('Please enter a valid email').required('Email is required'),
    });

    const verificationValidationSchema = Yup.object({
        vCode: Yup.string()
            .matches(/^\d{6}$/, 'Verification code must be 6 digits')
            .required('Verification code is required'),
    });

    const handleEmailSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            // Send POST request to the backend
            const response = await fetch(`http://${BACKEND}:3000/api/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                }),
            });

            if (response.ok) {
                setIsVerificationStep(true);
            } else {
                // Handle backend error response
                const errorData = await response.json();
                setFieldError('general', errorData.error || "Something went wrong.");
                
            }
        } catch (error) {
            console.log('Error:', error);
            setFieldError('general', 'Something went wrong. Please try again later.');
        } finally {
            setSubmitting(false); // Stop the submission spinner
        }
    };

    const handleVerificationSubmit = async (values, { setSubmitting, setFieldError }) => {
        try {
            // Send POST request to the backend
            const response = await fetch(`http://${BACKEND}:3000/api/verify-reset-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    code: values.vCode,
                }),
            });

            if (response.ok) {
                const email = values.email
                navigate('/ResetPassword', { state: { email }})
            } else {
                // Handle backend error response
                const errorData = await response.json();
                console.log(errorData);
                setFieldError('general', errorData.error || "Invalid verification code.");
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
                <Link to="/signup">Register</Link>
            </div>
            
            {!isVerificationStep ? (
                <Formik
                    initialValues={{email: ''}}
                    validationSchema={forgotPasswordValidationSchema}
                    onSubmit={handleEmailSubmit}
                >
                    {({isSubmitting, errors}) => (
                        <Form className='FP'>
                            
                            <h1 className='FP-h1'>Request Password Reset</h1>
                            <div className='FP-form'>
                                <label  htmlFor="email">Please enter your email: </label>
                                <Field id='email' type='email' name='email' className='FP-form-input' />
                                <ErrorMessage name="email" component="div" className="error-message" />
                                {errors.general && <div className="error-message">{errors.general}</div>}
                            </div>
                            
                            <button type='submit' className='FP-submit-button' disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Request Password Reset'}</button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <Formik
                    initialValues={{vCode: ''}}
                    validationSchema={verificationValidationSchema}
                    onSubmit={handleVerificationSubmit}
                >
                    {({isSubmitting, errors}) => (
                        <Form className='FP-verification'>
                            <h1 className='FPV-h1'>Password Reset Verification</h1>
                            <p>A verification link has been sent to your email. Please check your inbox and enter the 6-digit code in the following field.</p>
                            <div className='FPV-form'>
                                <label  htmlFor="vCode">Enter the 6-digit code here: </label>
                                <Field id='vCode' type='text' name='vCode' className='FPV-form-input' />
                                <ErrorMessage name="vCode" component="div" className="error-message" />
                                {errors.general && <div className="error-message">{errors.general}</div>}
                            </div>
                            <button type='submit' className='FPV-submit-button' disabled={isSubmitting}>{isSubmitting ? 'Verifying' : 'Verify'}</button>
                        </Form>
                    )}
                    
                </Formik>
            )}
            
        </div>
    );
};

export default ForgotPassword;