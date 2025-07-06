import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserMeLoader } from "@/lib/service/getUserMeLoader";
type ImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Link {
  id: number;
  url: string;
  text: string;
  IsExternal: boolean;
}

interface HeroSection {
  __component: "layout.hero-section";
  id: number;
  Heading: string;
  SubHeading: string;
  image: Image;
  link: Link;
  hash: string;
  ext: string;
}

interface PageData {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks: HeroSection;
  meta: any;
}

const MainSection = async ({ data }: { data: any }) => {
  const user = await getUserMeLoader();
  const linkUrl = user.ok ? "/dashboard" : data.link.url;
  const baseUrl = process.env.STRAPI_URL || "http://localhost:1337";
  const isLocal = baseUrl === "http://localhost:1337";
  console.log(data, "data");
  const imageUrl = isLocal
    ? "/image.png"
    : `${
        "https://perfect-belief-e537fc91cf.media.strapiapp.com/" +
        data?.image.hash +
        data?.image.ext
      }`;

  console.log(imageUrl, "image data");
  return (
    <section className="relative w-full h-screen">
      <div key={data.id} className="relative w-full h-screen">
        <Image
          src={imageUrl}
          alt={data?.alternativeText || "Image"}
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}

        {/* Content over the image */}
        <div className="relative z-10 flex flex-col gap-8 items-center justify-center h-full text-center text-blue-800 px-4">
          <h1 className="text-5xl md:text-8xl font-bold ">{data.Heading}</h1>
          <p className=" font-semibold text-3xl md:text-5xl max-w-2xl">
            {data.SubHeading}
          </p>
          <Link
            href={linkUrl}
            target={data.link.IsExternal ? "_blank" : "_self"}
            className="inline-block px-6 py-1 md:py-3  bg-white rounded-lg text-lg md:text-4xl font-medium"
          >
            {user.ok ? "Go DashBoard" : data.link.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
