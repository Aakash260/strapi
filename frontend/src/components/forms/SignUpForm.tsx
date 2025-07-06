"use client";

import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerUserAction } from "@/lib/actions/auth-actions";
import { useActionState } from "react";
import { SubmitButton } from "../custom/SubmitBtn";
const INITIAL_STATE={
  data:null,
  zodError:null,
  message:null
}

export function SignupForm() {
  const [formState,formAction]=useActionState(registerUserAction,INITIAL_STATE)
  console.log(formState,"initial State")
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
            </div>
            { !formState.data && <div className="text-pink-500 text-md italic py-2">{formState?.zodError?.username}</div>}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>
            { !formState.data && <div className="text-pink-500 text-md italic py-2">{formState?.zodError?.email}</div>}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
            { !formState.data && <div className="text-pink-500 text-md italic py-2">{formState?.zodError?.password}</div>}
 { !formState.data && <div className="text-pink-500 text-md italic py-2">{formState?.strapiError}</div>}
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton text="Sign Up" loadingText="loading"/>
           
          </CardFooter>
        </Card>
           
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="signIn">
            Sing In
          </Link>
        </div>
      </form>
    </div>
  );
}