/* eslint-disable no-param-reassign */
/*
* Animations for table collapsing
* Utilizes D3 to collapse and open tables
*/

import { easeCubicOut } from 'd3-ease';
import { interpolateString } from 'd3-interpolate';

// starts the animation loop
function startAnimationLoop({
  onProgress, onComplete, duration, initialProgress,
}) {
  let start = null;
  let requestId = null;

  const startTimeDiff = (initialProgress || 0) * duration; // calculates the start time difference

  const step = (timestamp) => {
    if (!start) start = timestamp - startTimeDiff; // makes transition smooth
    let progress = (timestamp - start) / duration; // calculates where the animation is currently
    if (progress > 1) {
      progress = 1;
    }
    onProgress(progress);

    if (progress < 1) {
      requestId = window.requestAnimationFrame(step);
    } else if (onComplete) { // checks to see if complete
      onComplete();
    }
  };
  requestId = window.requestAnimationFrame(step);

  return { // stops animation loop
    stop() {
      cancelAnimationFrame(requestId);
    },
  };
}

function getStyles(element, props) { // styles the animation
  const computed = window.getComputedStyle(element);
  return props.reduce((obj, prop) => {
    obj[prop] = computed[prop];
    return obj;
  }, {});
}

/* custom animations */
function slide(element, { duration, direction, onComplete }) {
  const collapsedStyles = {
    marginTop: '0px',
    marginBottom: '0px',
    height: '0px',
  };
  const props = Object.keys(collapsedStyles);

  const [startStyles, targetStyles] = direction === 'DOWN'
    ? [collapsedStyles, getStyles(element, props)]
    : [getStyles(element, props), collapsedStyles];
  const interpolators = new Map(props.map(
    (prop) => [prop, interpolateString(startStyles[prop], targetStyles[prop])],
  ));

  return startAnimationLoop({
    duration,
    onComplete,
    onProgress: (progress) => {
      const delta = easeCubicOut(progress);
      interpolators.forEach((interpolator, prop) => {
        element.style[prop] = interpolator(delta);
      });
    },
  });
}

// slides the table row down
function slideDown(element, { duration = 750, onComplete } = {}) {
  return slide(element, { direction: 'DOWN', duration, onComplete });
}

// slides the table row up
function slideUp(element, { duration = 750, onComplete } = {}) {
  return slide(element, { direction: 'UP', duration, onComplete });
}

// used for table components
export {
  startAnimationLoop, slide, slideDown, slideUp,
};
