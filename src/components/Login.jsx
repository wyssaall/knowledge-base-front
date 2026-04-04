import React from 'react'

function Login() {
    return (
        <div className="flex flex-1 items-center justify-center min-h-screen bg-gradient-to-r from-green-300 to-green-700 px-4">

            <div className="w-full max-w-md backdrop-blur-lg bg-white/90 p-8 rounded-2xl shadow-2xl border border-white/30">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
                    Welcome Back
                </h2>


                {/* Inputs */}
                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Username"
                        className="border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-sm"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-200 p-3 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 shadow-sm"
                    />



                    {/* Button */}
                    <button className="bg-green-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg active:scale-[0.98] transition-all duration-200">
                        Login
                    </button>
                </div>




            </div>
        </div>
    )
}

export default Login