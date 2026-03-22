# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).




## [2.1.3] - 2026-03-22

**Changed**
- Remove source `.mlmodel` files from the SDK bundle to prevent unnecessary Xcode recompilation in client projects
## [2.1.2] - 2026-03-22

**Breaking Changes**
- Rename SDK module from `SonarFit` to `SonarFitKit` — update all import statements
- Rename rep and set properties on workout models for clarity — update any references to affected fields
- Update logging API to support granular log levels — replace previous log configuration calls with the new `LogLevel` API

**Added**
- Add `WatchStatusManager` to monitor and respond to Apple Watch app state changes
- Add `resendWatchConfig` method to re-push configuration to the Watch when connectivity is lost
- Add communicating-state UI indicator when the SDK is syncing with the Watch
- Add Watch handshake to verify connection before workout operations
- Add device availability checks when starting or resuming a workout
- Add headphone status delegate to receive AirPods connectivity updates
- Add `skipRestWithCountdown` method as a timed variant of `skipRest`

**Changed**
- Update AirPods rep detector to v2 model with improved motion filtering for more accurate rep counts
- Replace AirPods workout detection with a new processing pipeline for lower latency and higher reliability
- Improve Watch connectivity handling and workout device session management
## [2.1.1] - 2026-03-22

**Breaking Changes**
- Rename SDK module from `SonarFit` to `SonarFitKit` — update all import statements
- Rename rep and set properties on workout models for clarity — update any property references at call sites
- Replace logging API with new granular log level system — update any custom logging configuration

**Added**
- New AirPods workout detection pipeline for rep counting via headphone motion sensors
- `WatchStatusManager` for observing Apple Watch app status
- Headphone status delegate for monitoring AirPods availability during workouts
- Device availability checks before workout start and resume
- `skipRestWithCountdown` method to skip rest periods with a countdown
- `resendWatchConfig` method to re-sync configuration with the paired Watch
- Watch handshake flow to confirm communication before workout begins
- Communicating state UI to surface Watch connectivity status to users
- New color theme options for SDK UI components

**Changed**
- Improve AirPods rep detector with updated v2 ML model and enhanced signal filtering
- Improve Apple Watch connectivity reliability and workout device handling
## [2.1.0] - 2026-03-22

**Breaking Changes**
- Rename SDK module from `SonarFit` to `SonarFitKit` — update all imports and references
- Rename rep and set properties on workout models for clarity — update any code accessing these fields directly

**Added**
- Add `WatchStatusManager` to expose Apple Watch connection and app status
- Add device availability checks before starting or resuming a workout
- Add `skipRestWithCountdown` API for skipping rest periods with a countdown
- Add headphone status delegate for monitoring AirPods connectivity state
- Add `resendWatchConfig` method to re-sync configuration with the paired Watch
- Add granular log level system with updated logging API for filtering SDK output
- Add communicating state indicator in UI during Watch data sync

**Changed**
- Upgrade AirPods rep detector to v2 model with improved signal filtering for more accurate rep counts
- Introduce new AirPods workout detection pipeline for improved reliability
- Improve Watch connectivity handling and workout device session management
- Update theme manager with new color options and remove unused color definitions
