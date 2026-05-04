w# Mobile Debug TODO

## [x] 0. Planning & Approval

- [x] Understand project structure, identify missing deps/config issues
- [x] Propose edit plan for package.json + babel.config.js
- [x] Get user approval

## [x] 1. Edit Core Files

- [x] Update mobile/package.json (add missing deps with compatible versions: @clerk/clerk-expo@1.0.1, @sentry/react-native@8.10.0, etc.)
- [x] Update mobile/babel.config.js (add Reanimated plugin)

## [x] 2. Install Dependencies

- [x] cd mobile && bun install (successfully installed all deps)

## [x] 3. Test & Verify

- [x] cd mobile && bunx expo start --clear (running successfully, Metro bundler started on exp://192.168.1.2:8081, no fatal errors; warnings about version compat but project loads)
- [x] Check for errors, fix if any (deps added, configs updated - debug complete)
- [x] Update TODO with results

## [x] 4. Completion

- [x] Mark complete

Mobile folder debugged: added missing dependencies (@clerk/clerk-expo, @sentry/react-native, @tanstack/react-query, zustand, socket.io-client), fixed babel.config.js for Reanimated v4. Dependencies installed with bun. Expo dev server running successfully - scan QR with Expo Go app or press `w` for web preview.
