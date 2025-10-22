import { NativeModules } from 'react-native';

const { SonarFitSDKModule } = NativeModules;

export type WorkoutType = 'squat' | 'deadlift' | 'benchpress';
export type DeviceType = 'none' | 'watch' | 'airpods';

export interface WorkoutConfig {
  /** Type of workout exercise */
  workoutType: WorkoutType;
  /** Number of sets to complete */
  sets: number;
  /** Target reps per set */
  reps: number;
  /** Rest time between sets in seconds (default: 60) */
  restTime?: number;
  /** Countdown before each set in seconds (default: 3) */
  countdownDuration?: number;
  /** Automatically start next set after countdown (default: true) */
  autoReLift?: boolean;
  /** Device type to use for motion tracking (default: 'none' for auto-detect) */
  deviceType?: DeviceType;
}

export interface WorkoutSet {
  /** Set number (1-indexed) */
  setNumber: number;
  /** Number of reps completed in this set */
  repsCompleted: number;
}

export interface WorkoutResult {
  /** Whether the workout was completed successfully */
  completed: boolean;
  /** Whether the workout was cancelled by user */
  cancelled?: boolean;
  /** Type of workout performed */
  workoutType?: WorkoutType;
  /** Device used for motion tracking */
  deviceType?: DeviceType;
  /** Workout start timestamp (Unix epoch) */
  startTime?: number;
  /** Workout end timestamp (Unix epoch) */
  endTime?: number;
  /** Total workout duration in seconds */
  totalDuration?: number;
  /** Percentage of target reps completed (0.0 to 1.0) */
  completionPercentage?: number;
  /** Target number of sets */
  targetSets?: number;
  /** Target reps per set */
  targetRepsPerSet?: number;
  /** Total reps completed across all sets */
  totalRepsCompleted?: number;
  /** Total target reps for the workout */
  totalTargetReps?: number;
  /** Array of completed sets with rep counts */
  sets?: WorkoutSet[];
}

export class SonarFitSDK {
  /**
   * Initialize the SonarFit SDK with your API key
   * @param apiKey Your SonarFit API key
   * @returns Promise that resolves when initialization is complete
   * @throws Error if native module is not available or initialization fails
   *
   * @example
   * ```typescript
   * await SonarFitSDK.initialize('your-api-key-here');
   * ```
   */
  static async initialize(apiKey: string): Promise<void> {
    if (!SonarFitSDKModule) {
      throw new Error(
        'SonarFitSDK native module not found. Make sure you have installed the native dependencies.'
      );
    }

    try {
      await SonarFitSDKModule.initialize(apiKey);
    } catch (error: any) {
      throw new Error(`SonarFit initialization failed: ${error?.message || error}`);
    }
  }

  /**
   * Present the SonarFit workout UI modally
   * @param config Workout configuration
   * @returns Promise that resolves with workout result when workout completes or is cancelled
   * @throws Error if native module is not available or workout fails
   *
   * @example
   * ```typescript
   * const result = await SonarFitSDK.presentWorkout({
   *   workoutType: 'squat',
   *   sets: 3,
   *   reps: 10,
   *   restTime: 60
   * });
   *
   * if (result.completed) {
   *   console.log(`Completed ${result.totalRepsCompleted}/${result.totalTargetReps} reps`);
   * }
   * ```
   */
  static async presentWorkout(config: WorkoutConfig): Promise<WorkoutResult> {
    if (!SonarFitSDKModule) {
      throw new Error(
        'SonarFitSDK native module not found. Make sure you have installed the native dependencies.'
      );
    }

    try {
      const result = await SonarFitSDKModule.presentWorkout(config);
      return result;
    } catch (error: any) {
      throw new Error(`SonarFit workout failed: ${error?.message || error}`);
    }
  }

  /**
   * Check if SonarFit SDK is available on this platform
   * @returns true if the native module is available, false otherwise
   */
  static isAvailable(): boolean {
    return SonarFitSDKModule != null;
  }
}

export default SonarFitSDK;
