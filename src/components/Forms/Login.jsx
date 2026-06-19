import React, { useState } from 'react'
import authService from '../../appwrite/auth'
import { login as storeLogin } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from '../index'
import { useForm } from 'react-hook-form'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState("");
    
    const { register, handleSubmit, } = useForm();
    /*  OR Initialize defaultValues  -->

    const { register, handleSubmit, } = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });
    */

    const login = async (data) => {

        setSubmitError("");                         // Good Practice

        try {
            const session = await authService.login(data); 
            if (session) {
                const userData = await authService.getUser()
                if (userData) dispatch(storeLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setSubmitError(error?.message || "Login failed");           // Good Practice
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* Include this ERROR in the <FORM /> */}
                {submitError && (<p className="text-red-600 mt-8 text-center">{submitError}</p>)}

                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {})}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login