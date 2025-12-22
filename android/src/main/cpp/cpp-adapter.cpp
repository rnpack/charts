#include <jni.h>
#include "rnpackchartsOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::rnpackcharts::initialize(vm);
}
