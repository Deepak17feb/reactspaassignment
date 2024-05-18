export interface Article {
  body: string | TrustedHTML;
  id: number;
  title: string;
  date: string;
  category: string;
  author: string;
  image: string;
  source: string;
}
