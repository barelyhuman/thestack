# thestack

I spent the time making the decisions so you don't have to.

## What comes bundled

- Simpler Express based server
- Decorators + Classes for Routing

```ts
class Auth {
  @post('/auth/signup')
  async signup(req, res) {
    // handler
  }
}
```

- Typed (Mostly...)
- Basic Security (Helmet, Rate Limiting, CORS)
- API testing (Vitest + Mock Server)
- ORM (prisma)
- Migrations (prisma)
- Queue (bull + redis)
- Decorators for Queue Handling based on Worker execution
- View Engine ( Edge Template from Adonis )

```ts
class User {
  @post('/user/invite')
  sendInvite(req, res) {
    const email = req.body.email
    req.pushToQueue('email', {
      email,
      type: 'invite',
    })
  }
}
// jobs/email.queue.ts
class EmailQueueHandler {
  @listen('email', 'invite')
  handleInviteJob(job) {
    // Called from the worker
    // process the job
  }
}
```

- Compose (Self host services for dev / k8s)


## Why?
Various reasons...., [this might be relevant](https://reaper.is/writing/20230516-ignoring-backend-productivity)

## License
[MIT](/LICENSE)