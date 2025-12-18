#include <jni.h>
#include "RNPackChartsOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::RNPackCharts::initialize(vm);
}
