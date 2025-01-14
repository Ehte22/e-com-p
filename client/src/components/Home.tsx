import { z } from "zod";
import DynamicForm, { FieldConfig } from "./DynamicForm";
import { customValidator, ValidationRules } from "../services/validator";

const fields: FieldConfig[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    // className: "form-control col-md-6 col-lg-4",
    className: "form-control",
    rules: { required: true, min: 2, max: 16 }
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    // className: "form-control col-md-6 col-lg-4",
    className: "form-control",
    rules: { required: true, email: true }
  },
 
];

const defaultValues = {
  username: "",
  email: "",
 
}

export interface ExtractedRule {
  name: string;
  rules: ValidationRules | ExtractedRule[];
}

const Home = () => {
//   const [addUser] = useAddFormMutation()

  const schema = customValidator(fields)

  type FormValues = z.infer<typeof schema>

  const onSubmit = (values: FormValues) => {
    console.log(values);


  };



  const { renderSingleInput, handleSubmit, previewImages } = DynamicForm({ schema, fields, onSubmit, defaultValues })

  // return <FormArray />

  return <>
    <div className="container mt-5 border border-1 border-black p-4 ">
      <h1 className="my-4 text-center">Dynamic Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="row mt-3 ">
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('username')}
          </div>
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('email')}
          </div>
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('phone')}
          </div>
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('gender')}
          </div>
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('hobbies')}
          </div>
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('profile')}
            <div>
              {
                previewImages &&
                <>
                  {Array.isArray(previewImages)
                    ? <div >
                      {(previewImages as string[]).map((src: string, index: number) => (
                        <img
                          key={index}
                          src={src}
                          alt="Preview"
                          className=""
                          style={{ width: "100px", height: "70px", marginRight: "10px", borderRadius: "5px" }}
                        />
                      ))}
                    </div>
                    : <div>
                      <img
                        src={previewImages as string}
                        alt="Preview"
                        style={{ width: "100px", height: "70px", marginRight: "10px", borderRadius: "5px" }}
                      />
                    </div>
                  }
                </>
              }
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('country')}
          </div>
          <div className="col-sm-6 col-lg-4">
            {renderSingleInput('desc')}
          </div>

          <div className="col-sm-12 col-lg-8 ">
            {renderSingleInput('experience')}
          </div>
        </div>
        <div className="text-end mt-3">
          <button type="submit" className="btn btn-dark">Add User</button>
        </div>
      </form>
      {/* {renderFullForm()} */}
    </div>
  </>
};

export default Home;
