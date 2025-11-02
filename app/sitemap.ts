import {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://passgen.noahatkins.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

