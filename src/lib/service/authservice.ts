import { getStrapiData } from "./getStrapiData";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  email: string;
  password: string;
}

export async function registerUserService(userData: any) {
  try {
    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      }
    );

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: any) {
  console.log(userData,"emailData")
    try {
    const response = await fetch(
      "http://localhost:1337/api/auth/local",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      }
    );

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

