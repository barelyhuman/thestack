import { get } from '@/lib/router'
import { auth, optionalLoggedIn } from '@/middlewares/auth'
import { Request } from 'express'

export class HomeController {
  @get('/', [optionalLoggedIn])
  async index(req: Request, res) {
    const limit = req.query.limit ? +req.query.limit : 10
    const page = req.query.page ? +req.query.page : 0
    const posts = await req.db.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
      skip: page * limit,
      take: limit,
    })

    const totalPosts = await req.db.post.count({
      where: {
        published: true,
      },
    })

    const hasNext = page + 1 < Math.floor(totalPosts / limit)
    const hasPrev = page > 0

    return res.render('index.njk', {
      posts,
      page: page,
      limit: limit,
      hasNext,
      hasPrev,
    })
  }
}
