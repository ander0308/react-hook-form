import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

type TFormValues = z.infer<typeof schema>;

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email format is not valid"),
  channel: z.string().min(1, "Channel is required"),
  country: z
    .string()
    .refine((value) => value !== "", {
      message: "Country is required",
    })
    .refine((value) => value !== "brazil", {
      message: "Please select other country",
    }),
  statusActive: z.boolean().refine((value) => value === true, {
    message: "",
  }),
});

const defaultFormValues: TFormValues = {
  username: "",
  email: "",
  channel: "",
  country: "",
  statusActive: false,
};

export const ZodYoutubeForm = () => {
  const [data, setData] = React.useState('');
  const form = useForm<TFormValues>({
    defaultValues: defaultFormValues,
    mode: "onSubmit", // modo de validação padrão, existe onChange, onBlur e etc...
    resolver: zodResolver(schema),
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = form;

  const onSubmit = (values: TFormValues) => {
    console.log("Form Values", values);
    setData(JSON.stringify(values, null, 2));
    sessionStorage.setItem("form_zod_values_storage", JSON.stringify(values));
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // countForm++;

  return (
    <div>
      <h1>Zod Youtube Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <div className="form-control">
          <select id="country" {...register("country")}>
            <option value="">Select country</option>
            <option value="brazil">Brazil</option>
            <option value="japan">Japan</option>
            <option value="colombia">Colombia</option>
          </select>
          <p className="error">{errors.country?.message}</p>
        </div>

        <div className="form-control">
          <label>
            <input type="checkbox" {...register("statusActive")} />
            <span style={{ marginLeft: "10px" }}>
              I accept the terms of use.
            </span>
          </label>
          <p className="error">{errors.statusActive?.message}</p>
        </div>

        <div className="containerButtons">
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </form>
      <pre>{data}</pre>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};
