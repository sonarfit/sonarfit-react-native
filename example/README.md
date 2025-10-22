# SonarFit React Native - Example App

This is a complete example app demonstrating the SonarFit React Native SDK integration.

## Features Demonstrated

- ✅ All three workout types (Squat, Deadlift, Bench Press)
- ✅ All device types (Auto-detect, AirPods, Apple Watch)
- ✅ Complete workout flow with results display
- ✅ Proper error handling
- ✅ TypeScript integration
- ✅ iOS permissions setup

## Prerequisites

- Node.js >= 18
- Xcode >= 16.0
- iOS Simulator or physical iOS device (iOS 17.0+)
- CocoaPods

## Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
```

2. **Install iOS pods:**

```bash
cd ios
pod install
cd ..
```

## Running the App

### iOS

```bash
# Run on iOS simulator
npm run ios

# Run on specific simulator
npm run ios -- --simulator="iPhone 15 Pro"

# Run on physical device (requires proper code signing)
npm run ios -- --device
```

### Development

Start the Metro bundler:

```bash
npm start
```

## Testing the SDK

### Testing with AirPods Pro

1. Pair AirPods Pro with your iPhone
2. Select "AirPods" as the device type
3. Put AirPods in your ears
4. Start workout and perform squats

### Testing with Apple Watch

1. Pair Apple Watch with your iPhone
2. Ensure Watch app is installed
3. Select "Apple Watch" as the device type
4. Start workout and the Watch app will launch automatically

### Testing Auto-Detect

1. Select "Auto-Detect" as the device type
2. The SDK will automatically choose the best available device
3. Priority: Apple Watch > AirPods Pro > iPhone (if supported)

## App Structure

```
example/
├── App.tsx              # Main app component with all UI
├── index.js             # App entry point
├── package.json         # Dependencies
├── ios/                 # iOS native files
│   ├── Podfile         # CocoaPods configuration
│   └── SonarFitExample/
│       └── Info.plist  # iOS permissions
└── README.md           # This file
```

## What to Test

### Workout Configuration

The example app allows you to configure:
- **Workout Type**: Squat, Deadlift, or Bench Press
- **Device**: Auto-detect, AirPods, or Apple Watch
- **Sets**: 3 (hardcoded in example)
- **Reps**: 10 per set (hardcoded in example)
- **Rest Time**: 60 seconds between sets

### Expected Behavior

1. **Start Workout**:
   - SDK presents a full-screen modal
   - Device detection occurs
   - Countdown begins (3 seconds)

2. **During Workout**:
   - Rep counter updates in real-time
   - Audio feedback on each rep
   - Progress through sets
   - Rest timer between sets

3. **Completion**:
   - Modal dismisses automatically
   - Results displayed in app
   - Detailed per-set breakdown shown

### Verifying Results

After completing a workout, check:
- ✅ `completed: true` for finished workouts
- ✅ `totalRepsCompleted` matches your actual reps
- ✅ `sets` array has data for each completed set
- ✅ `completionPercentage` is calculated correctly
- ✅ `totalDuration` reflects actual workout time

## Troubleshooting

### Module not found

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Build errors

```bash
# Clean everything
npx react-native clean

# Reinstall pods
cd ios && pod install && cd ..

# Rebuild
npm run ios
```

### Permission errors

Ensure `NSMotionUsageDescription` is in `ios/SonarFitExample/Info.plist` (already configured).

### SDK not available

Check console logs:
```typescript
console.log('SDK Available:', SonarFitSDK.isAvailable());
```

If false:
1. Ensure pods are installed
2. Clean and rebuild
3. Check iOS deployment target is 17.0+

## Modifying the Example

### Change Workout Configuration

Edit `App.tsx` around line 21:

```typescript
const config: WorkoutConfig = {
  workoutType: selectedWorkoutType,
  sets: 5,              // Change number of sets
  reps: 8,              // Change reps per set
  restTime: 90,         // Change rest time (seconds)
  countdownDuration: 5, // Change countdown (seconds)
  autoReLift: false,    // Disable auto-start of next set
  deviceType: selectedDevice,
};
```

### Add More UI Features

The example app is a starting point. You can add:
- Workout history
- Custom workout configurations
- User profiles
- Progress tracking
- Charts and statistics

## Learn More

- **SonarFit SDK Documentation**: See main README.md in parent directory
- **React Native Docs**: https://reactnative.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/

## License

MIT
