export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface ArticleFormProps {
  article: Article;
  newTag: string;
  tags: string[];
  isEditing: boolean;
}
export interface ArticleFormData {
  newTag: string;
  tags: string[];
  selectedTags: string[];
  TRANSLATIONS: Record<string, string>;
  isLoading: boolean;
}
