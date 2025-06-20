"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (form.password !== form.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setSuccess(data.msg);
                setForm({ username: "", email: "", password: "", confirm_password: "" });
                setTimeout(() => router.push("/auth/login/"), 3000);
            } else {
                setError(Object.values(data).flat().join(" "));
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="page-wrapper">
            <div className="card">
                <h2 className="heading">Create an Account</h2>
                {error && <p className="error-text">{error}</p>}
                {success && <p className="success-text">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-3 mb-4">
                    <InputField
                        name="username"
                        placeholder="Username"
                        label="Username"
                        value={form.username}
                        onChange={handleChange}
                    />
                    <InputField
                        name="email"
                        type="email"
                        placeholder="name@company.com"
                        label="Email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="Password"
                        label="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <InputField
                        name="confirm_password"
                        type="password"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        value={form.confirm_password}
                        onChange={handleChange}
                    />
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox"
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                                   required/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500">I accept
                                the <a className="font-medium text-blue-600 hover:underline"
                                       href="#">Terms and Conditions</a></label>
                        </div>
                    </div>
                    <SubmitButton text="Register"/>
                </form>
                <p className="text-sm font-light text-gray-500">
                    Already have an account? <Link href="/auth/login/"
                                                className="font-medium text-blue-600 hover:underline">Login
                    here</Link>
                </p>

            </div>
        </div>
    );
}
