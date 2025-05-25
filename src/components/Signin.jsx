import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from "../authservice/auth";
import { login } from '../store/authslice';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Logo from './Logo';

function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState('');

    const Create = async (data) => {
        setError('');
        try {
            let user = await authService.createAccount(data);
            if (user) {
                let current = await authService.getCurrentUser();
                if (current) {
                    dispatch(login(current));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message); // fixed "massage" typo
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don’t have an account?&nbsp;
                    <Link
                        to="/Signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(Create)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Full Name:"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: true,
                            })}
                        />
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
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;
