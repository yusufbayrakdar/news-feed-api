import {Type} from "class-transformer";
import {IsOptional, IsString, Min} from "class-validator";

import {IsStringSafe} from "../validators/isStringSafe";

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsOptional()
  @IsString()
  @IsStringSafe()
  q: string;

  @IsOptional()
  @IsString()
  @IsStringSafe()
  author: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  @IsStringSafe()
  "from-date": string;

  @IsOptional()
  @IsString()
  @IsStringSafe()
  "to-date": string;
}
