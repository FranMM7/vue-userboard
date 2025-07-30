# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.6](https://github.com/FranMM7/vue-userboard/compare/v0.0.5...v0.0.6) (2025-07-30)


### Bug Fixes

* Correct component location ([d71f41a](https://github.com/FranMM7/vue-userboard/commit/d71f41ac8d4bf57008b5f1b4512b36724c0441ef))

### [0.0.5](https://github.com/FranMM7/vue-userboard/compare/v0.0.4...v0.0.5) (2025-07-30)

### [0.0.4](https://github.com/FranMM7/vue-userboard/compare/v0.0.3...v0.0.4) (2025-07-30)


### Features

* add responsive WelcomeCard and SuccessMessage components + shared UI components ([30d5b57](https://github.com/FranMM7/vue-userboard/commit/30d5b57df0eda3221f02aeb8b91eb3f6d805701a))

### [0.0.3](https://github.com/FranMM7/vue-userboard/compare/v0.0.2...v0.0.3) (2025-07-29)

### [0.0.2](https://github.com/FranMM7/vue-userboard/compare/v0.0.1...v0.0.2) (2025-07-26)

### 0.0.1 (2025-07-26)


### Bug Fixes

* remove .env virables ([5f896fb](https://github.com/FranMM7/vue-userboard/commit/5f896fbfc63201a0e037b344f9fec29997bfa14f))

## [0.1.0] - 2025-07-26
### Added
- Initial project setup with Vue 3, Vite, and Tailwind CSS
- Configured Tailwind theme: colors, fonts (Nunito), layout utilities
- Created base layout in App.vue with header and main sections
- Implemented `RegistrationForm.vue`:
  - Uses `GET /positions` to load dynamic radio buttons
  - Handles validation and `POST /users` with multipart/form-data
  - Emits `@registered` event on success
- Implemented `UserList.vue`:
  - Loads users from `GET /users`
  - Supports pagination with "Show more" button
  - Integrates with new user refresh via `ref().refreshFirstPage()`

### Pending
- Improve spacing and alignment to match Figma 100%
- Customize file input appearance to match design
- Handle tooltip or ellipsis truncation for long names/emails
