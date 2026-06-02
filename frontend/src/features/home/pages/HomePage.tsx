import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { paths } from '@/routes/paths'

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Apio</h1>
      <Button asChild>
        <Link to={paths.login}>Se connecter</Link>
      </Button>
    </div>
  )
}

export default HomePage
