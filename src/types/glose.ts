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

export interface Book {
  id: string;
  title: string;
  authors?: string[];
  cover_url?: string;
  price?: number;
  average_rating?: number;
  // Ajoutez d'autres champs si besoin selon la réponse de l'API
}

export interface ShelvesResponse {
  shelves: Shelf[];
  total: number;
  offset: number;
  limit: number;
}

export interface FormsResponse {
  forms: string[];
  total: number;
  offset: number;
  limit: number;
}

export interface BookResponse extends Book {
  authors: string[];
  cover_url: string;
  price: number;
  average_rating: number;
} 