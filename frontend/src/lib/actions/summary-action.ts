"use server";

import { getAuthToken } from "../service/getToke";
import { mutateData } from "../service/mutate-data";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
interface Payload {
  data: {
    title?: string;
    videoId: string;
    summary: string;
  };
}

export async function createSummaryAction(payload: Payload) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/summaries", payload);

  redirect("/dashboard/summaries/" + data.data.documentId);
}

async function fetchData(url: string) {
  const authToken = await getAuthToken();

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    console.log("🚀 ~ fetchData ~ data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getSummariesById(videoId: string) {
  const url = `http://localhost:1337/api/summaries/${videoId}`;
  return await fetchData(url);
}

export async function getAllSummary(queryString: string, currentPage: number) {
  const PAGE_SIZE = 4;

  // Build filter query
  const filters =
    `filters[$or][0][title][$containsi]=${encodeURIComponent(queryString)}&` +
    `filters[$or][1][summary][$containsi]=${encodeURIComponent(queryString)}`;

  // Sorting
  const sort = "sort[0]=createdAt:desc";

  // Pagination
  const pagination =
    `pagination[page]=${currentPage}&` + `pagination[pageSize]=${PAGE_SIZE}`;

  // Final URL
  const url = `http://localhost:1337/api/summaries?${sort}&${filters}&${pagination}`;

  return fetchData(url);
}

export async function updateSummaryAction(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id as string;

  const payload = {
    data: {
      title: rawFormData.title,
      summary: rawFormData.summary,
    },
  };

  const responseData = await mutateData("PUT", `/api/summaries/${id}`, payload);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to update summary.",
    };
  }

  revalidatePath("/dashboard/summaries");

  return {
    ...prevState,
    message: "Summary updated successfully",
    data: responseData,
    strapiErrors: null,
  };
}

export async function deleteSummaryAction(id: string, prevState: any) {
  const responseData = await mutateData("DELETE", `/api/summaries/${id}`);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  redirect("/dashboard/summaries");
}
