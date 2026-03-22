# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
