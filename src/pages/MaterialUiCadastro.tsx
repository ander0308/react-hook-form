import { useForm, Controller } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import { schema } from "../shema/materialUiFormShema";

export type TFormValues = z.infer<typeof schema>;

function goToPage(page: string) {
  window.location.href = page;
}

const MaterialUiCadastro = () => {
  const { userDataContext, setDataStorage } = React.useContext(UserContext);

  const defaultFormValues: TFormValues = {
    firstName: userDataContext.firstName,
    lastName: userDataContext.lastName,
    age: userDataContext.age,
    email: userDataContext.email,
    company: userDataContext.company,
    phone: userDataContext.phone,
    tecnology: userDataContext.tecnology,
    optionOne: userDataContext.optionOne,
    optionTwo: userDataContext.optionTwo,
  };

  const form = useForm<TFormValues>({
    defaultValues: defaultFormValues,
    mode: "onTouched", // modo de validação padrão, existe onChange, onBlur e etc...
    resolver: zodResolver(schema),
  });
  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors, isValid, isSubmitting },
  } = form;

  const onSubmit = (values: TFormValues) => {
    setDataStorage(values);
    goToPage("/app2/revisao");
  };

  React.useEffect(() => {
    setValue("firstName", userDataContext.firstName, { shouldValidate: true });
    setValue("lastName", userDataContext.lastName, { shouldValidate: true });
    setValue("age", userDataContext.age, { shouldValidate: true });
    setValue("email", userDataContext.email, { shouldValidate: true });
    setValue("company", userDataContext.company, { shouldValidate: true });
    setValue("phone", userDataContext.phone, { shouldValidate: true });
    setValue("tecnology", userDataContext.tecnology, { shouldValidate: true });
    setValue("optionOne", userDataContext.optionOne, { shouldValidate: true });
    setValue("optionTwo", userDataContext.optionTwo, { shouldValidate: true });
  }, [userDataContext]);

  return (
    <div>
      <Typography variant="h2">Please register now.</Typography>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
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
          name="age"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Age"
              placeholder="Age"
              variant="outlined"
              className="inputText"
              error={!!errors.age}
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
          name="tecnology"
          render={({ field, fieldState }) => (
            <FormControl fullWidth>
              <InputLabel id="age-select-label">Tecnology</InputLabel>
              <Select
                {...field}
                value={field.value}
                labelId="age-select-label"
                id="age-select-label"
                label="Tecnology"
                error={!!fieldState.error}
              >
                <MenuItem value="react">React</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="php">Php</MenuItem>
              </Select>
              {!!fieldState.error && (
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {fieldState.error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <FormGroup>
          <Controller
            control={control}
            name="optionOne"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch onChange={field.onChange} checked={field.value} />
                }
                label="Option 1"
              />
            )}
          />
          <Controller
            control={control}
            name="optionTwo"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch onChange={field.onChange} checked={field.value} />
                }
                label="Option 2"
              />
            )}
          />
        </FormGroup>

        <Button
          variant="contained"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Enviar Cadastro
        </Button>
      </form>
      {/* <pre>{data}</pre> */}
      {/* <DevTool control={control} placement="top-right" /> */}
    </div>
  );
};

export default MaterialUiCadastro;
