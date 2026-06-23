import React, { useState } from 'react'
import authService from '../../appwrite/auth'
import { login as storeLogin } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from '../index'
import { useForm } from 'react-hook-form'

function Signup() {
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

    // const [loading, setLoading] = useState(true);

    const signup = async (data) => {

        setSubmitError("");                         // Good Practice

        try {
            const session = await authService.signup(data);
            if (session) {
                const userData = await authService.getUser();
                if (userData) dispatch(storeLogin({ userData }));
                navigate("/");
            }
        } catch (error) {
            setSubmitError(error?.message || "Acount Creation failed");           // Good Practice
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
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Include this ERROR in the <FORM /> */}
                {submitError && (<p className="text-red-600 mt-8 text-center">{submitError}</p>)}

                <form onSubmit={handleSubmit(signup)}>
                    <div className='space-y-5'>
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            type="name"
                            {...register("name", {
                                // required: true,
                                required: "Name is required",
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",

                                validate: {
                                    matchThisPatternBro: (value) =>
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                    "Email address is invalid"
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                // 1. Accepts a boolean or a custom string error message
                                // required: true,          OR
                                required: "Password is required",

                                
                                // 2. Length Constraint
                                minLength: {
                                    value: 8,
                                    message: "Must be at least 8 characters"
                                },
                                
                                // 3. Custom Validation rule
                                validate: {
                                    hasNumber: (value) =>
                                    /\d/.test(value) ||
                                    "Password must contain a number",

                                    hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    "Password must contain an uppercase letter",

                                    hasSpecialChar: (value) =>
                                    /[!@#$%^&*]/.test(value) ||
                                    "Password must contain a special character",
                                },

                                /*      Another Way  -->
                                validate: {
                                    matchThisPatternBro: (value) =>
                                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                                    "Email address is invalid"
                                }
                                */
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup