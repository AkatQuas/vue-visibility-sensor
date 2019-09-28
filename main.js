'use strict';

import Vue from 'vue';
import VisibilitySensor from '../visibility-sensor';

Vue.component('Example', {
  components: {
    VisibilitySensor
  },
  props: {
    containment: {},
    minTopValue: {},
    partialVisibility: {},
  },
  data () {
    return {
      msg: ''
    };
  },
  methods: {
    onChange (isVisible) {
      this.msg = 'Element is now ' + (isVisible ? 'visible' : 'hidden');
    }
  },
  template: `
  <div>
  <p class="msg">{{msg}}</p> 
  <div class="before"></div>
  <VisibilitySensor
    scrollCheck
    :scrollThrottle="100"
    :intervalDelay="8000"
    :containment="containment"
    @change="onChange"
    :minTopValue="minTopValue"
    :partialVisibility="partialVisibility"
  >
    <div class="sensor" />
  </VisibilitySensor>
  <div class="after"></div>
</div>`
});

new Vue({
  el: '#example-mount',
  template: `<Example />`
});

var container = document.getElementById('example-container');

container.scrollTop = 320;
container.scrollLeft = 320;

new Vue({
  el: '#inner-mount',
  data () {
    return {
      containment: container
    };
  },
  template: `
  <Example
    :minTopValue="10" 
    partialVisibility
    :containment="containment"
  ></Example>
  `
});

