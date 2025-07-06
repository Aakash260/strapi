"use server";
import { z } from "zod";
import { registerUserService,loginUserService } from "../service/authservice";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const config = {
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const schemaRegister = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const schemaLogin = z.object({
  identifier: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerUserAction(
  previousState: any,
  formData: FormData
) {
  const fields = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = schemaRegister.safeParse(fields);
  if (!result.success) {
    return {
      ...previousState,
      zodError: result.error.flatten().fieldErrors,
      message: "Validation Failed",
    };
  }

  const responseData = await registerUserService(fields);
  console.log(responseData);
  if (responseData.error) {
    return {
      ...previousState,
      strapiError: responseData?.error?.message,
      zodError: null,
      message: "Failed to Register",
    };
  }

(await cookies()).set("jwt",responseData.jwt,config);
   redirect('/dashboard')
}

export async function loginUserAction(
  previousState: any,
  formData: FormData
) {

  
  const fields = {
    
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };
 
  const result = schemaLogin.safeParse(fields);
  if (!result.success) {
    return {
      ...previousState,
      zodError: result.error.flatten().fieldErrors,
      message: "Validation Failed",
    };
  }

  const responseData = await loginUserService(fields);
  console.log(responseData);
  if (responseData.error) {
    return {
      ...previousState,
      strapiError: responseData?.error?.message,
      zodError: null,
      message: "Failed to Login",
    };
  }

(await cookies()).set("jwt",responseData.jwt,config);
   redirect('/dashboard')
}


export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}