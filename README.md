# TMDB Movie Client
## 🧪 AI-Assisted Development Research Project

> **⚠️ RESEARCH PET PROJECT ⚠️**
> 
> This is a **research-focused pet project** designed to explore and validate **aggressive AI-assisted development methodologies**. It serves as a testing ground for advanced AI-driven software engineering practices, architectural decision-making, and code generation workflows.
> 
> **🤖 AI Tools Used:**
> - **Primary**: GitHub Copilot + Claude Sonnet 4 + Gemini + Codex CLI
> - **Purpose**: Research on AI-augmented software engineering
> - **Methodology**: Structured AI prompting with anti-vibe coding enforcement
> 
> **📚 Research Objectives:**
> - Validate Clean Architecture + DDD with AI assistance
> - Test comprehensive AI-driven documentation strategies
> - Explore AI-assisted refactoring and architectural evolution
> - Evaluate AI prompt engineering for complex software projects
> 
> **⚡ Development Approach:** This project employs an **augmented coding strategy** that strictly prohibits "vibe coding" in favor of analysis-driven, architecture-conscious development with AI assistance.

Agent playbook: See `AGENTS.md` for unified, project-specific agent guidelines (merged from GEMINI.md).

---

## 🎯 Project Overview

A comprehensive **multi-interface** client for The Movie Database (TMDB) API, built with **Domain-Driven Design (DDD)** and **Clean Architecture** principles. This project demonstrates how to build scalable, maintainable applications using aggressive AI-assisted development while maintaining architectural integrity.

### 🌟 **Dual Interface Design**
- **🖥️ CLI Interface**: Command-line client for automation and scripting
- **🌐 Browser Interface**: Modern React web application for interactive use
- **🔗 Shared Core**: Both interfaces share the same domain, application, and infrastructure layers

## ✨ Features

### 🎬 **Movie Discovery**
- **Search**: Find movies by title with advanced filtering
- **Discover**: Browse movies with genre, year, rating filters
- **Details**: Comprehensive movie information and metadata
- **Lists**: Popular, top-rated, upcoming, and now-playing movies
- **Recommendations**: Similar and recommended movies

### 📺 **TV Show Discovery**
- **Search**: Find TV shows with flexible search options
- **Discover**: Advanced TV show discovery with filters
- **Details**: Complete TV show information and seasons
- **Lists**: Popular, top-rated, airing today, and on-the-air shows
- **Recommendations**: Similar and recommended TV shows

### 👤 **People & Cast**
- **Search**: Find actors, directors, and crew members
- **Details**: Comprehensive person information and biography
- **Credits**: Complete filmography (movies and TV shows)
- **Popular**: Browse trending and popular people

### 🔍 **Universal Search**
- **Multi-Search**: Search across movies, TV shows, and people simultaneously
- **Trending**: Daily and weekly trending content across all categories
- **Advanced Filtering**: Complex search criteria and sorting options

### 🎯 **Interface Options**

#### 🖥️ **CLI Interface**
- **Interactive Mode**: Guided workflows with user-friendly menus
- **Command Mode**: Direct command execution for scripting
- **Rich Output**: Formatted, colorized console output
- **Batch Operations**: Process multiple queries efficiently

#### 🌐 **Browser Interface**
- **Modern React SPA**: Single-page application with routing
- **Responsive Design**: Mobile-first, adaptive layout
- **Dark Theme**: Professional dark theme with Tailwind CSS
- **Real-time Search**: Live search with pagination
- **Rich Media**: Image galleries and detailed content views

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tmdb-movie-client
```

2. Install dependencies:
```bash
npm install
```

3. Get a TMDB API key:
   - Visit https://www.themoviedb.org/settings/api
   - Create an account and request an API key

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env file and add your TMDB_API_KEY
```

5. Build the project:
```bash
npm run build
```

## Usage

### Interactive Mode (Recommended)
```bash
npm start interactive
# or
npm run dev interactive
```

### Browser Interface

Start the browser development server:
```bash
npm run dev:browser
```

The browser interface will open automatically at `http://localhost:3001` (or next available port).

#### Browser Features:
- **Search**: Real-time search across movies, TV shows, and people
- **Discover**: Browse content with advanced filters
- **Details**: Rich detail pages with images and metadata
- **Navigation**: Intuitive navigation between different content types
- **Responsive**: Works on desktop, tablet, and mobile devices

#### Browser Environment Setup:
1. The browser interface uses the same `.env` file as the CLI:
   ```bash
   # Environment is already set up if you completed the installation steps
   ```

2. If you need to check your API key:
   ```bash
   # Verify TMDB_API_KEY is set in .env file
   cat .env | grep TMDB_API_KEY
   ```

3. Start the development server:
   ```bash
   npm run dev:browser
   ```

4. Build for production:
   ```bash
   npm run build:browser
   ```

### Command Line Interface

#### Movie Commands
```bash
# Search movies
npm start search-movies "Inception"
npm start search-movies "The Dark Knight" --year 2008

# Discover movies
npm start discover-movies --genres "28,12" --sort "popularity.desc"

# Get movie details
npm start movie-details 550

# Browse movie lists
npm start popular-movies
npm start top-rated-movies
npm start upcoming-movies
npm start now-playing-movies
```

#### TV Show Commands
```bash
# Search TV shows
npm start search-tv "Breaking Bad"
npm start search-tv "Game of Thrones" --year 2011

# Discover TV shows
npm start discover-tv --genres "18,80" --sort "popularity.desc"

# Get TV show details
npm start tv-details 1396

# Browse TV show lists
npm start popular-tv
npm start top-rated-tv
npm start airing-today-tv
npm start on-the-air-tv
```

