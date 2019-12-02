Vue Visibility Sensor
====

Sensor component for Vue that notifies you when it goes in or out of the window viewport.

Inspired by [React Visibility Sensor](https://github.com/joshwnj/react-visibility-sensor)

Install
----

`npm install vue-visibility-sensor`

This component is recommended to use in Vue-cli SPA project. Because it doesn't build as any bundle like AMD or UMD.

It's just a [single file component](./visibility-sensor.vue).

Example
----

Try building an example yourself locally, here's another:

[View the example](https://AkatQuas.github.io/vue-visibility-sensor/)

To run the example locally:

- `npm run example`
- open `example/index.html` in a browser

General usage goes something like:

```js
const VisibilitySensor = require('vue-visibility-sensor');

// with children
new Vue({
  components: {
    VisibilitySensor,
  },
  template: `
    <VisibilitySensor @change="onChange">
      <div>...optional content goes here...</div>
    </VisibilitySensor>
  `,
  methods: {
    onChange(isVisible) {
      console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
    }
  }
});

// without children
new Vue({
  components: {
    VisibilitySensor,
  },
  template: `
    <VisibilitySensor @change="onChange">
    </VisibilitySensor>
  `,
  methods: {
    onChange(isVisible) {
      console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
    }
  }
});
```

Event
----

- `change`: the event name emitted from sensor whenever the element changes from being within the window viewport or not. Event name is `'change'`, all in lower case. Function is called with 1 argument `(isVisible: boolean)`

Props
----

|Name|Default Value|Description|
|:-:|:-:|:-|
|active|`true`| boolean flag for enabling / disabling the sensor.  When `active !== true` the sensor will not fire the `onChange` callback.|
|partialVisibility|`false`| consider element visible if only part of it is visible. Also possible values are - 'top', 'right', 'bottom', 'left' - in case it's needed to detect when one of these become visible explicitly.|
|offset|`{}`| with offset you can define amount of px from one side when the visibility should already change. So in example setting `offset={{top:10}}` means that the visibility changes hidden when there is less than 10px to top of the viewport. Offset works along with `partialVisibility`|
|minTopValue|`0`| consider element visible if only part of it is visible and a minimum amount of pixels could be set, so if at least 100px are in viewport, we mark element as visible.|
|intervalCheck|`true`| when this is true, it gives you the possibility to check if the element is in view even if it wasn't because of a user scroll|
|intervalDelay|`100`| integer, number of milliseconds between checking the element's position in relation the the window viewport. Making this number too low will have a negative impact on performance.|
|scrollCheck|`false`| by making this true, the scroll listener is enabled.|
|scrollDelay|`250`| the debounce rate at which the check is triggered. Ex: 250ms after the user stopped scrolling.|
|scrollThrottle|`-1`| by specifying a value > -1, you are enabling throttle instead of the delay to trigger checks on scroll event. Throttle supercedes delay.|
|resizeCheck|`false`| by making this true, the resize listener is enabled. Resize listener only listens to the window.|
|resizeDelay|`250`| is the debounce rate at which the check is triggered. Ex: 250ms after the user stopped resizing.|
|resizeThrottle|`-1`| by specifying a value > -1, you are enabling throttle instead of the delay to trigger checks on resize event. Throttle supercedes delay.|
|delayedCall|`false`| if is set to true, wont execute on page load ( prevents react apps triggering elements as visible before styles are loaded )|
|containment| `window` | element to use as a viewport when checking visibility. Default behaviour is to use the browser window as viewport.|
|children| `<span></span>` | can be a template or vue component|

It's possible to use both `intervalCheck` and `scrollCheck` together. This means you can detect most visibility changes quickly with `scrollCheck`, and an `intervalCheck` with a higher `intervalDelay` will act as a fallback for other visibility events, such as resize of a container.

Thanks
----

Special thanks to [Josh Johnston](https://github.com/joshwnj)

License
----

MIT
