import { useEffect, useRef } from 'react';
import {
  View as RNView,
  StyleSheet as RNStyleSheet,
  TextInput as RNTextInput,
  Animated as RNAnimated,
  Platform as RNPlatform,
} from 'react-native';
import ReAnimated, {
  setNativeProps,
  useAnimatedRef,
} from 'react-native-reanimated';
import Svg, { G, Circle } from 'react-native-svg';

import type { PropsWithChildren } from 'react';
import type {
  ColorValue as RNColorValue,
  StyleProp as RNStyleProp,
  ViewStyle as RNViewStyle,
  TextStyle as RNTextStyle,
} from 'react-native';
import type { Linecap, NumberProp } from 'react-native-svg';

import type { BaseProps, DonutChartVariant } from '../../types';

const AnimatedCircle = ReAnimated.createAnimatedComponent(Circle);
const AnimatedTextInput = ReAnimated.createAnimatedComponent(RNTextInput);

interface DonutChartProps extends BaseProps {
  variant?: DonutChartVariant;
  cx?: NumberProp;
  cy?: NumberProp;
  radius?: number;
  strokeWidth?: number;
  strokeColor?: RNColorValue;
  strokeFill?: RNColorValue;
  strokeOpacity?: NumberProp;
  strokeDasharray?: NumberProp | ReadonlyArray<NumberProp>;
  strokeDashoffset?: number;
  strokeLinecap?: Linecap;
  forthCX?: NumberProp;
  forthCY?: NumberProp;
  forthRadius?: number;
  forthStrokeWidth?: number;
  forthStrokeColor?: RNColorValue;
  forthStrokeFill?: RNColorValue;
  forthStrokeOpacity?: NumberProp;
  forthStrokeDasharray?: NumberProp | ReadonlyArray<NumberProp>;
  forthStrokeDashoffset?: number;
  forthStrokeLinecap?: Linecap;
  backCX?: NumberProp;
  backCY?: NumberProp;
  backRadius?: number;
  backStrokeWidth?: number;
  backStrokeColor?: RNColorValue;
  backStrokeFill?: RNColorValue;
  backStrokeOpacity?: NumberProp;
  backStrokeDasharray?: NumberProp | ReadonlyArray<NumberProp>;
  backStrokeDashoffset?: number;
  backStrokeLinecap?: Linecap;
  percentage?: number;
  max?: number;
  duration?: number;
  delay?: number;
  fontSize?: number;
  textPrefix?: string;
  textPostfix?: string;
  isPercentageVisible?: boolean;
  isCompact?: boolean;
  textColor?: RNColorValue;
  containerStyle?: RNStyleProp<RNViewStyle>;
  contentStyle?: RNStyleProp<RNViewStyle>;
  textContainerStyle?: RNStyleProp<RNViewStyle>;
  textStyle?: RNStyleProp<RNTextStyle>;
}

