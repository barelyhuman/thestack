# Misc

<h2 id="example">Example</h2>

The codebase does come with a microblogging example already implemented for you.
Please take note that this is just an example implementation and not a full
featured implementation with all edge cases covered **yet** (as of v0.1.0) and
we will update it to be a more solid base for you to start with but that would
also involve making the codebase specifically the controllers a lot more
complicated for beginners.

Either way, here's the things that the Example covers right now.

<h3 id="authentication">Authentication</h3>

- `middlewares/auth` and `controllers/auth` are responsible for most of the
  functionality around the authentication implementation. The implementation is
  session based token store which can be improved by splittling the cookie
  into 2.
  - one for the session and one for auth, right now it's in one to show how the
    session can be used in the tiny application.
- There's also the `notLoggedIn` middleware which redirects authenticated users
  to their relvant pages when visiting pages like `login` and `register` when
  you are already logged in

<h3 id="views">Views</h3>

- The views are implemented with nunjucks due to the low learning curve
- `views/*.njk` files are responsible for what you see on different routes, each
  of these are rendered using[controllers](%baseurl%controllers) and are easily
  searchable for looking for the url path in your IDE's find all utility.
- The `views/layouts/base.njk` also implements a header that conditionally shows
  navigation based on the login state of the user

<h3 id="flash-messages">Flash Messages</h3>

Flash messages are the de-facto way to pass through alerts through various
redirects and these are also a part of the example and is responsible for all
the alerts that you see on the top after you either update the post or delete
it.

> **Note**: These can be replaced with various other server session state
> messages if you are server rendering views.

<h3 id="css-styling">CSS / Styling</h3>

TailwindCSS comes setup for you, and in most places you'll see it being used for
layout more than styling. Most of the classes for tailwind are created as
shortcuts using the `@apply` css decorator in the `styles/tailwind.css` file and
then the shortcuts are used in necessary places. This is done since the Views
approach cannot do components (unless you are using Adonis Edge) and so copying
the same button everywhere makes no sense. It's still easy to override these
shortcut based styles wherever you need them but having a quick class for the
base still helps.

<h3 id="validation"> Validation </h3>

The Example comes with `Yup` as the payload validator for the controllers, this
is just based on my own personal opinion and habit of using Yup everywhere.

> **Note**: You are not limited to using Yup and can switch this to
> [zod](https://zod.dev) or anything else that you like.
