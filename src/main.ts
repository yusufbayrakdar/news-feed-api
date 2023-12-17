import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {ExpressAdapter} from "@nestjs/platform-express";

import {useContainer} from "class-validator";
import * as cors from "cors";
import * as Express from "express";

import {AppModule} from "./app.module";
import {ValidatorsModule} from "./utilities/validators/validators.module";

import {SwaggerSetup} from "./utilities/swagger-setup";

const server = Express();
server.use(cors());

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  if (process.env.NODE_ENV === "development") app.setGlobalPrefix("development");
  if (process.env.NODE_ENV !== "production") SwaggerSetup(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );

  useContainer(app.select(ValidatorsModule), {fallbackOnErrors: true});

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
