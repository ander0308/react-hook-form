import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";

let countForm = 0;

type TFormValues = z.infer<typeof schema>;

const getTarifa = 12;

const schema = z
  .object({
    username: z.string().min(3, "O campo é obrigatório"),
    email: z
      .string()
      .min(1, "O campo é obrigatório")
      .email("Formato de email inválido"),
    channel: z.string().min(1, "O campo é obrigatório"),
    tarifa: z
      .number({ invalid_type_error: " O campo é obrigatório" })
      .max(getTarifa, { message: `Valor maximo é R$ ${getTarifa}` })
      .min(1, { message: `Valor minimo é R$ 1` }),
    tarifaDiaria: z
      .number({ invalid_type_error: " O campo é obrigatório" })
      .max(getTarifa, {
        message: `Valor maximo é R$ ${getTarifa}`,
      })
      .min(1, { message: `Valor minimo é R$ 1` }),
    country: z
      .string()
      .refine((value) => value !== "", {
        message: "Selecione um País",
      })
      .refine((value) => value !== "brazil", {
        message: "Por favor selecione outro País",
      }),
    statusActive: z.boolean().refine((value) => value === true, {
      message: "Aceite o termo",
    }),
  })
  .refine((obj) => {
    if (obj.tarifaDiaria > obj.tarifa) {
      throw new z.ZodError([
        {
          path: ["tarifaDiaria"],
          message: "A tarifa diária não pode ser maior que a tarifa",
          code: "custom",
        },
      ]);
    }
    return true;
  });

const defaultFormValues: TFormValues = {
  username: "",
  email: "",
  channel: "",
  tarifa: 1,
  tarifaDiaria: 1,
  country: "",
  statusActive: false,
};

export const ZodYoutubeForm = () => {
  const [data, setData] = React.useState("");
  const form = useForm<TFormValues>({
    defaultValues: defaultFormValues,
    mode: "onChange", // modo de validação padrão, existe onChange, onBlur e etc...
    resolver: zodResolver(schema),
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    // setError,
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

  // React.useEffect(() => {
  //   setError("username", {
  //     message: "O campo é obrigatório",
  //   });

  //   setError("email", {
  //     message: "O campo é obrigatório",
  //   });
  // }, [setError]);

  countForm++;

  return (
    <div>
      <h1>Zod Youtube Form({countForm})</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="channel">Tarifa</label>
          <input
            type="number"
            id="tarifa"
            {...register("tarifa", {
              valueAsNumber: true,
            })}
          />
          <p className="error">{errors.tarifa?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Limite diario tarifa</label>
          <input
            type="number"
            id="tarifaDiaria"
            {...register("tarifaDiaria", {
              valueAsNumber: true,
            })}
          />
          <p className="error">{errors.tarifaDiaria?.message}</p>
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
