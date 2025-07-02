import { render, screen } from '@testing-library/react';
import ShelfSidebar from '@/app/shelf/[id]/components/ShelfSidebar';

describe('ShelfSidebar', () => {
  const shelves = [
    { id: '1', title: 'Romans', count: 5, selected: true },
    { id: '2', title: 'BD', count: 2, selected: false },
    { id: '3', title: 'Essais', selected: false },
  ];

  it('affiche les titres des étagères', () => {
    render(<ShelfSidebar shelves={shelves} />);
    expect(screen.getByText('Romans')).toBeInTheDocument();
    expect(screen.getByText('BD')).toBeInTheDocument();
    expect(screen.getByText('Essais')).toBeInTheDocument();
  });

  it('met en avant l\'étagère sélectionnée', () => {
    render(<ShelfSidebar shelves={shelves} />);
    const selected = screen.getByText('Romans');
    expect(selected.parentElement).toHaveClass('bg-blue-100');
  });

  it('affiche le count si présent', () => {
    render(<ShelfSidebar shelves={shelves} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
}); 