import expressJSDocSwagger from 'express-jsdoc-swagger'
import path from 'path'

export function initDocs(app) {
  const options = {
    info: {
      title: 'TheStack API',
      version: '1.0.0',
      description: '',
    },
    servers: [
      {
        url: '/',
        description: 'API server',
      },
    ],
    security: {
      Auth: {
        type: 'apiKey',
        scheme: 'string',
        in: 'header',
        name: 'Authorization',
      },
    },
    baseDir: path.join(__dirname, './'),
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './controllers/**/*.ts',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
    // multiple option in case you want more that one instance
    multiple: true,
  }

  expressJSDocSwagger(app)(options)
}
