#!/bin/bash

# SonarFit React Native Example App Setup Script

set -e

echo "🚀 Setting up SonarFit React Native Example App..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Must run from the example directory"
  exit 1
fi

echo ""
echo "📦 Installing npm dependencies..."
npm install --legacy-peer-deps

echo ""
echo "🍎 Installing iOS pods..."
cd ios
pod install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the app:"
echo "  npm run ios"
echo ""
echo "Or open in Xcode:"
echo "  open ios/SonarFitExample.xcworkspace"
