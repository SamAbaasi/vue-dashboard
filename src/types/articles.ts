export interface ArticleData {
  slug?: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
export interface ArticlesData {
  articles: ArticleData[];
  loading: boolean;
  fields: FieldType[];
  totalRows: number;
}
export interface FieldType {
  key: string;
  label?: string;
  formatter?: (value: any) => string;
  class?: string;
}

export interface OptionsType {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}
