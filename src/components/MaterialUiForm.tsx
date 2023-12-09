import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UserContext } from "../context/UserContext";

export type TFormValues = z.infer<typeof schema>;

const schema = z.object({
  firstName: z.string().min(1, "O campo é obrigatório"),
  lastName: z.string().min(1, "O campo é obrigatório"),
  email: z
    .string()
    .min(1, "O campo é obrigatório")
    .email("Formato de email inválido"),
  company: z.string().min(1, "O campo é obrigatório"),
  phone: z
    .string()
    .min(1, "O campo é obrigatório")
    .max(13, "Limite de 13 digitos"),
  age: z.number().min(1, "O campo é obrigatório"),
});

export const MaterialUiForm = () => {
  const userCtx = React.useContext(UserContext);

  const defaultFormValues: TFormValues = {
    firstName: userCtx.firstName,
    lastName: userCtx.lastName,
    email: userCtx.email,
    company: userCtx.company,
    phone: userCtx.phone,
    age: userCtx.age,
  };

  const [data, setData] = React.useState("");
  const form = useForm<TFormValues>({
    defaultValues: defaultFormValues,
    mode: "onTouched", // modo de validação padrão, existe onChange, onBlur e etc...
    resolver: zodResolver(schema),
  });
  const {
    control,
    handleSubmit,
    setValue,
    // register,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = form;

  const onSubmit = (values: TFormValues) => {
    console.log("Form Values", values);
    setData(JSON.stringify(values, null, 2));
    sessionStorage.setItem(
      "form_zod_material_values_storage",
      JSON.stringify(values)
    );
  };

  React.useEffect(() => {
    setValue("firstName", userCtx.firstName);
    setValue("lastName", userCtx.lastName);
    setValue("email", userCtx.email);
    setValue("company", userCtx.company);
    setValue("phone", userCtx.phone);
    setValue("age", userCtx.age);
  }, [userCtx]);

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h1>Material Ui Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <TextField
          {...register("firstName")}
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          className="inputText"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        /> */}

        <Controller
          control={control}
          name="firstName"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="First Name"
              placeholder="First Name"
              variant="outlined"
              className="inputText"
              error={!!errors.firstName}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Last Name"
              placeholder="Last Name"
              variant="outlined"
              className="inputText"
              error={!!errors.lastName}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Email Address"
              placeholder="Email Address"
              variant="outlined"
              className="inputText"
              error={!!errors.email}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="company"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Company Name"
              placeholder="Company Name"
              variant="outlined"
              className="inputText"
              error={!!errors.company}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Phone Number"
              placeholder="Phone Number"
              variant="outlined"
              className="inputText"
              error={!!errors.phone}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="age"
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <InputLabel id="age-select-label">Age</InputLabel>
              <Select
                {...field}
                value={field.value}
                labelId="age-select-label"
                id="age-select-label"
                label="Age"
                error={!!fieldState.error}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {!!fieldState.error && (
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        ></Controller>

        <Button variant="contained" type="submit">
          Enviar Cadastro
        </Button>
      </form>
      <pre>{data}</pre>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};
