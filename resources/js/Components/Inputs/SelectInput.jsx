import { useId } from "react";

function SelectInput({
    label = "label",
    name = "name",
    value = "",
    children,
    onChange,
    required,
}) {
    const id = useId();
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1 w-full block px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required={required}
            >
                {children}
            </select>
        </div>
    );
}

export default SelectInput;
