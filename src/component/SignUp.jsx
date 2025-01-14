import logo from '../assets/logo.svg';
import '../style/signup.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

function Signup() {
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
                onSubmit={(values) => {
                    console.log(values);
                    alert('Signup successful!');
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
                            <Field
                                type='password'
                                name='password'
                                placeholder='Enter your password'
                                className='form-input'
                            />
                            <ErrorMessage name='password' component='div' className='error-message' />
                        </div>

                        <div className='form-group'>
                            <Field
                                type='password'
                                name='confirmPassword'
                                placeholder='Confirm your password'
                                className='form-input'
                            />
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
