import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  // RNPackChartsView,
  DonutChart,
} from '@rnpack/charts';

export default function App() {
  return (
    <SafeAreaView style={styles?.container}>
      <ScrollView contentContainerStyle={styles?.content}>
        <View style={styles.nativeContainer}>
          {/* <RNPackChartsView color="#32a852" style={styles.box} /> */}
        </View>
        <DonutChart radius={60} strokeColor={'#FF000A'} percentage={60} />
        <DonutChart
          variant="semi-circle"
          radius={60}
          strokeColor={'#FF000A'}
          percentage={60}
          isCompact
        />
        <DonutChart radius={120} strokeColor={'#FF00FA'} percentage={75} />
        <DonutChart
          variant="semi-circle"
          radius={120}
          strokeColor={'rgba(227, 27, 35, 1)'}
          percentage={82}
          textContainerStyle={styles.semiCircleTextContainerStyle}
        >
          <View style={styles.semiCircleContainer}>
            <Text style={styles.semiCircleTitle}>Heart Rate</Text>
            <Text numberOfLines={1} style={styles.semiCircleDescription}>
              Avg 60 to 100 beats/minute
            </Text>
          </View>
        </DonutChart>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nativeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  semiCircleTextContainerStyle: {
    borderRadius: 100,
    paddingHorizontal: Platform?.OS === 'ios' ? 7 : 12,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  semiCircleContainer: {
    alignItems: 'center',
    rowGap: 5,
    paddingTop: 10,
  },
  semiCircleTitle: { fontSize: 21, fontWeight: '900' },
  semiCircleDescription: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.6)',
  },
});
