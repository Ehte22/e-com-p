import { z } from "zod";
import DynamicForm, { FieldConfig } from "./DynamicForm";
import { customValidator, ValidationRules } from "../services/validator";
import { useLoginMutation } from "../redux/api/authApi";
import { useEffect } from "react";
import { toast } from "../services/toast";

const fields: FieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    className: "w-full border border-gray-300 rounded px-3 py-2",
    rules: { required: true, email: true },
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    className: "w-full border border-gray-300 rounded px-3 py-2",
    rules: { required: true, min: 6, max: 20 },
  },
];

const defaultValues = {
  email: "",
  password: "",
};

export interface ExtractedRule {
  name: string;
  rules: ValidationRules | ExtractedRule[];
}

const Login = () => {
  const [login, {isSuccess}]= useLoginMutation()
  const schema = customValidator(fields);

  type FormValues = z.infer<typeof schema>;

  const onSubmit = (values: FormValues) => {
    console.log("Form Submitted", values);
    login(values);
    
  };

  const { renderSingleInput, handleSubmit } = DynamicForm({
    schema,
    fields,
    onSubmit,
    defaultValues,
  });

  useEffect(()=>{
    if(isSuccess){
      toast.showSuccess("Login Success")
    }
  }, [isSuccess])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>{renderSingleInput("email")}</div>
            <div>{renderSingleInput("password")}</div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-6 hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
