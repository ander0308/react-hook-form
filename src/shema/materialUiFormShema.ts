import { z } from "zod";

export const schema = z.object({
    firstName: z.string().min(1, "O campo é obrigatório"),
    lastName: z.string().min(1, "O campo é obrigatório"),
    age: z.string().min(1, "O campo é obrigatório").optional(),
    email: z
      .string()
      .min(1, "O campo é obrigatório")
      .email("Formato de email inválido"),
    company: z.string().min(1, "O campo é obrigatório"),
    phone: z
      .string()
      .min(1, "O campo é obrigatório")
      .max(13, "Limite de 13 digitos"),
    tecnology: z.string().min(1, "O campo é obrigatório"),
  })