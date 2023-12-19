import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";

import "dotenv/config";

import {AuthModule} from "./auth/auth.module";
import {NewsModule} from "./news/news.module";
import {SharedModule} from "./shared/shared.module";
import {UserModule} from "./user/user.module";
import {ValidatorsModule} from "./utilities/validators/validators.module";

import {AppController} from "./app.controller";

import {AppService} from "./app.service";

const database = process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI;

@Module({
  imports: [MongooseModule.forRoot(database), ValidatorsModule, AuthModule, UserModule, SharedModule, NewsModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
