export async function getStrapiData(path) {
  const baseUrl = "http://localhost:1337";
  const authToken = null;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  try {
    const data = await fetch(baseUrl + path, authToken ? headers : {});
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getHeaderFooter() {
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";

  try {
    const response = await fetch(
      `${baseUrl}/api/global?populate[header][populate]=*&populate[Footer][populate]=*`
    );

    if (!response.ok) {
      console.error("❌ Failed to fetch global data:", response.statusText);
      return { data: null };
    }

    const res = await response.json();
    return res; // expected to contain { data: { attributes: { header, Footer } }, ... }
  } catch (error) {
    console.error("❌ Error in getHeaderFooter:", error);
    return { data: null };
  }
}

export async function generateMetadata() {
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  try {
    const response = await fetch(
      `${baseUrl}/api/global?fields=title,description`
    );

    if (!response.ok) {
      console.error("❌ Failed to fetch metadata:", response.statusText);
      return { data: null };
    }

    const res = await response.json();
    return res; // Expected: { data: { attributes: { title, description } }, ... }
  } catch (error) {
    console.error("❌ Error in generateMetadata:", error);
    return { data: null };
  }
}
