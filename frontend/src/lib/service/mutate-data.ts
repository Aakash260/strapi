import { getAuthToken } from "./getToke";

export async function mutateData(method: string, path: string, payload?: any) {
  const authToken = await getAuthToken();
  const url = new URL(`http://localhost:1337${path}`);

  if (!authToken) throw new Error("No auth token found");
  console.log(payload, "payload to strapi");
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (method === "DELETE") {
      return response.ok;
    }

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
