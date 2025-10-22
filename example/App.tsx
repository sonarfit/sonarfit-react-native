import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import SonarFitSDK, { WorkoutConfig, WorkoutResult, WorkoutType, DeviceType } from 'sonarfit-react-native';

// TODO: Replace with your actual SonarFit API key
const SONARFIT_API_KEY = 'your-api-key-here';

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastResult, setLastResult] = useState<WorkoutResult | null>(null);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState<WorkoutType>('squat');
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('none');

  // Initialize SonarFit SDK when app starts
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        console.log('Initializing SonarFit SDK...');
        await SonarFitSDK.initialize(SONARFIT_API_KEY);
        console.log('SonarFit SDK initialized successfully');
        setIsInitialized(true);
      } catch (error: any) {
        console.error('Failed to initialize SonarFit SDK:', error);
        Alert.alert(
          'Initialization Error',
          `Failed to initialize SonarFit SDK: ${error.message}\n\nPlease check your API key.`
        );
      }
    };

    initializeSDK();
  }, []);

  const startWorkout = async () => {
    // Check if SDK is available
    if (!SonarFitSDK.isAvailable()) {
      Alert.alert('Error', 'SonarFit SDK is not available on this device');
      return;
    }

    // Check if SDK is initialized
    if (!isInitialized) {
      Alert.alert('Error', 'SonarFit SDK is not initialized yet. Please wait.');
      return;
    }

    setIsLoading(true);

    try {
      const config: WorkoutConfig = {
        workoutType: selectedWorkoutType,
        sets: 3,
        reps: 10,
        restTime: 60,
        countdownDuration: 3,
        autoReLift: true,
        deviceType: selectedDevice,
      };

      console.log('Starting workout with config:', config);
      const result = await SonarFitSDK.presentWorkout(config);
      console.log('Workout result:', result);

      setLastResult(result);

      if (result.completed) {
        Alert.alert(
          'Workout Complete! 🎉',
          `Exercise: ${result.workoutType}\n` +
          `Device: ${result.deviceType}\n` +
          `Reps: ${result.totalRepsCompleted}/${result.totalTargetReps}\n` +
          `Duration: ${Math.round(result.totalDuration!)}s\n` +
          `Completion: ${Math.round(result.completionPercentage! * 100)}%`
        );
      } else if (result.cancelled) {
        Alert.alert('Workout Cancelled', 'You can resume anytime!');
      }
    } catch (error: any) {
      console.error('Workout error:', error);
      Alert.alert('Error', `Workout failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderWorkoutTypeButton = (type: WorkoutType, label: string) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedWorkoutType === type && styles.optionButtonSelected,
      ]}
      onPress={() => setSelectedWorkoutType(type)}
      disabled={isLoading}
    >
      <Text
        style={[
          styles.optionButtonText,
          selectedWorkoutType === type && styles.optionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderDeviceButton = (type: DeviceType, label: string) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedDevice === type && styles.optionButtonSelected,
      ]}
      onPress={() => setSelectedDevice(type)}
      disabled={isLoading}
    >
      <Text
        style={[
          styles.optionButtonText,
          selectedDevice === type && styles.optionButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SonarFit SDK Example</Text>
          <Text style={styles.subtitle}>AI-Powered Workout Tracking</Text>
        </View>

        {/* Workout Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Type</Text>
          <View style={styles.optionsRow}>
            {renderWorkoutTypeButton('squat', 'Squat')}
            {renderWorkoutTypeButton('deadlift', 'Deadlift')}
            {renderWorkoutTypeButton('benchpress', 'Bench Press')}
          </View>
        </View>

        {/* Device Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device</Text>
          <View style={styles.optionsRow}>
            {renderDeviceButton('none', 'Auto-Detect')}
            {renderDeviceButton('airpods', 'AirPods')}
            {renderDeviceButton('watch', 'Apple Watch')}
          </View>
        </View>

        {/* Start Workout Button */}
        <TouchableOpacity
          style={[styles.startButton, (isLoading || !isInitialized) && styles.startButtonDisabled]}
          onPress={startWorkout}
          disabled={isLoading || !isInitialized}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.startButtonText}>
              {isInitialized ? 'Start Workout' : 'Initializing...'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Last Result */}
        {lastResult && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Last Workout Results</Text>

            <View style={styles.resultCard}>
              <View style={styles.resultRow}>
                <Text style={styles.resultLabel}>Status:</Text>
                <Text style={[
                  styles.resultValue,
                  lastResult.completed ? styles.resultSuccess : styles.resultCancelled
                ]}>
                  {lastResult.completed ? 'Completed ✓' : 'Cancelled'}
                </Text>
              </View>

              {lastResult.completed && (
                <>
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Exercise:</Text>
                    <Text style={styles.resultValue}>{lastResult.workoutType}</Text>
                  </View>

                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Device:</Text>
                    <Text style={styles.resultValue}>{lastResult.deviceType}</Text>
                  </View>

                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Reps:</Text>
                    <Text style={styles.resultValue}>
                      {lastResult.totalRepsCompleted} / {lastResult.totalTargetReps}
                    </Text>
                  </View>

                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Duration:</Text>
                    <Text style={styles.resultValue}>
                      {Math.round(lastResult.totalDuration!)}s
                    </Text>
                  </View>

                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Completion:</Text>
                    <Text style={styles.resultValue}>
                      {Math.round(lastResult.completionPercentage! * 100)}%
                    </Text>
                  </View>

                  {lastResult.sets && lastResult.sets.length > 0 && (
                    <>
                      <Text style={styles.setsTitle}>Sets Breakdown:</Text>
                      {lastResult.sets.map((set) => (
                        <View key={set.setNumber} style={styles.setRow}>
                          <Text style={styles.setLabel}>Set {set.setNumber}:</Text>
                          <Text style={styles.setValue}>{set.repsCompleted} reps</Text>
                        </View>
                      ))}
                    </>
                  )}
                </>
              )}
            </View>
          </View>
        )}

        {/* SDK Status */}
        <View style={styles.statusSection}>
          <Text style={styles.statusText}>
            SDK Status: {SonarFitSDK.isAvailable() ? '✓ Available' : '✗ Not Available'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  optionButtonTextSelected: {
    color: '#fff',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultsSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  resultValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  resultSuccess: {
    color: '#34C759',
  },
  resultCancelled: {
    color: '#FF3B30',
  },
  setsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingLeft: 12,
  },
  setLabel: {
    fontSize: 14,
    color: '#666',
  },
  setValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  statusSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#999',
  },
});

export default App;
