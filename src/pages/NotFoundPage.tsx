import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { paths } from '@/routes/paths'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="text-muted-foreground">Cette page n'existe pas.</p>
      <Button asChild variant="outline">
        <Link to={paths.home}>Retour à l'accueil</Link>
      </Button>
    </div>
  )
}

export default NotFoundPage
