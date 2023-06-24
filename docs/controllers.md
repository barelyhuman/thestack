## Controllers

The concept of controllers is very similar to what you already assume them to
be. These provide functionality to the routes that are being defined for your
API.

In `TheStack` , a controller is simply a class that's being exported from the
`src/controllers/` directory.

```ts
// ./src/controllers/health.ts

export default class Health {
  ping() {
    // functionality
  }
}
```

As you can see, we haven't defined any functionality but they are just classes
with methods.

We aren't doing anything OOP related specifically over here but the only reason
for using Classes here is to be able to use [Decorators](%baseurl%decorators).

With the help of these decorators, we can now bind these controller **methods**
to be able to receive network request context.

```ts
// ./src/controllers/health.ts

// import the get decorator from the router
import { get } from '@/lib/router'

// import the types for Request and Response
import type { Request, Response } from 'express'

export default class Health {
  // assign the decorator to the `ping` method for the route `GET /api/ping`
  @get('/api/ping')
  ping(req: Request, res: Response) {
    return res.send({ pong: true })
  }
}
```

Once you've added these, the controller's method `ping` is now called when the
http route `/api/ping` is requested with the method `GET`

You can read more about [routes and middleware](%baseurl%routes)
