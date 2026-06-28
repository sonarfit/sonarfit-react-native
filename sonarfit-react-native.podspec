require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "sonarfit-react-native"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "17.0" }
  s.source       = { :git => "https://github.com/sonarfit/sonarfit-react-native.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React-Core"

  # SonarFit SDK XCFrameworks are vendored directly in this package (shipped in
  # the npm tarball under ios/). A plain `npm install` + `pod install` resolves
  # and embeds them — no external/unpublished pod required. SonarFitKit is the
  # umbrella; Core/Connectivity/UI are its iOS dependencies.
  s.vendored_frameworks = [
    "ios/SonarFitKit.xcframework",
    "ios/SonarFitCore.xcframework",
    "ios/SonarFitConnectivity.xcframework",
    "ios/SonarFitUI.xcframework",
  ]

  # Swift version
  s.swift_version = "5.9"
end
