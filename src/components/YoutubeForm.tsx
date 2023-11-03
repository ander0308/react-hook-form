import { FieldErrors, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import React from "react";

let renderCount = 0;

type TFormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    instagram: string;
  };
  phoneNumbers: string[];
};

const defaultFormValues: TFormValues = {
  username: "",
  email: "",
  channel: "",
  social: {
    twitter: "",
    instagram: "",
  },
  phoneNumbers: ["", ""],
};

export const YoutubeForm = () => {
  const form = useForm<TFormValues>({
    defaultValues: defaultFormValues,
    mode: "onSubmit", // modo de validação padrão, existe onChange, onBlur e etc...
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState,
    getValues,
    setValue,
    // watch,
  } = form;

  const {
    errors,
    isSubmitting,
    isSubmitSuccessful,
    isDirty,
    // isValid
  } = formState;

  // console.log({ isDirty, isSubmitting, isValid });

  const onSubmit = (values: TFormValues) => {
    console.log("Form Values", values);
    sessionStorage.setItem("form_values_storage", JSON.stringify(values));
  };

  const onError = (errors: FieldErrors<TFormValues>) => {
    console.log("Form errors", errors);
  };

  const handleGetValues = () => {
    const getUser = getValues();
    // const getUser = getValues('username')
    // const getUser = getValues(['username', 'email'])
    console.log(getUser);
  };

  const handleSetValue = () => {
    setValue("channel", "youtube/anderson", {
      shouldDirty: true,
    });
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // const loadValues = () => {
  //   setValue("channel", "youtube/anderson", {
  //     shouldDirty: true,
  //   });
  //   setValue("username", "Anderson", {
  //     shouldDirty: true,
  //     shouldTouch: true,
  //     shouldValidate: true,
  //   });
  // };

  // React.useEffect(() => {
  //   loadValues();
  // }, []);

  renderCount++;

  return (
    <div>
      <h1>Youtube Form({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "username é requerido!",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "email é requerido!",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@mail.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("upcubo.com.br") ||
                    "This domain is not supported"
                  );
                },
                emailAvailable: async (fieldValue) => {
                  while (fieldValue.length >= 3) {
                    const response = await fetch(
                      `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                    );
                    const data = await response.json();
                    return data.length === 0 || "Email already exists";
                  }
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "channel é requerido",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              // disabled: watch("channel") === "",
              required: "Enter twitter profile",
            })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="instagram">Instagram</label>
          <input type="text" id="instagram" {...register("social.instagram")} />
        </div>

        <div className="form-control">
          <label htmlFor="primaryPhone">Primary phone number</label>
          <input
            type="text"
            id="primaryPhone"
            {...register("phoneNumbers.0")}
          />
        </div>

        <div className="form-control">
          <label htmlFor="secundaryPhone">Segundary phone number</label>
          <input
            type="text"
            id="secundaryPhone"
            {...register("phoneNumbers.1")}
          />
        </div>

        <div className="containerButtons">
          <button type="submit" disabled={!isDirty || isSubmitting}>
            Submit
          </button>
          <button type="button" onClick={handleGetValues}>
            Get Values
          </button>
          <button type="button" onClick={handleSetValue}>
            Set Value
          </button>
        </div>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};
