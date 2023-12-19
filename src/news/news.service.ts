import {Injectable} from "@nestjs/common";

import axios from "axios";

@Injectable()
export class NewsService {
  // The Guardian
  getTheGuardianCategories() {
    return axios.get("https://content.guardianapis.com/sections?api-key=" + process.env.THE_GUARDIAN_API_KEY);
  }

  async searchInTheGuardian(query: String) {
    const {data} = await axios.get(
      "https://content.guardianapis.com/search?api-key=" + process.env.THE_GUARDIAN_API_KEY + query
    );
    return data.response;
  }

  formatTheGuardianDocs(rawDocs: Array<any>) {
    return rawDocs.map(({webTitle, webUrl, sectionName}) => ({
      title: webTitle,
      category: sectionName,
      url: webUrl
    }));
  }

  // New York Times
  async searchInNewYorkTimes(query: String) {
    const {data} = await axios.get(
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + process.env.NEW_YORK_TIMES_API_KEY + query
    );
    return data.response;
  }

  formatNewYorkTimesDocs(rawDocs: Array<any>) {
    return rawDocs.map(({headline, abstract, web_url, section_name}) => ({
      title: headline.main,
      description: abstract,
      category: section_name,
      url: web_url
    }));
  }
}
