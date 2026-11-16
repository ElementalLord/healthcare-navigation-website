import { Link } from 'react-router-dom'

import { Container } from '@/components/section'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-4xl font-bold text-ink">This page doesn’t exist</h1>
      <p className="mt-4 text-lg text-muted-foreground">The link may be old or mistyped. Try the search, or go back to the home page.</p>
      <Button asChild size="lg" className="mt-8">
        <Link to="/">Go to the home page</Link>
      </Button>
    </Container>
  )
}
