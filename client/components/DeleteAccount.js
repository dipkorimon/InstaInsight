import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function DeleteAccount(props) {
    const [step, setStep] = useState("confirm");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    return (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-gray-900 text-gray-300 p-5 shadow-lg relative">
                {step === "confirm" && (
                    <>
                        <h2 className="text-xl font-bold mb-2">Confirm Account Deletion</h2>
                        <p className="mb-4 text-sm">
                            Please enter your password to permanently delete your account. This action is irreversible.
                        </p>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border px-3 py-2 rounded mb-4 bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500 pr-10 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep("loading")}
                                className="bg-red-600 text-white font-bold px-6 py-2 rounded hover:bg-red-700"
                            >
                                Delete Account
                            </button>
                            <button
                                onClick={props.onClose}
                                className="bg-gray-800 text-gray-300 font-bold px-6 py-2 rounded hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}

                {step === "loading" && (
                    <div className="text-center">
                        <p className="mb-2">Deleting your account...</p>
                        <span className="animate-spin h-5 w-5 border-4 border-gray-600 border-t-red-600 rounded-full inline-block"></span>
                    </div>
                )}

                {step === "success" && (
                    <>
                        <h2 className="text-xl font-bold text-green-400 mb-2">Account Deleted</h2>
                        <p className="text-sm text-gray-400">Your account has been successfully deleted.</p>
                    </>
                )}
            </div>
        </div>
    );
}
