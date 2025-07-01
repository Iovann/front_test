import { Shelf, BookResponse } from '../types/glose';

const API_ROOT = 'https://api.glose.com';

export async function fetchShelves(offset = 0, limit = 10): Promise<Shelf[]> {
  const res = await fetch(`${API_ROOT}/users/5a8411b53ed02c04187ff02a/shelves?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error('Erreur lors du chargement des étagères');
  return res.json();
}

export async function fetchShelfBooks(shelfId: string, offset = 0, limit = 10): Promise<string[]> {
  const res = await fetch(`${API_ROOT}/shelves/${shelfId}/forms?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error('Erreur lors du chargement des livres de l\'étagère');
  return res.json();
}

export async function fetchBook(formId: string): Promise<BookResponse> {
  const res = await fetch(`${API_ROOT}/forms/${formId}`);
  if (!res.ok) throw new Error('Erreur lors du chargement du livre');
  return res.json();
} 