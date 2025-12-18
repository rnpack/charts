import type {
  HybridView,
  HybridViewMethods,
  HybridViewProps,
} from 'react-native-nitro-modules';

export interface RNPackChartsProps extends HybridViewProps {
  color: string;
}
export interface RNPackChartsMethods extends HybridViewMethods {}

export type RNPackCharts = HybridView<RNPackChartsProps, RNPackChartsMethods>;
