# Decorators

You can learn about the basics of decorators from the
[typescript docs](https://www.typescriptlang.org/docs/handbook/decorators.html).

This particular section explains how decorators are being used to help with
[Controller](%baseurl%controllers) and [Route](%baseurl%routes) binding.

## Route Decorators

The route decorators are located in `src/lib/router` file and define basic HTTP
Method handlers that tie to the express router. There's no magic in this section
it's a very simple binding for ES6 class methods.

The following show the entire API for the route decorators.

`get(path:string, middleware: MiddlewareFuncs[])`
`post(path:string, middleware: MiddlewareFuncs[])`
`del(path:string, middleware: MiddlewareFuncs[])`

```js
class ClassDefinition {
  @get('api/path', [middleware])
  method(req, res) {
    // request handling
  }
}
```

The `req`,`res` objects that you get a just plain ExpressJS types and there's a
few extentions to those types defined in `src/types.d.ts`

## Job/Queue Decorators

`TheStack` comes with a Queue/Scheduler already as a part of the codebase and so
there's helpers for you to be able to define methods as queue handlers.

> **Note**: While you could just define these decorators in the Controllers, it
> becomes hard to manage both network request handlers and queue handlers in the
> same controller and so it's recommended to add job handlers in the
> `src/jobs/<job-handler>.ts` files

You can find the queue `listen` decorator in the `./src/lib/queue` file and it
does the same thing as the route decorators but instead binds the method to a
bull processing job.

With regards to the type of the job and the input the method gets, do checkout
[`bull` docs](https://optimalbits.github.io/bull/).

Here's a quick example of how to use this

- Define the queue to create in the `boot.ts` file
- Here we are taking name from the config object

```ts
// src/boot.ts
import { config } from '@/configs'

createProducer(config.queue.email.name)
```

- Now you can `pushToQueue` using your controllers or use the `pushToQueue`
  export from `./src/lib/queue` in the same manner anywhere else in the
  codebase.

```ts
// src/controllers/auth.ts
export class Auth {
  @post('/auth/register')
  register(req: Request, res: Response) {
    const { email } = req.body

    req.pushToQueue(config.queue.email.name, {
      email: email,
      //   The type is used to classify if a sub-type handler is to be used
      type: config.queue.email.types.loginEmail,
    })
  }
}
```

Finally, we define the handler in the `./src/jobs/email-queue-handler.ts` file
and tie a method with the `@listen` decorator and pass it the queue name and
subtype(optional) that it needs to listen for.

Here the `job` parameter received by the method is the original job object
passed by Bull with no modifications

```ts
// ./src/jobs/email-queue-handler.ts
import { config } from '@/configs'
import { sendEmail } from '@/lib/email'
import { listen } from '@/lib/queue'

export class EmailQueueHandler {
  @listen(
    // type
    config.queue.email.name,
    // subtype
    config.queue.email.types.loginEmail
  )
  async handleEmail(job: any) {
    const toEmail = job.data.email
    await sendEmail({
      toEmail,
      subject: 'hello human',
      html: '<h1>Please approve log-in request</h1>',
    })
  }
}
```

If you wish to read more about [Queues](%baseurl%queues)
