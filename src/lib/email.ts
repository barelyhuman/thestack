type Options = {
  toEmail: string
  subject: string
}

type OptionsWithHTML = Options & {
  html: string
}

type OptionsWithContent = Options & {
  content: string
}

export function sendEmail(options: OptionsWithHTML | OptionsWithContent) {
  // add in the sdk for your service
}
