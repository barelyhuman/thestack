import { get } from '@/lib/router'

export class HomeController {
  @get('/')
  index(req, res) {
    return res.render('index')
  }
}
