# Routes

The basic way of exposing your functionality is by exposing them over REST API's
and this is common when building a web app.

There may be cases where you are building micro services and would need to build
using an onion architecture / hexagonal arcitechture or whatever the new name
for Bottom Up dependency trees is.

> **Note**: `TheStack` is not for the latter case, and you are better of just
> writing the functionalities as a isolated package and going forward with that
> approach instead of trying to achieve something that requires a good
> inheritence system like Java

Defining routes, is pretty simple, the current version of `TheStack` comes with
the following HTTP methods

> **Methods**: `get`,`post`,`del`

I know there's `put` , `patch`, `update`, etc, but these are easy to add and
we'll go through how to do that.

### Basic Routes

- Simple Get route

```ts
import { get } from '@/lib/router'
import type { Request, Response } from 'express'

export default class Health {
  @get('/api/ping')
  ping(req: Request, res: Response) {
    return res.send({ pong: true })
  }
}
```

- Dynamic Parameter

```ts
import { get } from '@/lib/router'
import type { Request, Response } from 'express'

export default class UserController {
  @get('/api/user/:id')
  fetchUserById(req: Request, res: Response) {
    return res.send({ id: req.params.id })
  }
}
```

- Routes with Middleware

```ts
import { get } from '@/lib/router'
import { auth } from '@/middlewares/auth'
import type { Request, Response } from 'express'

export default class UserController {
  @post('/api/user/:id', [auth]) // you can add as many as you want here.
  createUser(req: Request, res: Response) {
    return res.send({ id: req.params.id })
  }
}
```

# Middleware

The middleware definitions are still the same as any expressjs middleware, so
the documentation for that can be found on the
[expressjs docs](https://expressjs.com/en/guide/writing-middleware.html)
