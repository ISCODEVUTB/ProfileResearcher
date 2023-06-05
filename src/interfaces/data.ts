export interface Article {
  title: string;
  abstract: string | null;
  semanticScholar: boolean;
  orcid: boolean;
}

export interface KeyPhrase {
  phrase: string;
  frequency: number;
}