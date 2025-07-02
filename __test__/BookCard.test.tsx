import { render, screen } from '@testing-library/react'
import BookCard from '@/app/shelf/[id]/components/BookCard'

describe('BookCard', () => {
  it('affiche le titre du livre', () => {
    render(
      <BookCard
        title="Le Petit Prince"
        authors={[{ id: '1', name: 'Antoine de Saint-Exupéry', slug: 'antoine-de-saint-exupery' }]}
        price={{ amount: 10, currency: 'EUR' }}
        averageRating={4.5}
        image={undefined}
      />
    )
    expect(screen.getByText('Le Petit Prince')).toBeInTheDocument()
  })
})