#### People Commands
```bash
# Search people
npm start search-people "Leonardo DiCaprio"

# Get person details
npm start person-details 6193

# Browse popular people
npm start popular-people

# Get person's credits
npm start person-movies 6193
npm start person-tv 6193
```

#### General Commands
```bash
# Multi-search
npm start multi-search "Avengers"

# Trending content
npm start trending movie week
npm start trending tv day
npm start trending all week
```

### Command Options

Most commands support these options:
- `--page <number>`: Page number (default: 1)
- `--adult`: Include adult content
- `--language <string>`: Language code (default: en-US)
- `--region <string>`: Region code (default: US)

Movie-specific options:
- `--year <number>`: Release year
- `--genres <string>`: Comma-separated genre IDs
- `--sort <string>`: Sort order
- `--vote-average <number>`: Minimum vote average
- `--vote-count <number>`: Minimum vote count

## Architecture

This project follows Domain-Driven Design (DDD) principles with a clean architecture:

```
src/
├── domain/                 # Business logic and rules
│   ├── entities/          # Core business entities
│   ├── value-objects/     # Value objects and enums
│   ├── repositories/      # Repository interfaces
│   └── services/          # Domain services
├── application/           # Application layer
│   ├── use-cases/         # Application use cases
│   └── dtos/             # Data transfer objects
├── infrastructure/        # External concerns
│   ├── config/           # Configuration
│   ├── http/             # HTTP client
│   └── repositories/     # Repository implementations
└── presentation/          # User interface
    ├── cli/              # CLI application
    ├── controllers/      # Request handlers
    ├── formatters/       # Output formatters
    └── interactive/      # Interactive menu
```

For a deeper dive into the system and decisions:
- Architecture overview: `ARCHITECTURE.md`
- Agent guidelines: `AGENTS.md`
- ADRs: `docs/adr`

### Key Design Patterns

1. **Repository Pattern**: Abstracts data access
2. **Dependency Injection**: Manages dependencies
3. **Command Pattern**: CLI command handling
4. **Strategy Pattern**: Different search strategies
5. **Builder Pattern**: Complex filter construction

## Development

### AI Agentic Workflow (Codex)
- Codex CLI has been used alongside Copilot/Claude/Gemini to perform agentic, architecture-aware changes (refactors, infra tweaks, docs updates).
- Agents follow `AGENTS.md` and `docs/ai/README.md` for Clean Architecture + DDD boundaries, strict typing, and security (no secrets in the browser).
- Contributions using agents should include a brief plan, validation steps (build/run), and any DI or ADR updates when relevant.

### Containers
- Compose: run `docker compose up` (or `npm run container:up`).
- node_modules: we mount `- /app/node_modules` so dependencies live inside the container, avoiding host/WSL EACCES issues on bind mounts.
- Rebuild: use `docker compose down -v && docker compose up --build` after dependency or Dockerfile changes.
- Network: services join `tmdb-net`. If it already exists, Docker reuses it and may warn; this is safe.
- Env: `TMDB_API_KEY` is provided only to the API (BFF) container; the browser talks to the BFF and never receives secrets.

### Scripts
- `npm run build`: Build the project
- `npm run dev`: Run in development mode
- `npm start`: Run the built project
- `npm test`: Run tests
- `npm run lint`: Run linting
- `npm run lint:fix`: Fix linting issues

### Environment Variables
- `TMDB_API_KEY`: Your TMDB API key (required)
- `TMDB_BASE_URL`: TMDB API base URL (default: https://api.themoviedb.org/3)
- `TMDB_IMAGE_BASE_URL`: TMDB image base URL (default: https://image.tmdb.org/t/p/)
- `DEFAULT_LANGUAGE`: Default language (default: en-US)
- `DEFAULT_REGION`: Default region (default: US)
- `DEFAULT_PAGE_SIZE`: Default page size (default: 20)

## API Coverage

This client covers the following TMDB API endpoints:

### Movies
- `/search/movie` - Search movies
- `/discover/movie` - Discover movies
- `/movie/{id}` - Movie details
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming movies
- `/movie/now_playing` - Now playing movies
- `/movie/{id}/similar` - Similar movies
- `/movie/{id}/recommendations` - Recommended movies

### TV Shows
- `/search/tv` - Search TV shows
- `/discover/tv` - Discover TV shows
- `/tv/{id}` - TV show details
- `/tv/popular` - Popular TV shows
- `/tv/top_rated` - Top rated TV shows
- `/tv/airing_today` - Airing today TV shows
- `/tv/on_the_air` - On the air TV shows
- `/tv/{id}/similar` - Similar TV shows
- `/tv/{id}/recommendations` - Recommended TV shows

### People
- `/search/person` - Search people
- `/person/{id}` - Person details
- `/person/popular` - Popular people
- `/person/{id}/movie_credits` - Person's movie credits
- `/person/{id}/tv_credits` - Person's TV credits

### General
- `/search/multi` - Multi-search
- `/trending/{media_type}/{time_window}` - Trending content

## Error Handling

The client includes comprehensive error handling:
- API errors with status codes
- Network errors
- Rate limiting
- Configuration errors
- Input validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the TMDB API documentation: https://developer.themoviedb.org/reference/intro/getting-started
2. Create an issue in this repository
3. Check existing issues for similar problems
