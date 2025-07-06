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
  const BASE_URL = process.env.STRAPI_URL || "http://localhost:1337";
  try {
    const response = await fetch(`${BASE_URL}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}

export async function loginUserService(userData: any) {
  const BASE_URL = process.env.STRAPI_URL || "http://localhost:1337";

  try {
    const response = await fetch(`${BASE_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
  }
}
