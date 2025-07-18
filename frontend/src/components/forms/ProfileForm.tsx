"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";
import { updateProfileAction } from "@/lib/service/profileAction";
import { SubmitButton } from "../custom/SubmitBtn";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

interface ProfileFormProps {
  id: string;
  username: string;
  email: string;
  FirstName: string;
  LastName: string;
  Bio: string;
  credits: number;
}

function CountBox({ text }: { readonly text: number }) {
  const style = "font-bold text-md mx-1";
  const color = text > 0 ? "text-primary" : "text-red-500";
  return (
    <div className="flex items-center justify-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none">
      You have<span className={cn(style, color)}>{text}</span>credit(s)
    </div>
  );
}

const InitialState = {
  data: null,
  message: null,
};

export function ProfileForm({
  data,
  className,
}: {
  readonly data: ProfileFormProps;
  readonly className?: string;
}) {
  const updateProfileWithId = updateProfileAction.bind(null, data.id);
  const [formState, FormAction] = useFormState(
    updateProfileWithId,
    InitialState
  );

  console.log("formState", formState);

  return (
    <form action={FormAction} className={cn("space-y-4", className)}>
      <div className="space-y-4 grid ">
        <div className="grid grid-cols-3 gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={data?.username || ""}
            disabled
          />
          <input type="hidden" name="id" value={data.id} />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data?.email || ""}
            disabled
          />
          <CountBox text={data?.credits} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            defaultValue={data?.FirstName || ""}
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            defaultValue={data?.LastName || ""}
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data?.Bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
      </div>
    </form>
  );
}
