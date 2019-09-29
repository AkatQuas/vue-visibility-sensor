declare module "react-visibility-sensor" {
  import Vue from "vue";

  interface Shape {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  }

  interface Props {
    active?: boolean;
    partialVisibility?: boolean;
    offset?: Shape;
    minTopValue?: number;
    intervalCheck?: boolean;
    intervalDelay?: number;
    scrollCheck?: boolean;
    scrollDelay?: number;
    scrollThrottle?: number;
    resizeCheck?: boolean;
    resizeDelay?: number;
    resizeThrottle?: number;
    containment?: any;
    delayedCall?: boolean;
    children?:
      | HTMLElement
      | Vue.Component
  }

  const VueVisibilitySensor: Vue.Component<{ props: Props }>;

  export default VueVisibilitySensor;
}
