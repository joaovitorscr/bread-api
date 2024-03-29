import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { envVars } from './env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const cors = {
    origin: ['https://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  }

  app.enableCors(cors)

  await app.listen(envVars.PORT)
}
bootstrap()
