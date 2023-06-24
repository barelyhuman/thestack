# The Stack

> Get out of the hype train

This is a tiny attempt at providing a existing set of decisions to help you get
started on the work you actually wish to do.

A pretty big part of Ruby on Rails is it's generator CLI and the initial
boilerplate. Which comes with it's own set of magic and DSL. I'm not a fan of
the magic since it stops me from understanding stuff but that's not true for
every developer so we keep the magic but also keep the secrets behind the magic
in the codebase.

This ends up giving you the ability to quickly define routes in controllers
using `decorators` and for the curious one's the implementation of the
decorators is a part of the codebase.

Here's a small snippet of the `controllers/options.ts` file to explain what I
mean

```ts
import { OPTIONS } from '@/lib/constants'
import { get } from '@/lib/router'
import { Response } from 'express'

export class Options {
  @get('/options')
  getOptions(_: Request, res: Response) {
    return res.send(Object.values(OPTIONS))
  }
}
```

If you like this approach then [let's move forward](%baseurl%getting-started)
