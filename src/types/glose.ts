export interface Shelf {
  id: string;
  slug: string;
  last_modified: number;
  title: string;
  user: {
    id: string;
    name: string;
    username: string;
    cover: string | null;
    image: string;
  };
}

export interface BookAuthor {
  id: string;
  name: string;
  slug: string;
  role?: string;
}

export interface BookPrice {
  amount: number;
  currency: string;
  includes_taxes?: boolean;
}

export interface Book {
  id: string;
  title: string;
  authors?: BookAuthor[];
  image?: string;
  price?: BookPrice;
  average_rating?: number;
  // Ajoutez d'autres champs si besoin selon la réponse de l'API
}

export interface FormsResponse {
  forms: string[];
  total: number;
  offset: number;
  limit: number;
}

export interface BookResponse {
  id: string;
  title: string;
  short_title?: string;
  authors: BookAuthor[];
  image?: string;
  price?: BookPrice;
  average_rating?: number;
  description?: string;
  isbn?: string;
  publisher?: string;
  language?: string;
  // Ajoutez d'autres champs si besoin
} 