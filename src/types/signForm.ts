export type PageTranslations = {
  title: string;
  btn: string;
  footerText: string;
  footerAction: string;
};

export type TranslationsTypes = {
  user: string;
  email: string;
  password: string;
  register: PageTranslations;
  login: PageTranslations;
};

export interface SignFormDataTypes {
  email: string;
  password: string;
  username?: string;
  TRANSLATIONS: TranslationsTypes;
}
