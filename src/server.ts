import { initApp } from '@/app'
import { db } from '@/lib/db'

const port = process.env.PORT || 3000

bootServer(db)

function bootServer(db: any) {
  const app = initApp({ db })

  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })
}
