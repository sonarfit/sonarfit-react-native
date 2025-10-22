Pod::Spec.new do |s|
  s.name         = 'SonarFitConnectivity-Vendored'
  s.version      = '1.1.1'
  s.summary      = 'SonarFit Connectivity Framework'
  s.homepage     = 'https://sonarfit.io'
  s.license      = 'MIT'
  s.authors      = 'SonarFit'
  s.platforms    = { :ios => '17.0' }
  s.source       = { :http => 'https://sonarfit.io' }

  s.vendored_frameworks = 'SonarFitConnectivity.xcframework'
  s.dependency 'SonarFitCore-Vendored'
end
