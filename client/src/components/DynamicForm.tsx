import { useForm, Controller, FieldValues, DefaultValues, Path, UseFormSetValue, PathValue, useFieldArray, ArrayPath, FieldErrors } from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { ValidationRules } from "../services/validator";

export interface FieldConfig {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    options?: { label?: string; value?: string | number }[];
    className?: string
    accept?: string
    multiple?: boolean
    displayName?: string
    rows?: number
    cols?: number
    errorClass: string;
    formArray?: FieldConfig[],
    formGroup?: {
        [key: string]: {
            name: string;
            label?: string;
            type?: string;
            placeholder?: string;
            options?: { label?: string; value?: string | number }[];
            className?: string
            accept?: string
            multiple?: boolean
            displayName?: string
            rows?: number
            cols?: number
            rules: ValidationRules
        }
    }
    rules: ValidationRules
}

interface DynamicFormProps<T extends FieldValues> {
    schema: ZodSchema<T>;
    fields: FieldConfig[];
    onSubmit: (data: T) => void;
    defaultValues: DefaultValues<T>
}

const getErrorMessage = <T extends FieldValues>(
    fieldName: string,
    index: number,
    subFieldName: string,
    errors: FieldErrors<T> // This is likely the type you're getting from React Hook Form
) => {
    // Check if the fieldName exists in the errors
    const fieldErrors = errors[fieldName];
    if (fieldErrors && Array.isArray(fieldErrors)) {
        const error = fieldErrors[index];
        if (error) {
            return error[subFieldName]?.message || null; // Safely access message
        }
    }
    return null;
};

