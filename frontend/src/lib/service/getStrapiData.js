export async function getStrapiData(path) {
  const baseUrl = "http://localhost:1337";
const authToken=null;
const headers={
    "Content-Type":"application/json",
    Authorization:`Bearer ${authToken}`
}
  try {
    const data = await fetch(baseUrl + path,authToken? headers:{});
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
 
export async function getHeaderFooter() {


  try {
    const data = await fetch('http://localhost:1337/api/global?populate[header][populate]=*&populate[Footer][populate]=*');
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
 
export async function generateMetadata(){
  try {
    const data = await fetch('http://localhost:1337/api/global?fields=title,description');
    const res = await data.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}