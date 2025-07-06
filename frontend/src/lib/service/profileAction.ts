"use server";

import { mutateData } from "./mutate-data";

export async function updateProfileAction(
  userId: string,
  prevState: any,
  formData: FormData
) {
  const rawFormData = Object.fromEntries(formData);

  const payload = {
    FirstName: rawFormData.firstName,
    LastName: rawFormData.lastName,
    Bio: rawFormData.bio,
  };

  const responseData = await mutateData("PUT", `/api/users/${userId}`, payload);
  console.log(responseData, "responseData");
  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Update Profile.",
    };
  }

  return {
    ...prevState,
    message: "Profile Updated",
    data: payload,
    strapiErrors: null,
  };
}
