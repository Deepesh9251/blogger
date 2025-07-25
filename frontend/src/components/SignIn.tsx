import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''
    });
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Welcome Back</h3>

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Sign in to your account</p>

        <form>
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address"  onChange={(e)=>setData({...data,email:e.target.value})}/>
            </div>

            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" onChange={(e)=>setData({...data,password:e.target.value})} />
            </div>

            <div className="flex items-center justify-center mt-4">
                <button 
                    className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    onClick={async (e) => {
                        e.preventDefault();
                        try {
                            const response = await axios.post(`https://backedn.walianitin406.workers.dev/api/v1/user/signin`, data);
                            const token = response.data.jwt || response.data.token;
                            if (token) {
                                localStorage.setItem('authToken', token);
                                navigate("/");
                            }
                        } catch (error) {
                            console.error(error);
                            alert("Sign in failed");
                        }
                    }}
                >
                    Sign In
                </button>
            </div>
        </form>
    </div>
    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

        <a href="/signup" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Sign Up</a>
    </div>
</div>
</div>
    </>
  )
}
