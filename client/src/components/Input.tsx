import { InputProps } from "@/types";

const Input = ({
  type,
  name,
  title,
  onChange,
  id,
  placeholder,
  value,
}: InputProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
