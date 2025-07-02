import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/app/shelf/[id]/components/SearchBar';
import * as SearchContext from '@/src/context/SearchContext';
import { vi } from 'vitest';

describe('SearchBar', () => {
  it('affiche le champ de recherche avec la valeur du contexte', () => {
    vi.spyOn(SearchContext, 'useSearch').mockReturnValue({ search: 'test', setSearch: vi.fn() });
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher un livre...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  it('modifie la valeur au changement', () => {
    const setSearch = vi.fn();
    vi.spyOn(SearchContext, 'useSearch').mockReturnValue({ search: '', setSearch });
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Rechercher un livre...');
    fireEvent.change(input, { target: { value: 'nouveau' } });
    expect(setSearch).toHaveBeenCalledWith('nouveau');
  });
}); 