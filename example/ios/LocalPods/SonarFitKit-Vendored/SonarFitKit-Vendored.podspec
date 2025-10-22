Pod::Spec.new do |s|
  s.name         = 'SonarFitKit-Vendored'
  s.version      = '1.1.1'
  s.summary      = 'SonarFit Kit Framework'
  s.homepage     = 'https://sonarfit.io'
  s.license      = 'MIT'
  s.authors      = 'SonarFit'
  s.platforms    = { :ios => '17.0' }
  s.source       = { :http => 'https://sonarfit.io' }

  s.vendored_frameworks = 'SonarFitKit.xcframework'
  s.dependency 'SonarFitCore-Vendored'
  s.dependency 'SonarFitConnectivity-Vendored'
  s.dependency 'SonarFitUI-Vendored'
end
