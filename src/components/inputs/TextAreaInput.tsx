"use client";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextAreaInput: React.FC<InputProps> = ({
  id,
  label,
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        rows={5}
        placeholder=" "
        className={`
                peer w-full p-2 pt-4 font-light bg-white border-2 rounded-md outline-none transition 
                disabled:opacity-70 disabled:cursor-not-allowed pl-4
                ${errors[id] ? "border-rose-500" : "border-neutral-300"}
                ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
            `}
      ></textarea>
      <label
        className={`absolute text-sm duration-150 transform -translate-y-3 top-4 z-10 origin-[0] left-4  
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
                    ${errors[id] ? "text-rose-500" : "text-zinc-400"}
            `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextAreaInput;
