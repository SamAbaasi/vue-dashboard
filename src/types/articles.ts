import type { ArticleType } from "@/types/article";

export interface FieldType {
  key: string;
  label?: string;
  formatter?: (value: any) => string;
  class?: string;
}
export interface ArticlesData {
  articles: ArticleType[];
  loading: boolean;
  fields: FieldType[];
  totalRows: number;
}
