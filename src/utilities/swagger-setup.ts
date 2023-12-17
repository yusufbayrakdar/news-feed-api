import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle("News Feed")
  .setDescription("News Feed API description")
  .setVersion("1.0")
  .addTag("News Feed")
  .addApiKey({type: "apiKey", name: "token", in: "header"}, "token")
  .build();

export const SwaggerSetup = (app: any) => {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
};
