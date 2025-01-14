import  { useEffect } from "react";
import DynamicForm, { FieldConfig } from "./DynamicForm";
import { customValidator } from "../services/validator";
import { toast } from "../services/toast";
import { useRegisterMutation } from "../redux/api/authApi";

const fields: FieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    className: "w-full border border-gray-300 rounded px-3 py-2",
    rules: { required: true, min: 3, max: 50 },
  },
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
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [register, { isSuccess }] = useRegisterMutation();
  const schema = customValidator(fields);


  const onSubmit =  (values:any) => {
   register(values);
      console.log("Registration successful", values);
   
  };

  const { renderSingleInput, handleSubmit } = DynamicForm({
    schema,
    fields,
    onSubmit,
    defaultValues,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.showSuccess("Registration Successful");
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>{renderSingleInput("name")}</div>
            <div>{renderSingleInput("email")}</div>
            <div>{renderSingleInput("password")}</div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded mt-6 hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
