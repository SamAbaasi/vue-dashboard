export interface ArticleType {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  slug?: string;
}
export interface ArticleFormData {
  newTag: string;
  tags: string[];
  selectedTags: string[];
  TRANSLATIONS: Record<string, string>;
  isLoading: boolean;
}
