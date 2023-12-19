import {Controller, Get, Query, UseGuards} from "@nestjs/common";

import {NewsService} from "./news.service";
import {UserService} from "src/user/user.service";

import {UserOptionalGuard} from "src/user/user-optional.guard";

import {convertQueryToQueryString, getRandomCategories, prepareFilter} from "../utilities/helpers";
import {PaginationQueryDto} from "../utilities/helpers/pagination.validation";
import {UserId} from "src/utilities/decorators/user.decorator";
import {ExceptionBadRequest} from "src/utilities/exceptions";

const LIMIT = 10;

@Controller("news")
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly userService: UserService
  ) {}

  // THE GUARDIAN
  @Get("the-guardian/categories-supplied-from-api")
  async theGuardianCategoriesSuppliedFromAPI() {
    try {
      const rawData = await this.newsService.getTheGuardianCategories();
      if (!rawData) throw new ExceptionBadRequest();
      const sections = rawData.data.response.results;

      return sections.reduce((categories, section) => {
        categories.push(section.webTitle);
        return categories;
      }, []);
    } catch (error) {
      throw new ExceptionBadRequest(error);
    }
  }

  @Get("the-guardian/categories")
  async theGuardianCategories() {
    return require("../utilities/constants/the-guardian-categories");
  }

  @UseGuards(UserOptionalGuard)
  @Get("the-guardian/search")
  async theGuardian(@UserId() userId: String, @Query() query: PaginationQueryDto) {
    try {
      const queryString = convertQueryToQueryString(query);
      let keysHandledQueryString = queryString.replace(/&category=(?=.+)/, "&section=");
      if (userId && !query.category) {
        const user = await this.userService.findById(userId);
        if (user.categories.length) {
          const randomPickedCategories = getRandomCategories(user.categories);
          const safeStringQuery = prepareFilter(randomPickedCategories, "|");
          keysHandledQueryString += "&section=" + `(${safeStringQuery.toLowerCase()})`;
        }
      }

      const rawData = await this.newsService.searchInTheGuardian(keysHandledQueryString);

      const {results: rawDocs, total: totalDocs, currentPage: page, pages: totalPages} = rawData;
      const hasNextPage = page < totalDocs;
      const hasPrevPage = 1 < page;
      const docs = this.newsService.formatTheGuardianDocs(rawDocs);
      return {docs, totalDocs, page, limit: LIMIT, totalPages, hasNextPage, hasPrevPage};
    } catch (error) {
      throw new ExceptionBadRequest(error?.response?.data?.response?.message || error);
    }
  }

  // NEW YORK TIMES
  @Get("new-york-times/categories")
  async newYorkTimesCategories() {
    return require("../utilities/constants/new-york-times-categories");
  }

  @UseGuards(UserOptionalGuard)
  @Get("new-york-times/search")
  async newYorkTimes(@UserId() userId: String, @Query() query: PaginationQueryDto) {
    try {
      const queryString = convertQueryToQueryString(query);
      let keysHandledQueryString = queryString
        .replace(/&from-date=(?=.+)/, "&begin_date=")
        .replace(/&to-date=(?=.+)/, "&end_date=")
        .replace(/&category=(?=.+)/, "&fq=section_name:");

      if (userId && !query.category) {
        const user = await this.userService.findById(userId);
        if (user.categories.length) {
          const randomPickedCategories = getRandomCategories(user.categories);
          const safeStringQuery = prepareFilter(randomPickedCategories, " ");
          keysHandledQueryString += "&fq=" + safeStringQuery.toLowerCase();
        }
      }

      const rawData = await this.newsService.searchInNewYorkTimes(keysHandledQueryString);

      const {docs: rawDocs, meta} = rawData;
      const totalDocs = meta.hits;
      const page = meta.offset / LIMIT;
      const totalPages = Math.ceil(totalDocs / LIMIT);
      const hasNextPage = page < totalPages;
      const hasPrevPage = 1 < page;
      const docs = this.newsService.formatNewYorkTimesDocs(rawDocs);
      return {docs, totalDocs, page, limit: LIMIT, totalPages, hasNextPage, hasPrevPage};
    } catch (error) {
      throw new ExceptionBadRequest(error.data.response || error);
    }
  }
}
