import MainSection from "@/components/custom/MainSection";
import FeatureSection from "@/components/custom/FeatureSection";
import { getStrapiData } from "../lib/service/getStrapiData.js";

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <MainSection key={block.id} data={block} />;
    case "layout.feature-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

const { data } = await getStrapiData(
  "/api/home-page?populate[blocks][populate]=*"
);

export default async function Page() {
  // throw new Error("Error Occurs")
  return <main>{data.blocks.map((item: any) => blockRenderer(item))}</main>;
}