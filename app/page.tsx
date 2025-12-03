'use client'

import { signIn } from "next-auth/react"

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-purple-50 to-purple-100 p-6">
            <h1 className="text-3xl font-bold mt-8">CS391 OAuth</h1>

            <div className="mt-20 bg-white p-10 rounded-xl shadow-md w-[350px] text-center">
                <h2 className="text-2xl font-semibold mb-2">OAuth Demo</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Sign in with your preferred provider
                </p>

                <button
                    onClick={() => signIn("github")}
                    className="block w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
                >
                    Sign in with GitHub
                </button>
            </div>
        </main>
    )
}
