package expo.modules.deviceinfo

import android.content.Context
import android.os.Build
import android.os.PowerManager
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DeviceInfoModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("DeviceInfo")

    AsyncFunction("getBatteryLevel") { promise: Promise ->
      try {
        val context = appContext.reactContext ?: throw Exception("ReactContext not found")
        val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as android.os.BatteryManager
        val level = batteryManager.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY)
        promise.resolve(level)
      } catch (e: Exception) {
        promise.resolve(100)
      }
    }

    Function("getDeviceModel") {
      return@Function Build.MODEL
    }

    AsyncFunction("getThermalState") { promise: Promise ->
      try {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
          val context = appContext.reactContext ?: throw Exception("ReactContext not found")
          val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
          val headroom = powerManager.getThermalHeadroom()
          val state = when {
            headroom < 0.0f -> "critical"
            headroom < 0.1f -> "serious"
            headroom < 0.5f -> "fair"
            else -> "nominal"
          }
          promise.resolve(state)
        } else {
          promise.resolve("nominal")
        }
      } catch (e: Exception) {
        promise.resolve("nominal")
      }
    }
  }
}
