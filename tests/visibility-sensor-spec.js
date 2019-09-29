import Vue from 'vue';
import assert from 'assert';
import VisibilitySensor from '../visibility-sensor.vue';

describe('VisibilitySensor', function () {
  var node;
  var mountApp;

  beforeEach(function () {
    node = document.createElement('div');
    mountApp = document.createElement('div');
    mountApp.setAttribute('id', 'app');
    node.appendChild(mountApp);
    document.body.appendChild(node);
  });

  afterEach(function () {
    document.body.removeChild(node);
  });

  it('should notify of changes to visibility when parent moves', function (
    done
  ) {
    var firstTime = true;
    var onChange = function (isVisible) {
      // by default we expect the sensor to be visible
      if (firstTime) {
        firstTime = false;
        assert.equal(isVisible, true, 'Component starts out visible');
        node.setAttribute(
          'style',
          'position:absolute; width:100px; left:-101px'
        );
      } else {
        // after moving the sensor it should be not visible anymore
        assert.equal(
          isVisible,
          false,
          '1 Component has moved out of the visible viewport'
        );
        done();
      }
    };

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
      <VisibilitySensor
         @change="onChange"
         :intervalDelay="10"
      >
          <div style="height: 10px; width: 10px"></div>
        </VisibilitySensor>
        `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should notify of changes to visibility when user scrolls', function (
    done
  ) {
    var firstTime = true;
    var onChange = function (isVisible) {
      // by default we expect the sensor to be visible
      if (firstTime) {
        firstTime = false;
        assert.equal(isVisible, true, 'Component starts out visible');

        window.scrollTo(0, 1000);
      } else {
        // after moving the sensor it should be not visible anymore
        assert.equal(
          isVisible,
          false,
          'Component has moved out of the visible viewport'
        );
        done();
      }
    };

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
      <div style="height: 5000px">
        <VisibilitySensor
          :scrollCheck="true"
          :scrollDelay="10"
          @change="onChange"
          :intervalCheck="false"
        >
          <div style="height: 10px; width: 10px"></div>
        </VisibilitySensor>
      </div>
        `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should notify of changes to visibility when child moves', function (done) {
    var firstTime = true;
    var initialStyle = {
      height: '10px',
      width: '10px'
    };
    var onChange = function (isVisible) {
      // by default we expect the sensor to be visible
      if (firstTime) {
        firstTime = false;
        assert.equal(isVisible, true, 'Component starts out visible');
        const style = {
          position: 'absolute',
          width: 100,
          left: -101
        };
        getElement(style);
      } else {
        // after moving the sensor it should be not visible anymore
        assert.equal(
          isVisible,
          false,
          'Component has moved out of the visible viewport'
        );
        done();
      }
    };

    // set interval must be one in order for this to work
    function getElement (style) {
      new Vue({
        el: '#app',
        components: {
          VisibilitySensor
        },
        data () {
          return {
            style
          };
        },
        template: `
        <VisibilitySensor
          @change="onChange"
          :intervalDelay="10"
        >
          <div :style="style"></div>
        </VisibilitySensor>
        `,
        methods: {
          onChange (isVisible) {
            onChange(isVisible);
          }
        }
      });
    }

    getElement(initialStyle);

  });

  it('should notify of changes to visibility', function (done) {
    var onChange = function (isVisible) {
      assert.equal(isVisible, true, 'Component starts out visible');
      done();
    };

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
      <VisibilitySensor @change="onChange">
        <div style="height: 10px; width: 10px"></div>
      </VisibilitySensor>
        `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should not notify when deactivated', function (done) {
    var wasCallbackCalled = false;
    var onChange = function (isVisible) {
      wasCallbackCalled = true;
    };

    setTimeout(function () {
      assert(!wasCallbackCalled, 'onChange callback should not be called');
      done();
    }, 20);

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
      <VisibilitySensor
        :active="false"
        @change="onChange"
        :intervalDelay="10">
      </VisibilitySensor>
        `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should set interval and debounceCheck when activated', function () {
    var onChange = function () {
    };
    var component1 = new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
      <VisibilitySensor
        :active="true"
        @change="onChange"
        scrollCheck
        resizeCheck
        ref="vs"
      ></VisibilitySensor>
        `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      },
    });
    const vs = component1.$refs.vs;
    assert(vs.interval, 'interval should be set');
    assert(vs.debounceCheck, 'debounceCheck should be set');
    assert(
      vs.debounceCheck.scroll,
      'debounceCheck.scroll should be set'
    );
    assert(
      vs.debounceCheck.resize,
      'debounceCheck.scroll should be set'
    );
  });

  it('should not set interval and debounceCheck when deactivated', function () {
    var component2 = new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
    <VisibilitySensor
      :active="false"
      @change="onChange"
      scrollCheck
      resizeCheck
      ref="vs"
    />
      `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
    const vs = component2.$refs.vs;
    assert(!vs.interval, 'interval should not be set');
    assert(!vs.debounceCheck, 'debounceCheck should not be set');
  });

  it('should work when using offset prop and moving to outside of offset area', function (
    done
  ) {
    var firstTime = true;
    node.setAttribute('style', 'position:absolute; top:51px');
    var onChange = function (isVisible) {
      if (firstTime) {
        firstTime = false;
        assert.equal(isVisible, true, 'Component starts out visible');
        node.setAttribute('style', 'position:absolute; top:49px');
      } else {
        assert.equal(
          isVisible,
          false,
          'Component has moved out of offset area'
        );
        done();
      }
    };

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
    <VisibilitySensor
      @change="onChange"
      :offset="{ top: 50 }"
      :intervalDelay="10"
    >
      <div style="height: 10px; width: 10px"></div>
    </VisibilitySensor>
      `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should work when using offset prop and moving to inside of offset area', function (
    done
  ) {
    var firstTime = true;
    node.setAttribute('style', 'position:absolute; top:49px');
    var onChange = function (isVisible) {
      if (firstTime) {
        firstTime = false;
        assert.equal(isVisible, false, 'Component starts out invisible');
        node.setAttribute('style', 'position:absolute; top:51px');
      } else {
        assert.equal(
          isVisible,
          true,
          'Component has moved inside of offset area'
        );
        done();
      }
    };

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
    <VisibilitySensor
      @change="onChange"
      :offset="{ top: 50 }"
      :intervalDelay="10"
    >
      <div style="height: 10px; width: 10px" ></div>
    </VisibilitySensor>
      `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should work when using negative offset prop and moving to outside of viewport', function (
    done
  ) {
    var firstTime = true;
    node.setAttribute('style', 'position:absolute; top:-49px');
    var onChange = function (isVisible) {
      if (firstTime) {
        firstTime = false;
        assert.equal(isVisible, true, 'Component starts out visible');
        node.setAttribute('style', 'position:absolute; top:-51px');
      } else {
        assert.equal(
          isVisible,
          false,
          'Component has moved outside of viewport and visible area'
        );
        done();
      }
    };
    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
    <VisibilitySensor
      @change="onChange"
      :offset="{ top: -50 }"
      :intervalDelay="10"
    >
      <div style="height: 10px; width: 10px" ></div>
    </VisibilitySensor>
      `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should not return visible if it has no size', function (done) {
    var firstTime = true;
    var onChange = function (isVisible) {
      if (firstTime) {
        assert.equal(isVisible, false, 'Component is not visible');
        done();
      }
    };

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
    <VisibilitySensor @change="onChange">
      <div style="height: 0px; width: 0px"></div>
    </VisibilitySensor>
      `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });

  it('should not return visible if the sensor is hidden', function (done) {
    var firstTime = true;
    var onChange = function (isVisible) {
      if (firstTime) {
        assert.equal(isVisible, false, 'Component is not visible');
        done();
      }
    };

    new Vue({
      el: '#app',
      components: {
        VisibilitySensor
      },
      template: `
    <div style="display: none">
      <VisibilitySensor @change="onChange">
        <div style="height: 10px; width: 10px"></div>
      </VisibilitySensor>
    </div>
      `,
      methods: {
        onChange (isVisible) {
          onChange(isVisible);
        }
      }
    });
  });
});
