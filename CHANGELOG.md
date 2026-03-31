# Changelog

All notable changes to this project will be documented in this file.
## [Unreleased]

### Bug Fixes

- Use placeholder Convex URL during build to avoid SSR errors
- Lazy-load Convex client to avoid build-time env errors
- Remove unused imports and variables to resolve security alerts
- Improve vote submission reliability and error handling
- Remove duplicate footer from contact page
- Correct variable name reference in dlr-digital-tap component
- Resolve CodeQL alerts and enhance supporting pages
- Correct American spellings to British English
- Add missing CardHeader and CardTitle imports to landing page
- Enable navigation from about and vote pages

### CI/CD

- Add automatic changelog workflow
- Add automatic changelog workflow
- Add automatic changelog workflow
- Bump actions/checkout from 4 to 6
- Bump actions/checkout from 4 to 5 (#1)
- Remove dependency-review workflow (requires GitHub Advanced Security)
- Fix pnpm version conflict in GitHub Actions
- Fix GitHub Actions to use pnpm instead of npm
- Add comprehensive GitHub Actions and Dependabot setup

### Changes

- Merge pull request #36 from antonio59/dependabot/npm_and_yarn/radix-ui/react-toggle-group-1.1.11

deps(deps): bump @radix-ui/react-toggle-group from 1.1.1 to 1.1.11
- **deps**: Bump @radix-ui/react-toggle-group from 1.1.1 to 1.1.11
- Merge pull request #35 from antonio59/dependabot/npm_and_yarn/radix-ui/react-menubar-1.1.16

deps(deps): bump @radix-ui/react-menubar from 1.1.4 to 1.1.16
- **deps**: Bump @radix-ui/react-menubar from 1.1.4 to 1.1.16
- Merge pull request #31 from antonio59/dependabot/npm_and_yarn/cmdk-1.1.1

deps(deps): bump cmdk from 1.0.4 to 1.1.1
- **deps**: Bump cmdk from 1.0.4 to 1.1.1
- Add convex and remove supabase dependency
- Merge pull request #34 from antonio59/dependabot/npm_and_yarn/radix-ui/react-dropdown-menu-2.1.16

deps(deps): bump @radix-ui/react-dropdown-menu from 2.1.4 to 2.1.16
- **deps**: Bump @radix-ui/react-dropdown-menu from 2.1.4 to 2.1.16
- Merge pull request #33 from antonio59/dependabot/npm_and_yarn/lucide-react-0.554.0

deps(deps): bump lucide-react from 0.454.0 to 0.554.0
- **deps**: Bump lucide-react from 0.454.0 to 0.554.0
- Merge pull request #32 from antonio59/dependabot/npm_and_yarn/radix-ui/react-tabs-1.1.13

deps(deps): bump @radix-ui/react-tabs from 1.1.2 to 1.1.13
- **deps**: Bump @radix-ui/react-tabs from 1.1.2 to 1.1.13
- Merge pull request #30 from antonio59/dependabot/npm_and_yarn/radix-ui/react-separator-1.1.8

deps(deps): bump @radix-ui/react-separator from 1.1.1 to 1.1.8
- **deps**: Bump @radix-ui/react-separator from 1.1.1 to 1.1.8
- Merge pull request #29 from antonio59/dependabot/npm_and_yarn/react-hook-form-7.66.1

deps(deps): bump react-hook-form from 7.58.1 to 7.66.1
- **deps**: Bump react-hook-form from 7.58.1 to 7.66.1
- Merge pull request #27 from antonio59/dependabot/npm_and_yarn/radix-ui/react-avatar-1.1.11

deps(deps): bump @radix-ui/react-avatar from 1.1.2 to 1.1.11
- **deps**: Bump @radix-ui/react-avatar from 1.1.2 to 1.1.11
- Merge pull request #26 from antonio59/dependabot/npm_and_yarn/eslint-config-next-15.5.6

deps(deps-dev): bump eslint-config-next from 14.2.33 to 15.5.6
- **deps-dev**: Bump eslint-config-next from 14.2.33 to 15.5.6
- Merge pull request #25 from antonio59/dependabot/npm_and_yarn/radix-ui/react-progress-1.1.8

deps(deps): bump @radix-ui/react-progress from 1.1.1 to 1.1.8
- **deps**: Bump @radix-ui/react-progress from 1.1.1 to 1.1.8
- Merge pull request #24 from antonio59/dependabot/github_actions/actions/checkout-6

ci: bump actions/checkout from 4 to 6
- Batch update all dependencies from Dependabot PRs
- Update Next.js to 14.2.33 and fix ESLint configuration
- Initial commit

### Chores

- Add git-cliff config for changelog generation
- Add git-cliff config for changelog generation
- Add git-cliff config for changelog generation
- Update Netlify config to use bun
- Migrate from pnpm to bun package manager
- Update dependencies and fix security issues
- Add Terms and Privacy links in footer
- Remove plugin entry; rely on Netlify UI plugin
- Add @netlify/next plugin

### Documentation

- Update changelog [skip ci]
- Update changelog [skip ci]
- Update changelog [skip ci]
- Update changelog [skip ci]
- Update 'Who I Am' section with full name and details
- Update campaign roadmap to reflect ongoing strategy
- Add comprehensive improvement session summary
- Add GitHub CLI authentication guide and open PRs summary

### Features

- Proxy umami script to bypass ad blockers
- Add umami analytics script
- Add social media feed and fix metadata
- Add supabase keep-alive script and enhance SEO
- Add /prototype route and update navigation
- Add /contact route page
- Update campaign story and remove all hardcoded goals/timelines
- Add admin dashboard and n8n automation for ongoing campaign
- Update About page with Royal Victoria story and fix British English
- Redesign contact page and hero section with brand consistency
- Add site header component and fix terms page
- Comprehensive About page redesign with campaign story and FAQ
- Comprehensive campaign redesign - clarify prototype status and improve messaging
- Add /about, /vote, /terms, /privacy routes

### Refactoring

- Migrate from Supabase to Convex
- Rebrand to Digital Tap and remove n8n workflow
- Standardize navigation and fix routing architecture
- Global footer, branded legal pages, real Next.js links

### Security

- Fix insecure randomness and unused variable

### Styling

- Update hero colours to DLR-inspired cyan/teal branding


