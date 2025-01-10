import logo from './assets/logo.svg'
import './Login.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login(){
    return(
    <>  
        <div className='container'>
            <div className='text-container'>
                <h1 className='h1'>Welcome to NutriBalance</h1>
                <h2 className='h2'>Get your personalized advice now!</h2>
            </div>
            <img src={logo} alt="logo" className='img'/>
        </div>

        <Formik
        initialValues={{ email: '', password: '', rememberMe: false }}>
            
            <Form className='form-container'>
                <div className='form-group'>
                    <Field type='email' name='email' placeholder='Enter your email address' className='form-input'></Field>
                    <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                
                <div className='form-group'>
                    <Field type='password' name='password' placeholder='Enter your password' className='form-input'></Field>
                    <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div className='form-options'>
                    <label className='check-option'>
                        <Field type='checkbox' name='rememberMe' className='checkbox'></Field>
                        
                        <span className='checkboxcontext'>Remember me</span>
                    </label>
                    <a className='forgot password'>Forgot Password</a>
                </div>

                <button type='submit' className='submit-button'>Sign In</button>

                <div className='divider'>
                    <span>Or login with</span>
                </div>

                <div className='social-login'>
                    <button type='button' className='google-button'>Google</button>
                    <button type='button'className='facebook-button'>Facebook</button>
                </div>

                <div className='register-link'>
                    <span>Don't have an account?</span>
                    <a>Register</a>
                </div>
            </Form>
            
        </Formik>
        
    </>
    )
    
}

export default Login