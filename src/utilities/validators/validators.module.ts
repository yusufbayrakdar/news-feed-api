import {Global, Module} from "@nestjs/common";

import {UserModule} from "../../user/user.module";

import {ValidatorIsEmailUnique} from "./IsEmailUnique";

@Global()
@Module({
  imports: [UserModule],
  exports: [ValidatorIsEmailUnique],
  providers: [ValidatorIsEmailUnique]
})
export class ValidatorsModule {}
