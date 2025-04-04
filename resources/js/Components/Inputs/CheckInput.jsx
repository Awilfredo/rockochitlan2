import { useId } from "react";

function CheckInput({
    label = "label",
    value = "",
    onChange = null,
    name = "name",
    type = "checkbox",
    checked = false,
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
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                required={required}
                className={`mt-1 h-6 w-6  block  border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} 
            />
        </div>
    );
}

export default CheckInput;
