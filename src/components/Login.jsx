import React, { useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import authService from '../authservice/auth';
import { login } from '../store/authslice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const loginUser = async (data) => {
        setError("");
        try {
            const session = await authService.login(data); 
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData)); 
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message); 
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(loginUser)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email:"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                        />

                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
