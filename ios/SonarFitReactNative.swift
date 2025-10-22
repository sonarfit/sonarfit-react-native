import Foundation
import React
import SonarFitKit

@objc(SonarFitSDKModule)
class SonarFitSDKModule: NSObject {

    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc
    func initialize(_ apiKey: String,
                   resolver resolve: @escaping RCTPromiseResolveBlock,
                   rejecter reject: @escaping RCTPromiseRejectBlock) {

        SonarFitSDK.initialize(apiKey: apiKey) { success, error in
            if success {
                resolve(true)
            } else {
                reject("E_INIT_FAILED", "Failed to initialize SonarFit SDK: \(error?.localizedDescription ?? "Unknown error")", error)
            }
        }
    }

    @objc
    func presentWorkout(_ config: NSDictionary,
                       resolver resolve: @escaping RCTPromiseResolveBlock,
                       rejecter reject: @escaping RCTPromiseRejectBlock) {

        DispatchQueue.main.async {
            guard let rootViewController = RCTKeyWindow()?.rootViewController else {
                reject("E_NO_ROOT_VC", "Cannot find root view controller", nil)
                return
            }

            // Parse workout configuration
            guard let workoutConfig = self.parseWorkoutConfig(config) else {
                reject("E_INVALID_CONFIG", "Invalid workout configuration", nil)
                return
            }

            // Present SonarFit workout
            SonarFit.startWorkout(
                config: workoutConfig,
                from: rootViewController,
                onCompletion: { result in
                    if let result = result {
                        // Convert WorkoutResult to dictionary
                        let resultDict: [String: Any] = [
                            "completed": result.status == .completed,
                            "workoutType": result.workoutType.rawValue,
                            "deviceType": result.deviceType.rawValue,
                            "startTime": result.startTime.timeIntervalSince1970,
                            "endTime": result.endTime.timeIntervalSince1970,
                            "totalDuration": result.totalDuration,
                            "completionPercentage": result.completionPercentage,
                            "targetSets": result.targetSets,
                            "targetRepsPerSet": result.targetRepsPerSet,
                            "totalRepsCompleted": result.totalRepsCompleted,
                            "totalTargetReps": result.totalTargetReps,
                            "sets": result.sets.map { set in
                                return [
                                    "setNumber": set.setNumber,
                                    "repsCompleted": set.repsCompleted
                                ]
                            }
                        ]
                        resolve(resultDict)
                    } else {
                        // Workout cancelled
                        resolve([
                            "completed": false,
                            "cancelled": true
                        ])
                    }
                },
                onPermissionError: { error in
                    reject("E_PERMISSION", error.localizedDescription, error)
                }
            )
        }
    }

    private func parseWorkoutConfig(_ config: NSDictionary) -> WorkoutConfig? {
        guard let workoutTypeString = config["workoutType"] as? String else {
            return nil
        }

        let workoutType: WorkoutType
        switch workoutTypeString.lowercased() {
        case "squat":
            workoutType = .squat
        case "deadlift":
            workoutType = .deadlift
        case "benchpress":
            workoutType = .benchpress
        default:
            return nil
        }

        guard let sets = config["sets"] as? Int,
              let reps = config["reps"] as? Int else {
            return nil
        }

        let restTime = config["restTime"] as? Int ?? 60
        let countdownDuration = config["countdownDuration"] as? Int ?? 3
        let autoReLift = config["autoReLift"] as? Bool ?? true

        let deviceType: DeviceType
        if let deviceTypeString = config["deviceType"] as? String {
            switch deviceTypeString.lowercased() {
            case "watch":
                deviceType = .watch
            case "airpods":
                deviceType = .airpods
            default:
                deviceType = .none
            }
        } else {
            deviceType = .none
        }

        return WorkoutConfig(
            workoutType: workoutType,
            sets: sets,
            reps: reps,
            restTime: restTime,
            countdownDuration: countdownDuration,
            autoReLift: autoReLift,
            deviceType: deviceType
        )
    }
}

// Helper to get key window
func RCTKeyWindow() -> UIWindow? {
    if #available(iOS 13.0, *) {
        return UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
    } else {
        return UIApplication.shared.keyWindow
    }
}