function DonutChart(props: PropsWithChildren<DonutChartProps>) {
  const maxProp = props?.max ?? 100;
  const percentageProp = props?.percentage ?? 0;
  const strokeWidthProp = props?.strokeWidth ?? 20;

  const maxRadius =
    Math.max(
      props?.radius ?? 0,
      props?.forthRadius ?? 0,
      props?.backRadius ?? 0
    ) || 60;
  const minRadius =
    Math.min(
      props?.radius ?? Infinity,
      props?.forthRadius ?? Infinity,
      props?.backRadius ?? Infinity
    ) || 60;
  const maxStrokeWidth =
    Math.max(
      props?.strokeWidth ?? 0,
      props?.forthStrokeWidth ?? 0,
      props?.backStrokeWidth ?? 0
    ) || strokeWidthProp;

  const styles = makeStyles({
    radius: minRadius,
    textColor: props?.textColor,
    fontSize: props?.fontSize,
  });

  const animatedValue = useRef<RNAnimated.Value>(
    new RNAnimated.Value(0)
  ).current;

  const circleRef = useRef<Circle>(null);
  const textInputRef = useAnimatedRef();

  const circleCircumference = 2 * Math.PI * maxRadius;
  const viewBoxSize = maxRadius + maxStrokeWidth;

  useEffect(() => {
    animation(percentageProp);

    animatedValue.addListener((callback) => {
      if (circleRef?.current) {
        const maxPercentage =
          ((props?.variant === 'semi-circle' ? 50 : 100) * callback?.value) /
          maxProp;

        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPercentage) / 100;

        circleRef?.current?.setNativeProps({
          strokeDashoffset,
        });
      }

      if (textInputRef?.current) {
        setNativeProps(textInputRef, {
          text: `${props?.textPrefix ?? ''}${Math.round(callback.value)}${
            props?.textPostfix ?? ''
          }`,
        });
      }

      return 'Donut Chart Animation';
    });

    return () => {
      animatedValue.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.max, props?.percentage]);

  function animation(toValue: number) {
    return RNAnimated.timing(animatedValue, {
      toValue,
      duration: props?.duration ?? 1000,
      delay: props?.delay ?? 100,
      useNativeDriver: RNPlatform?.OS === 'ios' ? true : false,
    }).start(onAnimationFinish);
  }

  function onAnimationFinish() {
    console.info('Animation completed');
  }

  return (
    <RNView
      style={[
        styles?.container,
        props?.containerStyle,
        {
          height:
            maxRadius *
            (props?.variant === 'semi-circle' && props?.isCompact ? 1.5 : 2),
          width: maxRadius * 2,
        },
      ]}
    >
      <Svg
        height={maxRadius * 2}
        width={maxRadius * 2}
        viewBox={`0 0 ${viewBoxSize * 2} ${viewBoxSize * 2}`}
      >
        <G rotation={180} originX={viewBoxSize} originY={viewBoxSize}>
          <Circle
            cx={props?.backCX ?? '50%'}
            cy={props?.backCY ?? '50%'}
            r={props?.backRadius ?? props?.radius}
            fill={props?.backStrokeFill ?? 'transparent'}
            strokeWidth={
              props?.backStrokeWidth ??
              props?.forthStrokeWidth ??
              strokeWidthProp
            }
            stroke={props?.backStrokeColor ?? props?.strokeColor}
            strokeOpacity={props?.backStrokeOpacity ?? 0.2}
            strokeDasharray={
              props?.backStrokeDasharray ??
              (props?.variant === 'semi-circle'
                ? circleCircumference / 2
                : circleCircumference)
            }
            strokeDashoffset={props?.backStrokeDashoffset}
            strokeLinecap={props?.backStrokeLinecap ?? 'round'}
          />
          <AnimatedCircle
            ref={circleRef}
            cx={props?.forthCX ?? '50%'}
            cy={props?.forthCY ?? '50%'}
            r={props?.forthRadius ?? props?.radius}
            fill={props?.forthStrokeFill ?? 'transparent'}
            strokeWidth={
              props?.forthStrokeWidth ??
              props?.backStrokeWidth ??
              strokeWidthProp
            }
            stroke={props?.forthStrokeColor ?? props?.strokeColor}
            strokeDasharray={props?.forthStrokeDasharray ?? circleCircumference}
            strokeDashoffset={
              props?.forthStrokeDashoffset ?? circleCircumference
            }
            strokeLinecap={props?.forthStrokeLinecap ?? 'round'}
          />
        </G>
      </Svg>
      <RNView style={[styles?.content, props?.contentStyle]}>
        {props?.isPercentageVisible !== false && (
          <RNView
            style={[styles?.percentageTextContainer, props?.textContainerStyle]}
          >
            <AnimatedTextInput
              ref={textInputRef}
              style={[styles?.percentageTextInput, props?.textStyle]}
              value={'0'}
              editable={false}
            />
          </RNView>
        )}
        {props?.children}
      </RNView>
    </RNView>
  );
}

interface MakeStyles {
  textColor?: RNColorValue;
  fontSize?: number;
  radius: number;
}

function makeStyles(args: MakeStyles) {
  const styles = RNStyleSheet.create({
    container: {
      position: 'relative',
    },
    content: {
      ...RNStyleSheet?.absoluteFillObject,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    percentageTextContainer: {},
    percentageTextInput: {
      fontSize: args?.fontSize ?? args?.radius / 2,
      fontWeight: '800',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  });

  return styles;
}

export type { DonutChartProps };
export { DonutChart };
