# Bootstrap

Booting the app actually goes through the `boot.ts` file first. This is where
you will be adding the [Controllers](%baseurl%controllers) and
[Job Queues](%baseurl%queues) imports to make sure the app loads them up.

## Caveats

Due to the nature of testing modularity, the `boot` is loaded in the `app.ts`
file and the `app.ts` imports are what you use for testing.

This shouldn't be a show stopper but if looked closely does feel like an
after-thought. This can be easily solved by making the boot.ts file a more
complicated booting module but that would lead to too much abstraction for
people to understand.
