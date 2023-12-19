import {Module} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

import {UserModule} from "src/user/user.module";

import {NewsController} from "./news.controller";

import {NewsService} from "./news.service";

@Module({
  controllers: [NewsController],
  providers: [NewsService, JwtService],
  imports: [UserModule],
  exports: [NewsService]
})
export class NewsModule {}
