import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

let countForm = 0;

type TFormValues = {
  username: string;
  email: string;
  channel: string;
};

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  channel: yup.string().required("Channel is required"),
});

const defaultFormValues: TFormValues = {
  username: "",
  email: "",
  channel: "",
};

export const YupYoutubeForm = () => {
  const form = useForm<TFormValues>({
    defaultValues: defaultFormValues,
    mode: "onSubmit", // modo de validação padrão, existe onChange, onBlur e etc...
    resolver: yupResolver(schema),
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (values: TFormValues) => {
    console.log("Form Values", values);
    sessionStorage.setItem("form_yup_values_storage", JSON.stringify(values));
  };

  countForm++;

  return (
    <div>
      <h1>Yup Youtube Form({countForm / 2})</h1>
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

        <div className="containerButtons">
          <button type="submit" className="">
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};
