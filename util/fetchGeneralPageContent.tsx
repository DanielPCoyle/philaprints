import builder from "@builder.io/react";
import { apiKey } from "../pages/[[...page]]";

interface SEO {
  title: string;
  description: string;
  image: string | null;
}

interface PageData {
  data?: {
    title?: string;
    description?: string;
    featuredImage?: string;
  };
}

interface BlogData {
  results: any[]; // Replace `any` with a more specific type if available
}

interface FetchGeneralPageContentReturn {
  contentType: string;
  model: string;
  page: PageData | null;
  seo: SEO;
  blogData: any[] | null; // Replace `any` with a specific blog post type if available
  pagination: {
    offset: number;
    limit: number;
  };
}

// Fetch content for general pages
export async function fetchGeneralPageContent(
  urlPath: string,
  slug: string,
  offset: number,
  limit: number
): Promise<FetchGeneralPageContentReturn> {
  const page = (await builder.get("page", {
    userAttributes: { urlPath: urlPath.includes("/blog") ? "/blog" : urlPath },
  }).toPromise()) as PageData;

  const seoTitle = page?.data?.title || "Philadelphia Screen Printing";
  const seoDescription = page?.data?.description || "Philadelphia Screen Printing";
  const seoImage = page?.data?.featuredImage || null;

  let blogData: any[] | null = null; // Set as `any[]` or a specific type if available
  if (urlPath.includes("/blog")) {
    if (slug !== "blog") offset = parseInt(slug);
    try {
      const response = await fetch(
        `https://cdn.builder.io/api/v3/content/blog?apiKey=${apiKey}&offset=${offset * limit}&limit=${limit}`
      );
      const blogDataResponse: BlogData = await response.json();
      blogData = blogDataResponse.results;
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  }

  return {
    contentType: "WebPage",
    model: "page",
    page: page || null,
    seo: { title: seoTitle, description: seoDescription, image: seoImage },
    blogData,
    pagination: { offset, limit },
  };
}