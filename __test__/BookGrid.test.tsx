import { render, screen } from '@testing-library/react';
import BookGrid from '@/app/shelf/[id]/components/BookGrid';
import type { BookCardProps } from '@/app/shelf/[id]/components/BookCard';

describe('BookGrid', () => {
  const books: BookCardProps[] = [
    {
      title: 'Le Petit Prince',
      authors: [{ id: '1', name: 'Antoine de Saint-Exupéry', slug: 'antoine-de-saint-exupery' }],
      price: { amount: 10, currency: 'EUR' },
      averageRating: 4.5,
      image: undefined,
    },
    {
      title: '1984',
      authors: [{ id: '2', name: 'George Orwell', slug: 'george-orwell' }],
      price: { amount: 12, currency: 'EUR' },
      averageRating: 4.8,
      image: undefined,
    },
  ];

  it('affiche le bon nombre de BookCard', () => {
    render(<BookGrid books={books} />);
    expect(screen.getByText('Le Petit Prince')).toBeInTheDocument();
    expect(screen.getByText('1984')).toBeInTheDocument();
  });

  it('affiche rien si la liste est vide', () => {
    render(<BookGrid books={[]} />);
    // On vérifie qu'aucun titre n'est affiché
    expect(screen.queryByText('Le Petit Prince')).not.toBeInTheDocument();
    expect(screen.queryByText('1984')).not.toBeInTheDocument();
  });
}); 