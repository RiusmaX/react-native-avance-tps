import ExpoModulesCore
import UIKit

public class DeviceInfoModule: Module {
  public func definition() -> ModuleDefinition {
    Name("DeviceInfo")

    AsyncFunction("getBatteryLevel") { () -> Int in
      UIDevice.current.isBatteryMonitoringEnabled = true
      let level = UIDevice.current.batteryLevel
      return Int((level >= 0 ? level : 1.0) * 100)
    }

    Function("getDeviceModel") { () -> String in
      return UIDevice.current.model
    }

    AsyncFunction("getThermalState") { () -> String in
      let state = ProcessInfo.processInfo.thermalState
      switch state {
      case .nominal: return "nominal"
      case .fair: return "fair"
      case .serious: return "serious"
      case .critical: return "critical"
      @unknown default: return "nominal"
      }
    }
  }
}
