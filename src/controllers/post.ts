import { del, get, post } from '@/lib/router'
import { auth, optionalLoggedIn } from '@/middlewares/auth'
import type { Request, Response } from 'express'

const isPostOwner = async (req: Request, res: Response, next) => {
  const postId = Number(req.params.id)
  const postDetails = await req.db.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!req.currentUser?.id) {
    req.flash(
      'error',
      "Sorry, you don't have enough permissions to perform this action"
    )
    return res.redirect(302, '/posts')
  }

  if (postDetails.userId !== req.currentUser.id) {
    req.flash(
      'error',
      "Sorry, you don't have enough permissions to perform this action"
    )
    return res.redirect(302, '/posts')
  }

  return next()
}

export default class Post {
  @get('/posts', [auth])
  async dashboard(req, res) {
    const posts = await req.db.post.findMany({
      where: {
        userId: req.currentUser.id,
      },
    })
    return res.render('dashboard.njk', {
      posts,
    })
  }

  @get('/posts/new', [auth])
  createPostView(req: Request, res: Response) {
    return res.render('posts/new.njk')
  }

  @post('/posts', [auth])
  async create(req: Request, res: Response) {
    const user = req.currentUser
    const payload = req.body

    await req.db.post.create({
      data: {
        content: payload.content,
        published: payload.published === 'on' || false,
        userId: user.id,
      },
    })

    return res.redirect(302, '/posts')
  }

  @get('/posts/:id', [auth, isPostOwner])
  async show(req: Request, res: Response) {
    const postDetails = await req.db.post.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })

    return res.render('posts/show.njk', {
      post: postDetails,
    })
  }

  @post('/posts/:id', [auth, isPostOwner])
  async update(req: Request, res: Response) {
    await req.db.post.update({
      data: {
        content: req.body.content,
        published: req.body.published === 'on' || false,
      },
      where: {
        id: Number(req.params.id),
      },
    })

    req.flash('info', 'Updated Post')
    return res.redirect(302, `/posts/${req.params.id}`)
  }

  @get('/posts/:id/view', [optionalLoggedIn])
  async viewPublicPost(req: Request, res: Response) {
    const postDetails = await req.db.post.findFirst({
      where: {
        id: Number(req.params.id),
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    })

    return res.render('posts/public-view.njk', {
      post: postDetails,
    })
  }

  @get('/posts/:id/delete', [auth, isPostOwner])
  async deleteConfirm(req: Request, res: Response) {
    const postDetails = await req.db.post.findFirst({
      where: {
        id: Number(req.params.id),
      },
    })

    return res.render('posts/delete.njk', {
      post: postDetails,
    })
  }

  @del('/posts/:id/delete', [auth, isPostOwner])
  @post('/posts/:id/delete', [auth, isPostOwner])
  async delete(req: Request, res: Response) {
    await req.db.post.deleteMany({
      where: {
        id: Number(req.params.id),
        userId: req.currentUser.id,
      },
    })
    req.flash('info', 'Deleted Post')
    return res.redirect(302, '/posts')
  }
}
