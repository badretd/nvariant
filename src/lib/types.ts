export type Correction = { date: string; text: string };
export type AuthorCredit = { personId: string; role: string };
export type Heading = { id: string; title: string; level: 2 | 3 };
export type MaterialMetadata = {
  slug: string; title: string; description: string; publishedAt: string; updatedAt?: string;
  authors: AuthorCredit[]; people?: string[]; tags: string[]; issue?: string;
  showInMaterialsArchive: boolean; cover?: string; media?: string[]; quoteIds?: string[];
  headings: Heading[]; readingTime: number; text: string; corrections?: Correction[];
  seo?: { title?: string; description?: string; image?: string };
};
export type IssueBlock =
  | { type: "material"; material: string }
  | { type: "quote"; quote: string }
  | { type: "editorial"; title?: string; text: string }
  | { type: "media"; media: string; caption?: string };
export type IssueSection = { id: string; title: string; intro?: string; blocks: IssueBlock[] };
export type Issue = {
  number: number; slug: string; title: string; description: string; publishedAt: string;
  cover: string; sections: IssueSection[]; corrections?: Correction[];
  seo?: { title?: string; description?: string; image?: string };
};
export type Person = {
  id: string; name: string; photo?: string; description: string; occupation: string;
  aliases?: string[]; tags: string[];
};
export type Quote = {
  id: string; text: string; person?: string; sourceTitle: string; sourceUrl: string;
  sourceMaterial?: string; context?: string; date?: string;
};
export type MediaType = "image" | "youtube" | "animation";
export type MediaAsset = {
  id: string; type: MediaType; kind: "cover" | "material" | "person" | "illustration" | "video";
  title: string; src?: string; youtubeId?: string; thumbnail?: string; alt: string;
  description: string; author: string; source: string; sourceUrl?: string; license: string;
  createdAt: string; downloadable: boolean; tags: string[];
};
export type MediaUsage = { mediaId: string; label: string; url: string; context: "issue" | "material" | "person" };
export type SearchType = "Выпуск" | "Материал" | "Человек" | "Медиа" | "Цитата";
export type SearchEntry = { id: string; type: SearchType; title: string; text: string; url: string; tags: string[] };
