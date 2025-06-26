"use client";

export default function InputField({ name, type = "text", value, onChange, placeholder, label, icon: Icon }) {
    return (
        <div className="input-field mb-4">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <Icon className="text-lg" />
                    </span>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                        Icon ? "pl-10" : ""
                    }`}
                    required
                />
            </div>
        </div>
    );
}
