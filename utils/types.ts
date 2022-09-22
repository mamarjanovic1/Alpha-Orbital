export interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  post_image: string;
  post_thumbnail: string;
  post_category_id: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export enum CategoryEnum {
  "X Universe" = "1",
  "Elite: Dangerous" = "2",
  "Starpoint Gemini" = "3",
  "EVE Online" = "4",
  "Show All" = "0",
}

export interface Category {
  id: string;
  name: string;
}

export const categoryArray: Category[] = Object.keys(CategoryEnum).map((name) => {
  return {
    id: CategoryEnum[name as keyof typeof CategoryEnum],
    name,
  };
});