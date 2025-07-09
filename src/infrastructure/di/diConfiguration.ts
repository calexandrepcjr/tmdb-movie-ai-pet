import { container } from "./container";
import { BrowserConfigService } from "../config/browserConfigService";
import { ConfigurationService } from "../config/configurationService";
import { AxiosHttpClient } from "../http/base/axiosHttpClient";
import { HttpClient as TmdbHttpClient } from "../http/tmdb/httpClient";
import { MovieRepository } from "../repositories/tmdb/movieRepository";
import { TvShowRepository } from "../repositories/tmdb/tvShowRepository";
import { PersonRepository } from "../repositories/tmdb/personRepository";
import { SearchRepository } from "../repositories/tmdb/searchRepository";
import { HttpClient as BaseHttpClient } from "../http/base/httpClient";

/**
 * Dependency Injection Configuration
 * Sets up all service dependencies following IoC principles
 */
export class DIConfiguration {
  static configure(): void {
    // Register config service as singleton
    container.singleton("ConfigService", () =>
      BrowserConfigService.getInstance()
    );

    // Register HTTP clients
    container.singleton(
      "HttpClient",
      () => {
        const configService =
          container.resolve<ConfigurationService>("ConfigService");
        const config = configService.getConfig();

        return new AxiosHttpClient({
          baseURL: config.baseUrl,
          timeout: config.timeout,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
      },
      ["ConfigService"]
    );

    // Register TMDB-specific HTTP client
    container.singleton(
      "TmdbHttpClient",
      () => {
        const httpClient = container.resolve<BaseHttpClient>("HttpClient");
        const configService =
          container.resolve<ConfigurationService>("ConfigService");

        return new TmdbHttpClient(httpClient, configService);
      },
      ["HttpClient", "ConfigService"]
    );

    // Register repositories
    container.singleton(
      "MovieRepository",
      () => {
        const tmdbHttpClient =
          container.resolve<TmdbHttpClient>("TmdbHttpClient");
        return new MovieRepository(tmdbHttpClient);
      },
      ["TmdbHttpClient"]
    );

    container.singleton(
      "TvShowRepository",
      () => {
        const tmdbHttpClient =
          container.resolve<TmdbHttpClient>("TmdbHttpClient");
        return new TvShowRepository(tmdbHttpClient);
      },
      ["TmdbHttpClient"]
    );

    container.singleton(
      "PersonRepository",
      () => {
        const tmdbHttpClient =
          container.resolve<TmdbHttpClient>("TmdbHttpClient");
        return new PersonRepository(tmdbHttpClient);
      },
      ["TmdbHttpClient"]
    );

    container.singleton(
      "SearchRepository",
      () => {
        const tmdbHttpClient =
          container.resolve<TmdbHttpClient>("TmdbHttpClient");
        return new SearchRepository(tmdbHttpClient);
      },
      ["TmdbHttpClient"]
    );
  }

  static getContainer() {
    return container;
  }
}

// Auto-configure when imported
DIConfiguration.configure();
