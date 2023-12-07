import {
  useForm,
  // Controller
} from "react-hook-form";
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

type TFormValues = z.infer<typeof schema>;

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

const defaultFormValues: TFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  age: 0,
};

export const MaterialUiForm = () => {
  const [data, setData] = React.useState("");
  const form = useForm<TFormValues>({
    defaultValues: defaultFormValues,
    mode: "onTouched", // modo de validação padrão, existe onChange, onBlur e etc...
    resolver: zodResolver(schema),
  });
  const {
    control,
    handleSubmit,
    register,
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
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h1>Material Ui Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Controller
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
        /> */}
        <TextField
          {...register("firstName")}
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          className="inputText"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />

        <TextField
          {...register("lastName")}
          id="outlined-basic"
          label="Last Name"
          variant="outlined"
          className="inputText"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <TextField
          {...register("email")}
          id="outlined-basic"
          label="Email Address"
          variant="outlined"
          className="inputText"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("company")}
          id="outlined-basic"
          label="Company Name"
          variant="outlined"
          className="inputText"
          error={!!errors.company}
          helperText={errors.company?.message}
        />

        <TextField
          {...register("phone")}
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
          fullWidth
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <FormControl fullWidth>
          <InputLabel id="age-select-label">Age</InputLabel>
          <Select
            labelId="age-select-label"
            id="age-select-label"
            label="Age"
            {...register("age")}
            error={!!errors.age}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          {!!errors.age &&(
            <FormHelperText style={{ color: "#d32f2f" }}>
              {errors.age.message}
            </FormHelperText>
          )}
        </FormControl>

        <Button variant="contained" type="submit">
          Enviar Cadastro
        </Button>
      </form>
      <pre>{data}</pre>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};
