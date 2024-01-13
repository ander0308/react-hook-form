import { Box, Step, StepLabel, Stepper } from "@mui/material";

type StepsFormProps = {
  activeStep: number;
};

const StepsForm = ({ activeStep }: StepsFormProps) => {
  const steps = ["Limites", "Tarifas", "Integração", "Revisão"];

  return (
    <Box sx={{ width: "100%", margin:"24px 0" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepsForm;
