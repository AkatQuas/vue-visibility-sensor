<script>
  'use strict';

  /**
   * @param {{ top: Number, left: Number, bottom: Number, right: Number, width: Number, height: Number }} rect
   * @returns {{ top: Number, left: Number, bottom: Number, right: Number, width: Number, height: Number }}
   * */
  function normalizeRect (rect) {
    if (rect.width === undefined) {
      rect.width = rect.right - rect.left;
    }

    if (rect.height === undefined) {
      rect.height = rect.bottom - rect.top;
    }

    return rect;
  }

  /**
   * @param {{ top: Number, left: Number, bottom: Number, right: Number }} rect
   * @returns {{ top: Number, left: Number, bottom: Number, right: Number }}
   * */
  function roundRectDown (rect) {
    return {
      top: Math.floor(rect.top),
      left: Math.floor(rect.left),
      bottom: Math.floor(rect.bottom),
      right: Math.floor(rect.right)
    };
  }

  export default {
    name: 'VisibilitySensor',
    props: {
      active: {
        type: Boolean,
        default: true
      },
      partialVisibility: {
        type: [Boolean, String],
        default: false,
        validator: function (v) {
          if (typeof v === 'boolean') {
            return true;
          } else {
            return ['top', 'right', 'bottom', 'left'].indexOf(v) > -1;
          }
        }
      },
      minTopValue: {
        type: Number,
        default: 0
      },
      scrollCheck: {
        type: Boolean,
        default: false
      },
      scrollDelay: {
        type: Number,
        default: 250
      },
      scrollThrottle: {
        type: Number,
        default: -1
      },
      resizeCheck: {
        type: Boolean,
        default: false
      },
      resizeDelay: {
        type: Number,
        default: 250
      },
      resizeThrottle: {
        type: Number,
        default: -1
      },
      intervalCheck: {
        type: Boolean,
        default: true
      },
      intervalDelay: {
        type: Number,
        default: 100
      },
      delayedCall: {
        type: Boolean,
        default: false
      },
      offset: {
        type: Object,
        default: () => {
        }
        // should be
        // {
        //   top: Number,
        //   left: Number,
        //   right: Number,
        //   bottom: Number,
        // }
      },
      containment: {
        default: null
      }
    },
    data () {
      return {
        isVisible: null,
        visibilityRect: {}
      };
    },
    mounted () {
      if (this.active) {
        this.startWatching();
      }
    },
    updated () {

    },
    beforeDestroy () {
      this.stopWatching();
    },
    methods: {
      getContainer () {
        return this.containment || window;
      },
      addEventListener (target, event, delay, throttle) {
        if (!this.debounceCheck) {
          this.debounceCheck = {};
        }
        let timeout;
        let fn;
        const later = () => {
          timeout = null;
          this.check();
        };

        if (throttle > -1) {
          fn = () => {
            if (!timeout) {
              timeout = setTimeout(later, throttle || 0);
            }
          };
        } else {
          fn = () => {
            clearTimeout(timeout);
            timeout = setTimeout(later, delay || 0);
          };
        }

        const info = {
          target,
          fn,
          getLastTimeout: () => timeout
        };

        target.addEventListener(event, info.fn);
        this.debounceCheck[event] = info;
      },
      startWatching () {
        if (this.debounceCheck || this.interval) {
          return;
        }

        if (this.intervalCheck) {
          this.interval = setInterval(() => this.check(), this.intervalDelay);
        }

        if (this.scrollCheck) {
          this.addEventListener(
            this.getContainer(),
            'scroll',
            this.scrollDelay,
            this.scrollThrottle
          );
        }

        if (this.resizeCheck) {
          this.addEventListener(
            window,
            'resize',
            this.resizeDelay,
            this.resizeThrottle
          );
        }

        !this.delayedCall && this.check();
      },
      stopWatching () {
        if (this.debounceCheck) {
          // clean up event listeners and their debounce callers
          for (let debounceEvent in this.debounceCheck) {
            if (this.debounceCheck.hasOwnProperty(debounceEvent)) {
              const debounceInfo = this.debounceCheck[debounceEvent];

              clearTimeout(debounceInfo.getLastTimeout());
              debounceInfo.target.removeEventListener(
                debounceEvent,
                debounceInfo.fn
              );

              this.debounceCheck[debounceEvent] = null;
            }
          }
        }
        this.debounceCheck = null;

        if (this.interval) {
          clearInterval(this.interval);
          this.interval = null;
        }
      },
      check () {
        const el = this.$el;
        let rect;
        let containmentRect;

        if (!el) {
          return;
        }

        rect = normalizeRect(roundRectDown(el.getBoundingClientRect()));

        if (this.containment) {
          const containmentDOMRect = this.containment.getBoundingClientRect();
          containmentRect = {
            top: containmentDOMRect.top,
            left: containmentDOMRect.left,
            bottom: containmentDOMRect.bottom,
            right: containmentDOMRect.right
          };
        } else {
          containmentRect = {
            top: 0,
            left: 0,
            bottom: window.innerHeight || document.documentElement.clientHeight,
            right: window.innerWidth || document.documentElement.clientWidth
          };
        }

        const offset = this.offset || {};
        if (typeof offset === 'object') {
          containmentRect.top += offset.top || 0;
          containmentRect.left += offset.left || 0;
          containmentRect.bottom -= offset.bottom || 0;
          containmentRect.right -= offset.right || 0;
        }

        const visibilityRect = {
          top: rect.top >= containmentRect.top,
          left: rect.left >= containmentRect.left,
          bottom: rect.bottom <= containmentRect.bottom,
          right: rect.right <= containmentRect.right
        };

        const hasSize = rect.height > 0 && rect.width > 0;

        let isVisible =
          hasSize &&
          visibilityRect.top &&
          visibilityRect.left &&
          visibilityRect.bottom &&
          visibilityRect.right;

        // check for partial visibility
        if (hasSize && this.partialVisibility) {
          let partialVisible =
            rect.top <= containmentRect.bottom &&
            rect.bottom >= containmentRect.top &&
            rect.left <= containmentRect.right &&
            rect.right >= containmentRect.left;

          // account for partial visibility on a single edge
          if (typeof this.partialVisibility === 'string') {
            partialVisible = visibilityRect[this.partialVisibility];
          }

          // if we have minimum top visibility set by props, lets check, if it meets the passed value
          // so if for instance element is at least 200px in viewport, then show it.
          isVisible = this.minTopValue
            ? partialVisible &&
            rect.top <= containmentRect.bottom - this.minTopValue
            : partialVisible;
        }

        if (this.isVisible !== isVisible) {
          this.isVisible = isVisible;
          this.visibilityRect = visibilityRect;
          this.$emit('change', isVisible);
        }
      }
    },
    render(createElement, context) {
      return this.$slots.default || createElement('div', { style: 'height: 1px; width: 100%;' });
    },
  };
</script>
