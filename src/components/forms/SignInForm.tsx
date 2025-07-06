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
import { SubmitButton } from "../custom/SubmitBtn";
import { useActionState } from "react";
import { loginUserAction } from "@/lib/actions/auth-actions";
const INITIAL_STATE={
  data:null,
  zodError:null,
  message:null
}

export function SigninForm() {
    const [formState,formAction]=useActionState(loginUserAction,INITIAL_STATE)
    console.log(formState,"login State")
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />
            </div>
               { !formState.data && <div className="text-pink-500 text-md italic py-2">{formState?.zodError?.identifier}</div>}
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
                      <SubmitButton text="Sign In" loadingText="loading"/>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signUp">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}