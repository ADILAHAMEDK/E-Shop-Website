import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'

const Signin = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        name:Yup.string().required("Name is required"),
        email:Yup.string().email('Email is invalid').required("Email is required"),
        password:Yup.string().required("Password is required").min(6, "Password Should contain at least 6 characters"),
        confirmpassword : Yup.string().required().oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

    const handleSumbit = async(values, { setSubmitting})=>{

        const {name, email, password} = values
        console.log(name, "name...")
        try {
            const response = await axios.post("http://localhost:5000/api/users/register", {
                name, email, password
            });
            if(response.status === 201){
                navigate("/login")
            } 
            
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
            
        }finally{
            setSubmitting(false);
        }
      
    }
  return (
    <div className='max-w-sm mx-auto border p-4 mt-10'>
        <h1 className='text-3xl text-blue-500 mb-4'>Sign Up</h1>
        { error && <p className='text-red-600 mb-4'>{error}</p>}
        <Formik
        initialValues={{name: "", email: "", password: "", confirmpassword: ""}}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}
        >
            {({isSubmitting})=>(
            <Form>
        <div className='mb-4'>
            <label className='block text-gray-700'>Name:</label>
            <Field type="text" name="name" className='border p-2 w-full' />
            <ErrorMessage name='name' component="p" className='text-red-500' />
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700'>Email:</label>
            <Field type="email" name="email" className="border p-2 w-full" />
            <ErrorMessage name='email' component="p" className='text-red-500' />
        </div>
        <div className='mb-4'>
            <label className='block text-gray-700'>Password:</label>
            <Field type="password" name="password" className="border p-2 w-full" />
            <ErrorMessage name='password' component="p" className='text-red-500' />
        </div>
        <div className="mb-4">
            <label htmlFor='confirmpassword' className='block text-gray-700'>Confirm Password:</label>
            <Field type='password' id='confirmpassword' name='confirmpassword' className='border p-2 w-full' />
            <ErrorMessage name='confirmpassword' component='p' className='text-red-500' />
        </div>
        <button type='submit' disabled={isSubmitting} className='bg-black text-white px-2 py-1 rounded'>{isSubmitting ? "isSubmitting" : "Sign Up"}</button>
        </Form>
        )}
        </Formik>
        <p className='mt-4'>Already have an account? <Link to ="/login" className='text-red-700'>Login</Link></p>
    </div>
  )
}

export default Signin