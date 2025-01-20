import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

function ForgotPassword() {
    const forgotPasswordValidationSchema = Yup.object({
        email:Yup.string().email('Please enter a valid email').required('Email is required'),
    });

    const handleForgotPasswordSubmit = (values) => {
        console.log('reset password request:', values);
        alert(`reset password link sent to ${values.email}`);
    };

    return (
        <div>
            <Formik
                initialValues={{email: ''}}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={handleForgotPasswordSubmit}
            >
                <form>
                    <h1>Request Password Reset</h1>
                    <div className='FP-form'>
                        <label  htmlFor="email">Please enter your email:</label>
                        <Field id='email' type='email' name='email' className='FP-form-input' />
                        <ErrorMessage name="email" component="div" className="FP-error-message" />
                    </div>
                </form>
            </Formik>
        </div>
    );
};

export default ForgotPassword;