#import "SonarFitReactNative.h"
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SonarFitSDKModule, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)apiKey
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(presentWorkout:(NSDictionary *)config
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end