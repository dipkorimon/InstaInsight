import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="page-wrapper">
            <div className="card">
                <h2 className="heading">Sign in to your account</h2>

                <form className="space-y-3 mb-4">
                    <InputField
                        name="username"
                        placeholder="Username"
                        label="Username"
                    />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="password"
                        label="Password"
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox"
                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                                       required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500">Remember
                                    me</label>
                            </div>
                        </div>
                        <a href="#"
                           className="text-sm font-medium text-blue-600 hover:underline">Forgot
                            password?</a>
                    </div>
                    <SubmitButton text="Sign in"/>
                </form>
                <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet? <Link href="/auth/register/"
                                                     className="font-medium text-blue-600 hover:underline">Register
                    here</Link>
                </p>

            </div>
        </div>
    );
}