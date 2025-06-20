"use client";

export default function InputField({ name, type = "text", value, onChange, placeholder, label}) {
    return (
        <div className="input-field mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
            />
        </div>
    );
}