const DynamicForm = <T extends FieldValues>({
    schema,
    fields,
    onSubmit,
    defaultValues
}: DynamicFormProps<T>) => {

    const [previewImages, setPreviewImages] = useState<string | string[]>()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues
    });

    const formArray = fields.find((item) => item.type === "form-array")

    const { fields: arrayFields, append, remove } = useFieldArray({
        control,
        name: formArray?.name as ArrayPath<T>
    })

    const handleChange = <T extends FieldValues>(
        e: ChangeEvent<HTMLInputElement>,
        name: string,
        multiple: boolean,
        setValue: UseFormSetValue<T>
    ) => {
        const { files } = e.target;


        let previews

        if (files && files.length > 0) {
            if (multiple) {
                setValue(name as Path<T>, files as unknown as PathValue<T, Path<T>>, {
                    shouldValidate: true,
                });

                const fileArray = Array.from(files);
                previews = fileArray.map((file) => URL.createObjectURL(file));

                setPreviewImages(previews)
            } else {
                setValue(name as Path<T>, files as unknown as PathValue<T, Path<T>>, {
                    shouldValidate: true
                });

                previews = URL.createObjectURL(files[0])
                setPreviewImages(previews)
            }
        }

    };

    // Function to render a single input field
    const renderInput = (field: FieldConfig) => {

        return <>
            <div key={field.name} className={`col-${field.className || 'sm-12'} my-2`}>
                <label htmlFor={field.name} className="block text-lg font-medium text-gray-700">
                    {field.label}
                </label>
                <Controller
                    key={field.name}
                    name={field.name as Path<T>}
                    control={control}
                    render={({ field: controllerField }) => {
                        switch (field.type) {
                            case "text":
                            case "password":
                            case "email":
                            case "number":
                            case "color":
                            case "range":
                            case "date":
                            case "time":
                                return (
                                    <input
                                        {...controllerField}
                                        type={field.type}
                                        className={`${field.className}${errors[field.name] ? field.errorClass : ""}`}
                                        placeholder={field.placeholder}
                                        id={field.name}
                                    />
                                );
                            case "select":
                                return (
                                    <select {...controllerField} id={field.name} className={field.className || ""}>
                                        {field.options?.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                );
                            case "radio":
                                return (
                                    <div className="d-flex">
                                        {field.options?.map((option) => (
                                            <div key={option.value} style={{ marginRight: "1rem" }}>
                                                <input
                                                    id={`radio-${option.value}`}
                                                    type="radio"
                                                    value={option.value}
                                                    className={field.className || ""}
                                                    checked={controllerField.value === option.value}
                                                    onChange={(e) => controllerField.onChange(e.target.value)}
                                                />
                                                <label htmlFor={`radio-${option.value}`} style={{ marginLeft: "0.5rem" }}>
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                );
                            case "checkbox":
                                return (
                                    <div key={field.name} className="d-flex align-items-center">
                                        {field.options?.map((option) => (
                                            <div key={option.value} className="me-3 d-flex align-items-center">
                                                <input
                                                    id={`checkbox-${option.value}`}
                                                    type="checkbox"
                                                    value={option.value}
                                                    className={field.className || ""}
                                                    onChange={(e) => {
                                                        const newValue = controllerField.value || [];
                                                        if (e.target.checked) {
                                                            controllerField.onChange([...newValue, option.value]);
                                                        } else {
                                                            controllerField.onChange(
                                                                newValue.filter((val: string | number) => val !== option.value)
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`checkbox-${option.value}`}
                                                    style={{ marginLeft: "0.5rem" }}
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                );

                            case "file":
                                return (
                                    <input
                                        type="file"
                                        id={field.name}
                                        onChange={(e) => handleChange(e, field.name, field.multiple!, setValue)}
                                        className={field.className || ""}
                                        accept={field.accept || "*"}
                                        multiple={field.multiple || false}
                                    />
                                );
                            case "text-area":
                                return (
                                    <textarea
                                        {...controllerField}
                                        id={field.name}
                                        className={field.className || ""}
                                        placeholder={field.placeholder}
                                        rows={field.rows}
                                        cols={field.cols}
                                    ></textarea>
                                );

                            case "form-array":
                                return (
                                    <div key={field.name} className="p-4">
                                        <h4>{field.displayName}</h4>
                                        {arrayFields.map((item, index) => (
                                            <div key={item.id} className="row">
                                                {field.formArray?.map((subField) => {
                                                    const fieldName = `${field.name}[${index}].${subField.name}`;

                                                    return (
                                                        <div
                                                            key={`${fieldName}-${subField.name}`}
                                                            className={`col-${subField.className || "sm-12"} my-2 `}
                                                        >
                                                            <label htmlFor={subField.name} className="form-label">
                                                                {subField.label}
                                                            </label>
                                                            <Controller
                                                                key={fieldName}
                                                                name={fieldName as Path<T>}
                                                                control={control}
                                                                rules={subField.rules}
                                                                render={({ field: controllerField }) => {
                                                                    switch (subField.type) {
                                                                        case "text":
                                                                        case "password":
                                                                        case "email":
                                                                        case "number":
                                                                        case "color":
                                                                        case "range":
                                                                        case "date":
                                                                        case "time":
                                                                            return (
                                                                                <input
                                                                                    {...controllerField}
                                                                                    type={subField.type}
                                                                                    className={`form-control ${subField.className || ""}`}
                                                                                    placeholder={subField.placeholder}
                                                                                    id={fieldName}
                                                                                />
                                                                            );
                                                                        case "select":
                                                                            return (
                                                                                <select
                                                                                    {...controllerField}
                                                                                    id={fieldName}
                                                                                    className={`form-control ${subField.className || ""}`}
                                                                                >
                                                                                    {subField.options?.map((option) => (
                                                                                        <option
                                                                                            key={option.value}
                                                                                            value={option.value}
                                                                                        >
                                                                                            {option.label}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            );
                                                                        case "radio":
                                                                            return (
                                                                                <div className="d-flex align-items-center">
                                                                                    {subField.options?.map((option) => (
                                                                                        <div
                                                                                            key={`${fieldName}-${option.value}`}
                                                                                            className="me-3 d-flex align-items-center"
                                                                                        >
                                                                                            <input
                                                                                                type="radio"
                                                                                                id={`${fieldName}-${option.value}`}
                                                                                                value={option.value}
                                                                                                className={`form-check-input ${subField.className || ""}`}
                                                                                                checked={
                                                                                                    controllerField.value ===
                                                                                                    option.value
                                                                                                }
                                                                                                onChange={(e) =>
                                                                                                    controllerField.onChange(
                                                                                                        e.target.value
                                                                                                    )
                                                                                                }
                                                                                            />
                                                                                            <label
                                                                                                htmlFor={`${fieldName}-${option.value}`}
                                                                                                style={{
                                                                                                    marginLeft: "0.5rem",
                                                                                                }}
                                                                                            >
                                                                                                {option.label}
                                                                                            </label>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            );
                                                                        case "checkbox":
                                                                            return (
                                                                                <div className="d-flex align-items-center">
                                                                                    {subField.options?.map((option) => (
                                                                                        <div
                                                                                            key={`${fieldName}-${option.value}`}
                                                                                            className="me-3"
                                                                                        >
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                id={`${fieldName}-${option.value}`}
                                                                                                value={option.value}
                                                                                                className={`form-check-input ${subField.className || ""}`}
                                                                                                onChange={(e) => {
                                                                                                    const newValue =
                                                                                                        controllerField.value ||
                                                                                                        [];
                                                                                                    if (e.target.checked) {
                                                                                                        controllerField.onChange(
                                                                                                            [
                                                                                                                ...newValue,
                                                                                                                option.value,
                                                                                                            ]
                                                                                                        );
                                                                                                    } else {
                                                                                                        controllerField.onChange(
                                                                                                            newValue.filter(
                                                                                                                (val: string | number) =>
                                                                                                                    val !==
                                                                                                                    option.value
                                                                                                            )
                                                                                                        );
                                                                                                    }
                                                                                                }}
                                                                                            />
                                                                                            <label
                                                                                                htmlFor={`${fieldName}-${option.value}`}
                                                                                            >
                                                                                                {option.label}
                                                                                            </label>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            );
                                                                        case "file":
                                                                            return (
                                                                                <input
                                                                                    type="file"
                                                                                    id={fieldName}
                                                                                    className={`form-control ${subField.className || ""}`}
                                                                                    multiple={subField.multiple || false}
                                                                                    accept={subField.accept || "*"}
                                                                                    onChange={(e) => {
                                                                                        const files = e.target.files;
                                                                                        controllerField.onChange(
                                                                                            subField.multiple
                                                                                                ? files
                                                                                                : files?.[0]
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            );
                                                                        case "text-area":
                                                                            return (
                                                                                <textarea
                                                                                    {...controllerField}
                                                                                    id={fieldName}
                                                                                    className={`form-control ${subField.className || ""}`}
                                                                                    placeholder={subField.placeholder}
                                                                                    rows={subField.rows}
                                                                                    cols={subField.cols}
                                                                                ></textarea>
                                                                            );
                                                                        default:
                                                                            return <></>
                                                                    }
                                                                }}
                                                            />
                                                            {(getErrorMessage(field.name, index, subField.name, errors)) && (
                                                                <span style={{ color: "red" }}>
                                                                    {getErrorMessage(field.name, index, subField.name, errors)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}

                                                <div className="text-end mt-3">
                                                    {arrayFields.length > 1 &&
                                                        <button
                                                            onClick={() => remove(index)}
                                                            type='button' className='btn btn-danger ms-3'>-</button>
                                                    }
                                                    {(arrayFields.length - 1) === index &&
                                                        <button
                                                            onClick={() => {
                                                                const form = arrayFields.map((item) => item);
                                                                append(form[0])

                                                            }}
                                                            type='button' className='btn btn-success  ms-3'>+</button>
                                                    }

                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                );

                            case "submit":
                                return (
                                    <button
                                        type="submit"
                                        className={field.className}
                                    >
                                        {field.displayName}
                                    </button>
                                );
                            default:
                                return <></>;
                        }
                    }}
                />
                <div>
                    {errors[field.name as keyof T]?.message && (
                        <span style={{ color: "red" }}>
                            {errors[field.name as keyof T]?.message?.toString()}
                        </span>
                    )}
                </div>
            </div>
        </>
    };

    // Function to render the full form
    const renderFullForm = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    {fields.map((field) => <div key={field.name}>{renderInput(field)}</div>)}
                </div>
            </form>
        );
    };

    // Function to render a single input
    const renderSingleInput = (fieldName: string) => {
        const field = fields.find((f) => f.name === fieldName);

        if (!field) return null;
        return renderInput(field);
    };

    return {
        renderFullForm,
        renderSingleInput,
        handleSubmit,
        errors,
        watch,
        reset,
        control,
        previewImages,
        append,
        remove
    };
};

export default DynamicForm;


