# sonarfit-react-native

React Native integration for SonarFit SDK - AI-powered workout rep counting for iOS

## Features

- AI-powered rep counting for squats, deadlifts, and bench press
- Real-time workout tracking
- Support for Apple Watch and AirPods motion sensors
- Native iOS integration with React Native bridge
- TypeScript support

## Installation

```bash
npm install sonarfit-react-native
```

### iOS Setup

1. Install CocoaPods dependencies:
```bash
cd ios && pod install
```

2. The SonarFit SDK requires iOS 17.0 or higher. Make sure your `Podfile` has:
```ruby
platform :ios, '17.0'
```

## Usage

### Initialize the SDK

```typescript
import SonarFitSDK from 'sonarfit-react-native';

// Initialize with your API key when your app starts
useEffect(() => {
  const initSDK = async () => {
    try {
      await SonarFitSDK.initialize('your-api-key-here');
      console.log('SonarFit SDK initialized');
    } catch (error) {
      console.error('Failed to initialize SonarFit SDK:', error);
    }
  };
  
  initSDK();
}, []);
```

### Start a Workout

```typescript
import SonarFitSDK, { WorkoutConfig } from 'sonarfit-react-native';

const startWorkout = async () => {
  const config: WorkoutConfig = {
    workoutType: 'squat',  // 'squat' | 'deadlift' | 'benchpress'
    sets: 3,
    reps: 10,
    restTime: 60,          // seconds
    countdownDuration: 3,  // seconds
    autoReLift: true,
    deviceType: 'none',    // 'none' | 'watch' | 'airpods'
  };

  try {
    const result = await SonarFitSDK.presentWorkout(config);
    
    if (result.completed) {
      console.log(`Completed ${result.totalRepsCompleted}/${result.totalTargetReps} reps`);
      console.log(`Duration: ${result.totalDuration}s`);
      console.log(`Sets:`, result.sets);
    } else if (result.cancelled) {
      console.log('Workout cancelled');
    }
  } catch (error) {
    console.error('Workout error:', error);
  }
};
```

## API Reference

### `SonarFitSDK.initialize(apiKey: string): Promise<void>`

Initialize the SonarFit SDK with your API key.

**Parameters:**
- `apiKey`: Your SonarFit API key

### `SonarFitSDK.presentWorkout(config: WorkoutConfig): Promise<WorkoutResult>`

Present the SonarFit workout UI.

**Parameters:**
- `config`: Workout configuration

**Returns:**
- `Promise<WorkoutResult>`: Workout results when complete or cancelled

### Types

```typescript
interface WorkoutConfig {
  workoutType: 'squat' | 'deadlift' | 'benchpress';
  sets: number;
  reps: number;
  restTime?: number;           // default: 60
  countdownDuration?: number;  // default: 3
  autoReLift?: boolean;        // default: true
  deviceType?: 'none' | 'watch' | 'airpods';  // default: 'none'
}

interface WorkoutResult {
  completed: boolean;
  cancelled?: boolean;
  workoutType?: string;
  deviceType?: string;
  startTime?: number;
  endTime?: number;
  totalDuration?: number;
  completionPercentage?: number;
  targetSets?: number;
  targetRepsPerSet?: number;
  totalRepsCompleted?: number;
  totalTargetReps?: number;
  sets?: Array<{
    setNumber: number;
    repsCompleted: number;
  }>;
}
```

## Requirements

- React Native >= 0.60
- iOS >= 17.0
- Xcode >= 15.0

## Example

See the [example](./example) directory for a complete working example app.

## License

MIT

## Support

For issues and questions, please visit [GitHub Issues](https://github.com/sonarfit/sonarfit-react-native/issues)
