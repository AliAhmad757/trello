exports.id = 90;
exports.ids = [90];
exports.modules = {

/***/ 23274:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
var _useCallbackRef = _interopRequireDefault(__webpack_require__(16788));
exports.useCallbackRef = _useCallbackRef.default;
var _useCommittedRef = _interopRequireDefault(__webpack_require__(54199));
exports.useCommittedRef = _useCommittedRef.default;
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
exports.useEventCallback = _useEventCallback.default;
var _useEventListener = _interopRequireDefault(__webpack_require__(10402));
exports.useEventListener = _useEventListener.default;
var _useGlobalListener = _interopRequireDefault(__webpack_require__(35166));
exports.useGlobalListener = _useGlobalListener.default;
var _useInterval = _interopRequireDefault(__webpack_require__(871));
exports.useInterval = _useInterval.default;
var _useRafInterval = _interopRequireDefault(__webpack_require__(74635));
exports.useRafInterval = _useRafInterval.default;
var _useMergeState = _interopRequireDefault(__webpack_require__(68358));
exports.useMergeState = _useMergeState.default;
var _useMergeStateFromProps = _interopRequireDefault(__webpack_require__(64863));
exports.useMergeStateFromProps = _useMergeStateFromProps.default;
var _useMounted = _interopRequireDefault(__webpack_require__(71608));
exports.useMounted = _useMounted.default;
var _usePrevious = _interopRequireDefault(__webpack_require__(54565));
exports.usePrevious = _usePrevious.default;
var _useImage = _interopRequireDefault(__webpack_require__(42171));
exports.useImage = _useImage.default;
var _useResizeObserver = _interopRequireDefault(__webpack_require__(69387));
exports.useResizeObserver = _useResizeObserver.default;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 90910:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.createBreakpointHook = createBreakpointHook;
exports["default"] = void 0;
var _useMediaQuery = _interopRequireDefault(__webpack_require__(16681));
var _react = __webpack_require__(18038);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Create a responsive hook we a set of breakpoint names and widths.
 * You can use any valid css units as well as a numbers (for pixels).
 *
 * **NOTE:** The object key order is important! it's assumed to be in order from smallest to largest
 *
 * ```ts
 * const useBreakpoint = createBreakpointHook({
 *  xs: 0,
 *  sm: 576,
 *  md: 768,
 *  lg: 992,
 *  xl: 1200,
 * })
 * ```
 *
 * **Watch out!** using string values will sometimes construct media queries using css `calc()` which
 * is NOT supported in media queries by all browsers at the moment. use numbers for
 * the widest range of browser support.
 *
 * @param breakpointValues A object hash of names to breakpoint dimensions
 */
function createBreakpointHook(breakpointValues) {
  const names = Object.keys(breakpointValues);
  function and(query, next) {
    if (query === next) {
      return next;
    }
    return query ? `${query} and ${next}` : next;
  }
  function getNext(breakpoint) {
    return names[Math.min(names.indexOf(breakpoint) + 1, names.length - 1)];
  }
  function getMaxQuery(breakpoint) {
    const next = getNext(breakpoint);
    let value = breakpointValues[next];
    if (typeof value === 'number') value = `${value - 0.2}px`;else value = `calc(${value} - 0.2px)`;
    return `(max-width: ${value})`;
  }
  function getMinQuery(breakpoint) {
    let value = breakpointValues[breakpoint];
    if (typeof value === 'number') {
      value = `${value}px`;
    }
    return `(min-width: ${value})`;
  }

  /**
   * Match a set of breakpoints
   *
   * ```tsx
   * const MidSizeOnly = () => {
   *   const isMid = useBreakpoint({ lg: 'down', sm: 'up' });
   *
   *   if (isMid) return <div>On a Reasonable sized Screen!</div>
   *   return null;
   * }
   * ```
   * @param breakpointMap An object map of breakpoints and directions, queries are constructed using "and" to join
   * breakpoints together
   * @param window Optionally specify the target window to match against (useful when rendering into iframes)
   */

  /**
   * Match a single breakpoint exactly, up, or down.
   *
   * ```tsx
   * const PhoneOnly = () => {
   *   const isSmall = useBreakpoint('sm', 'down');
   *
   *   if (isSmall) return <div>On a Small Screen!</div>
   *   return null;
   * }
   * ```
   *
   * @param breakpoint The breakpoint key
   * @param direction A direction 'up' for a max, 'down' for min, true to match only the breakpoint
   * @param window Optionally specify the target window to match against (useful when rendering into iframes)
   */

  function useBreakpoint(breakpointOrMap, direction, window) {
    let breakpointMap;
    if (typeof breakpointOrMap === 'object') {
      breakpointMap = breakpointOrMap;
      window = direction;
      direction = true;
    } else {
      direction = direction || true;
      breakpointMap = {
        [breakpointOrMap]: direction
      };
    }
    let query = (0, _react.useMemo)(() => Object.entries(breakpointMap).reduce((query, [key, direction]) => {
      if (direction === 'up' || direction === true) {
        query = and(query, getMinQuery(key));
      }
      if (direction === 'down' || direction === true) {
        query = and(query, getMaxQuery(key));
      }
      return query;
    }, ''), [JSON.stringify(breakpointMap)]);
    return (0, _useMediaQuery.default)(query, window);
  }
  return useBreakpoint;
}
const useBreakpoint = createBreakpointHook({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
});
var _default = useBreakpoint;
exports["default"] = _default;

/***/ }),

/***/ 16788:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useCallbackRef;
var _react = __webpack_require__(18038);
/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */
function useCallbackRef() {
  return (0, _react.useState)(null);
}

/***/ }),

/***/ 54199:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _react = __webpack_require__(18038);
/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded before being used.
 *
 * This is safe to access in an event handler.
 *
 * @param value The `Ref` value
 */
function useCommittedRef(value) {
  const ref = (0, _react.useRef)(value);
  (0, _react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
var _default = useCommittedRef;
exports["default"] = _default;

/***/ }),

/***/ 90175:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useEventCallback;
var _react = __webpack_require__(18038);
var _useCommittedRef = _interopRequireDefault(__webpack_require__(54199));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useEventCallback(fn) {
  const ref = (0, _useCommittedRef.default)(fn);
  return (0, _react.useCallback)(function (...args) {
    return ref.current && ref.current(...args);
  }, [ref]);
}

/***/ }),

/***/ 10402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useEventListener;
var _react = __webpack_require__(18038);
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Attaches an event handler outside directly to specified DOM element
 * bypassing the react synthetic event system.
 *
 * @param element The target to listen for events on
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
function useEventListener(eventTarget, event, listener, capture = false) {
  const handler = (0, _useEventCallback.default)(listener);
  (0, _react.useEffect)(() => {
    const target = typeof eventTarget === 'function' ? eventTarget() : eventTarget;
    target.addEventListener(event, handler, capture);
    return () => target.removeEventListener(event, handler, capture);
  }, [eventTarget]);
}

/***/ }),

/***/ 63202:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useForceUpdate;
var _react = __webpack_require__(18038);
/**
 * Returns a function that triggers a component update. the hook equivalent to
 * `this.forceUpdate()` in a class component. In most cases using a state value directly
 * is preferable but may be required in some advanced usages of refs for interop or
 * when direct DOM manipulation is required.
 *
 * ```ts
 * const forceUpdate = useForceUpdate();
 *
 * const updateOnClick = useCallback(() => {
 *  forceUpdate()
 * }, [forceUpdate])
 *
 * return <button type="button" onClick={updateOnClick}>Hi there</button>
 * ```
 */
function useForceUpdate() {
  // The toggling state value is designed to defeat React optimizations for skipping
  // updates when they are strictly equal to the last state value
  const [, dispatch] = (0, _react.useReducer)(state => !state, false);
  return dispatch;
}

/***/ }),

/***/ 35166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useGlobalListener;
var _useEventListener = _interopRequireDefault(__webpack_require__(10402));
var _react = __webpack_require__(18038);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Attaches an event handler outside directly to the `document`,
 * bypassing the react synthetic event system.
 *
 * ```ts
 * useGlobalListener('keydown', (event) => {
 *  console.log(event.key)
 * })
 * ```
 *
 * @param event The DOM event name
 * @param handler An event handler
 * @param capture Whether or not to listen during the capture event phase
 */
function useGlobalListener(event, handler, capture = false) {
  const documentTarget = (0, _react.useCallback)(() => document, []);
  return (0, _useEventListener.default)(documentTarget, event, handler, capture);
}

/***/ }),

/***/ 42171:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useImage;
var _react = __webpack_require__(18038);
/**
 * Fetch and load an image for programatic use such as in a `<canvas>` element.
 *
 * @param imageOrUrl The `HtmlImageElement` or image url to load
 * @param crossOrigin The `crossorigin` attribute to set
 *
 * ```ts
 * const { image, error } = useImage('/static/kittens.png')
 * const ref = useRef<HTMLCanvasElement>()
 *
 * useEffect(() => {
 *   const ctx = ref.current.getContext('2d')
 *
 *   if (image) {
 *     ctx.drawImage(image, 0, 0)
 *   }
 * }, [ref, image])
 *
 * return (
 *   <>
 *     {error && "there was a problem loading the image"}
 *     <canvas ref={ref} />
 *   </>
 * ```
 */
function useImage(imageOrUrl, crossOrigin) {
  const [state, setState] = (0, _react.useState)({
    image: null,
    error: null
  });
  (0, _react.useEffect)(() => {
    if (!imageOrUrl) return undefined;
    let image;
    if (typeof imageOrUrl === 'string') {
      image = new Image();
      if (crossOrigin) image.crossOrigin = crossOrigin;
      image.src = imageOrUrl;
    } else {
      image = imageOrUrl;
      if (image.complete && image.naturalHeight > 0) {
        setState({
          image,
          error: null
        });
        return;
      }
    }
    function onLoad() {
      setState({
        image,
        error: null
      });
    }
    function onError(error) {
      setState({
        image,
        error
      });
    }
    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
    return () => {
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', onError);
    };
  }, [imageOrUrl, crossOrigin]);
  return state;
}

/***/ }),

/***/ 871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _react = __webpack_require__(18038);
var _useCommittedRef = _interopRequireDefault(__webpack_require__(54199));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Creates a `setInterval` that is properly cleaned up when a component unmounted
 *
 * ```tsx
 *  function Timer() {
 *    const [timer, setTimer] = useState(0)
 *    useInterval(() => setTimer(i => i + 1), 1000)
 *
 *    return <span>{timer} seconds past</span>
 *  }
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 */

/**
 * Creates a pausable `setInterval` that is properly cleaned up when a component unmounted
 *
 * ```tsx
 *  const [paused, setPaused] = useState(false)
 *  const [timer, setTimer] = useState(0)
 *
 *  useInterval(() => setTimer(i => i + 1), 1000, paused)
 *
 *  return (
 *    <span>
 *      {timer} seconds past
 *
 *      <button onClick={() => setPaused(p => !p)}>{paused ? 'Play' : 'Pause' }</button>
 *    </span>
 * )
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused Whether or not the interval is currently running
 */

/**
 * Creates a pausable `setInterval` that _fires_ immediately and is
 * properly cleaned up when a component unmounted
 *
 * ```tsx
 *  const [timer, setTimer] = useState(-1)
 *  useInterval(() => setTimer(i => i + 1), 1000, false, true)
 *
 *  // will update to 0 on the first effect
 *  return <span>{timer} seconds past</span>
 * ```
 *
 * @param fn an function run on each interval
 * @param ms The milliseconds duration of the interval
 * @param paused Whether or not the interval is currently running
 * @param runImmediately Whether to run the function immediately on mount or unpause
 * rather than waiting for the first interval to elapse
 *

 */

function useInterval(fn, ms, paused = false, runImmediately = false) {
  let handle;
  const fnRef = (0, _useCommittedRef.default)(fn);
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = (0, _useCommittedRef.default)(paused);
  const tick = () => {
    if (pausedRef.current) return;
    fnRef.current();
    schedule(); // eslint-disable-line no-use-before-define
  };

  const schedule = () => {
    clearTimeout(handle);
    handle = setTimeout(tick, ms);
  };
  (0, _react.useEffect)(() => {
    if (runImmediately) {
      tick();
    } else {
      schedule();
    }
    return () => clearTimeout(handle);
  }, [paused, runImmediately]);
}
var _default = useInterval;
exports["default"] = _default;

/***/ }),

/***/ 43464:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _react = __webpack_require__(18038);
const isReactNative = typeof global !== 'undefined' &&
// @ts-ignore
global.navigator &&
// @ts-ignore
global.navigator.product === 'ReactNative';
const isDOM = typeof document !== 'undefined';

/**
 * Is `useLayoutEffect` in a DOM or React Native environment, otherwise resolves to useEffect
 * Only useful to avoid the console warning.
 *
 * PREFER `useEffect` UNLESS YOU KNOW WHAT YOU ARE DOING.
 *
 * @category effects
 */
var _default = isDOM || isReactNative ? _react.useLayoutEffect : _react.useEffect;
exports["default"] = _default;

/***/ }),

/***/ 16681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useMediaQuery;
var _useIsomorphicEffect = _interopRequireDefault(__webpack_require__(43464));
var _react = __webpack_require__(18038);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const matchersByWindow = new WeakMap();
const getMatcher = (query, targetWindow) => {
  if (!query || !targetWindow) return undefined;
  const matchers = matchersByWindow.get(targetWindow) || new Map();
  matchersByWindow.set(targetWindow, matchers);
  let mql = matchers.get(query);
  if (!mql) {
    mql = targetWindow.matchMedia(query);
    mql.refCount = 0;
    matchers.set(mql.media, mql);
  }
  return mql;
};
/**
 * Match a media query and get updates as the match changes. The media string is
 * passed directly to `window.matchMedia` and run as a Layout Effect, so initial
 * matches are returned before the browser has a chance to paint.
 *
 * ```tsx
 * function Page() {
 *   const isWide = useMediaQuery('min-width: 1000px')
 *
 *   return isWide ? "very wide" : 'not so wide'
 * }
 * ```
 *
 * Media query lists are also reused globally, hook calls for the same query
 * will only create a matcher once under the hood.
 *
 * @param query A media query
 * @param targetWindow The window to match against, uses the globally available one as a default.
 */
function useMediaQuery(query, targetWindow = typeof window === 'undefined' ? undefined : window) {
  const mql = getMatcher(query, targetWindow);
  const [matches, setMatches] = (0, _react.useState)(() => mql ? mql.matches : false);
  (0, _useIsomorphicEffect.default)(() => {
    let mql = getMatcher(query, targetWindow);
    if (!mql) {
      return setMatches(false);
    }
    let matchers = matchersByWindow.get(targetWindow);
    const handleChange = () => {
      setMatches(mql.matches);
    };
    mql.refCount++;
    mql.addListener(handleChange);
    handleChange();
    return () => {
      mql.removeListener(handleChange);
      mql.refCount--;
      if (mql.refCount <= 0) {
        matchers == null ? void 0 : matchers.delete(mql.media);
      }
      mql = undefined;
    };
  }, [query]);
  return matches;
}

/***/ }),

/***/ 68358:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useMergeState;
var _react = __webpack_require__(18038);
/**
 * Updates state, partial updates are merged into existing state values
 */

/**
 * Mimics a React class component's state model, of having a single unified
 * `state` object and an updater that merges updates into the existing state, as
 * opposed to replacing it.
 *
 * ```js
 * const [state, setState] = useMergeState({ name: 'Betsy', age: 24 })
 *
 * setState({ name: 'Johan' }) // { name: 'Johan', age: 24 }
 *
 * setState(state => ({ age: state.age + 10 })) // { name: 'Johan', age: 34 }
 * ```
 *
 * @param initialState The initial state object
 */
function useMergeState(initialState) {
  const [state, setState] = (0, _react.useState)(initialState);
  const updater = (0, _react.useCallback)(update => {
    if (update === null) return;
    if (typeof update === 'function') {
      setState(state => {
        const nextState = update(state);
        return nextState == null ? state : Object.assign({}, state, nextState);
      });
    } else {
      setState(state => Object.assign({}, state, update));
    }
  }, [setState]);
  return [state, updater];
}

/***/ }),

/***/ 64863:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useMergeStateFromProps;
var _useMergeState = _interopRequireDefault(__webpack_require__(68358));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useMergeStateFromProps(props, gDSFP, initialState) {
  const [state, setState] = (0, _useMergeState.default)(initialState);
  const nextState = gDSFP(props, state);
  if (nextState !== null) setState(nextState);
  return [state, setState];
}

/***/ }),

/***/ 26835:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
exports.mergeRefs = mergeRefs;
var _react = __webpack_require__(18038);
const toFnRef = ref => !ref || typeof ref === 'function' ? ref : value => {
  ref.current = value;
};
function mergeRefs(refA, refB) {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return value => {
    if (a) a(value);
    if (b) b(value);
  };
}

/**
 * Create and returns a single callback ref composed from two other Refs.
 *
 * ```tsx
 * const Button = React.forwardRef((props, ref) => {
 *   const [element, attachRef] = useCallbackRef<HTMLButtonElement>();
 *   const mergedRef = useMergedRefs(ref, attachRef);
 *
 *   return <button ref={mergedRef} {...props}/>
 * })
 * ```
 *
 * @param refA A Callback or mutable Ref
 * @param refB A Callback or mutable Ref
 * @category refs
 */
function useMergedRefs(refA, refB) {
  return (0, _react.useMemo)(() => mergeRefs(refA, refB), [refA, refB]);
}
var _default = useMergedRefs;
exports["default"] = _default;

/***/ }),

/***/ 71608:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useMounted;
var _react = __webpack_require__(18038);
/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */
function useMounted() {
  const mounted = (0, _react.useRef)(true);
  const isMounted = (0, _react.useRef)(() => mounted.current);
  (0, _react.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

/***/ }),

/***/ 54565:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = usePrevious;
var _react = __webpack_require__(18038);
/**
 * Store the last of some value. Tracked via a `Ref` only updating it
 * after the component renders.
 *
 * Helpful if you need to compare a prop value to it's previous value during render.
 *
 * ```ts
 * function Component(props) {
 *   const lastProps = usePrevious(props)
 *
 *   if (lastProps.foo !== props.foo)
 *     resetValueFromProps(props.foo)
 * }
 * ```
 *
 * @param value the value to track
 */
function usePrevious(value) {
  const ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    ref.current = value;
  });
  return ref.current;
}

/***/ }),

/***/ 74635:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _react = __webpack_require__(18038);
var _useCommittedRef = _interopRequireDefault(__webpack_require__(54199));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useRafInterval(fn, ms, paused = false) {
  let handle;
  let start = new Date().getTime();
  const fnRef = (0, _useCommittedRef.default)(fn);
  // this ref is necessary b/c useEffect will sometimes miss a paused toggle
  // orphaning a setTimeout chain in the aether, so relying on it's refresh logic is not reliable.
  const pausedRef = (0, _useCommittedRef.default)(paused);
  function loop() {
    const current = new Date().getTime();
    const delta = current - start;
    if (pausedRef.current) return;
    if (delta >= ms && fnRef.current) {
      fnRef.current();
      start = new Date().getTime();
    }
    cancelAnimationFrame(handle);
    handle = requestAnimationFrame(loop);
  }
  (0, _react.useEffect)(() => {
    handle = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(handle);
  }, []);
}
var _default = useRafInterval;
exports["default"] = _default;

/***/ }),

/***/ 69387:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useResizeObserver;
var _react = __webpack_require__(18038);
var _useIsomorphicEffect = _interopRequireDefault(__webpack_require__(43464));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const targetMap = new WeakMap();
let resizeObserver;
function getResizeObserver() {
  // eslint-disable-next-line no-return-assign
  return resizeObserver = resizeObserver || new window.ResizeObserver(entries => {
    entries.forEach(entry => {
      const handler = targetMap.get(entry.target);
      if (handler) handler(entry.contentRect);
    });
  });
}

/**
 * Efficiently observe size changes on an element. Depends on the `ResizeObserver` api,
 * and polyfills are needed in older browsers.
 *
 * ```ts
 * const [ref, attachRef] = useCallbackRef(null);
 *
 * const rect = useResizeObserver(ref);
 *
 * return (
 *  <div ref={attachRef}>
 *    {JSON.stringify(rect)}
 *  </div>
 * )
 * ```
 *
 * @param element The DOM element to observe
 */
function useResizeObserver(element) {
  const [rect, setRect] = (0, _react.useState)(null);
  (0, _useIsomorphicEffect.default)(() => {
    if (!element) return;
    getResizeObserver().observe(element);
    setRect(element.getBoundingClientRect());
    targetMap.set(element, rect => {
      setRect(rect);
    });
    return () => {
      targetMap.delete(element);
    };
  }, [element]);
  return rect;
}

/***/ }),

/***/ 53481:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useUpdatedRef;
var _react = __webpack_require__(18038);
/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */
function useUpdatedRef(value) {
  const valueRef = (0, _react.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

/***/ }),

/***/ 55101:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useWillUnmount;
var _useUpdatedRef = _interopRequireDefault(__webpack_require__(53481));
var _react = __webpack_require__(18038);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */
function useWillUnmount(fn) {
  const onUnmount = (0, _useUpdatedRef.default)(fn);
  (0, _react.useEffect)(() => () => onUnmount.current(), []);
}

/***/ }),

/***/ 26378:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.isTrivialHref = isTrivialHref;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _hooks = __webpack_require__(23274);
var _Button = __webpack_require__(93378);
var _jsxRuntime = __webpack_require__(56786);
const _excluded = ["onKeyDown"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * An generic `<a>` component that covers a few A11y cases, ensuring that
 * cases where the `href` is missing or trivial like "#" are treated like buttons.
 */
const Anchor = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
      onKeyDown
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps] = (0, _Button.useButtonProps)(Object.assign({
    tagName: 'a'
  }, props));
  const handleKeyDown = (0, _hooks.useEventCallback)(e => {
    buttonProps.onKeyDown(e);
    onKeyDown == null ? void 0 : onKeyDown(e);
  });
  if (isTrivialHref(props.href) || props.role === 'button') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", Object.assign({
      ref: ref
    }, props, buttonProps, {
      onKeyDown: handleKeyDown
    }));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("a", Object.assign({
    ref: ref
  }, props, {
    onKeyDown: onKeyDown
  }));
});
Anchor.displayName = 'Anchor';
var _default = Anchor;
exports["default"] = _default;

/***/ }),

/***/ 93378:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.isTrivialHref = isTrivialHref;
exports.useButtonProps = useButtonProps;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _jsxRuntime = __webpack_require__(56786);
const _excluded = ["as", "disabled"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
function useButtonProps({
  tagName,
  disabled,
  href,
  target,
  rel,
  role,
  onClick,
  tabIndex = 0,
  type
}) {
  if (!tagName) {
    if (href != null || target != null || rel != null) {
      tagName = 'a';
    } else {
      tagName = 'button';
    }
  }
  const meta = {
    tagName
  };
  if (tagName === 'button') {
    return [{
      type: type || 'button',
      disabled
    }, meta];
  }
  const handleClick = event => {
    if (disabled || tagName === 'a' && isTrivialHref(href)) {
      event.preventDefault();
    }
    if (disabled) {
      event.stopPropagation();
      return;
    }
    onClick == null ? void 0 : onClick(event);
  };
  const handleKeyDown = event => {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };
  if (tagName === 'a') {
    // Ensure there's a href so Enter can trigger anchor button.
    href || (href = '#');
    if (disabled) {
      href = undefined;
    }
  }
  return [{
    role: role != null ? role : 'button',
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: undefined,
    tabIndex: disabled ? undefined : tabIndex,
    href,
    target: tagName === 'a' ? target : undefined,
    'aria-disabled': !disabled ? undefined : disabled,
    rel: tagName === 'a' ? rel : undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, meta];
}
const Button = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
      as: asProp,
      disabled
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps, {
    tagName: Component
  }] = useButtonProps(Object.assign({
    tagName: asProp,
    disabled
  }, props));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, Object.assign({}, props, buttonProps, {
    ref: ref
  }));
});
Button.displayName = 'Button';
var _default = Button;
exports["default"] = _default;

/***/ }),

/***/ 95079:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.dataAttr = dataAttr;
exports.dataProp = dataProp;
exports.PROPERTY_PREFIX = exports.ATTRIBUTE_PREFIX = void 0;
const ATTRIBUTE_PREFIX = `data-rr-ui-`;
exports.ATTRIBUTE_PREFIX = ATTRIBUTE_PREFIX;
const PROPERTY_PREFIX = `rrUi`;
exports.PROPERTY_PREFIX = PROPERTY_PREFIX;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
  return `${PROPERTY_PREFIX}${property}`;
}

/***/ }),

/***/ 16764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useTransition = useTransition;
exports["default"] = ImperativeTransition;
exports.renderTransition = renderTransition;
var _useMergedRefs = _interopRequireDefault(__webpack_require__(26835));
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
var _useIsomorphicEffect = _interopRequireDefault(__webpack_require__(43464));
var _react = _interopRequireWildcard(__webpack_require__(18038));
var _NoopTransition = _interopRequireDefault(__webpack_require__(68001));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function useTransition({
  in: inProp,
  onTransition
}) {
  const ref = (0, _react.useRef)(null);
  const isInitialRef = (0, _react.useRef)(true);
  const handleTransition = (0, _useEventCallback.default)(onTransition);
  (0, _useIsomorphicEffect.default)(() => {
    if (!ref.current) {
      return undefined;
    }
    let stale = false;
    handleTransition({
      in: inProp,
      element: ref.current,
      initial: isInitialRef.current,
      isStale: () => stale
    });
    return () => {
      stale = true;
    };
  }, [inProp, handleTransition]);
  (0, _useIsomorphicEffect.default)(() => {
    isInitialRef.current = false;
    // this is for strict mode
    return () => {
      isInitialRef.current = true;
    };
  }, []);
  return ref;
}
/**
 * Adapts an imperative transition function to a subset of the RTG `<Transition>` component API.
 *
 * ImperativeTransition does not support mounting options or `appear` at the moment, meaning
 * that it always acts like: `mountOnEnter={true} unmountOnExit={true} appear={true}`
 */
function ImperativeTransition({
  children,
  in: inProp,
  onExited,
  onEntered,
  transition
}) {
  const [exited, setExited] = (0, _react.useState)(!inProp);

  // TODO: I think this needs to be in an effect
  if (inProp && exited) {
    setExited(false);
  }
  const ref = useTransition({
    in: !!inProp,
    onTransition: options => {
      const onFinish = () => {
        if (options.isStale()) return;
        if (options.in) {
          onEntered == null ? void 0 : onEntered(options.element, options.initial);
        } else {
          setExited(true);
          onExited == null ? void 0 : onExited(options.element);
        }
      };
      Promise.resolve(transition(options)).then(onFinish, error => {
        if (!options.in) setExited(true);
        throw error;
      });
    }
  });
  const combinedRef = (0, _useMergedRefs.default)(ref, children.ref);
  return exited && !inProp ? null : /*#__PURE__*/(0, _react.cloneElement)(children, {
    ref: combinedRef
  });
}
function renderTransition(Component, runTransition, props) {
  if (Component) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, Object.assign({}, props));
  }
  if (runTransition) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ImperativeTransition, Object.assign({}, props, {
      transition: runTransition
    }));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NoopTransition.default, Object.assign({}, props));
}

/***/ }),

/***/ 4854:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _activeElement = _interopRequireDefault(__webpack_require__(87806));
var _contains = _interopRequireDefault(__webpack_require__(81005));
var _canUseDOM = _interopRequireDefault(__webpack_require__(3142));
var _listen = _interopRequireDefault(__webpack_require__(35264));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _reactDom = _interopRequireDefault(__webpack_require__(98704));
var _useMounted = _interopRequireDefault(__webpack_require__(71608));
var _useWillUnmount = _interopRequireDefault(__webpack_require__(55101));
var _usePrevious = _interopRequireDefault(__webpack_require__(54565));
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
var _ModalManager = _interopRequireDefault(__webpack_require__(2206));
var _useWaitForDOMRef = _interopRequireDefault(__webpack_require__(10620));
var _useWindow = _interopRequireDefault(__webpack_require__(6819));
var _ImperativeTransition = __webpack_require__(16764);
var _utils = __webpack_require__(10769);
var _jsxRuntime = __webpack_require__(56786);
const _excluded = ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "runTransition", "backdropTransition", "runBackdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
let manager;
function getManager(window) {
  if (!manager) manager = new _ModalManager.default({
    ownerDocument: window == null ? void 0 : window.document
  });
  return manager;
}
function useModalManager(provided) {
  const window = (0, _useWindow.default)();
  const modalManager = provided || getManager(window);
  const modal = (0, React.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: () => modalManager.add(modal.current),
    remove: () => modalManager.remove(modal.current),
    isTopModal: () => modalManager.isTopModal(modal.current),
    setDialogRef: (0, React.useCallback)(ref => {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0, React.useCallback)(ref => {
      modal.current.backdrop = ref;
    }, [])
  });
}
const Modal = /*#__PURE__*/(0, React.forwardRef)((_ref, ref) => {
  let {
      show = false,
      role = 'dialog',
      className,
      style,
      children,
      backdrop = true,
      keyboard = true,
      onBackdropClick,
      onEscapeKeyDown,
      transition,
      runTransition,
      backdropTransition,
      runBackdropTransition,
      autoFocus = true,
      enforceFocus = true,
      restoreFocus = true,
      restoreFocusOptions,
      renderDialog,
      renderBackdrop = props => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", Object.assign({}, props)),
      manager: providedManager,
      container: containerRef,
      onShow,
      onHide = () => {},
      onExit,
      onExited,
      onExiting,
      onEnter,
      onEntering,
      onEntered
    } = _ref,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  const ownerWindow = (0, _useWindow.default)();
  const container = (0, _useWaitForDOMRef.default)(containerRef);
  const modal = useModalManager(providedManager);
  const isMounted = (0, _useMounted.default)();
  const prevShow = (0, _usePrevious.default)(show);
  const [exited, setExited] = (0, React.useState)(!show);
  const lastFocusRef = (0, React.useRef)(null);
  (0, React.useImperativeHandle)(ref, () => modal, [modal]);
  if (_canUseDOM.default && !prevShow && show) {
    lastFocusRef.current = (0, _activeElement.default)(ownerWindow == null ? void 0 : ownerWindow.document);
  }

  // TODO: I think this needs to be in an effect
  if (show && exited) {
    setExited(false);
  }
  const handleShow = (0, _useEventCallback.default)(() => {
    modal.add();
    removeKeydownListenerRef.current = (0, _listen.default)(document, 'keydown', handleDocumentKeyDown);
    removeFocusListenerRef.current = (0, _listen.default)(document, 'focus',
    // the timeout is necessary b/c this will run before the new modal is mounted
    // and so steals focus from it
    () => setTimeout(handleEnforceFocus), true);
    if (onShow) {
      onShow();
    }

    // autofocus after onShow to not trigger a focus event for previous
    // modals before this one is shown.
    if (autoFocus) {
      var _modal$dialog$ownerDo, _modal$dialog;
      const currentActiveElement = (0, _activeElement.default)((_modal$dialog$ownerDo = (_modal$dialog = modal.dialog) == null ? void 0 : _modal$dialog.ownerDocument) != null ? _modal$dialog$ownerDo : ownerWindow == null ? void 0 : ownerWindow.document);
      if (modal.dialog && currentActiveElement && !(0, _contains.default)(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  const handleHide = (0, _useEventCallback.default)(() => {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();
    if (restoreFocus) {
      var _lastFocusRef$current;
      // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  });

  // TODO: try and combine these effects: https://github.com/react-bootstrap/react-overlays/pull/794#discussion_r409954120

  // Show logic when:
  //  - show is `true` _and_ `container` has resolved
  (0, React.useEffect)(() => {
    if (!show || !container) return;
    handleShow();
  }, [show, container, /* should never change: */handleShow]);

  // Hide cleanup logic when:
  //  - `exited` switches to true
  //  - component unmounts;
  (0, React.useEffect)(() => {
    if (!exited) return;
    handleHide();
  }, [exited, handleHide]);
  (0, _useWillUnmount.default)(() => {
    handleHide();
  });

  // --------------------------------

  const handleEnforceFocus = (0, _useEventCallback.default)(() => {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }
    const currentActiveElement = (0, _activeElement.default)(ownerWindow == null ? void 0 : ownerWindow.document);
    if (modal.dialog && currentActiveElement && !(0, _contains.default)(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  const handleBackdropClick = (0, _useEventCallback.default)(e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onBackdropClick == null ? void 0 : onBackdropClick(e);
    if (backdrop === true) {
      onHide();
    }
  });
  const handleDocumentKeyDown = (0, _useEventCallback.default)(e => {
    if (keyboard && (0, _utils.isEscKey)(e) && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);
      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  const removeFocusListenerRef = (0, React.useRef)();
  const removeKeydownListenerRef = (0, React.useRef)();
  const handleHidden = (...args) => {
    setExited(true);
    onExited == null ? void 0 : onExited(...args);
  };
  if (!container) {
    return null;
  }
  const dialogProps = Object.assign({
    role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    'aria-modal': role === 'dialog' ? true : undefined
  }, rest, {
    style,
    className,
    tabIndex: -1
  });
  let dialog = renderDialog ? renderDialog(dialogProps) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", Object.assign({}, dialogProps, {
    children: /*#__PURE__*/React.cloneElement(children, {
      role: 'document'
    })
  }));
  dialog = (0, _ImperativeTransition.renderTransition)(transition, runTransition, {
    unmountOnExit: true,
    mountOnEnter: true,
    appear: true,
    in: !!show,
    onExit,
    onExiting,
    onExited: handleHidden,
    onEnter,
    onEntering,
    onEntered,
    children: dialog
  });
  let backdropElement = null;
  if (backdrop) {
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });
    backdropElement = (0, _ImperativeTransition.renderTransition)(backdropTransition, runBackdropTransition, {
      in: !!show,
      appear: true,
      mountOnEnter: true,
      unmountOnExit: true,
      children: backdropElement
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [backdropElement, dialog]
    }), container)
  });
});
Modal.displayName = 'Modal';
var _default = Object.assign(Modal, {
  Manager: _ModalManager.default
});
exports["default"] = _default;

/***/ }),

/***/ 2206:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = exports.OPEN_DATA_ATTRIBUTE = void 0;
var _css = _interopRequireDefault(__webpack_require__(88119));
var _DataKey = __webpack_require__(95079);
var _getScrollbarWidth = _interopRequireDefault(__webpack_require__(685));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OPEN_DATA_ATTRIBUTE = (0, _DataKey.dataAttr)('modal-open');

/**
 * Manages a stack of Modals as well as ensuring
 * body scrolling is is disabled and padding accounted for
 */
exports.OPEN_DATA_ATTRIBUTE = OPEN_DATA_ATTRIBUTE;
class ModalManager {
  constructor({
    ownerDocument,
    handleContainerOverflow = true,
    isRTL = false
  } = {}) {
    this.handleContainerOverflow = handleContainerOverflow;
    this.isRTL = isRTL;
    this.modals = [];
    this.ownerDocument = ownerDocument;
  }
  getScrollbarWidth() {
    return (0, _getScrollbarWidth.default)(this.ownerDocument);
  }
  getElement() {
    return (this.ownerDocument || document).body;
  }
  setModalAttributes(_modal) {
    // For overriding
  }
  removeModalAttributes(_modal) {
    // For overriding
  }
  setContainerStyle(containerState) {
    const style = {
      overflow: 'hidden'
    };

    // we are only interested in the actual `style` here
    // because we will override it
    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const container = this.getElement();
    containerState.style = {
      overflow: container.style.overflow,
      [paddingProp]: container.style[paddingProp]
    };
    if (containerState.scrollBarWidth) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style[paddingProp] = `${parseInt((0, _css.default)(container, paddingProp) || '0', 10) + containerState.scrollBarWidth}px`;
    }
    container.setAttribute(OPEN_DATA_ATTRIBUTE, '');
    (0, _css.default)(container, style);
  }
  reset() {
    [...this.modals].forEach(m => this.remove(m));
  }
  removeContainerStyle(containerState) {
    const container = this.getElement();
    container.removeAttribute(OPEN_DATA_ATTRIBUTE);
    Object.assign(container.style, containerState.style);
  }
  add(modal) {
    let modalIdx = this.modals.indexOf(modal);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    this.setModalAttributes(modal);
    if (modalIdx !== 0) {
      return modalIdx;
    }
    this.state = {
      scrollBarWidth: this.getScrollbarWidth(),
      style: {}
    };
    if (this.handleContainerOverflow) {
      this.setContainerStyle(this.state);
    }
    return modalIdx;
  }
  remove(modal) {
    const modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    this.modals.splice(modalIdx, 1);

    // if that was the last modal in a container,
    // clean up the container
    if (!this.modals.length && this.handleContainerOverflow) {
      this.removeContainerStyle(this.state);
    }
    this.removeModalAttributes(modal);
  }
  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
}
var _default = ModalManager;
exports["default"] = _default;

/***/ }),

/***/ 65050:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _querySelectorAll = _interopRequireDefault(__webpack_require__(73793));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _useForceUpdate = _interopRequireDefault(__webpack_require__(63202));
var _useMergedRefs = _interopRequireDefault(__webpack_require__(26835));
var _NavContext = _interopRequireDefault(__webpack_require__(2467));
var _SelectableContext = _interopRequireWildcard(__webpack_require__(49904));
var _TabContext = _interopRequireDefault(__webpack_require__(57924));
var _DataKey = __webpack_require__(95079);
var _NavItem = _interopRequireDefault(__webpack_require__(10816));
var _jsxRuntime = __webpack_require__(56786);
const _excluded = ["as", "onSelect", "activeKey", "role", "onKeyDown"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
const EVENT_KEY_ATTR = (0, _DataKey.dataAttr)('event-key');
const Nav = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      onSelect,
      activeKey,
      role,
      onKeyDown
    } = _ref,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  // A ref and forceUpdate for refocus, b/c we only want to trigger when needed
  // and don't want to reset the set in the effect
  const forceUpdate = (0, _useForceUpdate.default)();
  const needsRefocusRef = (0, React.useRef)(false);
  const parentOnSelect = (0, React.useContext)(_SelectableContext.default);
  const tabContext = (0, React.useContext)(_TabContext.default);
  let getControlledId, getControllerId;
  if (tabContext) {
    role = role || 'tablist';
    activeKey = tabContext.activeKey;
    // TODO: do we need to duplicate these?
    getControlledId = tabContext.getControlledId;
    getControllerId = tabContext.getControllerId;
  }
  const listNode = (0, React.useRef)(null);
  const getNextActiveTab = offset => {
    const currentListNode = listNode.current;
    if (!currentListNode) return null;
    const items = (0, _querySelectorAll.default)(currentListNode, `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`);
    const activeChild = currentListNode.querySelector('[aria-selected=true]');
    if (!activeChild || activeChild !== document.activeElement) return null;
    const index = items.indexOf(activeChild);
    if (index === -1) return null;
    let nextIndex = index + offset;
    if (nextIndex >= items.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = items.length - 1;
    return items[nextIndex];
  };
  const handleSelect = (key, event) => {
    if (key == null) return;
    onSelect == null ? void 0 : onSelect(key, event);
    parentOnSelect == null ? void 0 : parentOnSelect(key, event);
  };
  const handleKeyDown = event => {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (!tabContext) {
      return;
    }
    let nextActiveChild;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextActiveChild = getNextActiveTab(-1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextActiveChild = getNextActiveTab(1);
        break;
      default:
        return;
    }
    if (!nextActiveChild) return;
    event.preventDefault();
    handleSelect(nextActiveChild.dataset[(0, _DataKey.dataProp)('EventKey')] || null, event);
    needsRefocusRef.current = true;
    forceUpdate();
  };
  (0, React.useEffect)(() => {
    if (listNode.current && needsRefocusRef.current) {
      const activeChild = listNode.current.querySelector(`[${EVENT_KEY_ATTR}][aria-selected=true]`);
      activeChild == null ? void 0 : activeChild.focus();
    }
    needsRefocusRef.current = false;
  });
  const mergedRef = (0, _useMergedRefs.default)(ref, listNode);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectableContext.default.Provider, {
    value: handleSelect,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavContext.default.Provider, {
      value: {
        role,
        // used by NavLink to determine it's role
        activeKey: (0, _SelectableContext.makeEventKey)(activeKey),
        getControlledId: getControlledId || noop,
        getControllerId: getControllerId || noop
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, Object.assign({}, props, {
        onKeyDown: handleKeyDown,
        ref: mergedRef,
        role: role
      }))
    })
  });
});
Nav.displayName = 'Nav';
var _default = Object.assign(Nav, {
  Item: _NavItem.default
});
exports["default"] = _default;

/***/ }),

/***/ 2467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NavContext = /*#__PURE__*/React.createContext(null);
NavContext.displayName = 'NavContext';
var _default = NavContext;
exports["default"] = _default;

/***/ }),

/***/ 10816:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useNavItem = useNavItem;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
var _NavContext = _interopRequireDefault(__webpack_require__(2467));
var _SelectableContext = _interopRequireWildcard(__webpack_require__(49904));
var _Button = _interopRequireDefault(__webpack_require__(93378));
var _DataKey = __webpack_require__(95079);
var _TabContext = _interopRequireDefault(__webpack_require__(57924));
var _jsxRuntime = __webpack_require__(56786);
const _excluded = ["as", "active", "eventKey"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function useNavItem({
  key,
  onClick,
  active,
  id,
  role,
  disabled
}) {
  const parentOnSelect = (0, React.useContext)(_SelectableContext.default);
  const navContext = (0, React.useContext)(_NavContext.default);
  const tabContext = (0, React.useContext)(_TabContext.default);
  let isActive = active;
  const props = {
    role
  };
  if (navContext) {
    if (!role && navContext.role === 'tablist') props.role = 'tab';
    const contextControllerId = navContext.getControllerId(key != null ? key : null);
    const contextControlledId = navContext.getControlledId(key != null ? key : null);

    // @ts-ignore
    props[(0, _DataKey.dataAttr)('event-key')] = key;
    props.id = contextControllerId || id;
    isActive = active == null && key != null ? navContext.activeKey === key : active;

    /**
     * Simplified scenario for `mountOnEnter`.
     *
     * While it would make sense to keep 'aria-controls' for tabs that have been mounted at least
     * once, it would also complicate the code quite a bit, for very little gain.
     * The following implementation is probably good enough.
     *
     * @see https://github.com/react-restart/ui/pull/40#issuecomment-1009971561
     */
    if (isActive || !(tabContext != null && tabContext.unmountOnExit) && !(tabContext != null && tabContext.mountOnEnter)) props['aria-controls'] = contextControlledId;
  }
  if (props.role === 'tab') {
    props['aria-selected'] = isActive;
    if (!isActive) {
      props.tabIndex = -1;
    }
    if (disabled) {
      props.tabIndex = -1;
      props['aria-disabled'] = true;
    }
  }
  props.onClick = (0, _useEventCallback.default)(e => {
    if (disabled) return;
    onClick == null ? void 0 : onClick(e);
    if (key == null) {
      return;
    }
    if (parentOnSelect && !e.isPropagationStopped()) {
      parentOnSelect(key, e);
    }
  });
  return [props, {
    isActive
  }];
}
const NavItem = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
      as: Component = _Button.default,
      active,
      eventKey
    } = _ref,
    options = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [props, meta] = useNavItem(Object.assign({
    key: (0, _SelectableContext.makeEventKey)(eventKey, options.href),
    active
  }, options));

  // @ts-ignore
  props[(0, _DataKey.dataAttr)('active')] = meta.isActive;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, Object.assign({}, options, props, {
    ref: ref
  }));
});
NavItem.displayName = 'NavItem';
var _default = NavItem;
exports["default"] = _default;

/***/ }),

/***/ 68001:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
var _useMergedRefs = _interopRequireDefault(__webpack_require__(26835));
var _react = __webpack_require__(18038);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function NoopTransition({
  children,
  in: inProp,
  onExited,
  mountOnEnter,
  unmountOnExit
}) {
  const ref = (0, _react.useRef)(null);
  const hasEnteredRef = (0, _react.useRef)(inProp);
  const handleExited = (0, _useEventCallback.default)(onExited);
  (0, _react.useEffect)(() => {
    if (inProp) hasEnteredRef.current = true;else {
      handleExited(ref.current);
    }
  }, [inProp, handleExited]);
  const combinedRef = (0, _useMergedRefs.default)(ref, children.ref);
  const child = /*#__PURE__*/(0, _react.cloneElement)(children, {
    ref: combinedRef
  });
  if (inProp) return child;
  if (unmountOnExit) {
    return null;
  }
  if (!hasEnteredRef.current && mountOnEnter) {
    return null;
  }
  return child;
}
var _default = NoopTransition;
exports["default"] = _default;

/***/ }),

/***/ 49904:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = exports.makeEventKey = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SelectableContext = /*#__PURE__*/React.createContext(null);
const makeEventKey = (eventKey, href = null) => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};
exports.makeEventKey = makeEventKey;
var _default = SelectableContext;
exports["default"] = _default;

/***/ }),

/***/ 57924:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const TabContext = /*#__PURE__*/React.createContext(null);
var _default = TabContext;
exports["default"] = _default;

/***/ }),

/***/ 685:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = getBodyScrollbarWidth;
/**
 * Get the width of the vertical window scrollbar if it's visible
 */
function getBodyScrollbarWidth(ownerDocument = document) {
  const window = ownerDocument.defaultView;
  return Math.abs(window.innerWidth - ownerDocument.documentElement.clientWidth);
}

/***/ }),

/***/ 10620:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useWaitForDOMRef;
exports.resolveContainerRef = void 0;
var _ownerDocument = _interopRequireDefault(__webpack_require__(91383));
var _canUseDOM = _interopRequireDefault(__webpack_require__(3142));
var _react = __webpack_require__(18038);
var _useWindow = _interopRequireDefault(__webpack_require__(6819));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const resolveContainerRef = (ref, document) => {
  if (!_canUseDOM.default) return null;
  if (ref == null) return (document || (0, _ownerDocument.default)()).body;
  if (typeof ref === 'function') ref = ref();
  if (ref && 'current' in ref) ref = ref.current;
  if (ref && ('nodeType' in ref || ref.getBoundingClientRect)) return ref;
  return null;
};
exports.resolveContainerRef = resolveContainerRef;
function useWaitForDOMRef(ref, onResolved) {
  const window = (0, _useWindow.default)();
  const [resolvedRef, setRef] = (0, _react.useState)(() => resolveContainerRef(ref, window == null ? void 0 : window.document));
  if (!resolvedRef) {
    const earlyRef = resolveContainerRef(ref);
    if (earlyRef) setRef(earlyRef);
  }
  (0, _react.useEffect)(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0, _react.useEffect)(() => {
    const nextRef = resolveContainerRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}

/***/ }),

/***/ 6819:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = useWindow;
exports.WindowProvider = void 0;
var _react = __webpack_require__(18038);
var _canUseDOM = _interopRequireDefault(__webpack_require__(3142));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Context = /*#__PURE__*/(0, _react.createContext)(_canUseDOM.default ? window : undefined);
const WindowProvider = Context.Provider;

/**
 * The document "window" placed in React context. Helpful for determining
 * SSR context, or when rendering into an iframe.
 *
 * @returns the current window
 */
exports.WindowProvider = WindowProvider;
function useWindow() {
  return (0, _react.useContext)(Context);
}

/***/ }),

/***/ 10769:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.isEscKey = isEscKey;
/* eslint-disable import/prefer-default-export */
function isEscKey(e) {
  return e.code === 'Escape' || e.keyCode === 27;
}

/***/ }),

/***/ 89367:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ 87806:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = activeElement;

var _ownerDocument = _interopRequireDefault(__webpack_require__(91383));

/**
 * Returns the actively focused element safely.
 *
 * @param doc the document to check
 */
function activeElement(doc) {
  if (doc === void 0) {
    doc = (0, _ownerDocument.default)();
  }

  // Support: IE 9 only
  // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
  try {
    var active = doc.activeElement; // IE11 returns a seemingly empty object in some cases when accessing
    // document.activeElement from an <iframe>

    if (!active || !active.nodeName) return null;
    return active;
  } catch (e) {
    /* ie throws if no active element */
    return doc.body;
  }
}

module.exports = exports["default"];

/***/ }),

/***/ 7994:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = addClass;

var _hasClass = _interopRequireDefault(__webpack_require__(28304));

/**
 * Adds a CSS class to a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

module.exports = exports["default"];

/***/ }),

/***/ 74473:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = exports.onceSupported = exports.optionsSupported = void 0;

var _canUseDOM = _interopRequireDefault(__webpack_require__(3142));

/* eslint-disable no-return-assign */
var optionsSupported = false;
exports.optionsSupported = optionsSupported;
var onceSupported = false;
exports.onceSupported = onceSupported;

try {
  var options = {
    get passive() {
      return exports.optionsSupported = optionsSupported = true;
    },

    get once() {
      // eslint-disable-next-line no-multi-assign
      return exports.onceSupported = onceSupported = exports.optionsSupported = optionsSupported = true;
    }

  };

  if (_canUseDOM.default) {
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, true);
  }
} catch (e) {
  /* */
}

/**
 * An `addEventListener` ponyfill, supports the `once` option
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */
function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== 'boolean' && !onceSupported) {
    var once = options.once,
        capture = options.capture;
    var wrappedHandler = handler;

    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };

      handler.__once = wrappedHandler;
    }

    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }

  node.addEventListener(eventName, handler, options);
}

var _default = addEventListener;
exports["default"] = _default;

/***/ }),

/***/ 73048:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = camelize;
var rHyphen = /-(.)/g;

function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}

module.exports = exports["default"];

/***/ }),

/***/ 3142:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _default = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

exports["default"] = _default;
module.exports = exports["default"];

/***/ }),

/***/ 81005:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = contains;

/* eslint-disable no-bitwise, no-cond-assign */

/**
 * Checks if an element contains another given element.
 * 
 * @param context the context element
 * @param node the element to check
 */
function contains(context, node) {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}

module.exports = exports["default"];

/***/ }),

/***/ 88119:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = void 0;

var _getComputedStyle = _interopRequireDefault(__webpack_require__(32138));

var _hyphenateStyle = _interopRequireDefault(__webpack_require__(13768));

var _isTransform = _interopRequireDefault(__webpack_require__(95063));

function style(node, property) {
  var css = '';
  var transforms = '';

  if (typeof property === 'string') {
    return node.style.getPropertyValue((0, _hyphenateStyle.default)(property)) || (0, _getComputedStyle.default)(node).getPropertyValue((0, _hyphenateStyle.default)(property));
  }

  Object.keys(property).forEach(function (key) {
    var value = property[key];

    if (!value && value !== 0) {
      node.style.removeProperty((0, _hyphenateStyle.default)(key));
    } else if ((0, _isTransform.default)(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += (0, _hyphenateStyle.default)(key) + ": " + value + ";";
    }
  });

  if (transforms) {
    css += "transform: " + transforms + ";";
  }

  node.style.cssText += ";" + css;
}

var _default = style;
exports["default"] = _default;
module.exports = exports["default"];

/***/ }),

/***/ 32138:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = getComputedStyle;

var _ownerWindow = _interopRequireDefault(__webpack_require__(24059));

/**
 * Returns one or all computed style properties of an element.
 * 
 * @param node the element
 * @param psuedoElement the style property
 */
function getComputedStyle(node, psuedoElement) {
  return (0, _ownerWindow.default)(node).getComputedStyle(node, psuedoElement);
}

module.exports = exports["default"];

/***/ }),

/***/ 28304:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = hasClass;

/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

module.exports = exports["default"];

/***/ }),

/***/ 32164:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = hyphenate;
var rUpper = /([A-Z])/g;

function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}

module.exports = exports["default"];

/***/ }),

/***/ 13768:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = hyphenateStyleName;

var _hyphenate = _interopRequireDefault(__webpack_require__(32164));

/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */
var msPattern = /^ms-/;

function hyphenateStyleName(string) {
  return (0, _hyphenate.default)(string).replace(msPattern, '-ms-');
}

module.exports = exports["default"];

/***/ }),

/***/ 95063:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = isTransform;
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;

function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}

module.exports = exports["default"];

/***/ }),

/***/ 35264:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = void 0;

var _addEventListener = _interopRequireDefault(__webpack_require__(74473));

var _removeEventListener = _interopRequireDefault(__webpack_require__(19741));

function listen(node, eventName, handler, options) {
  (0, _addEventListener.default)(node, eventName, handler, options);
  return function () {
    (0, _removeEventListener.default)(node, eventName, handler, options);
  };
}

var _default = listen;
exports["default"] = _default;
module.exports = exports["default"];

/***/ }),

/***/ 91383:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = ownerDocument;

/**
 * Returns the owner document of a given element.
 * 
 * @param node the element
 */
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

module.exports = exports["default"];

/***/ }),

/***/ 24059:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = ownerWindow;

var _ownerDocument = _interopRequireDefault(__webpack_require__(91383));

/**
 * Returns the owner window of a given element.
 * 
 * @param node the element
 */
function ownerWindow(node) {
  var doc = (0, _ownerDocument.default)(node);
  return doc && doc.defaultView || window;
}

module.exports = exports["default"];

/***/ }),

/***/ 73793:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = qsa;
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
/**
 * Runs `querySelectorAll` on a given element.
 * 
 * @param element the element
 * @param selector the selector
 */

function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

module.exports = exports["default"];

/***/ }),

/***/ 26339:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = removeClass;

function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}
/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */


function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

module.exports = exports["default"];

/***/ }),

/***/ 19741:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

/**
 * A `removeEventListener` ponyfill
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== 'boolean' ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);

  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}

var _default = removeEventListener;
exports["default"] = _default;
module.exports = exports["default"];

/***/ }),

/***/ 51472:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports["default"] = transitionEnd;

var _css = _interopRequireDefault(__webpack_require__(88119));

var _listen = _interopRequireDefault(__webpack_require__(35264));

var _triggerEvent = _interopRequireDefault(__webpack_require__(87540));

function parseDuration(node) {
  var str = (0, _css.default)(node, 'transitionDuration') || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }

  var called = false;
  var handle = setTimeout(function () {
    if (!called) (0, _triggerEvent.default)(element, 'transitionend', true);
  }, duration + padding);
  var remove = (0, _listen.default)(element, 'transitionend', function () {
    called = true;
  }, {
    once: true
  });
  return function () {
    clearTimeout(handle);
    remove();
  };
}

function transitionEnd(element, handler, duration, padding) {
  if (duration == null) duration = parseDuration(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = (0, _listen.default)(element, 'transitionend', handler);
  return function () {
    removeEmulate();
    remove();
  };
}

module.exports = exports["default"];

/***/ }),

/***/ 87540:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = triggerEvent;

/**
 * Triggers an event on a given element.
 * 
 * @param node the element
 * @param eventName the event name to trigger
 * @param bubbles whether the event should bubble up
 * @param cancelable whether the event should be cancelable
 */
function triggerEvent(node, eventName, bubbles, cancelable) {
  if (bubbles === void 0) {
    bubbles = false;
  }

  if (cancelable === void 0) {
    cancelable = true;
  }

  if (node) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, bubbles, cancelable);
    node.dispatchEvent(event);
  }
}

module.exports = exports["default"];

/***/ }),

/***/ 18457:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 76741:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BroadcastChannel = BroadcastChannel;
exports.apiBaseUrl = apiBaseUrl;
exports.fetchData = fetchData;
exports.now = now;

var _regenerator = _interopRequireDefault(__webpack_require__(25353));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(82510));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function fetchData(_x, _x2, _x3) {
  return _fetchData.apply(this, arguments);
}

function _fetchData() {
  _fetchData = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(path, __NEXTAUTH, logger) {
    var _ref,
        ctx,
        _ref$req,
        req,
        url,
        _req$headers,
        options,
        res,
        data,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, ctx = _ref.ctx, _ref$req = _ref.req, req = _ref$req === void 0 ? ctx === null || ctx === void 0 ? void 0 : ctx.req : _ref$req;
            url = "".concat(apiBaseUrl(__NEXTAUTH), "/").concat(path);
            _context.prev = 2;
            options = {
              headers: _objectSpread({
                "Content-Type": "application/json"
              }, req !== null && req !== void 0 && (_req$headers = req.headers) !== null && _req$headers !== void 0 && _req$headers.cookie ? {
                cookie: req.headers.cookie
              } : {})
            };

            if (req !== null && req !== void 0 && req.body) {
              options.body = JSON.stringify(req.body);
              options.method = "POST";
            }

            _context.next = 7;
            return fetch(url, options);

          case 7:
            res = _context.sent;
            _context.next = 10;
            return res.json();

          case 10:
            data = _context.sent;

            if (res.ok) {
              _context.next = 13;
              break;
            }

            throw data;

          case 13:
            return _context.abrupt("return", Object.keys(data).length > 0 ? data : null);

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);
            logger.error("CLIENT_FETCH_ERROR", {
              error: _context.t0,
              url: url
            });
            return _context.abrupt("return", null);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16]]);
  }));
  return _fetchData.apply(this, arguments);
}

function apiBaseUrl(__NEXTAUTH) {
  if (typeof window === "undefined") {
    return "".concat(__NEXTAUTH.baseUrlServer).concat(__NEXTAUTH.basePathServer);
  }

  return __NEXTAUTH.basePath;
}

function now() {
  return Math.floor(Date.now() / 1000);
}

function BroadcastChannel() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "nextauth.message";
  return {
    receive: function receive(onReceive) {
      var handler = function handler(event) {
        var _event$newValue;

        if (event.key !== name) return;
        var message = JSON.parse((_event$newValue = event.newValue) !== null && _event$newValue !== void 0 ? _event$newValue : "{}");
        if ((message === null || message === void 0 ? void 0 : message.event) !== "session" || !(message !== null && message !== void 0 && message.data)) return;
        onReceive(message);
      };

      window.addEventListener("storage", handler);
      return function () {
        return window.removeEventListener("storage", handler);
      };
    },
    post: function post(message) {
      if (typeof window === "undefined") return;

      try {
        localStorage.setItem(name, JSON.stringify(_objectSpread(_objectSpread({}, message), {}, {
          timestamp: now()
        })));
      } catch (_unused) {}
    }
  };
}

/***/ }),

/***/ 46745:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UnsupportedStrategy = exports.UnknownError = exports.OAuthCallbackError = exports.MissingSecret = exports.MissingAuthorize = exports.MissingAdapterMethods = exports.MissingAdapter = exports.MissingAPIRoute = exports.InvalidCallbackUrl = exports.AccountNotLinkedError = void 0;
exports.adapterErrorHandler = adapterErrorHandler;
exports.capitalize = capitalize;
exports.eventsErrorHandler = eventsErrorHandler;
exports.upperSnake = upperSnake;

var _regenerator = _interopRequireDefault(__webpack_require__(25353));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(82510));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(49687));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(31456));

var _createClass2 = _interopRequireDefault(__webpack_require__(43977));

var _inherits2 = _interopRequireDefault(__webpack_require__(22261));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(7880));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(35091));

var _wrapNativeSuper2 = _interopRequireDefault(__webpack_require__(74908));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var UnknownError = function (_Error) {
  (0, _inherits2.default)(UnknownError, _Error);

  var _super = _createSuper(UnknownError);

  function UnknownError(error) {
    var _message;

    var _this;

    (0, _classCallCheck2.default)(this, UnknownError);
    _this = _super.call(this, (_message = error === null || error === void 0 ? void 0 : error.message) !== null && _message !== void 0 ? _message : error);
    _this.name = "UnknownError";
    _this.code = error.code;

    if (error instanceof Error) {
      _this.stack = error.stack;
    }

    return _this;
  }

  (0, _createClass2.default)(UnknownError, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        stack: this.stack
      };
    }
  }]);
  return UnknownError;
}((0, _wrapNativeSuper2.default)(Error));

exports.UnknownError = UnknownError;

var OAuthCallbackError = function (_UnknownError) {
  (0, _inherits2.default)(OAuthCallbackError, _UnknownError);

  var _super2 = _createSuper(OAuthCallbackError);

  function OAuthCallbackError() {
    var _this2;

    (0, _classCallCheck2.default)(this, OAuthCallbackError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "name", "OAuthCallbackError");
    return _this2;
  }

  return (0, _createClass2.default)(OAuthCallbackError);
}(UnknownError);

exports.OAuthCallbackError = OAuthCallbackError;

var AccountNotLinkedError = function (_UnknownError2) {
  (0, _inherits2.default)(AccountNotLinkedError, _UnknownError2);

  var _super3 = _createSuper(AccountNotLinkedError);

  function AccountNotLinkedError() {
    var _this3;

    (0, _classCallCheck2.default)(this, AccountNotLinkedError);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super3.call.apply(_super3, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "name", "AccountNotLinkedError");
    return _this3;
  }

  return (0, _createClass2.default)(AccountNotLinkedError);
}(UnknownError);

exports.AccountNotLinkedError = AccountNotLinkedError;

var MissingAPIRoute = function (_UnknownError3) {
  (0, _inherits2.default)(MissingAPIRoute, _UnknownError3);

  var _super4 = _createSuper(MissingAPIRoute);

  function MissingAPIRoute() {
    var _this4;

    (0, _classCallCheck2.default)(this, MissingAPIRoute);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _super4.call.apply(_super4, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "name", "MissingAPIRouteError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "code", "MISSING_NEXTAUTH_API_ROUTE_ERROR");
    return _this4;
  }

  return (0, _createClass2.default)(MissingAPIRoute);
}(UnknownError);

exports.MissingAPIRoute = MissingAPIRoute;

var MissingSecret = function (_UnknownError4) {
  (0, _inherits2.default)(MissingSecret, _UnknownError4);

  var _super5 = _createSuper(MissingSecret);

  function MissingSecret() {
    var _this5;

    (0, _classCallCheck2.default)(this, MissingSecret);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this5 = _super5.call.apply(_super5, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "name", "MissingSecretError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "code", "NO_SECRET");
    return _this5;
  }

  return (0, _createClass2.default)(MissingSecret);
}(UnknownError);

exports.MissingSecret = MissingSecret;

var MissingAuthorize = function (_UnknownError5) {
  (0, _inherits2.default)(MissingAuthorize, _UnknownError5);

  var _super6 = _createSuper(MissingAuthorize);

  function MissingAuthorize() {
    var _this6;

    (0, _classCallCheck2.default)(this, MissingAuthorize);

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    _this6 = _super6.call.apply(_super6, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "name", "MissingAuthorizeError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this6), "code", "CALLBACK_CREDENTIALS_HANDLER_ERROR");
    return _this6;
  }

  return (0, _createClass2.default)(MissingAuthorize);
}(UnknownError);

exports.MissingAuthorize = MissingAuthorize;

var MissingAdapter = function (_UnknownError6) {
  (0, _inherits2.default)(MissingAdapter, _UnknownError6);

  var _super7 = _createSuper(MissingAdapter);

  function MissingAdapter() {
    var _this7;

    (0, _classCallCheck2.default)(this, MissingAdapter);

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    _this7 = _super7.call.apply(_super7, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this7), "name", "MissingAdapterError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this7), "code", "EMAIL_REQUIRES_ADAPTER_ERROR");
    return _this7;
  }

  return (0, _createClass2.default)(MissingAdapter);
}(UnknownError);

exports.MissingAdapter = MissingAdapter;

var MissingAdapterMethods = function (_UnknownError7) {
  (0, _inherits2.default)(MissingAdapterMethods, _UnknownError7);

  var _super8 = _createSuper(MissingAdapterMethods);

  function MissingAdapterMethods() {
    var _this8;

    (0, _classCallCheck2.default)(this, MissingAdapterMethods);

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    _this8 = _super8.call.apply(_super8, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this8), "name", "MissingAdapterMethodsError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this8), "code", "MISSING_ADAPTER_METHODS_ERROR");
    return _this8;
  }

  return (0, _createClass2.default)(MissingAdapterMethods);
}(UnknownError);

exports.MissingAdapterMethods = MissingAdapterMethods;

var UnsupportedStrategy = function (_UnknownError8) {
  (0, _inherits2.default)(UnsupportedStrategy, _UnknownError8);

  var _super9 = _createSuper(UnsupportedStrategy);

  function UnsupportedStrategy() {
    var _this9;

    (0, _classCallCheck2.default)(this, UnsupportedStrategy);

    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    _this9 = _super9.call.apply(_super9, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "name", "UnsupportedStrategyError");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this9), "code", "CALLBACK_CREDENTIALS_JWT_ERROR");
    return _this9;
  }

  return (0, _createClass2.default)(UnsupportedStrategy);
}(UnknownError);

exports.UnsupportedStrategy = UnsupportedStrategy;

var InvalidCallbackUrl = function (_UnknownError9) {
  (0, _inherits2.default)(InvalidCallbackUrl, _UnknownError9);

  var _super10 = _createSuper(InvalidCallbackUrl);

  function InvalidCallbackUrl() {
    var _this10;

    (0, _classCallCheck2.default)(this, InvalidCallbackUrl);

    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    _this10 = _super10.call.apply(_super10, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this10), "name", "InvalidCallbackUrl");
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this10), "code", "INVALID_CALLBACK_URL_ERROR");
    return _this10;
  }

  return (0, _createClass2.default)(InvalidCallbackUrl);
}(UnknownError);

exports.InvalidCallbackUrl = InvalidCallbackUrl;

function upperSnake(s) {
  return s.replace(/([A-Z])/g, "_$1").toUpperCase();
}

function capitalize(s) {
  return "".concat(s[0].toUpperCase()).concat(s.slice(1));
}

function eventsErrorHandler(methods, logger) {
  return Object.keys(methods).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var method,
          _args = arguments;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              method = methods[name];
              _context.next = 4;
              return method.apply(void 0, _args);

            case 4:
              return _context.abrupt("return", _context.sent);

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              logger.error("".concat(upperSnake(name), "_EVENT_ERROR"), _context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));
    return acc;
  }, {});
}

function adapterErrorHandler(adapter, logger) {
  if (!adapter) return;
  return Object.keys(adapter).reduce(function (acc, name) {
    acc[name] = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
      var _len10,
          args,
          _key10,
          method,
          e,
          _args2 = arguments;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              for (_len10 = _args2.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                args[_key10] = _args2[_key10];
              }

              logger.debug("adapter_".concat(name), {
                args: args
              });
              method = adapter[name];
              _context2.next = 6;
              return method.apply(void 0, args);

            case 6:
              return _context2.abrupt("return", _context2.sent);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              logger.error("adapter_error_".concat(name), _context2.t0);
              e = new UnknownError(_context2.t0);
              e.name = "".concat(capitalize(name), "Error");
              throw e;

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return acc;
  }, {});
}

/***/ }),

/***/ 74284:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

var _typeof = __webpack_require__(67236);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _exportNames = {
  SessionContext: true,
  useSession: true,
  getSession: true,
  getCsrfToken: true,
  getProviders: true,
  signIn: true,
  signOut: true,
  SessionProvider: true
};
exports.SessionContext = void 0;
exports.SessionProvider = SessionProvider;
exports.getCsrfToken = getCsrfToken;
exports.getProviders = getProviders;
exports.getSession = getSession;
exports.signIn = signIn;
exports.signOut = signOut;
exports.useSession = useSession;

var _regenerator = _interopRequireDefault(__webpack_require__(25353));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(82510));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(16522));

var React = _interopRequireWildcard(__webpack_require__(18038));

var _logger2 = _interopRequireWildcard(__webpack_require__(22191));

var _parseUrl = _interopRequireDefault(__webpack_require__(52767));

var _utils = __webpack_require__(76741);

var _jsxRuntime = __webpack_require__(56786);

var _types = __webpack_require__(72407);

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _process$env$NEXTAUTH, _ref, _process$env$NEXTAUTH2, _process$env$NEXTAUTH3, _React$createContext;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var __NEXTAUTH = {
  baseUrl: (0, _parseUrl.default)((_process$env$NEXTAUTH = process.env.NEXTAUTH_URL) !== null && _process$env$NEXTAUTH !== void 0 ? _process$env$NEXTAUTH : process.env.VERCEL_URL).origin,
  basePath: (0, _parseUrl.default)(process.env.NEXTAUTH_URL).path,
  baseUrlServer: (0, _parseUrl.default)((_ref = (_process$env$NEXTAUTH2 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH2 !== void 0 ? _process$env$NEXTAUTH2 : process.env.NEXTAUTH_URL) !== null && _ref !== void 0 ? _ref : process.env.VERCEL_URL).origin,
  basePathServer: (0, _parseUrl.default)((_process$env$NEXTAUTH3 = process.env.NEXTAUTH_URL_INTERNAL) !== null && _process$env$NEXTAUTH3 !== void 0 ? _process$env$NEXTAUTH3 : process.env.NEXTAUTH_URL).path,
  _lastSync: 0,
  _session: undefined,
  _getSession: function _getSession() {}
};
var broadcast = (0, _utils.BroadcastChannel)();
var logger = (0, _logger2.proxyLogger)(_logger2.default, __NEXTAUTH.basePath);

function useOnline() {
  var _React$useState = React.useState(typeof navigator !== "undefined" ? navigator.onLine : false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      isOnline = _React$useState2[0],
      setIsOnline = _React$useState2[1];

  var setOnline = function setOnline() {
    return setIsOnline(true);
  };

  var setOffline = function setOffline() {
    return setIsOnline(false);
  };

  React.useEffect(function () {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return function () {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  return isOnline;
}

var SessionContext = (_React$createContext = React.createContext) === null || _React$createContext === void 0 ? void 0 : _React$createContext.call(React, undefined);
exports.SessionContext = SessionContext;

function useSession(options) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  var value = React.useContext(SessionContext);

  if (!value && "production" !== "production") {}

  var _ref2 = options !== null && options !== void 0 ? options : {},
      required = _ref2.required,
      onUnauthenticated = _ref2.onUnauthenticated;

  var requiredAndNotLoading = required && value.status === "unauthenticated";
  React.useEffect(function () {
    if (requiredAndNotLoading) {
      var url = "/api/auth/signin?".concat(new URLSearchParams({
        error: "SessionRequired",
        callbackUrl: window.location.href
      }));
      if (onUnauthenticated) onUnauthenticated();else window.location.href = url;
    }
  }, [requiredAndNotLoading, onUnauthenticated]);

  if (requiredAndNotLoading) {
    return {
      data: value.data,
      update: value.update,
      status: "loading"
    };
  }

  return value;
}

function getSession(_x) {
  return _getSession2.apply(this, arguments);
}

function _getSession2() {
  _getSession2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee3(params) {
    var _params$broadcast;

    var session;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _utils.fetchData)("session", __NEXTAUTH, logger, params);

          case 2:
            session = _context3.sent;

            if ((_params$broadcast = params === null || params === void 0 ? void 0 : params.broadcast) !== null && _params$broadcast !== void 0 ? _params$broadcast : true) {
              broadcast.post({
                event: "session",
                data: {
                  trigger: "getSession"
                }
              });
            }

            return _context3.abrupt("return", session);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getSession2.apply(this, arguments);
}

function getCsrfToken(_x2) {
  return _getCsrfToken.apply(this, arguments);
}

function _getCsrfToken() {
  _getCsrfToken = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee4(params) {
    var response;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _utils.fetchData)("csrf", __NEXTAUTH, logger, params);

          case 2:
            response = _context4.sent;
            return _context4.abrupt("return", response === null || response === void 0 ? void 0 : response.csrfToken);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getCsrfToken.apply(this, arguments);
}

function getProviders() {
  return _getProviders.apply(this, arguments);
}

function _getProviders() {
  _getProviders = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee5() {
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _utils.fetchData)("providers", __NEXTAUTH, logger);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getProviders.apply(this, arguments);
}

function signIn(_x3, _x4, _x5) {
  return _signIn.apply(this, arguments);
}

function _signIn() {
  _signIn = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee6(provider, options, authorizationParams) {
    var _ref5, _ref5$callbackUrl, callbackUrl, _ref5$redirect, redirect, baseUrl, providers, isCredentials, isEmail, isSupportingReturn, signInUrl, _signInUrl, res, data, _data$url, url, error;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ref5 = options !== null && options !== void 0 ? options : {}, _ref5$callbackUrl = _ref5.callbackUrl, callbackUrl = _ref5$callbackUrl === void 0 ? window.location.href : _ref5$callbackUrl, _ref5$redirect = _ref5.redirect, redirect = _ref5$redirect === void 0 ? true : _ref5$redirect;
            baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
            _context6.next = 4;
            return getProviders();

          case 4:
            providers = _context6.sent;

            if (providers) {
              _context6.next = 8;
              break;
            }

            window.location.href = "".concat(baseUrl, "/error");
            return _context6.abrupt("return");

          case 8:
            if (!(!provider || !(provider in providers))) {
              _context6.next = 11;
              break;
            }

            window.location.href = "".concat(baseUrl, "/signin?").concat(new URLSearchParams({
              callbackUrl: callbackUrl
            }));
            return _context6.abrupt("return");

          case 11:
            isCredentials = providers[provider].type === "credentials";
            isEmail = providers[provider].type === "email";
            isSupportingReturn = isCredentials || isEmail;
            signInUrl = "".concat(baseUrl, "/").concat(isCredentials ? "callback" : "signin", "/").concat(provider);
            _signInUrl = "".concat(signInUrl, "?").concat(new URLSearchParams(authorizationParams));
            _context6.t0 = fetch;
            _context6.t1 = _signInUrl;
            _context6.t2 = {
              "Content-Type": "application/x-www-form-urlencoded"
            };
            _context6.t3 = URLSearchParams;
            _context6.t4 = _objectSpread;
            _context6.t5 = _objectSpread({}, options);
            _context6.t6 = {};
            _context6.next = 25;
            return getCsrfToken();

          case 25:
            _context6.t7 = _context6.sent;
            _context6.t8 = callbackUrl;
            _context6.t9 = {
              csrfToken: _context6.t7,
              callbackUrl: _context6.t8,
              json: true
            };
            _context6.t10 = (0, _context6.t4)(_context6.t5, _context6.t6, _context6.t9);
            _context6.t11 = new _context6.t3(_context6.t10);
            _context6.t12 = {
              method: "post",
              headers: _context6.t2,
              body: _context6.t11
            };
            _context6.next = 33;
            return (0, _context6.t0)(_context6.t1, _context6.t12);

          case 33:
            res = _context6.sent;
            _context6.next = 36;
            return res.json();

          case 36:
            data = _context6.sent;

            if (!(redirect || !isSupportingReturn)) {
              _context6.next = 42;
              break;
            }

            url = (_data$url = data.url) !== null && _data$url !== void 0 ? _data$url : callbackUrl;
            window.location.href = url;
            if (url.includes("#")) window.location.reload();
            return _context6.abrupt("return");

          case 42:
            error = new URL(data.url).searchParams.get("error");

            if (!res.ok) {
              _context6.next = 46;
              break;
            }

            _context6.next = 46;
            return __NEXTAUTH._getSession({
              event: "storage"
            });

          case 46:
            return _context6.abrupt("return", {
              error: error,
              status: res.status,
              ok: res.ok,
              url: error ? null : data.url
            });

          case 47:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _signIn.apply(this, arguments);
}

function signOut(_x6) {
  return _signOut.apply(this, arguments);
}

function _signOut() {
  _signOut = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee7(options) {
    var _options$redirect;

    var _ref6, _ref6$callbackUrl, callbackUrl, baseUrl, fetchOptions, res, data, _data$url2, url;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _ref6 = options !== null && options !== void 0 ? options : {}, _ref6$callbackUrl = _ref6.callbackUrl, callbackUrl = _ref6$callbackUrl === void 0 ? window.location.href : _ref6$callbackUrl;
            baseUrl = (0, _utils.apiBaseUrl)(__NEXTAUTH);
            _context7.t0 = {
              "Content-Type": "application/x-www-form-urlencoded"
            };
            _context7.t1 = URLSearchParams;
            _context7.next = 6;
            return getCsrfToken();

          case 6:
            _context7.t2 = _context7.sent;
            _context7.t3 = callbackUrl;
            _context7.t4 = {
              csrfToken: _context7.t2,
              callbackUrl: _context7.t3,
              json: true
            };
            _context7.t5 = new _context7.t1(_context7.t4);
            fetchOptions = {
              method: "post",
              headers: _context7.t0,
              body: _context7.t5
            };
            _context7.next = 13;
            return fetch("".concat(baseUrl, "/signout"), fetchOptions);

          case 13:
            res = _context7.sent;
            _context7.next = 16;
            return res.json();

          case 16:
            data = _context7.sent;
            broadcast.post({
              event: "session",
              data: {
                trigger: "signout"
              }
            });

            if (!((_options$redirect = options === null || options === void 0 ? void 0 : options.redirect) !== null && _options$redirect !== void 0 ? _options$redirect : true)) {
              _context7.next = 23;
              break;
            }

            url = (_data$url2 = data.url) !== null && _data$url2 !== void 0 ? _data$url2 : callbackUrl;
            window.location.href = url;
            if (url.includes("#")) window.location.reload();
            return _context7.abrupt("return");

          case 23:
            _context7.next = 25;
            return __NEXTAUTH._getSession({
              event: "storage"
            });

          case 25:
            return _context7.abrupt("return", data);

          case 26:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _signOut.apply(this, arguments);
}

function SessionProvider(props) {
  if (!SessionContext) {
    throw new Error("React Context is unavailable in Server Components");
  }

  var children = props.children,
      basePath = props.basePath,
      refetchInterval = props.refetchInterval,
      refetchWhenOffline = props.refetchWhenOffline;
  if (basePath) __NEXTAUTH.basePath = basePath;
  var hasInitialSession = props.session !== undefined;
  __NEXTAUTH._lastSync = hasInitialSession ? (0, _utils.now)() : 0;

  var _React$useState3 = React.useState(function () {
    if (hasInitialSession) __NEXTAUTH._session = props.session;
    return props.session;
  }),
      _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
      session = _React$useState4[0],
      setSession = _React$useState4[1];

  var _React$useState5 = React.useState(!hasInitialSession),
      _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
      loading = _React$useState6[0],
      setLoading = _React$useState6[1];

  React.useEffect(function () {
    __NEXTAUTH._getSession = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var _ref4,
          event,
          storageEvent,
          _args = arguments;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref4 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, event = _ref4.event;
              _context.prev = 1;
              storageEvent = event === "storage";

              if (!(storageEvent || __NEXTAUTH._session === undefined)) {
                _context.next = 10;
                break;
              }

              __NEXTAUTH._lastSync = (0, _utils.now)();
              _context.next = 7;
              return getSession({
                broadcast: !storageEvent
              });

            case 7:
              __NEXTAUTH._session = _context.sent;
              setSession(__NEXTAUTH._session);
              return _context.abrupt("return");

            case 10:
              if (!(!event || __NEXTAUTH._session === null || (0, _utils.now)() < __NEXTAUTH._lastSync)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              __NEXTAUTH._lastSync = (0, _utils.now)();
              _context.next = 15;
              return getSession();

            case 15:
              __NEXTAUTH._session = _context.sent;
              setSession(__NEXTAUTH._session);
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](1);
              logger.error("CLIENT_SESSION_ERROR", _context.t0);

            case 22:
              _context.prev = 22;
              setLoading(false);
              return _context.finish(22);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 19, 22, 25]]);
    }));

    __NEXTAUTH._getSession();

    return function () {
      __NEXTAUTH._lastSync = 0;
      __NEXTAUTH._session = undefined;

      __NEXTAUTH._getSession = function () {};
    };
  }, []);
  React.useEffect(function () {
    var unsubscribe = broadcast.receive(function () {
      return __NEXTAUTH._getSession({
        event: "storage"
      });
    });
    return function () {
      return unsubscribe();
    };
  }, []);
  React.useEffect(function () {
    var _props$refetchOnWindo = props.refetchOnWindowFocus,
        refetchOnWindowFocus = _props$refetchOnWindo === void 0 ? true : _props$refetchOnWindo;

    var visibilityHandler = function visibilityHandler() {
      if (refetchOnWindowFocus && document.visibilityState === "visible") __NEXTAUTH._getSession({
        event: "visibilitychange"
      });
    };

    document.addEventListener("visibilitychange", visibilityHandler, false);
    return function () {
      return document.removeEventListener("visibilitychange", visibilityHandler, false);
    };
  }, [props.refetchOnWindowFocus]);
  var isOnline = useOnline();
  var shouldRefetch = refetchWhenOffline !== false || isOnline;
  React.useEffect(function () {
    if (refetchInterval && shouldRefetch) {
      var refetchIntervalTimer = setInterval(function () {
        if (__NEXTAUTH._session) {
          __NEXTAUTH._getSession({
            event: "poll"
          });
        }
      }, refetchInterval * 1000);
      return function () {
        return clearInterval(refetchIntervalTimer);
      };
    }
  }, [refetchInterval, shouldRefetch]);
  var value = React.useMemo(function () {
    return {
      data: session,
      status: loading ? "loading" : session ? "authenticated" : "unauthenticated",
      update: function update(data) {
        return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2() {
          var newSession;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!(loading || !session)) {
                    _context2.next = 2;
                    break;
                  }

                  return _context2.abrupt("return");

                case 2:
                  setLoading(true);
                  _context2.t0 = _utils.fetchData;
                  _context2.t1 = __NEXTAUTH;
                  _context2.t2 = logger;
                  _context2.next = 8;
                  return getCsrfToken();

                case 8:
                  _context2.t3 = _context2.sent;
                  _context2.t4 = data;
                  _context2.t5 = {
                    csrfToken: _context2.t3,
                    data: _context2.t4
                  };
                  _context2.t6 = {
                    body: _context2.t5
                  };
                  _context2.t7 = {
                    req: _context2.t6
                  };
                  _context2.next = 15;
                  return (0, _context2.t0)("session", _context2.t1, _context2.t2, _context2.t7);

                case 15:
                  newSession = _context2.sent;
                  setLoading(false);

                  if (newSession) {
                    setSession(newSession);
                    broadcast.post({
                      event: "session",
                      data: {
                        trigger: "getSession"
                      }
                    });
                  }

                  return _context2.abrupt("return", newSession);

                case 19:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
      }
    };
  }, [session, loading]);
  return (0, _jsxRuntime.jsx)(SessionContext.Provider, {
    value: value,
    children: children
  });
}

/***/ }),

/***/ 72407:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ 22191:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
exports.proxyLogger = proxyLogger;
exports.setLogger = setLogger;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _errors = __webpack_require__(46745);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function formatError(o) {
  if (o instanceof Error && !(o instanceof _errors.UnknownError)) {
    return {
      message: o.message,
      stack: o.stack,
      name: o.name
    };
  }

  if (hasErrorProperty(o)) {
    var _o$message;

    o.error = formatError(o.error);
    o.message = (_o$message = o.message) !== null && _o$message !== void 0 ? _o$message : o.error.message;
  }

  return o;
}

function hasErrorProperty(x) {
  return !!(x !== null && x !== void 0 && x.error);
}

var _logger = {
  error: function error(code, metadata) {
    metadata = formatError(metadata);
    console.error("[next-auth][error][".concat(code, "]"), "\nhttps://next-auth.js.org/errors#".concat(code.toLowerCase()), metadata.message, metadata);
  },
  warn: function warn(code) {
    console.warn("[next-auth][warn][".concat(code, "]"), "\nhttps://next-auth.js.org/warnings#".concat(code.toLowerCase()));
  },
  debug: function debug(code, metadata) {
    console.log("[next-auth][debug][".concat(code, "]"), metadata);
  }
};

function setLogger() {
  var newLogger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var debug = arguments.length > 1 ? arguments[1] : undefined;
  if (!debug) _logger.debug = function () {};
  if (newLogger.error) _logger.error = newLogger.error;
  if (newLogger.warn) _logger.warn = newLogger.warn;
  if (newLogger.debug) _logger.debug = newLogger.debug;
}

var _default = _logger;
exports["default"] = _default;

function proxyLogger() {
  var logger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _logger;
  var basePath = arguments.length > 1 ? arguments[1] : undefined;

  try {
    if (typeof window === "undefined") {
      return logger;
    }

    var clientLogger = {};

    var _loop = function _loop(level) {
      clientLogger[level] = function (code, metadata) {
        _logger[level](code, metadata);

        if (level === "error") {
          metadata = formatError(metadata);
        }

        ;
        metadata.client = true;
        var url = "".concat(basePath, "/_log");
        var body = new URLSearchParams(_objectSpread({
          level: level,
          code: code
        }, metadata));

        if (navigator.sendBeacon) {
          return navigator.sendBeacon(url, body);
        }

        return fetch(url, {
          method: "POST",
          body: body,
          keepalive: true
        });
      };
    };

    for (var level in logger) {
      _loop(level);
    }

    return clientLogger;
  } catch (_unused) {
    return _logger;
  }
}

/***/ }),

/***/ 52767:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = parseUrl;

function parseUrl(url) {
  var _url2;

  const defaultUrl = new URL("http://localhost:3000/api/auth");

  if (url && !url.startsWith("http")) {
    url = `https://${url}`;
  }

  const _url = new URL((_url2 = url) !== null && _url2 !== void 0 ? _url2 : defaultUrl);

  const path = (_url.pathname === "/" ? defaultUrl.pathname : _url.pathname).replace(/\/$/, "");
  const base = `${_url.origin}${path}`;
  return {
    origin: _url.origin,
    host: _url.host,
    path,
    base,
    toString: () => base
  };
}

/***/ }),

/***/ 72568:
/***/ ((module) => {

// Exports
module.exports = {
	"style": {"fontFamily":"'__Roboto_a789c4', '__Roboto_Fallback_a789c4'","fontWeight":400,"fontStyle":"normal"},
	"className": "__className_a789c4"
};


/***/ }),

/***/ 24578:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addBasePath", ({
    enumerable: true,
    get: function() {
        return addBasePath;
    }
}));
const _addpathprefix = __webpack_require__(30893);
const _normalizetrailingslash = __webpack_require__(61094);
const basePath =  false || "";
function addBasePath(path, required) {
    return (0, _normalizetrailingslash.normalizePathTrailingSlash)( false ? 0 : (0, _addpathprefix.addPathPrefix)(path, basePath));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map


/***/ }),

/***/ 23005:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "addLocale", ({
    enumerable: true,
    get: function() {
        return addLocale;
    }
}));
const _normalizetrailingslash = __webpack_require__(61094);
const addLocale = function(path) {
    for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        args[_key - 1] = arguments[_key];
    }
    if (false) {}
    return path;
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-locale.js.map


/***/ }),

/***/ 56937:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "callServer", ({
    enumerable: true,
    get: function() {
        return callServer;
    }
}));
const _approuter = __webpack_require__(52987);
async function callServer(actionId, actionArgs) {
    const actionDispatcher = (0, _approuter.getServerActionDispatcher)();
    if (!actionDispatcher) {
        throw new Error("Invariant: missing action dispatcher.");
    }
    return new Promise((resolve, reject)=>{
        actionDispatcher({
            actionId,
            actionArgs,
            resolve,
            reject
        });
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-call-server.js.map


/***/ }),

/***/ 73049:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "AppRouterAnnouncer", ({
    enumerable: true,
    get: function() {
        return AppRouterAnnouncer;
    }
}));
const _react = __webpack_require__(18038);
const _reactdom = __webpack_require__(98704);
const ANNOUNCER_TYPE = "next-route-announcer";
const ANNOUNCER_ID = "__next-route-announcer__";
function getAnnouncerNode() {
    var _existingAnnouncer_shadowRoot;
    const existingAnnouncer = document.getElementsByName(ANNOUNCER_TYPE)[0];
    if (existingAnnouncer == null ? void 0 : (_existingAnnouncer_shadowRoot = existingAnnouncer.shadowRoot) == null ? void 0 : _existingAnnouncer_shadowRoot.childNodes[0]) {
        return existingAnnouncer.shadowRoot.childNodes[0];
    } else {
        const container = document.createElement(ANNOUNCER_TYPE);
        container.style.cssText = "position:absolute";
        const announcer = document.createElement("div");
        announcer.ariaLive = "assertive";
        announcer.id = ANNOUNCER_ID;
        announcer.role = "alert";
        announcer.style.cssText = "position:absolute;border:0;height:1px;margin:-1px;padding:0;width:1px;clip:rect(0 0 0 0);overflow:hidden;white-space:nowrap;word-wrap:normal";
        // Use shadow DOM here to avoid any potential CSS bleed
        const shadow = container.attachShadow({
            mode: "open"
        });
        shadow.appendChild(announcer);
        document.body.appendChild(container);
        return announcer;
    }
}
function AppRouterAnnouncer(param) {
    let { tree } = param;
    const [portalNode, setPortalNode] = (0, _react.useState)(null);
    (0, _react.useEffect)(()=>{
        const announcer = getAnnouncerNode();
        setPortalNode(announcer);
        return ()=>{
            const container = document.getElementsByTagName(ANNOUNCER_TYPE)[0];
            if (container == null ? void 0 : container.isConnected) {
                document.body.removeChild(container);
            }
        };
    }, []);
    const [routeAnnouncement, setRouteAnnouncement] = (0, _react.useState)("");
    const previousTitle = (0, _react.useRef)();
    (0, _react.useEffect)(()=>{
        let currentTitle = "";
        if (document.title) {
            currentTitle = document.title;
        } else {
            const pageHeader = document.querySelector("h1");
            if (pageHeader) {
                currentTitle = pageHeader.innerText || pageHeader.textContent || "";
            }
        }
        // Only announce the title change, but not for the first load because screen
        // readers do that automatically.
        if (previousTitle.current !== undefined) {
            setRouteAnnouncement(currentTitle);
        }
        previousTitle.current = currentTitle;
    }, [
        tree
    ]);
    return portalNode ? /*#__PURE__*/ (0, _reactdom.createPortal)(routeAnnouncement, portalNode) : null;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-announcer.js.map


/***/ }),

/***/ 66265:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RSC: function() {
        return RSC;
    },
    ACTION: function() {
        return ACTION;
    },
    NEXT_ROUTER_STATE_TREE: function() {
        return NEXT_ROUTER_STATE_TREE;
    },
    NEXT_ROUTER_PREFETCH: function() {
        return NEXT_ROUTER_PREFETCH;
    },
    NEXT_URL: function() {
        return NEXT_URL;
    },
    FETCH_CACHE_HEADER: function() {
        return FETCH_CACHE_HEADER;
    },
    RSC_CONTENT_TYPE_HEADER: function() {
        return RSC_CONTENT_TYPE_HEADER;
    },
    RSC_VARY_HEADER: function() {
        return RSC_VARY_HEADER;
    },
    FLIGHT_PARAMETERS: function() {
        return FLIGHT_PARAMETERS;
    },
    NEXT_RSC_UNION_QUERY: function() {
        return NEXT_RSC_UNION_QUERY;
    }
});
const RSC = "RSC";
const ACTION = "Next-Action";
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
const NEXT_ROUTER_PREFETCH = "Next-Router-Prefetch";
const NEXT_URL = "Next-Url";
const FETCH_CACHE_HEADER = "x-vercel-sc-headers";
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
const RSC_VARY_HEADER = RSC + ", " + NEXT_ROUTER_STATE_TREE + ", " + NEXT_ROUTER_PREFETCH + ", " + NEXT_URL;
const FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
const NEXT_RSC_UNION_QUERY = "_rsc";
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router-headers.js.map


/***/ }),

/***/ 52987:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getServerActionDispatcher: function() {
        return getServerActionDispatcher;
    },
    urlToUrlWithoutFlightMarker: function() {
        return urlToUrlWithoutFlightMarker;
    },
    default: function() {
        return AppRouter;
    }
});
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(18038));
const _approutercontext = __webpack_require__(57085);
const _routerreducer = __webpack_require__(27189);
const _routerreducertypes = __webpack_require__(92836);
const _createhreffromurl = __webpack_require__(34331);
const _hooksclientcontext = __webpack_require__(39569);
const _usereducerwithdevtools = __webpack_require__(57951);
const _errorboundary = __webpack_require__(31232);
const _createinitialrouterstate = __webpack_require__(61684);
const _isbot = __webpack_require__(98735);
const _addbasepath = __webpack_require__(24578);
const _approuterannouncer = __webpack_require__(73049);
const _redirectboundary = __webpack_require__(81442);
const _findheadincache = __webpack_require__(71333);
const _infinitepromise = __webpack_require__(96360);
const _approuterheaders = __webpack_require__(66265);
const _removebasepath = __webpack_require__(42666);
const _hasbasepath = __webpack_require__(94374);
const isServer = "undefined" === "undefined";
// Ensure the initialParallelRoutes are not combined because of double-rendering in the browser with Strict Mode.
let initialParallelRoutes = isServer ? null : new Map();
let globalServerActionDispatcher = null;
function getServerActionDispatcher() {
    return globalServerActionDispatcher;
}
function urlToUrlWithoutFlightMarker(url) {
    const urlWithoutFlightParameters = new URL(url, location.origin);
    urlWithoutFlightParameters.searchParams.delete(_approuterheaders.NEXT_RSC_UNION_QUERY);
    if (true) {
        if (false) {}
    }
    return urlWithoutFlightParameters;
}
function isExternalURL(url) {
    return url.origin !== window.location.origin;
}
function HistoryUpdater(param) {
    let { tree, pushRef, canonicalUrl, sync } = param;
    (0, _react.useInsertionEffect)(()=>{
        // Identifier is shortened intentionally.
        // __NA is used to identify if the history entry can be handled by the app-router.
        // __N is used to identify if the history entry can be handled by the old router.
        const historyState = {
            __NA: true,
            tree
        };
        if (pushRef.pendingPush && (0, _createhreffromurl.createHrefFromUrl)(new URL(window.location.href)) !== canonicalUrl) {
            // This intentionally mutates React state, pushRef is overwritten to ensure additional push/replace calls do not trigger an additional history entry.
            pushRef.pendingPush = false;
            window.history.pushState(historyState, "", canonicalUrl);
        } else {
            window.history.replaceState(historyState, "", canonicalUrl);
        }
        sync();
    }, [
        tree,
        pushRef,
        canonicalUrl,
        sync
    ]);
    return null;
}
const createEmptyCacheNode = ()=>({
        status: _approutercontext.CacheStates.LAZY_INITIALIZED,
        data: null,
        subTreeData: null,
        parallelRoutes: new Map()
    });
function useServerActionDispatcher(dispatch) {
    const serverActionDispatcher = (0, _react.useCallback)((actionPayload)=>{
        (0, _react.startTransition)(()=>{
            dispatch({
                ...actionPayload,
                type: _routerreducertypes.ACTION_SERVER_ACTION,
                mutable: {},
                cache: createEmptyCacheNode()
            });
        });
    }, [
        dispatch
    ]);
    globalServerActionDispatcher = serverActionDispatcher;
}
/**
 * Server response that only patches the cache and tree.
 */ function useChangeByServerResponse(dispatch) {
    return (0, _react.useCallback)((previousTree, flightData, overrideCanonicalUrl)=>{
        (0, _react.startTransition)(()=>{
            dispatch({
                type: _routerreducertypes.ACTION_SERVER_PATCH,
                flightData,
                previousTree,
                overrideCanonicalUrl,
                cache: createEmptyCacheNode(),
                mutable: {}
            });
        });
    }, [
        dispatch
    ]);
}
function useNavigate(dispatch) {
    return (0, _react.useCallback)((href, navigateType, forceOptimisticNavigation, shouldScroll)=>{
        const url = new URL((0, _addbasepath.addBasePath)(href), location.href);
        return dispatch({
            type: _routerreducertypes.ACTION_NAVIGATE,
            url,
            isExternalUrl: isExternalURL(url),
            locationSearch: location.search,
            forceOptimisticNavigation,
            shouldScroll: shouldScroll != null ? shouldScroll : true,
            navigateType,
            cache: createEmptyCacheNode(),
            mutable: {}
        });
    }, [
        dispatch
    ]);
}
/**
 * The global router that wraps the application components.
 */ function Router(param) {
    let { buildId, initialHead, initialTree, initialCanonicalUrl, children, assetPrefix } = param;
    const initialState = (0, _react.useMemo)(()=>(0, _createinitialrouterstate.createInitialRouterState)({
            buildId,
            children,
            initialCanonicalUrl,
            initialTree,
            initialParallelRoutes,
            isServer,
            location: !isServer ? window.location : null,
            initialHead
        }), [
        buildId,
        children,
        initialCanonicalUrl,
        initialTree,
        initialHead
    ]);
    const [{ tree, cache, prefetchCache, pushRef, focusAndScrollRef, canonicalUrl, nextUrl }, dispatch, sync] = (0, _usereducerwithdevtools.useReducerWithReduxDevtools)(_routerreducer.reducer, initialState);
    (0, _react.useEffect)(()=>{
        // Ensure initialParallelRoutes is cleaned up from memory once it's used.
        initialParallelRoutes = null;
    }, []);
    // Add memoized pathname/query for useSearchParams and usePathname.
    const { searchParams, pathname } = (0, _react.useMemo)(()=>{
        const url = new URL(canonicalUrl,  true ? "http://n" : 0);
        return {
            // This is turned into a readonly class in `useSearchParams`
            searchParams: url.searchParams,
            pathname: (0, _hasbasepath.hasBasePath)(url.pathname) ? (0, _removebasepath.removeBasePath)(url.pathname) : url.pathname
        };
    }, [
        canonicalUrl
    ]);
    const changeByServerResponse = useChangeByServerResponse(dispatch);
    const navigate = useNavigate(dispatch);
    useServerActionDispatcher(dispatch);
    /**
   * The app router that is exposed through `useRouter`. It's only concerned with dispatching actions to the reducer, does not hold state.
   */ const appRouter = (0, _react.useMemo)(()=>{
        const routerInstance = {
            back: ()=>window.history.back(),
            forward: ()=>window.history.forward(),
            prefetch: (href, options)=>{
                // Don't prefetch for bots as they don't navigate.
                // Don't prefetch during development (improves compilation performance)
                if ((0, _isbot.isBot)(window.navigator.userAgent) || "production" === "development") {
                    return;
                }
                const url = new URL((0, _addbasepath.addBasePath)(href), location.href);
                // External urls can't be prefetched in the same way.
                if (isExternalURL(url)) {
                    return;
                }
                (0, _react.startTransition)(()=>{
                    var _options_kind;
                    dispatch({
                        type: _routerreducertypes.ACTION_PREFETCH,
                        url,
                        kind: (_options_kind = options == null ? void 0 : options.kind) != null ? _options_kind : _routerreducertypes.PrefetchKind.FULL
                    });
                });
            },
            replace: (href, options)=>{
                if (options === void 0) options = {};
                (0, _react.startTransition)(()=>{
                    var _options_scroll;
                    navigate(href, "replace", Boolean(options.forceOptimisticNavigation), (_options_scroll = options.scroll) != null ? _options_scroll : true);
                });
            },
            push: (href, options)=>{
                if (options === void 0) options = {};
                (0, _react.startTransition)(()=>{
                    var _options_scroll;
                    navigate(href, "push", Boolean(options.forceOptimisticNavigation), (_options_scroll = options.scroll) != null ? _options_scroll : true);
                });
            },
            refresh: ()=>{
                (0, _react.startTransition)(()=>{
                    dispatch({
                        type: _routerreducertypes.ACTION_REFRESH,
                        cache: createEmptyCacheNode(),
                        mutable: {},
                        origin: window.location.origin
                    });
                });
            },
            // @ts-ignore we don't want to expose this method at all
            fastRefresh: ()=>{
                if (true) {
                    throw new Error("fastRefresh can only be used in development mode. Please use refresh instead.");
                } else {}
            }
        };
        return routerInstance;
    }, [
        dispatch,
        navigate
    ]);
    (0, _react.useEffect)(()=>{
        // Exists for debugging purposes. Don't use in application code.
        if (window.next) {
            window.next.router = appRouter;
        }
    }, [
        appRouter
    ]);
    if (false) {}
    (0, _react.useEffect)(()=>{
        // If the app is restored from bfcache, it's possible that
        // pushRef.mpaNavigation is true, which would mean that any re-render of this component
        // would trigger the mpa navigation logic again from the lines below.
        // This will restore the router to the initial state in the event that the app is restored from bfcache.
        function handlePageShow(event) {
            var _window_history_state;
            if (!event.persisted || !((_window_history_state = window.history.state) == null ? void 0 : _window_history_state.tree)) return;
            dispatch({
                type: _routerreducertypes.ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: window.history.state.tree
            });
        }
        window.addEventListener("pageshow", handlePageShow);
        return ()=>{
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, [
        dispatch
    ]);
    // When mpaNavigation flag is set do a hard navigation to the new url.
    // Infinitely suspend because we don't actually want to rerender any child
    // components with the new URL and any entangled state updates shouldn't
    // commit either (eg: useTransition isPending should stay true until the page
    // unloads).
    //
    // This is a side effect in render. Don't try this at home, kids. It's
    // probably safe because we know this is a singleton component and it's never
    // in <Offscreen>. At least I hope so. (It will run twice in dev strict mode,
    // but that's... fine?)
    if (pushRef.mpaNavigation) {
        const location1 = window.location;
        if (pushRef.pendingPush) {
            location1.assign(canonicalUrl);
        } else {
            location1.replace(canonicalUrl);
        }
        // TODO-APP: Should we listen to navigateerror here to catch failed
        // navigations somehow? And should we call window.stop() if a SPA navigation
        // should interrupt an MPA one?
        (0, _react.use)((0, _infinitepromise.createInfinitePromise)());
    }
    /**
   * Handle popstate event, this is used to handle back/forward in the browser.
   * By default dispatches ACTION_RESTORE, however if the history entry was not pushed/replaced by app-router it will reload the page.
   * That case can happen when the old router injected the history entry.
   */ const onPopState = (0, _react.useCallback)((param)=>{
        let { state } = param;
        if (!state) {
            // TODO-APP: this case only happens when pushState/replaceState was called outside of Next.js. It should probably reload the page in this case.
            return;
        }
        // This case happens when the history entry was pushed by the `pages` router.
        if (!state.__NA) {
            window.location.reload();
            return;
        }
        // @ts-ignore useTransition exists
        // TODO-APP: Ideally the back button should not use startTransition as it should apply the updates synchronously
        // Without startTransition works if the cache is there for this path
        (0, _react.startTransition)(()=>{
            dispatch({
                type: _routerreducertypes.ACTION_RESTORE,
                url: new URL(window.location.href),
                tree: state.tree
            });
        });
    }, [
        dispatch
    ]);
    // Register popstate event to call onPopstate.
    (0, _react.useEffect)(()=>{
        window.addEventListener("popstate", onPopState);
        return ()=>{
            window.removeEventListener("popstate", onPopState);
        };
    }, [
        onPopState
    ]);
    const head = (0, _react.useMemo)(()=>{
        return (0, _findheadincache.findHeadInCache)(cache, tree[1]);
    }, [
        cache,
        tree
    ]);
    let content = /*#__PURE__*/ _react.default.createElement(_redirectboundary.RedirectBoundary, null, head, cache.subTreeData, /*#__PURE__*/ _react.default.createElement(_approuterannouncer.AppRouterAnnouncer, {
        tree: tree
    }));
    if (false) {}
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(HistoryUpdater, {
        tree: tree,
        pushRef: pushRef,
        canonicalUrl: canonicalUrl,
        sync: sync
    }), /*#__PURE__*/ _react.default.createElement(_hooksclientcontext.PathnameContext.Provider, {
        value: pathname
    }, /*#__PURE__*/ _react.default.createElement(_hooksclientcontext.SearchParamsContext.Provider, {
        value: searchParams
    }, /*#__PURE__*/ _react.default.createElement(_approutercontext.GlobalLayoutRouterContext.Provider, {
        value: {
            buildId,
            changeByServerResponse,
            tree,
            focusAndScrollRef,
            nextUrl
        }
    }, /*#__PURE__*/ _react.default.createElement(_approutercontext.AppRouterContext.Provider, {
        value: appRouter
    }, /*#__PURE__*/ _react.default.createElement(_approutercontext.LayoutRouterContext.Provider, {
        value: {
            childNodes: cache.parallelRoutes,
            tree: tree,
            // Root node always has `url`
            // Provided in AppTreeContext to ensure it can be overwritten in layout-router
            url: canonicalUrl
        }
    }, content))))));
}
function AppRouter(props) {
    const { globalErrorComponent, ...rest } = props;
    return /*#__PURE__*/ _react.default.createElement(_errorboundary.ErrorBoundary, {
        errorComponent: globalErrorComponent
    }, /*#__PURE__*/ _react.default.createElement(Router, rest));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=app-router.js.map


/***/ }),

/***/ 45661:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "bailoutToClientRendering", ({
    enumerable: true,
    get: function() {
        return bailoutToClientRendering;
    }
}));
const _dynamicnossr = __webpack_require__(89708);
const _staticgenerationasyncstorage = __webpack_require__(13539);
function bailoutToClientRendering() {
    const staticGenerationStore = _staticgenerationasyncstorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        (0, _dynamicnossr.suspense)();
    }
    return false;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=bailout-to-client-rendering.js.map


/***/ }),

/***/ 22633:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "clientHookInServerComponentError", ({
    enumerable: true,
    get: function() {
        return clientHookInServerComponentError;
    }
}));
const _interop_require_default = __webpack_require__(82147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(18038));
function clientHookInServerComponentError(hookName) {
    if (false) {}
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=client-hook-in-server-component-error.js.map


/***/ }),

/***/ 31232:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ErrorBoundaryHandler: function() {
        return ErrorBoundaryHandler;
    },
    GlobalError: function() {
        return GlobalError;
    },
    // Exported so that the import signature in the loaders can be identical to user
    // supplied custom global error signatures.
    default: function() {
        return _default;
    },
    ErrorBoundary: function() {
        return ErrorBoundary;
    }
});
const _interop_require_default = __webpack_require__(82147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(18038));
const _navigation = __webpack_require__(90696);
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "28px",
        margin: "0 8px"
    }
};
class ErrorBoundaryHandler extends _react.default.Component {
    static getDerivedStateFromError(error) {
        return {
            error
        };
    }
    static getDerivedStateFromProps(props, state) {
        /**
     * Handles reset of the error boundary when a navigation happens.
     * Ensures the error boundary does not stay enabled when navigating to a new page.
     * Approach of setState in render is safe as it checks the previous pathname and then overrides
     * it as outlined in https://react.dev/reference/react/useState#storing-information-from-previous-renders
     */ if (props.pathname !== state.previousPathname && state.error) {
            return {
                error: null,
                previousPathname: props.pathname
            };
        }
        return {
            error: state.error,
            previousPathname: props.pathname
        };
    }
    render() {
        if (this.state.error) {
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, this.props.errorStyles, /*#__PURE__*/ _react.default.createElement(this.props.errorComponent, {
                error: this.state.error,
                reset: this.reset
            }));
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.reset = ()=>{
            this.setState({
                error: null
            });
        };
        this.state = {
            error: null,
            previousPathname: this.props.pathname
        };
    }
}
function GlobalError(param) {
    let { error } = param;
    const digest = error == null ? void 0 : error.digest;
    return /*#__PURE__*/ _react.default.createElement("html", {
        id: "__next_error__"
    }, /*#__PURE__*/ _react.default.createElement("head", null), /*#__PURE__*/ _react.default.createElement("body", null, /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.error
    }, /*#__PURE__*/ _react.default.createElement("div", null, /*#__PURE__*/ _react.default.createElement("h2", {
        style: styles.text
    }, "Application error: a " + (digest ? "server" : "client") + "-side exception has occurred (see the " + (digest ? "server logs" : "browser console") + " for more information)."), digest ? /*#__PURE__*/ _react.default.createElement("p", {
        style: styles.text
    }, "Digest: " + digest) : null))));
}
const _default = GlobalError;
function ErrorBoundary(param) {
    let { errorComponent, errorStyles, children } = param;
    const pathname = (0, _navigation.usePathname)();
    if (errorComponent) {
        return /*#__PURE__*/ _react.default.createElement(ErrorBoundaryHandler, {
            pathname: pathname,
            errorComponent: errorComponent,
            errorStyles: errorStyles
        }, children);
    }
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 28047:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DYNAMIC_ERROR_CODE: function() {
        return DYNAMIC_ERROR_CODE;
    },
    DynamicServerError: function() {
        return DynamicServerError;
    }
});
const DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
class DynamicServerError extends Error {
    constructor(type){
        super("Dynamic server usage: " + type);
        this.digest = DYNAMIC_ERROR_CODE;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=hooks-server-context.js.map


/***/ }),

/***/ 96360:
/***/ ((module, exports) => {

"use strict";
/**
 * Used to cache in createInfinitePromise
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createInfinitePromise", ({
    enumerable: true,
    get: function() {
        return createInfinitePromise;
    }
}));
let infinitePromise;
function createInfinitePromise() {
    if (!infinitePromise) {
        // Only create the Promise once
        infinitePromise = new Promise(()=>{
        // This is used to debug when the rendering is never updated.
        // setTimeout(() => {
        //   infinitePromise = new Error('Infinite promise')
        //   resolve()
        // }, 5000)
        });
    }
    return infinitePromise;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=infinite-promise.js.map


/***/ }),

/***/ 50831:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return OuterLayoutRouter;
    }
}));
const _interop_require_default = __webpack_require__(82147);
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(18038));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__webpack_require__(98704));
const _approutercontext = __webpack_require__(57085);
const _fetchserverresponse = __webpack_require__(38080);
const _infinitepromise = __webpack_require__(96360);
const _errorboundary = __webpack_require__(31232);
const _matchsegments = __webpack_require__(17618);
const _handlesmoothscroll = __webpack_require__(17887);
const _redirectboundary = __webpack_require__(81442);
const _notfoundboundary = __webpack_require__(16505);
const _getsegmentvalue = __webpack_require__(97741);
const _createroutercachekey = __webpack_require__(88870);
/**
 * Add refetch marker to router state at the point of the current layout segment.
 * This ensures the response returned is not further down than the current layout segment.
 */ function walkAddRefetch(segmentPathToWalk, treeToRecreate) {
    if (segmentPathToWalk) {
        const [segment, parallelRouteKey] = segmentPathToWalk;
        const isLast = segmentPathToWalk.length === 2;
        if ((0, _matchsegments.matchSegment)(treeToRecreate[0], segment)) {
            if (treeToRecreate[1].hasOwnProperty(parallelRouteKey)) {
                if (isLast) {
                    const subTree = walkAddRefetch(undefined, treeToRecreate[1][parallelRouteKey]);
                    return [
                        treeToRecreate[0],
                        {
                            ...treeToRecreate[1],
                            [parallelRouteKey]: [
                                subTree[0],
                                subTree[1],
                                subTree[2],
                                "refetch"
                            ]
                        }
                    ];
                }
                return [
                    treeToRecreate[0],
                    {
                        ...treeToRecreate[1],
                        [parallelRouteKey]: walkAddRefetch(segmentPathToWalk.slice(2), treeToRecreate[1][parallelRouteKey])
                    }
                ];
            }
        }
    }
    return treeToRecreate;
}
// TODO-APP: Replace with new React API for finding dom nodes without a `ref` when available
/**
 * Wraps ReactDOM.findDOMNode with additional logic to hide React Strict Mode warning
 */ function findDOMNode(instance) {
    // Tree-shake for server bundle
    if (true) return null;
    // Only apply strict mode warning when not in production
    if (false) {}
    return _reactdom.default.findDOMNode(instance);
}
const rectProperties = [
    "bottom",
    "height",
    "left",
    "right",
    "top",
    "width",
    "x",
    "y"
];
/**
 * Check if a HTMLElement is hidden or fixed/sticky position
 */ function shouldSkipElement(element) {
    // we ignore fixed or sticky positioned elements since they'll likely pass the "in-viewport" check
    // and will result in a situation we bail on scroll because of something like a fixed nav,
    // even though the actual page content is offscreen
    if ([
        "sticky",
        "fixed"
    ].includes(getComputedStyle(element).position)) {
        if (false) {}
        return true;
    }
    // Uses `getBoundingClientRect` to check if the element is hidden instead of `offsetParent`
    // because `offsetParent` doesn't consider document/body
    const rect = element.getBoundingClientRect();
    return rectProperties.every((item)=>rect[item] === 0);
}
/**
 * Check if the top corner of the HTMLElement is in the viewport.
 */ function topOfElementInViewport(element, viewportHeight) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= viewportHeight;
}
/**
 * Find the DOM node for a hash fragment.
 * If `top` the page has to scroll to the top of the page. This mirrors the browser's behavior.
 * If the hash fragment is an id, the page has to scroll to the element with that id.
 * If the hash fragment is a name, the page has to scroll to the first element with that name.
 */ function getHashFragmentDomNode(hashFragment) {
    // If the hash fragment is `top` the page has to scroll to the top of the page.
    if (hashFragment === "top") {
        return document.body;
    }
    var _document_getElementById;
    // If the hash fragment is an id, the page has to scroll to the element with that id.
    return (_document_getElementById = document.getElementById(hashFragment)) != null ? _document_getElementById : document.getElementsByName(hashFragment)[0];
}
class InnerScrollAndFocusHandler extends _react.default.Component {
    componentDidMount() {
        this.handlePotentialScroll();
    }
    componentDidUpdate() {
        // Because this property is overwritten in handlePotentialScroll it's fine to always run it when true as it'll be set to false for subsequent renders.
        if (this.props.focusAndScrollRef.apply) {
            this.handlePotentialScroll();
        }
    }
    render() {
        return this.props.children;
    }
    constructor(...args){
        super(...args);
        this.handlePotentialScroll = ()=>{
            // Handle scroll and focus, it's only applied once in the first useEffect that triggers that changed.
            const { focusAndScrollRef, segmentPath } = this.props;
            if (focusAndScrollRef.apply) {
                // segmentPaths is an array of segment paths that should be scrolled to
                // if the current segment path is not in the array, the scroll is not applied
                // unless the array is empty, in which case the scroll is always applied
                if (focusAndScrollRef.segmentPaths.length !== 0 && !focusAndScrollRef.segmentPaths.some((scrollRefSegmentPath)=>segmentPath.every((segment, index)=>(0, _matchsegments.matchSegment)(segment, scrollRefSegmentPath[index])))) {
                    return;
                }
                let domNode = null;
                const hashFragment = focusAndScrollRef.hashFragment;
                if (hashFragment) {
                    domNode = getHashFragmentDomNode(hashFragment);
                }
                // `findDOMNode` is tricky because it returns just the first child if the component is a fragment.
                // This already caused a bug where the first child was a <link/> in head.
                if (!domNode) {
                    domNode = findDOMNode(this);
                }
                // If there is no DOM node this layout-router level is skipped. It'll be handled higher-up in the tree.
                if (!(domNode instanceof Element)) {
                    return;
                }
                // Verify if the element is a HTMLElement and if we want to consider it for scroll behavior.
                // If the element is skipped, try to select the next sibling and try again.
                while(!(domNode instanceof HTMLElement) || shouldSkipElement(domNode)){
                    // No siblings found that match the criteria are found, so handle scroll higher up in the tree instead.
                    if (domNode.nextElementSibling === null) {
                        return;
                    }
                    domNode = domNode.nextElementSibling;
                }
                // State is mutated to ensure that the focus and scroll is applied only once.
                focusAndScrollRef.apply = false;
                focusAndScrollRef.hashFragment = null;
                focusAndScrollRef.segmentPaths = [];
                (0, _handlesmoothscroll.handleSmoothScroll)(()=>{
                    // In case of hash scroll, we only need to scroll the element into view
                    if (hashFragment) {
                        domNode.scrollIntoView();
                        return;
                    }
                    // Store the current viewport height because reading `clientHeight` causes a reflow,
                    // and it won't change during this function.
                    const htmlElement = document.documentElement;
                    const viewportHeight = htmlElement.clientHeight;
                    // If the element's top edge is already in the viewport, exit early.
                    if (topOfElementInViewport(domNode, viewportHeight)) {
                        return;
                    }
                    // Otherwise, try scrolling go the top of the document to be backward compatible with pages
                    // scrollIntoView() called on `<html/>` element scrolls horizontally on chrome and firefox (that shouldn't happen)
                    // We could use it to scroll horizontally following RTL but that also seems to be broken - it will always scroll left
                    // scrollLeft = 0 also seems to ignore RTL and manually checking for RTL is too much hassle so we will scroll just vertically
                    htmlElement.scrollTop = 0;
                    // Scroll to domNode if domNode is not in viewport when scrolled to top of document
                    if (!topOfElementInViewport(domNode, viewportHeight)) {
                        domNode.scrollIntoView();
                    }
                }, {
                    // We will force layout by querying domNode position
                    dontForceLayout: true,
                    onlyHashChange: focusAndScrollRef.onlyHashChange
                });
                // Mutate after scrolling so that it can be read by `handleSmoothScroll`
                focusAndScrollRef.onlyHashChange = false;
                // Set focus on the element
                domNode.focus();
            }
        };
    }
}
function ScrollAndFocusHandler(param) {
    let { segmentPath, children } = param;
    const context = (0, _react.useContext)(_approutercontext.GlobalLayoutRouterContext);
    if (!context) {
        throw new Error("invariant global layout router not mounted");
    }
    return /*#__PURE__*/ _react.default.createElement(InnerScrollAndFocusHandler, {
        segmentPath: segmentPath,
        focusAndScrollRef: context.focusAndScrollRef
    }, children);
}
/**
 * InnerLayoutRouter handles rendering the provided segment based on the cache.
 */ function InnerLayoutRouter(param) {
    let { parallelRouterKey, url, childNodes, childProp, segmentPath, tree, // isActive,
    cacheKey } = param;
    const context = (0, _react.useContext)(_approutercontext.GlobalLayoutRouterContext);
    if (!context) {
        throw new Error("invariant global layout router not mounted");
    }
    const { buildId, changeByServerResponse, tree: fullTree } = context;
    // Read segment path from the parallel router cache node.
    let childNode = childNodes.get(cacheKey);
    // If childProp is available this means it's the Flight / SSR case.
    if (childProp && // TODO-APP: verify if this can be null based on user code
    childProp.current !== null) {
        if (!childNode) {
            // Add the segment's subTreeData to the cache.
            // This writes to the cache when there is no item in the cache yet. It never *overwrites* existing cache items which is why it's safe in concurrent mode.
            childNode = {
                status: _approutercontext.CacheStates.READY,
                data: null,
                subTreeData: childProp.current,
                parallelRoutes: new Map()
            };
            childNodes.set(cacheKey, childNode);
        } else {
            if (childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED) {
                // @ts-expect-error we're changing it's type!
                childNode.status = _approutercontext.CacheStates.READY;
                // @ts-expect-error
                childNode.subTreeData = childProp.current;
            }
        }
    }
    // When childNode is not available during rendering client-side we need to fetch it from the server.
    if (!childNode || childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED) {
        /**
     * Router state with refetch marker added
     */ // TODO-APP: remove ''
        const refetchTree = walkAddRefetch([
            "",
            ...segmentPath
        ], fullTree);
        childNode = {
            status: _approutercontext.CacheStates.DATA_FETCH,
            data: (0, _fetchserverresponse.fetchServerResponse)(new URL(url, location.origin), refetchTree, context.nextUrl, buildId),
            subTreeData: null,
            head: childNode && childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED ? childNode.head : undefined,
            parallelRoutes: childNode && childNode.status === _approutercontext.CacheStates.LAZY_INITIALIZED ? childNode.parallelRoutes : new Map()
        };
        /**
     * Flight data fetch kicked off during render and put into the cache.
     */ childNodes.set(cacheKey, childNode);
    }
    // This case should never happen so it throws an error. It indicates there's a bug in the Next.js.
    if (!childNode) {
        throw new Error("Child node should always exist");
    }
    // This case should never happen so it throws an error. It indicates there's a bug in the Next.js.
    if (childNode.subTreeData && childNode.data) {
        throw new Error("Child node should not have both subTreeData and data");
    }
    // If cache node has a data request we have to unwrap response by `use` and update the cache.
    if (childNode.data) {
        /**
     * Flight response data
     */ // When the data has not resolved yet `use` will suspend here.
        const [flightData, overrideCanonicalUrl] = (0, _react.use)(childNode.data);
        // segmentPath from the server does not match the layout's segmentPath
        childNode.data = null;
        // setTimeout is used to start a new transition during render, this is an intentional hack around React.
        setTimeout(()=>{
            (0, _react.startTransition)(()=>{
                changeByServerResponse(fullTree, flightData, overrideCanonicalUrl);
            });
        });
        // Suspend infinitely as `changeByServerResponse` will cause a different part of the tree to be rendered.
        (0, _react.use)((0, _infinitepromise.createInfinitePromise)());
    }
    // If cache node has no subTreeData and no data request we have to infinitely suspend as the data will likely flow in from another place.
    // TODO-APP: double check users can't return null in a component that will kick in here.
    if (!childNode.subTreeData) {
        (0, _react.use)((0, _infinitepromise.createInfinitePromise)());
    }
    const subtree = /*#__PURE__*/ _react.default.createElement(_approutercontext.LayoutRouterContext.Provider, {
        value: {
            tree: tree[1][parallelRouterKey],
            childNodes: childNode.parallelRoutes,
            // TODO-APP: overriding of url for parallel routes
            url: url
        }
    }, childNode.subTreeData);
    // Ensure root layout is not wrapped in a div as the root layout renders `<html>`
    return subtree;
}
/**
 * Renders suspense boundary with the provided "loading" property as the fallback.
 * If no loading property is provided it renders the children without a suspense boundary.
 */ function LoadingBoundary(param) {
    let { children, loading, loadingStyles, hasLoading } = param;
    if (hasLoading) {
        return /*#__PURE__*/ _react.default.createElement(_react.Suspense, {
            fallback: /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, loadingStyles, loading)
        }, children);
    }
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
function OuterLayoutRouter(param) {
    let { parallelRouterKey, segmentPath, childProp, error, errorStyles, templateStyles, loading, loadingStyles, hasLoading, template, notFound, notFoundStyles, styles } = param;
    const context = (0, _react.useContext)(_approutercontext.LayoutRouterContext);
    if (!context) {
        throw new Error("invariant expected layout router to be mounted");
    }
    const { childNodes, tree, url } = context;
    // Get the current parallelRouter cache node
    let childNodesForParallelRouter = childNodes.get(parallelRouterKey);
    // If the parallel router cache node does not exist yet, create it.
    // This writes to the cache when there is no item in the cache yet. It never *overwrites* existing cache items which is why it's safe in concurrent mode.
    if (!childNodesForParallelRouter) {
        childNodesForParallelRouter = new Map();
        childNodes.set(parallelRouterKey, childNodesForParallelRouter);
    }
    // Get the active segment in the tree
    // The reason arrays are used in the data format is that these are transferred from the server to the browser so it's optimized to save bytes.
    const treeSegment = tree[1][parallelRouterKey][0];
    const childPropSegment = childProp.segment;
    // If segment is an array it's a dynamic route and we want to read the dynamic route value as the segment to get from the cache.
    const currentChildSegmentValue = (0, _getsegmentvalue.getSegmentValue)(treeSegment);
    /**
   * Decides which segments to keep rendering, all segments that are not active will be wrapped in `<Offscreen>`.
   */ // TODO-APP: Add handling of `<Offscreen>` when it's available.
    const preservedSegments = [
        treeSegment
    ];
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, styles, preservedSegments.map((preservedSegment)=>{
        const isChildPropSegment = (0, _matchsegments.matchSegment)(preservedSegment, childPropSegment);
        const preservedSegmentValue = (0, _getsegmentvalue.getSegmentValue)(preservedSegment);
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(preservedSegment);
        return(/*
            - Error boundary
              - Only renders error boundary if error component is provided.
              - Rendered for each segment to ensure they have their own error state.
            - Loading boundary
              - Only renders suspense boundary if loading components is provided.
              - Rendered for each segment to ensure they have their own loading state.
              - Passed to the router during rendering to ensure it can be immediately rendered when suspending on a Flight fetch.
          */ /*#__PURE__*/ _react.default.createElement(_approutercontext.TemplateContext.Provider, {
            key: (0, _createroutercachekey.createRouterCacheKey)(preservedSegment, true),
            value: /*#__PURE__*/ _react.default.createElement(ScrollAndFocusHandler, {
                segmentPath: segmentPath
            }, /*#__PURE__*/ _react.default.createElement(_errorboundary.ErrorBoundary, {
                errorComponent: error,
                errorStyles: errorStyles
            }, /*#__PURE__*/ _react.default.createElement(LoadingBoundary, {
                hasLoading: hasLoading,
                loading: loading,
                loadingStyles: loadingStyles
            }, /*#__PURE__*/ _react.default.createElement(_notfoundboundary.NotFoundBoundary, {
                notFound: notFound,
                notFoundStyles: notFoundStyles
            }, /*#__PURE__*/ _react.default.createElement(_redirectboundary.RedirectBoundary, null, /*#__PURE__*/ _react.default.createElement(InnerLayoutRouter, {
                parallelRouterKey: parallelRouterKey,
                url: url,
                tree: tree,
                childNodes: childNodesForParallelRouter,
                childProp: isChildPropSegment ? childProp : null,
                segmentPath: segmentPath,
                cacheKey: cacheKey,
                isActive: currentChildSegmentValue === preservedSegmentValue
            }))))))
        }, templateStyles, template));
    }));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=layout-router.js.map


/***/ }),

/***/ 17618:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    matchSegment: function() {
        return matchSegment;
    },
    canSegmentBeOverridden: function() {
        return canSegmentBeOverridden;
    }
});
const _getsegmentparam = __webpack_require__(41844);
const matchSegment = (existingSegment, segment)=>{
    // segment is either Array or string
    if (typeof existingSegment === "string") {
        if (typeof segment === "string") {
            // Common case: segment is just a string
            return existingSegment === segment;
        }
        return false;
    }
    if (typeof segment === "string") {
        return false;
    }
    return existingSegment[0] === segment[0] && existingSegment[1] === segment[1];
};
const canSegmentBeOverridden = (existingSegment, segment)=>{
    var _getSegmentParam;
    if (Array.isArray(existingSegment) || !Array.isArray(segment)) {
        return false;
    }
    return ((_getSegmentParam = (0, _getsegmentparam.getSegmentParam)(existingSegment)) == null ? void 0 : _getSegmentParam.param) === segment[0];
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=match-segments.js.map


/***/ }),

/***/ 90696:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
// useLayoutSegments() // Only the segments for the current place. ['children', 'dashboard', 'children', 'integrations'] -> /dashboard/integrations (/dashboard/layout.js would get ['children', 'dashboard', 'children', 'integrations'])

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ReadonlyURLSearchParams: function() {
        return ReadonlyURLSearchParams;
    },
    useSearchParams: function() {
        return useSearchParams;
    },
    usePathname: function() {
        return usePathname;
    },
    ServerInsertedHTMLContext: function() {
        return _serverinsertedhtml.ServerInsertedHTMLContext;
    },
    useServerInsertedHTML: function() {
        return _serverinsertedhtml.useServerInsertedHTML;
    },
    useRouter: function() {
        return useRouter;
    },
    useParams: function() {
        return useParams;
    },
    useSelectedLayoutSegments: function() {
        return useSelectedLayoutSegments;
    },
    useSelectedLayoutSegment: function() {
        return useSelectedLayoutSegment;
    },
    redirect: function() {
        return _redirect.redirect;
    },
    notFound: function() {
        return _notfound.notFound;
    }
});
const _react = __webpack_require__(18038);
const _approutercontext = __webpack_require__(57085);
const _hooksclientcontext = __webpack_require__(39569);
const _clienthookinservercomponenterror = __webpack_require__(22633);
const _getsegmentvalue = __webpack_require__(97741);
const _serverinsertedhtml = __webpack_require__(79618);
const _redirect = __webpack_require__(82622);
const _notfound = __webpack_require__(5858);
const INTERNAL_URLSEARCHPARAMS_INSTANCE = Symbol("internal for urlsearchparams readonly");
function readonlyURLSearchParamsError() {
    return new Error("ReadonlyURLSearchParams cannot be modified");
}
class ReadonlyURLSearchParams {
    [Symbol.iterator]() {
        return this[INTERNAL_URLSEARCHPARAMS_INSTANCE][Symbol.iterator]();
    }
    append() {
        throw readonlyURLSearchParamsError();
    }
    delete() {
        throw readonlyURLSearchParamsError();
    }
    set() {
        throw readonlyURLSearchParamsError();
    }
    sort() {
        throw readonlyURLSearchParamsError();
    }
    constructor(urlSearchParams){
        this[INTERNAL_URLSEARCHPARAMS_INSTANCE] = urlSearchParams;
        this.entries = urlSearchParams.entries.bind(urlSearchParams);
        this.forEach = urlSearchParams.forEach.bind(urlSearchParams);
        this.get = urlSearchParams.get.bind(urlSearchParams);
        this.getAll = urlSearchParams.getAll.bind(urlSearchParams);
        this.has = urlSearchParams.has.bind(urlSearchParams);
        this.keys = urlSearchParams.keys.bind(urlSearchParams);
        this.values = urlSearchParams.values.bind(urlSearchParams);
        this.toString = urlSearchParams.toString.bind(urlSearchParams);
        this.size = urlSearchParams.size;
    }
}
function useSearchParams() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSearchParams");
    const searchParams = (0, _react.useContext)(_hooksclientcontext.SearchParamsContext);
    // In the case where this is `null`, the compat types added in
    // `next-env.d.ts` will add a new overload that changes the return type to
    // include `null`.
    const readonlySearchParams = (0, _react.useMemo)(()=>{
        if (!searchParams) {
            // When the router is not ready in pages, we won't have the search params
            // available.
            return null;
        }
        return new ReadonlyURLSearchParams(searchParams);
    }, [
        searchParams
    ]);
    if (true) {
        // AsyncLocalStorage should not be included in the client bundle.
        const { bailoutToClientRendering } = __webpack_require__(45661);
        if (bailoutToClientRendering()) {
            // TODO-APP: handle dynamic = 'force-static' here and on the client
            return readonlySearchParams;
        }
    }
    return readonlySearchParams;
}
function usePathname() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("usePathname");
    // In the case where this is `null`, the compat types added in `next-env.d.ts`
    // will add a new overload that changes the return type to include `null`.
    return (0, _react.useContext)(_hooksclientcontext.PathnameContext);
}
function useRouter() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useRouter");
    const router = (0, _react.useContext)(_approutercontext.AppRouterContext);
    if (router === null) {
        throw new Error("invariant expected app router to be mounted");
    }
    return router;
}
// this function performs a depth-first search of the tree to find the selected
// params
function getSelectedParams(tree, params) {
    if (params === void 0) params = {};
    const parallelRoutes = tree[1];
    for (const parallelRoute of Object.values(parallelRoutes)){
        const segment = parallelRoute[0];
        const isDynamicParameter = Array.isArray(segment);
        const segmentValue = isDynamicParameter ? segment[1] : segment;
        if (!segmentValue || segmentValue.startsWith("__PAGE__")) continue;
        // Ensure catchAll and optional catchall are turned into an array
        const isCatchAll = isDynamicParameter && (segment[2] === "c" || segment[2] === "oc");
        if (isCatchAll) {
            params[segment[0]] = segment[1].split("/");
        } else if (isDynamicParameter) {
            params[segment[0]] = segment[1];
        }
        params = getSelectedParams(parallelRoute, params);
    }
    return params;
}
function useParams() {
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useParams");
    const globalLayoutRouterContext = (0, _react.useContext)(_approutercontext.GlobalLayoutRouterContext);
    if (!globalLayoutRouterContext) {
        // This only happens in `pages`. Type is overwritten in navigation.d.ts
        return null;
    }
    return getSelectedParams(globalLayoutRouterContext.tree);
}
// TODO-APP: handle parallel routes
/**
 * Get the canonical parameters from the current level to the leaf node.
 */ function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first, segmentPath) {
    if (first === void 0) first = true;
    if (segmentPath === void 0) segmentPath = [];
    let node;
    if (first) {
        // Use the provided parallel route key on the first parallel route
        node = tree[1][parallelRouteKey];
    } else {
        // After first parallel route prefer children, if there's no children pick the first parallel route.
        const parallelRoutes = tree[1];
        var _parallelRoutes_children;
        node = (_parallelRoutes_children = parallelRoutes.children) != null ? _parallelRoutes_children : Object.values(parallelRoutes)[0];
    }
    if (!node) return segmentPath;
    const segment = node[0];
    const segmentValue = (0, _getsegmentvalue.getSegmentValue)(segment);
    if (!segmentValue || segmentValue.startsWith("__PAGE__")) return segmentPath;
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
}
function useSelectedLayoutSegments(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSelectedLayoutSegments");
    const { tree } = (0, _react.useContext)(_approutercontext.LayoutRouterContext);
    return getSelectedLayoutSegmentPath(tree, parallelRouteKey);
}
function useSelectedLayoutSegment(parallelRouteKey) {
    if (parallelRouteKey === void 0) parallelRouteKey = "children";
    (0, _clienthookinservercomponenterror.clientHookInServerComponentError)("useSelectedLayoutSegment");
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (selectedLayoutSegments.length === 0) {
        return null;
    }
    return selectedLayoutSegments[0];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigation.js.map


/***/ }),

/***/ 16505:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "NotFoundBoundary", ({
    enumerable: true,
    get: function() {
        return NotFoundBoundary;
    }
}));
const _interop_require_default = __webpack_require__(82147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(18038));
const _navigation = __webpack_require__(90696);
class NotFoundErrorBoundary extends _react.default.Component {
    static getDerivedStateFromError(error) {
        if ((error == null ? void 0 : error.digest) === "NEXT_NOT_FOUND") {
            return {
                notFoundTriggered: true
            };
        }
        // Re-throw if error is not for 404
        throw error;
    }
    static getDerivedStateFromProps(props, state) {
        /**
     * Handles reset of the error boundary when a navigation happens.
     * Ensures the error boundary does not stay enabled when navigating to a new page.
     * Approach of setState in render is safe as it checks the previous pathname and then overrides
     * it as outlined in https://react.dev/reference/react/useState#storing-information-from-previous-renders
     */ if (props.pathname !== state.previousPathname && state.notFoundTriggered) {
            return {
                notFoundTriggered: false,
                previousPathname: props.pathname
            };
        }
        return {
            notFoundTriggered: state.notFoundTriggered,
            previousPathname: props.pathname
        };
    }
    render() {
        if (this.state.notFoundTriggered) {
            return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("meta", {
                name: "robots",
                content: "noindex"
            }),  false && /*#__PURE__*/ 0, this.props.notFoundStyles, this.props.notFound);
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            notFoundTriggered: !!props.asNotFound,
            previousPathname: props.pathname
        };
    }
}
function NotFoundBoundary(param) {
    let { notFound, notFoundStyles, asNotFound, children } = param;
    const pathname = (0, _navigation.usePathname)();
    return notFound ? /*#__PURE__*/ _react.default.createElement(NotFoundErrorBoundary, {
        pathname: pathname,
        notFound: notFound,
        notFoundStyles: notFoundStyles,
        asNotFound: asNotFound
    }, children) : /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found-boundary.js.map


/***/ }),

/***/ 5858:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    notFound: function() {
        return notFound;
    },
    isNotFoundError: function() {
        return isNotFoundError;
    }
});
const NOT_FOUND_ERROR_CODE = "NEXT_NOT_FOUND";
function notFound() {
    // eslint-disable-next-line no-throw-literal
    const error = new Error(NOT_FOUND_ERROR_CODE);
    error.digest = NOT_FOUND_ERROR_CODE;
    throw error;
}
function isNotFoundError(error) {
    return (error == null ? void 0 : error.digest) === NOT_FOUND_ERROR_CODE;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found.js.map


/***/ }),

/***/ 18811:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/*
    This is a simple promise queue that allows you to limit the number of concurrent promises
    that are running at any given time. It's used to limit the number of concurrent
    prefetch requests that are being made to the server but could be used for other
    things as well.
*/ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "PromiseQueue", ({
    enumerable: true,
    get: function() {
        return PromiseQueue;
    }
}));
const _class_private_field_loose_base = __webpack_require__(88324);
const _class_private_field_loose_key = __webpack_require__(94567);
var _maxConcurrency = /*#__PURE__*/ _class_private_field_loose_key._("_maxConcurrency"), _runningCount = /*#__PURE__*/ _class_private_field_loose_key._("_runningCount"), _queue = /*#__PURE__*/ _class_private_field_loose_key._("_queue"), _processNext = /*#__PURE__*/ _class_private_field_loose_key._("_processNext");
class PromiseQueue {
    enqueue(promiseFn) {
        let taskResolve;
        let taskReject;
        const taskPromise = new Promise((resolve, reject)=>{
            taskResolve = resolve;
            taskReject = reject;
        });
        const task = async ()=>{
            try {
                _class_private_field_loose_base._(this, _runningCount)[_runningCount]++;
                const result = await promiseFn();
                taskResolve(result);
            } catch (error) {
                taskReject(error);
            } finally{
                _class_private_field_loose_base._(this, _runningCount)[_runningCount]--;
                _class_private_field_loose_base._(this, _processNext)[_processNext]();
            }
        };
        const enqueueResult = {
            promiseFn: taskPromise,
            task
        };
        // wonder if we should take a LIFO approach here
        _class_private_field_loose_base._(this, _queue)[_queue].push(enqueueResult);
        _class_private_field_loose_base._(this, _processNext)[_processNext]();
        return taskPromise;
    }
    bump(promiseFn) {
        const index = _class_private_field_loose_base._(this, _queue)[_queue].findIndex((item)=>item.promiseFn === promiseFn);
        if (index > -1) {
            const bumpedItem = _class_private_field_loose_base._(this, _queue)[_queue].splice(index, 1)[0];
            _class_private_field_loose_base._(this, _queue)[_queue].unshift(bumpedItem);
            _class_private_field_loose_base._(this, _processNext)[_processNext](true);
        }
    }
    constructor(maxConcurrency = 5){
        Object.defineProperty(this, _processNext, {
            value: processNext
        });
        Object.defineProperty(this, _maxConcurrency, {
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, _runningCount, {
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, _queue, {
            writable: true,
            value: void 0
        });
        _class_private_field_loose_base._(this, _maxConcurrency)[_maxConcurrency] = maxConcurrency;
        _class_private_field_loose_base._(this, _runningCount)[_runningCount] = 0;
        _class_private_field_loose_base._(this, _queue)[_queue] = [];
    }
}
function processNext(forced) {
    if (forced === void 0) forced = false;
    if ((_class_private_field_loose_base._(this, _runningCount)[_runningCount] < _class_private_field_loose_base._(this, _maxConcurrency)[_maxConcurrency] || forced) && _class_private_field_loose_base._(this, _queue)[_queue].length > 0) {
        var _class_private_field_loose_base__queue_shift;
        (_class_private_field_loose_base__queue_shift = _class_private_field_loose_base._(this, _queue)[_queue].shift()) == null ? void 0 : _class_private_field_loose_base__queue_shift.task();
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=promise-queue.js.map


/***/ }),

/***/ 81442:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RedirectErrorBoundary: function() {
        return RedirectErrorBoundary;
    },
    RedirectBoundary: function() {
        return RedirectBoundary;
    }
});
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(18038));
const _navigation = __webpack_require__(90696);
const _redirect = __webpack_require__(82622);
function HandleRedirect(param) {
    let { redirect, reset, redirectType } = param;
    const router = (0, _navigation.useRouter)();
    (0, _react.useEffect)(()=>{
        // @ts-ignore startTransition exists
        _react.default.startTransition(()=>{
            if (redirectType === _redirect.RedirectType.push) {
                router.push(redirect, {});
            } else {
                router.replace(redirect, {});
            }
            reset();
        });
    }, [
        redirect,
        redirectType,
        reset,
        router
    ]);
    return null;
}
class RedirectErrorBoundary extends _react.default.Component {
    static getDerivedStateFromError(error) {
        if ((0, _redirect.isRedirectError)(error)) {
            const url = (0, _redirect.getURLFromRedirectError)(error);
            const redirectType = (0, _redirect.getRedirectTypeFromError)(error);
            return {
                redirect: url,
                redirectType
            };
        }
        // Re-throw if error is not for redirect
        throw error;
    }
    render() {
        const { redirect, redirectType } = this.state;
        if (redirect !== null && redirectType !== null) {
            return /*#__PURE__*/ _react.default.createElement(HandleRedirect, {
                redirect: redirect,
                redirectType: redirectType,
                reset: ()=>this.setState({
                        redirect: null
                    })
            });
        }
        return this.props.children;
    }
    constructor(props){
        super(props);
        this.state = {
            redirect: null,
            redirectType: null
        };
    }
}
function RedirectBoundary(param) {
    let { children } = param;
    const router = (0, _navigation.useRouter)();
    return /*#__PURE__*/ _react.default.createElement(RedirectErrorBoundary, {
        router: router
    }, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect-boundary.js.map


/***/ }),

/***/ 82622:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    RedirectType: function() {
        return RedirectType;
    },
    getRedirectError: function() {
        return getRedirectError;
    },
    redirect: function() {
        return redirect;
    },
    isRedirectError: function() {
        return isRedirectError;
    },
    getURLFromRedirectError: function() {
        return getURLFromRedirectError;
    },
    getRedirectTypeFromError: function() {
        return getRedirectTypeFromError;
    }
});
const _requestasyncstorage = __webpack_require__(1715);
const REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
var RedirectType;
(function(RedirectType) {
    RedirectType["push"] = "push";
    RedirectType["replace"] = "replace";
})(RedirectType || (RedirectType = {}));
function getRedirectError(url, type) {
    const error = new Error(REDIRECT_ERROR_CODE);
    error.digest = REDIRECT_ERROR_CODE + ";" + type + ";" + url;
    const requestStore = _requestasyncstorage.requestAsyncStorage.getStore();
    if (requestStore) {
        error.mutableCookies = requestStore.mutableCookies;
    }
    return error;
}
function redirect(url, type) {
    if (type === void 0) type = "replace";
    throw getRedirectError(url, type);
}
function isRedirectError(error) {
    if (typeof (error == null ? void 0 : error.digest) !== "string") return false;
    const [errorCode, type, destination] = error.digest.split(";", 3);
    return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string";
}
function getURLFromRedirectError(error) {
    if (!isRedirectError(error)) return null;
    // Slices off the beginning of the digest that contains the code and the
    // separating ';'.
    return error.digest.split(";", 3)[2];
}
function getRedirectTypeFromError(error) {
    if (!isRedirectError(error)) {
        throw new Error("Not a redirect error");
    }
    return error.digest.split(";", 3)[1];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=redirect.js.map


/***/ }),

/***/ 56926:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return RenderFromTemplateContext;
    }
}));
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(18038));
const _approutercontext = __webpack_require__(57085);
function RenderFromTemplateContext() {
    const children = (0, _react.useContext)(_approutercontext.TemplateContext);
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, children);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=render-from-template-context.js.map


/***/ }),

/***/ 94173:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "applyFlightData", ({
    enumerable: true,
    get: function() {
        return applyFlightData;
    }
}));
const _approutercontext = __webpack_require__(57085);
const _filllazyitemstillleafwithhead = __webpack_require__(32684);
const _fillcachewithnewsubtreedata = __webpack_require__(38921);
function applyFlightData(existingCache, cache, flightDataPath, wasPrefetched) {
    if (wasPrefetched === void 0) wasPrefetched = false;
    // The one before last item is the router state tree patch
    const [treePatch, subTreeData, head] = flightDataPath.slice(-3);
    // Handles case where prefetch only returns the router tree patch without rendered components.
    if (subTreeData === null) {
        return false;
    }
    if (flightDataPath.length === 3) {
        cache.status = _approutercontext.CacheStates.READY;
        cache.subTreeData = subTreeData;
        (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, existingCache, treePatch, head, wasPrefetched);
    } else {
        // Copy subTreeData for the root node of the cache.
        cache.status = _approutercontext.CacheStates.READY;
        cache.subTreeData = existingCache.subTreeData;
        cache.parallelRoutes = new Map(existingCache.parallelRoutes);
        // Create a copy of the existing cache with the subTreeData applied.
        (0, _fillcachewithnewsubtreedata.fillCacheWithNewSubTreeData)(cache, existingCache, flightDataPath, wasPrefetched);
    }
    return true;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=apply-flight-data.js.map


/***/ }),

/***/ 63914:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "applyRouterStatePatchToTree", ({
    enumerable: true,
    get: function() {
        return applyRouterStatePatchToTree;
    }
}));
const _matchsegments = __webpack_require__(17618);
/**
 * Deep merge of the two router states. Parallel route keys are preserved if the patch doesn't have them.
 */ function applyPatch(initialTree, patchTree) {
    const [initialSegment, initialParallelRoutes] = initialTree;
    const [patchSegment, patchParallelRoutes] = patchTree;
    // if the applied patch segment is __DEFAULT__ then we can ignore it and return the initial tree
    // this is because the __DEFAULT__ segment is used as a placeholder on navigation
    if (patchSegment === "__DEFAULT__" && initialSegment !== "__DEFAULT__") {
        return initialTree;
    }
    if ((0, _matchsegments.matchSegment)(initialSegment, patchSegment)) {
        const newParallelRoutes = {};
        for(const key in initialParallelRoutes){
            const isInPatchTreeParallelRoutes = typeof patchParallelRoutes[key] !== "undefined";
            if (isInPatchTreeParallelRoutes) {
                newParallelRoutes[key] = applyPatch(initialParallelRoutes[key], patchParallelRoutes[key]);
            } else {
                newParallelRoutes[key] = initialParallelRoutes[key];
            }
        }
        for(const key in patchParallelRoutes){
            if (newParallelRoutes[key]) {
                continue;
            }
            newParallelRoutes[key] = patchParallelRoutes[key];
        }
        const tree = [
            initialSegment,
            newParallelRoutes
        ];
        if (initialTree[2]) {
            tree[2] = initialTree[2];
        }
        if (initialTree[3]) {
            tree[3] = initialTree[3];
        }
        if (initialTree[4]) {
            tree[4] = initialTree[4];
        }
        return tree;
    }
    return patchTree;
}
function applyRouterStatePatchToTree(flightSegmentPath, flightRouterState, treePatch) {
    const [segment, parallelRoutes, , , isRootLayout] = flightRouterState;
    // Root refresh
    if (flightSegmentPath.length === 1) {
        const tree = applyPatch(flightRouterState, treePatch);
        return tree;
    }
    const [currentSegment, parallelRouteKey] = flightSegmentPath;
    // Tree path returned from the server should always match up with the current tree in the browser
    if (!(0, _matchsegments.matchSegment)(currentSegment, segment)) {
        return null;
    }
    const lastSegment = flightSegmentPath.length === 2;
    let parallelRoutePatch;
    if (lastSegment) {
        parallelRoutePatch = applyPatch(parallelRoutes[parallelRouteKey], treePatch);
    } else {
        parallelRoutePatch = applyRouterStatePatchToTree(flightSegmentPath.slice(2), parallelRoutes[parallelRouteKey], treePatch);
        if (parallelRoutePatch === null) {
            return null;
        }
    }
    const tree = [
        flightSegmentPath[0],
        {
            ...parallelRoutes,
            [parallelRouteKey]: parallelRoutePatch
        }
    ];
    // Current segment is the root layout
    if (isRootLayout) {
        tree[4] = true;
    }
    return tree;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=apply-router-state-patch-to-tree.js.map


/***/ }),

/***/ 89089:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    extractPathFromFlightRouterState: function() {
        return extractPathFromFlightRouterState;
    },
    computeChangedPath: function() {
        return computeChangedPath;
    }
});
const _interceptionroutes = __webpack_require__(96624);
const _matchsegments = __webpack_require__(17618);
const segmentToPathname = (segment)=>{
    if (typeof segment === "string") {
        return segment;
    }
    return segment[1];
};
function normalizePathname(pathname) {
    return pathname.split("/").reduce((acc, segment)=>{
        if (segment === "" || segment.startsWith("(") && segment.endsWith(")")) {
            return acc;
        }
        return acc + "/" + segment;
    }, "") || "/";
}
function extractPathFromFlightRouterState(flightRouterState) {
    const segment = Array.isArray(flightRouterState[0]) ? flightRouterState[0][1] : flightRouterState[0];
    if (segment === "__DEFAULT__" || _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m))) return undefined;
    if (segment.startsWith("__PAGE__")) return "";
    const path = [
        segment
    ];
    var _flightRouterState_;
    const parallelRoutes = (_flightRouterState_ = flightRouterState[1]) != null ? _flightRouterState_ : {};
    const childrenPath = parallelRoutes.children ? extractPathFromFlightRouterState(parallelRoutes.children) : undefined;
    if (childrenPath !== undefined) {
        path.push(childrenPath);
    } else {
        for (const [key, value] of Object.entries(parallelRoutes)){
            if (key === "children") continue;
            const childPath = extractPathFromFlightRouterState(value);
            if (childPath !== undefined) {
                path.push(childPath);
            }
        }
    }
    // TODO-APP: optimise this, it's not ideal to join and split
    return normalizePathname(path.join("/"));
}
function computeChangedPathImpl(treeA, treeB) {
    const [segmentA, parallelRoutesA] = treeA;
    const [segmentB, parallelRoutesB] = treeB;
    const normalizedSegmentA = segmentToPathname(segmentA);
    const normalizedSegmentB = segmentToPathname(segmentB);
    if (_interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>normalizedSegmentA.startsWith(m) || normalizedSegmentB.startsWith(m))) {
        return "";
    }
    if (!(0, _matchsegments.matchSegment)(segmentA, segmentB)) {
        var _extractPathFromFlightRouterState;
        // once we find where the tree changed, we compute the rest of the path by traversing the tree
        return (_extractPathFromFlightRouterState = extractPathFromFlightRouterState(treeB)) != null ? _extractPathFromFlightRouterState : "";
    }
    for(const parallelRouterKey in parallelRoutesA){
        if (parallelRoutesB[parallelRouterKey]) {
            const changedPath = computeChangedPathImpl(parallelRoutesA[parallelRouterKey], parallelRoutesB[parallelRouterKey]);
            if (changedPath !== null) {
                return segmentToPathname(segmentB) + "/" + changedPath;
            }
        }
    }
    return null;
}
function computeChangedPath(treeA, treeB) {
    const changedPath = computeChangedPathImpl(treeA, treeB);
    if (changedPath == null || changedPath === "/") {
        return changedPath;
    }
    // lightweight normalization to remove route groups
    return normalizePathname(changedPath);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=compute-changed-path.js.map


/***/ }),

/***/ 34331:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createHrefFromUrl", ({
    enumerable: true,
    get: function() {
        return createHrefFromUrl;
    }
}));
function createHrefFromUrl(url, includeHash) {
    if (includeHash === void 0) includeHash = true;
    return url.pathname + url.search + (includeHash ? url.hash : "");
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-href-from-url.js.map


/***/ }),

/***/ 61684:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createInitialRouterState", ({
    enumerable: true,
    get: function() {
        return createInitialRouterState;
    }
}));
const _approutercontext = __webpack_require__(57085);
const _createhreffromurl = __webpack_require__(34331);
const _filllazyitemstillleafwithhead = __webpack_require__(32684);
const _computechangedpath = __webpack_require__(89089);
function createInitialRouterState(param) {
    let { buildId, initialTree, children, initialCanonicalUrl, initialParallelRoutes, isServer, location, initialHead } = param;
    const cache = {
        status: _approutercontext.CacheStates.READY,
        data: null,
        subTreeData: children,
        // The cache gets seeded during the first render. `initialParallelRoutes` ensures the cache from the first render is there during the second render.
        parallelRoutes: isServer ? new Map() : initialParallelRoutes
    };
    // When the cache hasn't been seeded yet we fill the cache with the head.
    if (initialParallelRoutes === null || initialParallelRoutes.size === 0) {
        (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, undefined, initialTree, initialHead);
    }
    var _ref;
    return {
        buildId,
        tree: initialTree,
        cache,
        prefetchCache: new Map(),
        pushRef: {
            pendingPush: false,
            mpaNavigation: false
        },
        focusAndScrollRef: {
            apply: false,
            onlyHashChange: false,
            hashFragment: null,
            segmentPaths: []
        },
        canonicalUrl: // This is safe to do as canonicalUrl can't be rendered, it's only used to control the history updates in the useEffect further down in this file.
        location ? (0, _createhreffromurl.createHrefFromUrl)(location) : initialCanonicalUrl,
        nextUrl: (_ref = (0, _computechangedpath.extractPathFromFlightRouterState)(initialTree) || (location == null ? void 0 : location.pathname)) != null ? _ref : null
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-initial-router-state.js.map


/***/ }),

/***/ 28503:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createOptimisticTree", ({
    enumerable: true,
    get: function() {
        return createOptimisticTree;
    }
}));
const _matchsegments = __webpack_require__(17618);
function createOptimisticTree(segments, flightRouterState, parentRefetch) {
    const [existingSegment, existingParallelRoutes, url, refresh, isRootLayout] = flightRouterState || [
        null,
        {}
    ];
    const segment = segments[0];
    const isLastSegment = segments.length === 1;
    const segmentMatches = existingSegment !== null && (0, _matchsegments.matchSegment)(existingSegment, segment);
    // if there are multiple parallel routes at this level, we need to refetch here
    // to ensure we get the correct tree. This is because we don't know which
    // parallel route will match the next segment.
    const hasMultipleParallelRoutes = Object.keys(existingParallelRoutes).length > 1;
    const shouldRefetchThisLevel = !flightRouterState || !segmentMatches || hasMultipleParallelRoutes;
    let parallelRoutes = {};
    if (existingSegment !== null && segmentMatches) {
        parallelRoutes = existingParallelRoutes;
    }
    let childTree;
    // if there's multiple parallel routes at this level, we shouldn't create an
    // optimistic tree for the next level because we don't know which one will
    // match the next segment.
    if (!isLastSegment && !hasMultipleParallelRoutes) {
        const childItem = createOptimisticTree(segments.slice(1), parallelRoutes ? parallelRoutes.children : null, parentRefetch || shouldRefetchThisLevel);
        childTree = childItem;
    }
    const result = [
        segment,
        {
            ...parallelRoutes,
            ...childTree ? {
                children: childTree
            } : {}
        }
    ];
    if (url) {
        result[2] = url;
    }
    if (!parentRefetch && shouldRefetchThisLevel) {
        result[3] = "refetch";
    } else if (segmentMatches && refresh) {
        result[3] = refresh;
    }
    if (segmentMatches && isRootLayout) {
        result[4] = isRootLayout;
    }
    return result;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-optimistic-tree.js.map


/***/ }),

/***/ 14621:
/***/ ((module, exports) => {

"use strict";
/**
 * Create data fetching record for Promise.
 */ // TODO-APP: change `any` to type inference.

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRecordFromThenable", ({
    enumerable: true,
    get: function() {
        return createRecordFromThenable;
    }
}));
function createRecordFromThenable(thenable) {
    thenable.status = "pending";
    thenable.then((value)=>{
        if (thenable.status === "pending") {
            thenable.status = "fulfilled";
            thenable.value = value;
        }
    }, (err)=>{
        if (thenable.status === "pending") {
            thenable.status = "rejected";
            thenable.value = err;
        }
    });
    return thenable;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-record-from-thenable.js.map


/***/ }),

/***/ 88870:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createRouterCacheKey", ({
    enumerable: true,
    get: function() {
        return createRouterCacheKey;
    }
}));
function createRouterCacheKey(segment, withoutSearchParameters) {
    if (withoutSearchParameters === void 0) withoutSearchParameters = false;
    return Array.isArray(segment) ? segment[0] + "|" + segment[1] + "|" + segment[2] : withoutSearchParameters && segment.startsWith("__PAGE__") ? "__PAGE__" : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=create-router-cache-key.js.map


/***/ }),

/***/ 38080:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fetchServerResponse", ({
    enumerable: true,
    get: function() {
        return fetchServerResponse;
    }
}));
const _client = __webpack_require__(97897);
const _approuterheaders = __webpack_require__(66265);
const _approuter = __webpack_require__(52987);
const _appcallserver = __webpack_require__(56937);
const _routerreducertypes = __webpack_require__(92836);
const _hash = __webpack_require__(20199);
function doMpaNavigation(url) {
    return [
        (0, _approuter.urlToUrlWithoutFlightMarker)(url).toString(),
        undefined
    ];
}
async function fetchServerResponse(url, flightRouterState, nextUrl, currentBuildId, prefetchKind) {
    const headers = {
        // Enable flight response
        [_approuterheaders.RSC]: "1",
        // Provide the current router state
        [_approuterheaders.NEXT_ROUTER_STATE_TREE]: encodeURIComponent(JSON.stringify(flightRouterState))
    };
    /**
   * Three cases:
   * - `prefetchKind` is `undefined`, it means it's a normal navigation, so we want to prefetch the page data fully
   * - `prefetchKind` is `full` - we want to prefetch the whole page so same as above
   * - `prefetchKind` is `auto` - if the page is dynamic, prefetch the page data partially, if static prefetch the page data fully
   */ if (prefetchKind === _routerreducertypes.PrefetchKind.AUTO) {
        headers[_approuterheaders.NEXT_ROUTER_PREFETCH] = "1";
    }
    if (nextUrl) {
        headers[_approuterheaders.NEXT_URL] = nextUrl;
    }
    const uniqueCacheQuery = (0, _hash.hexHash)([
        headers[_approuterheaders.NEXT_ROUTER_PREFETCH] || "0",
        headers[_approuterheaders.NEXT_ROUTER_STATE_TREE],
        headers[_approuterheaders.NEXT_URL]
    ].join(","));
    try {
        let fetchUrl = new URL(url);
        if (true) {
            if (false) {}
        }
        // Add unique cache query to avoid caching conflicts on CDN which don't respect to Vary header
        fetchUrl.searchParams.set(_approuterheaders.NEXT_RSC_UNION_QUERY, uniqueCacheQuery);
        const res = await fetch(fetchUrl, {
            // Backwards compat for older browsers. `same-origin` is the default in modern browsers.
            credentials: "same-origin",
            headers
        });
        const responseUrl = (0, _approuter.urlToUrlWithoutFlightMarker)(res.url);
        const canonicalUrl = res.redirected ? responseUrl : undefined;
        const contentType = res.headers.get("content-type") || "";
        let isFlightResponse = contentType === _approuterheaders.RSC_CONTENT_TYPE_HEADER;
        if (true) {
            if (false) {}
        }
        // If fetch returns something different than flight response handle it like a mpa navigation
        // If the fetch was not 200, we also handle it like a mpa navigation
        if (!isFlightResponse || !res.ok) {
            return doMpaNavigation(responseUrl.toString());
        }
        // Handle the `fetch` readable stream that can be unwrapped by `React.use`.
        const [buildId, flightData] = await (0, _client.createFromFetch)(Promise.resolve(res), {
            callServer: _appcallserver.callServer
        });
        if (currentBuildId !== buildId) {
            return doMpaNavigation(res.url);
        }
        return [
            flightData,
            canonicalUrl
        ];
    } catch (err) {
        console.error("Failed to fetch RSC payload. Falling back to browser navigation.", err);
        // If fetch fails handle it like a mpa navigation
        // TODO-APP: Add a test for the case where a CORS request fails, e.g. external url redirect coming from the response.
        // See https://github.com/vercel/next.js/issues/43605#issuecomment-1451617521 for a reproduction.
        return [
            url.toString(),
            undefined
        ];
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fetch-server-response.js.map


/***/ }),

/***/ 89996:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fillCacheWithDataProperty", ({
    enumerable: true,
    get: function() {
        return fillCacheWithDataProperty;
    }
}));
const _approutercontext = __webpack_require__(57085);
const _createroutercachekey = __webpack_require__(88870);
function fillCacheWithDataProperty(newCache, existingCache, flightSegmentPath, fetchResponse, bailOnParallelRoutes) {
    if (bailOnParallelRoutes === void 0) bailOnParallelRoutes = false;
    const isLastEntry = flightSegmentPath.length <= 2;
    const [parallelRouteKey, segment] = flightSegmentPath;
    const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap || bailOnParallelRoutes && existingCache.parallelRoutes.size > 1) {
        // Bailout because the existing cache does not have the path to the leaf node
        // or the existing cache has multiple parallel routes
        // Will trigger lazy fetch in layout-router because of missing segment
        return {
            bailOptimistic: true
        };
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    // In case of last segment start off the fetch at this level and don't copy further down.
    if (isLastEntry) {
        if (!childCacheNode || !childCacheNode.data || childCacheNode === existingChildCacheNode) {
            childSegmentMap.set(cacheKey, {
                status: _approutercontext.CacheStates.DATA_FETCH,
                data: fetchResponse(),
                subTreeData: null,
                parallelRoutes: new Map()
            });
        }
        return;
    }
    if (!childCacheNode || !existingChildCacheNode) {
        // Start fetch in the place where the existing cache doesn't have the data yet.
        if (!childCacheNode) {
            childSegmentMap.set(cacheKey, {
                status: _approutercontext.CacheStates.DATA_FETCH,
                data: fetchResponse(),
                subTreeData: null,
                parallelRoutes: new Map()
            });
        }
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    return fillCacheWithDataProperty(childCacheNode, existingChildCacheNode, flightSegmentPath.slice(2), fetchResponse);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-cache-with-data-property.js.map


/***/ }),

/***/ 38921:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fillCacheWithNewSubTreeData", ({
    enumerable: true,
    get: function() {
        return fillCacheWithNewSubTreeData;
    }
}));
const _approutercontext = __webpack_require__(57085);
const _invalidatecachebyrouterstate = __webpack_require__(21727);
const _filllazyitemstillleafwithhead = __webpack_require__(32684);
const _createroutercachekey = __webpack_require__(88870);
function fillCacheWithNewSubTreeData(newCache, existingCache, flightDataPath, wasPrefetched) {
    const isLastEntry = flightDataPath.length <= 5;
    const [parallelRouteKey, segment] = flightDataPath;
    const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    if (isLastEntry) {
        if (!childCacheNode || !childCacheNode.data || childCacheNode === existingChildCacheNode) {
            childCacheNode = {
                status: _approutercontext.CacheStates.READY,
                data: null,
                subTreeData: flightDataPath[3],
                // Ensure segments other than the one we got data for are preserved.
                parallelRoutes: existingChildCacheNode ? new Map(existingChildCacheNode.parallelRoutes) : new Map()
            };
            if (existingChildCacheNode) {
                (0, _invalidatecachebyrouterstate.invalidateCacheByRouterState)(childCacheNode, existingChildCacheNode, flightDataPath[2]);
            }
            (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(childCacheNode, existingChildCacheNode, flightDataPath[2], flightDataPath[4], wasPrefetched);
            childSegmentMap.set(cacheKey, childCacheNode);
        }
        return;
    }
    if (!childCacheNode || !existingChildCacheNode) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    fillCacheWithNewSubTreeData(childCacheNode, existingChildCacheNode, flightDataPath.slice(2), wasPrefetched);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-cache-with-new-subtree-data.js.map


/***/ }),

/***/ 32684:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fillLazyItemsTillLeafWithHead", ({
    enumerable: true,
    get: function() {
        return fillLazyItemsTillLeafWithHead;
    }
}));
const _approutercontext = __webpack_require__(57085);
const _createroutercachekey = __webpack_require__(88870);
function fillLazyItemsTillLeafWithHead(newCache, existingCache, routerState, head, wasPrefetched) {
    const isLastSegment = Object.keys(routerState[1]).length === 0;
    if (isLastSegment) {
        newCache.head = head;
        return;
    }
    // Remove segment that we got data for so that it is filled in during rendering of subTreeData.
    for(const key in routerState[1]){
        const parallelRouteState = routerState[1][key];
        const segmentForParallelRoute = parallelRouteState[0];
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segmentForParallelRoute);
        if (existingCache) {
            const existingParallelRoutesCacheNode = existingCache.parallelRoutes.get(key);
            if (existingParallelRoutesCacheNode) {
                let parallelRouteCacheNode = new Map(existingParallelRoutesCacheNode);
                const existingCacheNode = parallelRouteCacheNode.get(cacheKey);
                const newCacheNode = wasPrefetched && existingCacheNode ? {
                    status: existingCacheNode.status,
                    data: existingCacheNode.data,
                    subTreeData: existingCacheNode.subTreeData,
                    parallelRoutes: new Map(existingCacheNode.parallelRoutes)
                } : {
                    status: _approutercontext.CacheStates.LAZY_INITIALIZED,
                    data: null,
                    subTreeData: null,
                    parallelRoutes: new Map(existingCacheNode == null ? void 0 : existingCacheNode.parallelRoutes)
                };
                // Overrides the cache key with the new cache node.
                parallelRouteCacheNode.set(cacheKey, newCacheNode);
                // Traverse deeper to apply the head / fill lazy items till the head.
                fillLazyItemsTillLeafWithHead(newCacheNode, existingCacheNode, parallelRouteState, head, wasPrefetched);
                newCache.parallelRoutes.set(key, parallelRouteCacheNode);
                continue;
            }
        }
        const newCacheNode = {
            status: _approutercontext.CacheStates.LAZY_INITIALIZED,
            data: null,
            subTreeData: null,
            parallelRoutes: new Map()
        };
        const existingParallelRoutes = newCache.parallelRoutes.get(key);
        if (existingParallelRoutes) {
            existingParallelRoutes.set(cacheKey, newCacheNode);
        } else {
            newCache.parallelRoutes.set(key, new Map([
                [
                    cacheKey,
                    newCacheNode
                ]
            ]));
        }
        fillLazyItemsTillLeafWithHead(newCacheNode, undefined, parallelRouteState, head, wasPrefetched);
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fill-lazy-items-till-leaf-with-head.js.map


/***/ }),

/***/ 76489:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PrefetchCacheEntryStatus: function() {
        return PrefetchCacheEntryStatus;
    },
    getPrefetchEntryCacheStatus: function() {
        return getPrefetchEntryCacheStatus;
    }
});
const FIVE_MINUTES = 5 * 60 * 1000;
const THIRTY_SECONDS = 30 * 1000;
var PrefetchCacheEntryStatus;
(function(PrefetchCacheEntryStatus) {
    PrefetchCacheEntryStatus["fresh"] = "fresh";
    PrefetchCacheEntryStatus["reusable"] = "reusable";
    PrefetchCacheEntryStatus["expired"] = "expired";
    PrefetchCacheEntryStatus["stale"] = "stale";
})(PrefetchCacheEntryStatus || (PrefetchCacheEntryStatus = {}));
function getPrefetchEntryCacheStatus(param) {
    let { kind, prefetchTime, lastUsedTime } = param;
    // if the cache entry was prefetched or read less than 30s ago, then we want to re-use it
    if (Date.now() < (lastUsedTime != null ? lastUsedTime : prefetchTime) + THIRTY_SECONDS) {
        return lastUsedTime ? "reusable" : "fresh";
    }
    // if the cache entry was prefetched less than 5 mins ago, then we want to re-use only the loading state
    if (kind === "auto") {
        if (Date.now() < prefetchTime + FIVE_MINUTES) {
            return "stale";
        }
    }
    // if the cache entry was prefetched less than 5 mins ago and was a "full" prefetch, then we want to re-use it "full
    if (kind === "full") {
        if (Date.now() < prefetchTime + FIVE_MINUTES) {
            return "reusable";
        }
    }
    return "expired";
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-prefetch-cache-entry-status.js.map


/***/ }),

/***/ 7462:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "handleMutable", ({
    enumerable: true,
    get: function() {
        return handleMutable;
    }
}));
const _computechangedpath = __webpack_require__(89089);
function handleMutable(state, mutable) {
    var _mutable_canonicalUrl;
    var _mutable_shouldScroll;
    // shouldScroll is true by default, can override to false.
    const shouldScroll = (_mutable_shouldScroll = mutable.shouldScroll) != null ? _mutable_shouldScroll : true;
    var _mutable_scrollableSegments, _computeChangedPath;
    return {
        buildId: state.buildId,
        // Set href.
        canonicalUrl: mutable.canonicalUrl != null ? mutable.canonicalUrl === state.canonicalUrl ? state.canonicalUrl : mutable.canonicalUrl : state.canonicalUrl,
        pushRef: {
            pendingPush: mutable.pendingPush != null ? mutable.pendingPush : state.pushRef.pendingPush,
            mpaNavigation: mutable.mpaNavigation != null ? mutable.mpaNavigation : state.pushRef.mpaNavigation
        },
        // All navigation requires scroll and focus management to trigger.
        focusAndScrollRef: {
            apply: shouldScroll ? (mutable == null ? void 0 : mutable.scrollableSegments) !== undefined ? true : state.focusAndScrollRef.apply : false,
            onlyHashChange: !!mutable.hashFragment && state.canonicalUrl.split("#")[0] === ((_mutable_canonicalUrl = mutable.canonicalUrl) == null ? void 0 : _mutable_canonicalUrl.split("#")[0]),
            hashFragment: shouldScroll ? mutable.hashFragment && mutable.hashFragment !== "" ? decodeURIComponent(mutable.hashFragment.slice(1)) : state.focusAndScrollRef.hashFragment : null,
            segmentPaths: shouldScroll ? (_mutable_scrollableSegments = mutable == null ? void 0 : mutable.scrollableSegments) != null ? _mutable_scrollableSegments : state.focusAndScrollRef.segmentPaths : []
        },
        // Apply cache.
        cache: mutable.cache ? mutable.cache : state.cache,
        prefetchCache: mutable.prefetchCache ? mutable.prefetchCache : state.prefetchCache,
        // Apply patched router state.
        tree: mutable.patchedTree !== undefined ? mutable.patchedTree : state.tree,
        nextUrl: mutable.patchedTree !== undefined ? (_computeChangedPath = (0, _computechangedpath.computeChangedPath)(state.tree, mutable.patchedTree)) != null ? _computeChangedPath : state.canonicalUrl : state.nextUrl
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=handle-mutable.js.map


/***/ }),

/***/ 88457:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "invalidateCacheBelowFlightSegmentPath", ({
    enumerable: true,
    get: function() {
        return invalidateCacheBelowFlightSegmentPath;
    }
}));
const _createroutercachekey = __webpack_require__(88870);
function invalidateCacheBelowFlightSegmentPath(newCache, existingCache, flightSegmentPath) {
    const isLastEntry = flightSegmentPath.length <= 2;
    const [parallelRouteKey, segment] = flightSegmentPath;
    const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
    const existingChildSegmentMap = existingCache.parallelRoutes.get(parallelRouteKey);
    if (!existingChildSegmentMap) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    let childSegmentMap = newCache.parallelRoutes.get(parallelRouteKey);
    if (!childSegmentMap || childSegmentMap === existingChildSegmentMap) {
        childSegmentMap = new Map(existingChildSegmentMap);
        newCache.parallelRoutes.set(parallelRouteKey, childSegmentMap);
    }
    // In case of last entry don't copy further down.
    if (isLastEntry) {
        childSegmentMap.delete(cacheKey);
        return;
    }
    const existingChildCacheNode = existingChildSegmentMap.get(cacheKey);
    let childCacheNode = childSegmentMap.get(cacheKey);
    if (!childCacheNode || !existingChildCacheNode) {
        // Bailout because the existing cache does not have the path to the leaf node
        // Will trigger lazy fetch in layout-router because of missing segment
        return;
    }
    if (childCacheNode === existingChildCacheNode) {
        childCacheNode = {
            status: childCacheNode.status,
            data: childCacheNode.data,
            subTreeData: childCacheNode.subTreeData,
            parallelRoutes: new Map(childCacheNode.parallelRoutes)
        };
        childSegmentMap.set(cacheKey, childCacheNode);
    }
    invalidateCacheBelowFlightSegmentPath(childCacheNode, existingChildCacheNode, flightSegmentPath.slice(2));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=invalidate-cache-below-flight-segmentpath.js.map


/***/ }),

/***/ 21727:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "invalidateCacheByRouterState", ({
    enumerable: true,
    get: function() {
        return invalidateCacheByRouterState;
    }
}));
const _createroutercachekey = __webpack_require__(88870);
function invalidateCacheByRouterState(newCache, existingCache, routerState) {
    // Remove segment that we got data for so that it is filled in during rendering of subTreeData.
    for(const key in routerState[1]){
        const segmentForParallelRoute = routerState[1][key][0];
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segmentForParallelRoute);
        const existingParallelRoutesCacheNode = existingCache.parallelRoutes.get(key);
        if (existingParallelRoutesCacheNode) {
            let parallelRouteCacheNode = new Map(existingParallelRoutesCacheNode);
            parallelRouteCacheNode.delete(cacheKey);
            newCache.parallelRoutes.set(key, parallelRouteCacheNode);
        }
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=invalidate-cache-by-router-state.js.map


/***/ }),

/***/ 32615:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isNavigatingToNewRootLayout", ({
    enumerable: true,
    get: function() {
        return isNavigatingToNewRootLayout;
    }
}));
function isNavigatingToNewRootLayout(currentTree, nextTree) {
    // Compare segments
    const currentTreeSegment = currentTree[0];
    const nextTreeSegment = nextTree[0];
    // If any segment is different before we find the root layout, the root layout has changed.
    // E.g. /same/(group1)/layout.js -> /same/(group2)/layout.js
    // First segment is 'same' for both, keep looking. (group1) changed to (group2) before the root layout was found, it must have changed.
    if (Array.isArray(currentTreeSegment) && Array.isArray(nextTreeSegment)) {
        // Compare dynamic param name and type but ignore the value, different values would not affect the current root layout
        // /[name] - /slug1 and /slug2, both values (slug1 & slug2) still has the same layout /[name]/layout.js
        if (currentTreeSegment[0] !== nextTreeSegment[0] || currentTreeSegment[2] !== nextTreeSegment[2]) {
            return true;
        }
    } else if (currentTreeSegment !== nextTreeSegment) {
        return true;
    }
    // Current tree root layout found
    if (currentTree[4]) {
        // If the next tree doesn't have the root layout flag, it must have changed.
        return !nextTree[4];
    }
    // Current tree  didn't have its root layout here, must have changed.
    if (nextTree[4]) {
        return true;
    }
    // We can't assume it's `parallelRoutes.children` here in case the root layout is `app/@something/layout.js`
    // But it's not possible to be more than one parallelRoutes before the root layout is found
    // TODO-APP: change to traverse all parallel routes
    const currentTreeChild = Object.values(currentTree[1])[0];
    const nextTreeChild = Object.values(nextTree[1])[0];
    if (!currentTreeChild || !nextTreeChild) return true;
    return isNavigatingToNewRootLayout(currentTreeChild, nextTreeChild);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=is-navigating-to-new-root-layout.js.map


/***/ }),

/***/ 22401:
/***/ ((module, exports) => {

"use strict";
/**
 * Read record value or throw Promise if it's not resolved yet.
 */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "readRecordValue", ({
    enumerable: true,
    get: function() {
        return readRecordValue;
    }
}));
function readRecordValue(thenable) {
    // @ts-expect-error TODO: fix type
    if (thenable.status === "fulfilled") {
        // @ts-expect-error TODO: fix type
        return thenable.value;
    } else {
        throw thenable;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=read-record-value.js.map


/***/ }),

/***/ 67300:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "fastRefreshReducer", ({
    enumerable: true,
    get: function() {
        return fastRefreshReducer;
    }
}));
const _fetchserverresponse = __webpack_require__(38080);
const _createrecordfromthenable = __webpack_require__(14621);
const _readrecordvalue = __webpack_require__(22401);
const _createhreffromurl = __webpack_require__(34331);
const _applyrouterstatepatchtotree = __webpack_require__(63914);
const _isnavigatingtonewrootlayout = __webpack_require__(32615);
const _navigatereducer = __webpack_require__(9962);
const _handlemutable = __webpack_require__(7462);
const _applyflightdata = __webpack_require__(94173);
// A version of refresh reducer that keeps the cache around instead of wiping all of it.
function fastRefreshReducerImpl(state, action) {
    const { cache, mutable, origin } = action;
    const href = state.canonicalUrl;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (!cache.data) {
        // TODO-APP: verify that `href` is not an external url.
        // Fetch data from the root of the tree.
        cache.data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(new URL(href, origin), [
            state.tree[0],
            state.tree[1],
            state.tree[2],
            "refetch"
        ], state.nextUrl, state.buildId));
    }
    const [flightData, canonicalUrlOverride] = (0, _readrecordvalue.readRecordValue)(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    let currentTree = state.tree;
    let currentCache = state.cache;
    for (const flightDataPath of flightData){
        // FlightDataPath with more than two items means unexpected Flight data was returned
        if (flightDataPath.length !== 3) {
            // TODO-APP: handle this case better
            console.log("REFRESH FAILED");
            return state;
        }
        // Given the path can only have two items the items are only the router state and subTreeData for the root.
        const [treePatch] = flightDataPath;
        const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
            ""
        ], currentTree, treePatch);
        if (newTree === null) {
            throw new Error("SEGMENT MISMATCH");
        }
        if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, href, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = canonicalUrlOverride ? (0, _createhreffromurl.createHrefFromUrl)(canonicalUrlOverride) : undefined;
        if (canonicalUrlOverride) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        const applied = (0, _applyflightdata.applyFlightData)(currentCache, cache, flightDataPath);
        if (applied) {
            mutable.cache = cache;
            currentCache = cache;
        }
        mutable.previousTree = currentTree;
        mutable.patchedTree = newTree;
        mutable.canonicalUrl = href;
        currentTree = newTree;
    }
    return (0, _handlemutable.handleMutable)(state, mutable);
}
function fastRefreshReducerNoop(state, _action) {
    return state;
}
const fastRefreshReducer =  true ? fastRefreshReducerNoop : 0;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=fast-refresh-reducer.js.map


/***/ }),

/***/ 71333:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "findHeadInCache", ({
    enumerable: true,
    get: function() {
        return findHeadInCache;
    }
}));
const _createroutercachekey = __webpack_require__(88870);
function findHeadInCache(cache, parallelRoutes) {
    const isLastItem = Object.keys(parallelRoutes).length === 0;
    if (isLastItem) {
        return cache.head;
    }
    for(const key in parallelRoutes){
        const [segment, childParallelRoutes] = parallelRoutes[key];
        const childSegmentMap = cache.parallelRoutes.get(key);
        if (!childSegmentMap) {
            continue;
        }
        const cacheKey = (0, _createroutercachekey.createRouterCacheKey)(segment);
        const cacheNode = childSegmentMap.get(cacheKey);
        if (!cacheNode) {
            continue;
        }
        const item = findHeadInCache(cacheNode, childParallelRoutes);
        if (item) {
            return item;
        }
    }
    return undefined;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=find-head-in-cache.js.map


/***/ }),

/***/ 97741:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getSegmentValue", ({
    enumerable: true,
    get: function() {
        return getSegmentValue;
    }
}));
function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-segment-value.js.map


/***/ }),

/***/ 9962:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    handleExternalUrl: function() {
        return handleExternalUrl;
    },
    navigateReducer: function() {
        return navigateReducer;
    }
});
const _approutercontext = __webpack_require__(57085);
const _fetchserverresponse = __webpack_require__(38080);
const _createrecordfromthenable = __webpack_require__(14621);
const _readrecordvalue = __webpack_require__(22401);
const _createhreffromurl = __webpack_require__(34331);
const _invalidatecachebelowflightsegmentpath = __webpack_require__(88457);
const _fillcachewithdataproperty = __webpack_require__(89996);
const _createoptimistictree = __webpack_require__(28503);
const _applyrouterstatepatchtotree = __webpack_require__(63914);
const _shouldhardnavigate = __webpack_require__(48072);
const _isnavigatingtonewrootlayout = __webpack_require__(32615);
const _routerreducertypes = __webpack_require__(92836);
const _handlemutable = __webpack_require__(7462);
const _applyflightdata = __webpack_require__(94173);
const _getprefetchcacheentrystatus = __webpack_require__(76489);
const _pruneprefetchcache = __webpack_require__(37025);
const _prefetchreducer = __webpack_require__(61910);
function handleExternalUrl(state, mutable, url, pendingPush) {
    mutable.previousTree = state.tree;
    mutable.mpaNavigation = true;
    mutable.canonicalUrl = url;
    mutable.pendingPush = pendingPush;
    mutable.scrollableSegments = undefined;
    return (0, _handlemutable.handleMutable)(state, mutable);
}
function generateSegmentsFromPatch(flightRouterPatch) {
    const segments = [];
    const [segment, parallelRoutes] = flightRouterPatch;
    if (Object.keys(parallelRoutes).length === 0) {
        return [
            [
                segment
            ]
        ];
    }
    for (const [parallelRouteKey, parallelRoute] of Object.entries(parallelRoutes)){
        for (const childSegment of generateSegmentsFromPatch(parallelRoute)){
            // If the segment is empty, it means we are at the root of the tree
            if (segment === "") {
                segments.push([
                    parallelRouteKey,
                    ...childSegment
                ]);
            } else {
                segments.push([
                    segment,
                    parallelRouteKey,
                    ...childSegment
                ]);
            }
        }
    }
    return segments;
}
function addRefetchToLeafSegments(newCache, currentCache, flightSegmentPath, treePatch, data) {
    let appliedPatch = false;
    newCache.status = _approutercontext.CacheStates.READY;
    newCache.subTreeData = currentCache.subTreeData;
    newCache.parallelRoutes = new Map(currentCache.parallelRoutes);
    const segmentPathsToFill = generateSegmentsFromPatch(treePatch).map((segment)=>[
            ...flightSegmentPath,
            ...segment
        ]);
    for (const segmentPaths of segmentPathsToFill){
        const res = (0, _fillcachewithdataproperty.fillCacheWithDataProperty)(newCache, currentCache, segmentPaths, data);
        if (!(res == null ? void 0 : res.bailOptimistic)) {
            appliedPatch = true;
        }
    }
    return appliedPatch;
}
function navigateReducer(state, action) {
    const { url, isExternalUrl, navigateType, cache, mutable, forceOptimisticNavigation, shouldScroll } = action;
    const { pathname, hash } = url;
    const href = (0, _createhreffromurl.createHrefFromUrl)(url);
    const pendingPush = navigateType === "push";
    // we want to prune the prefetch cache on every navigation to avoid it growing too large
    (0, _pruneprefetchcache.prunePrefetchCache)(state.prefetchCache);
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(state.tree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (isExternalUrl) {
        return handleExternalUrl(state, mutable, url.toString(), pendingPush);
    }
    let prefetchValues = state.prefetchCache.get((0, _createhreffromurl.createHrefFromUrl)(url, false));
    if (forceOptimisticNavigation && (prefetchValues == null ? void 0 : prefetchValues.kind) !== _routerreducertypes.PrefetchKind.TEMPORARY) {
        const segments = pathname.split("/");
        // TODO-APP: figure out something better for index pages
        segments.push("__PAGE__");
        // Optimistic tree case.
        // If the optimistic tree is deeper than the current state leave that deeper part out of the fetch
        const optimisticTree = (0, _createoptimistictree.createOptimisticTree)(segments, state.tree, false);
        // we need a copy of the cache in case we need to revert to it
        const temporaryCacheNode = {
            ...cache
        };
        // Copy subTreeData for the root node of the cache.
        // Note: didn't do it above because typescript doesn't like it.
        temporaryCacheNode.status = _approutercontext.CacheStates.READY;
        temporaryCacheNode.subTreeData = state.cache.subTreeData;
        temporaryCacheNode.parallelRoutes = new Map(state.cache.parallelRoutes);
        let data;
        const fetchResponse = ()=>{
            if (!data) {
                data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(url, optimisticTree, state.nextUrl, state.buildId));
            }
            return data;
        };
        // TODO-APP: segments.slice(1) strips '', we can get rid of '' altogether.
        // TODO-APP: re-evaluate if we need to strip the last segment
        const optimisticFlightSegmentPath = segments.slice(1).map((segment)=>[
                "children",
                segment
            ]).flat();
        // Copy existing cache nodes as far as possible and fill in `data` property with the started data fetch.
        // The `data` property is used to suspend in layout-router during render if it hasn't resolved yet by the time it renders.
        const res = (0, _fillcachewithdataproperty.fillCacheWithDataProperty)(temporaryCacheNode, state.cache, optimisticFlightSegmentPath, fetchResponse, true);
        // If optimistic fetch couldn't happen it falls back to the non-optimistic case.
        if (!(res == null ? void 0 : res.bailOptimistic)) {
            mutable.previousTree = state.tree;
            mutable.patchedTree = optimisticTree;
            mutable.pendingPush = pendingPush;
            mutable.hashFragment = hash;
            mutable.shouldScroll = shouldScroll;
            mutable.scrollableSegments = [];
            mutable.cache = temporaryCacheNode;
            mutable.canonicalUrl = href;
            state.prefetchCache.set((0, _createhreffromurl.createHrefFromUrl)(url, false), {
                data: Promise.resolve(data),
                // this will make sure that the entry will be discarded after 30s
                kind: _routerreducertypes.PrefetchKind.TEMPORARY,
                prefetchTime: Date.now(),
                treeAtTimeOfPrefetch: state.tree,
                lastUsedTime: Date.now()
            });
            return (0, _handlemutable.handleMutable)(state, mutable);
        }
    }
    // If we don't have a prefetch value, we need to create one
    if (!prefetchValues) {
        const data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(url, state.tree, state.nextUrl, state.buildId, // in order to simulate the behavior of the prefetch cache
         false ? 0 : undefined));
        const newPrefetchValue = {
            data: Promise.resolve(data),
            // this will make sure that the entry will be discarded after 30s
            kind:  false ? 0 : _routerreducertypes.PrefetchKind.TEMPORARY,
            prefetchTime: Date.now(),
            treeAtTimeOfPrefetch: state.tree,
            lastUsedTime: null
        };
        state.prefetchCache.set((0, _createhreffromurl.createHrefFromUrl)(url, false), newPrefetchValue);
        prefetchValues = newPrefetchValue;
    }
    const prefetchEntryCacheStatus = (0, _getprefetchcacheentrystatus.getPrefetchEntryCacheStatus)(prefetchValues);
    // The one before last item is the router state tree patch
    const { treeAtTimeOfPrefetch, data } = prefetchValues;
    _prefetchreducer.prefetchQueue.bump(data);
    // Unwrap cache data with `use` to suspend here (in the reducer) until the fetch resolves.
    const [flightData, canonicalUrlOverride] = (0, _readrecordvalue.readRecordValue)(data);
    // important: we should only mark the cache node as dirty after we unsuspend from the call above
    prefetchValues.lastUsedTime = Date.now();
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return handleExternalUrl(state, mutable, flightData, pendingPush);
    }
    let currentTree = state.tree;
    let currentCache = state.cache;
    let scrollableSegments = [];
    for (const flightDataPath of flightData){
        const flightSegmentPath = flightDataPath.slice(0, -4);
        // The one before last item is the router state tree patch
        const treePatch = flightDataPath.slice(-3)[0];
        // TODO-APP: remove ''
        const flightSegmentPathWithLeadingEmpty = [
            "",
            ...flightSegmentPath
        ];
        // Create new tree based on the flightSegmentPath and router state patch
        let newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(flightSegmentPathWithLeadingEmpty, currentTree, treePatch);
        // If the tree patch can't be applied to the current tree then we use the tree at time of prefetch
        // TODO-APP: This should instead fill in the missing pieces in `currentTree` with the data from `treeAtTimeOfPrefetch`, then apply the patch.
        if (newTree === null) {
            newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)(flightSegmentPathWithLeadingEmpty, treeAtTimeOfPrefetch, treePatch);
        }
        if (newTree !== null) {
            if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
                return handleExternalUrl(state, mutable, href, pendingPush);
            }
            let applied = (0, _applyflightdata.applyFlightData)(currentCache, cache, flightDataPath, prefetchValues.kind === "auto" && prefetchEntryCacheStatus === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.reusable);
            if (!applied && prefetchEntryCacheStatus === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.stale) {
                applied = addRefetchToLeafSegments(cache, currentCache, flightSegmentPath, treePatch, ()=>(0, _fetchserverresponse.fetchServerResponse)(url, currentTree, state.nextUrl, state.buildId));
            }
            const hardNavigate = (0, _shouldhardnavigate.shouldHardNavigate)(flightSegmentPathWithLeadingEmpty, currentTree);
            if (hardNavigate) {
                cache.status = _approutercontext.CacheStates.READY;
                // Copy subTreeData for the root node of the cache.
                cache.subTreeData = currentCache.subTreeData;
                (0, _invalidatecachebelowflightsegmentpath.invalidateCacheBelowFlightSegmentPath)(cache, currentCache, flightSegmentPath);
                // Ensure the existing cache value is used when the cache was not invalidated.
                mutable.cache = cache;
            } else if (applied) {
                mutable.cache = cache;
            }
            currentCache = cache;
            currentTree = newTree;
            for (const subSegment of generateSegmentsFromPatch(treePatch)){
                const scrollableSegmentPath = [
                    ...flightSegmentPath,
                    ...subSegment
                ];
                // Filter out the __DEFAULT__ paths as they shouldn't be scrolled to in this case.
                if (scrollableSegmentPath[scrollableSegmentPath.length - 1] !== "__DEFAULT__") {
                    scrollableSegments.push(scrollableSegmentPath);
                }
            }
        }
    }
    mutable.previousTree = state.tree;
    mutable.patchedTree = currentTree;
    mutable.canonicalUrl = canonicalUrlOverride ? (0, _createhreffromurl.createHrefFromUrl)(canonicalUrlOverride) : href;
    mutable.pendingPush = pendingPush;
    mutable.scrollableSegments = scrollableSegments;
    mutable.hashFragment = hash;
    mutable.shouldScroll = shouldScroll;
    return (0, _handlemutable.handleMutable)(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=navigate-reducer.js.map


/***/ }),

/***/ 61910:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    prefetchQueue: function() {
        return prefetchQueue;
    },
    prefetchReducer: function() {
        return prefetchReducer;
    }
});
const _createhreffromurl = __webpack_require__(34331);
const _fetchserverresponse = __webpack_require__(38080);
const _routerreducertypes = __webpack_require__(92836);
const _createrecordfromthenable = __webpack_require__(14621);
const _pruneprefetchcache = __webpack_require__(37025);
const _approuterheaders = __webpack_require__(66265);
const _promisequeue = __webpack_require__(18811);
const prefetchQueue = new _promisequeue.PromiseQueue(5);
function prefetchReducer(state, action) {
    // let's prune the prefetch cache before we do anything else
    (0, _pruneprefetchcache.prunePrefetchCache)(state.prefetchCache);
    const { url } = action;
    url.searchParams.delete(_approuterheaders.NEXT_RSC_UNION_QUERY);
    const href = (0, _createhreffromurl.createHrefFromUrl)(url, false);
    const cacheEntry = state.prefetchCache.get(href);
    if (cacheEntry) {
        /**
     * If the cache entry present was marked as temporary, it means that we prefetched it from the navigate reducer,
     * where we didn't have the prefetch intent. We want to update it to the new, more accurate, kind here.
     */ if (cacheEntry.kind === _routerreducertypes.PrefetchKind.TEMPORARY) {
            state.prefetchCache.set(href, {
                ...cacheEntry,
                kind: action.kind
            });
        }
        /**
     * if the prefetch action was a full prefetch and that the current cache entry wasn't one, we want to re-prefetch,
     * otherwise we can re-use the current cache entry
     **/ if (!(cacheEntry.kind === _routerreducertypes.PrefetchKind.AUTO && action.kind === _routerreducertypes.PrefetchKind.FULL)) {
            return state;
        }
    }
    // fetchServerResponse is intentionally not awaited so that it can be unwrapped in the navigate-reducer
    const serverResponse = (0, _createrecordfromthenable.createRecordFromThenable)(prefetchQueue.enqueue(()=>(0, _fetchserverresponse.fetchServerResponse)(url, state.tree, state.nextUrl, state.buildId, action.kind)));
    // Create new tree based on the flightSegmentPath and router state patch
    state.prefetchCache.set(href, {
        // Create new tree based on the flightSegmentPath and router state patch
        treeAtTimeOfPrefetch: state.tree,
        data: serverResponse,
        kind: action.kind,
        prefetchTime: Date.now(),
        lastUsedTime: null
    });
    return state;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=prefetch-reducer.js.map


/***/ }),

/***/ 37025:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "prunePrefetchCache", ({
    enumerable: true,
    get: function() {
        return prunePrefetchCache;
    }
}));
const _getprefetchcacheentrystatus = __webpack_require__(76489);
function prunePrefetchCache(prefetchCache) {
    for (const [href, prefetchCacheEntry] of prefetchCache){
        if ((0, _getprefetchcacheentrystatus.getPrefetchEntryCacheStatus)(prefetchCacheEntry) === _getprefetchcacheentrystatus.PrefetchCacheEntryStatus.expired) {
            prefetchCache.delete(href);
        }
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=prune-prefetch-cache.js.map


/***/ }),

/***/ 19082:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "refreshReducer", ({
    enumerable: true,
    get: function() {
        return refreshReducer;
    }
}));
const _fetchserverresponse = __webpack_require__(38080);
const _createrecordfromthenable = __webpack_require__(14621);
const _readrecordvalue = __webpack_require__(22401);
const _createhreffromurl = __webpack_require__(34331);
const _applyrouterstatepatchtotree = __webpack_require__(63914);
const _isnavigatingtonewrootlayout = __webpack_require__(32615);
const _navigatereducer = __webpack_require__(9962);
const _handlemutable = __webpack_require__(7462);
const _approutercontext = __webpack_require__(57085);
const _filllazyitemstillleafwithhead = __webpack_require__(32684);
function refreshReducer(state, action) {
    const { cache, mutable, origin } = action;
    const href = state.canonicalUrl;
    let currentTree = state.tree;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(currentTree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (!cache.data) {
        // TODO-APP: verify that `href` is not an external url.
        // Fetch data from the root of the tree.
        cache.data = (0, _createrecordfromthenable.createRecordFromThenable)((0, _fetchserverresponse.fetchServerResponse)(new URL(href, origin), [
            currentTree[0],
            currentTree[1],
            currentTree[2],
            "refetch"
        ], state.nextUrl, state.buildId));
    }
    const [flightData, canonicalUrlOverride] = (0, _readrecordvalue.readRecordValue)(cache.data);
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
    }
    // Remove cache.data as it has been resolved at this point.
    cache.data = null;
    for (const flightDataPath of flightData){
        // FlightDataPath with more than two items means unexpected Flight data was returned
        if (flightDataPath.length !== 3) {
            // TODO-APP: handle this case better
            console.log("REFRESH FAILED");
            return state;
        }
        // Given the path can only have two items the items are only the router state and subTreeData for the root.
        const [treePatch] = flightDataPath;
        const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
            ""
        ], currentTree, treePatch);
        if (newTree === null) {
            throw new Error("SEGMENT MISMATCH");
        }
        if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, href, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = canonicalUrlOverride ? (0, _createhreffromurl.createHrefFromUrl)(canonicalUrlOverride) : undefined;
        if (canonicalUrlOverride) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        // The one before last item is the router state tree patch
        const [subTreeData, head] = flightDataPath.slice(-2);
        // Handles case where prefetch only returns the router tree patch without rendered components.
        if (subTreeData !== null) {
            cache.status = _approutercontext.CacheStates.READY;
            cache.subTreeData = subTreeData;
            (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, undefined, treePatch, head);
            mutable.cache = cache;
            mutable.prefetchCache = new Map();
        }
        mutable.previousTree = currentTree;
        mutable.patchedTree = newTree;
        mutable.canonicalUrl = href;
        currentTree = newTree;
    }
    return (0, _handlemutable.handleMutable)(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=refresh-reducer.js.map


/***/ }),

/***/ 69425:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "restoreReducer", ({
    enumerable: true,
    get: function() {
        return restoreReducer;
    }
}));
const _createhreffromurl = __webpack_require__(34331);
function restoreReducer(state, action) {
    const { url, tree } = action;
    const href = (0, _createhreffromurl.createHrefFromUrl)(url);
    return {
        buildId: state.buildId,
        // Set canonical url
        canonicalUrl: href,
        pushRef: state.pushRef,
        focusAndScrollRef: state.focusAndScrollRef,
        cache: state.cache,
        prefetchCache: state.prefetchCache,
        // Restore provided tree
        tree: tree,
        nextUrl: url.pathname
    };
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=restore-reducer.js.map


/***/ }),

/***/ 97238:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "serverActionReducer", ({
    enumerable: true,
    get: function() {
        return serverActionReducer;
    }
}));
const _appcallserver = __webpack_require__(56937);
const _approuterheaders = __webpack_require__(66265);
const _createrecordfromthenable = __webpack_require__(14621);
const _readrecordvalue = __webpack_require__(22401);
const _client = __webpack_require__(97897);
const _addbasepath = __webpack_require__(24578);
const _createhreffromurl = __webpack_require__(34331);
const _navigatereducer = __webpack_require__(9962);
const _applyrouterstatepatchtotree = __webpack_require__(63914);
const _isnavigatingtonewrootlayout = __webpack_require__(32615);
const _approutercontext = __webpack_require__(57085);
const _handlemutable = __webpack_require__(7462);
const _filllazyitemstillleafwithhead = __webpack_require__(32684);
async function fetchServerAction(state, param) {
    let { actionId, actionArgs } = param;
    const body = await (0, _client.encodeReply)(actionArgs);
    const res = await fetch("", {
        method: "POST",
        headers: {
            Accept: _approuterheaders.RSC_CONTENT_TYPE_HEADER,
            "Next-Action": actionId,
            [_approuterheaders.NEXT_ROUTER_STATE_TREE]: encodeURIComponent(JSON.stringify(state.tree)),
            ... false ? 0 : {},
            ...state.nextUrl ? {
                [_approuterheaders.NEXT_URL]: state.nextUrl
            } : {}
        },
        body
    });
    const location = res.headers.get("x-action-redirect");
    let revalidatedParts;
    try {
        const revalidatedHeader = JSON.parse(res.headers.get("x-action-revalidated") || "[[],0,0]");
        revalidatedParts = {
            paths: revalidatedHeader[0] || [],
            tag: !!revalidatedHeader[1],
            cookie: revalidatedHeader[2]
        };
    } catch (e) {
        revalidatedParts = {
            paths: [],
            tag: false,
            cookie: false
        };
    }
    const redirectLocation = location ? new URL((0, _addbasepath.addBasePath)(location), window.location.origin) : undefined;
    let isFlightResponse = res.headers.get("content-type") === _approuterheaders.RSC_CONTENT_TYPE_HEADER;
    if (isFlightResponse) {
        const response = await (0, _client.createFromFetch)(Promise.resolve(res), {
            callServer: _appcallserver.callServer
        });
        if (location) {
            // if it was a redirection, then result is just a regular RSC payload
            const [, actionFlightData] = response != null ? response : [];
            return {
                actionFlightData: actionFlightData,
                redirectLocation,
                revalidatedParts
            };
        }
        // otherwise it's a tuple of [actionResult, actionFlightData]
        const [actionResult, [, actionFlightData]] = response != null ? response : [];
        return {
            actionResult,
            actionFlightData,
            redirectLocation,
            revalidatedParts
        };
    }
    return {
        redirectLocation,
        revalidatedParts
    };
}
function serverActionReducer(state, action) {
    const { mutable, cache, resolve, reject } = action;
    const href = state.canonicalUrl;
    let currentTree = state.tree;
    const isForCurrentTree = JSON.stringify(mutable.previousTree) === JSON.stringify(currentTree);
    if (isForCurrentTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    if (!action.mutable.inFlightServerAction) {
        action.mutable.inFlightServerAction = (0, _createrecordfromthenable.createRecordFromThenable)(fetchServerAction(state, action));
    }
    // TODO-APP: Make try/catch wrap only readRecordValue so that other errors bubble up through the reducer instead.
    try {
        // suspends until the server action is resolved.
        const { actionResult, actionFlightData: flightData, redirectLocation } = (0, _readrecordvalue.readRecordValue)(action.mutable.inFlightServerAction);
        mutable.previousTree = state.tree;
        if (!flightData) {
            if (!mutable.actionResultResolved) {
                resolve(actionResult);
                mutable.actionResultResolved = true;
            }
            // If there is a redirect but no flight data we need to do a mpaNavigation.
            if (redirectLocation) {
                return (0, _navigatereducer.handleExternalUrl)(state, mutable, redirectLocation.href, state.pushRef.pendingPush);
            }
            return state;
        }
        if (typeof flightData === "string") {
            // Handle case when navigating to page in `pages` from `app`
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
        }
        // Remove cache.data as it has been resolved at this point.
        mutable.inFlightServerAction = null;
        for (const flightDataPath of flightData){
            // FlightDataPath with more than two items means unexpected Flight data was returned
            if (flightDataPath.length !== 3) {
                // TODO-APP: handle this case better
                console.log("SERVER ACTION APPLY FAILED");
                return state;
            }
            // Given the path can only have two items the items are only the router state and subTreeData for the root.
            const [treePatch] = flightDataPath;
            const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
                ""
            ], currentTree, treePatch);
            if (newTree === null) {
                throw new Error("SEGMENT MISMATCH");
            }
            if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
                return (0, _navigatereducer.handleExternalUrl)(state, mutable, href, state.pushRef.pendingPush);
            }
            // The one before last item is the router state tree patch
            const [subTreeData, head] = flightDataPath.slice(-2);
            // Handles case where prefetch only returns the router tree patch without rendered components.
            if (subTreeData !== null) {
                cache.status = _approutercontext.CacheStates.READY;
                cache.subTreeData = subTreeData;
                (0, _filllazyitemstillleafwithhead.fillLazyItemsTillLeafWithHead)(cache, undefined, treePatch, head);
                mutable.cache = cache;
                mutable.prefetchCache = new Map();
            }
            mutable.previousTree = currentTree;
            mutable.patchedTree = newTree;
            mutable.canonicalUrl = href;
            currentTree = newTree;
        }
        if (redirectLocation) {
            const newHref = (0, _createhreffromurl.createHrefFromUrl)(redirectLocation, false);
            mutable.canonicalUrl = newHref;
        }
        if (!mutable.actionResultResolved) {
            resolve(actionResult);
            mutable.actionResultResolved = true;
        }
        return (0, _handlemutable.handleMutable)(state, mutable);
    } catch (e) {
        if (e.status === "rejected") {
            if (!mutable.actionResultResolved) {
                reject(e.value);
                mutable.actionResultResolved = true;
            }
            // When the server action is rejected we don't update the state and instead call the reject handler of the promise.
            return state;
        }
        throw e;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-action-reducer.js.map


/***/ }),

/***/ 75022:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "serverPatchReducer", ({
    enumerable: true,
    get: function() {
        return serverPatchReducer;
    }
}));
const _createhreffromurl = __webpack_require__(34331);
const _applyrouterstatepatchtotree = __webpack_require__(63914);
const _isnavigatingtonewrootlayout = __webpack_require__(32615);
const _navigatereducer = __webpack_require__(9962);
const _applyflightdata = __webpack_require__(94173);
const _handlemutable = __webpack_require__(7462);
function serverPatchReducer(state, action) {
    const { flightData, previousTree, overrideCanonicalUrl, cache, mutable } = action;
    const isForCurrentTree = JSON.stringify(previousTree) === JSON.stringify(state.tree);
    // When a fetch is slow to resolve it could be that you navigated away while the request was happening or before the reducer runs.
    // In that case opt-out of applying the patch given that the data could be stale.
    if (!isForCurrentTree) {
        // TODO-APP: Handle tree mismatch
        console.log("TREE MISMATCH");
        // Keep everything as-is.
        return state;
    }
    if (mutable.previousTree) {
        return (0, _handlemutable.handleMutable)(state, mutable);
    }
    // Handle case when navigating to page in `pages` from `app`
    if (typeof flightData === "string") {
        return (0, _navigatereducer.handleExternalUrl)(state, mutable, flightData, state.pushRef.pendingPush);
    }
    let currentTree = state.tree;
    let currentCache = state.cache;
    for (const flightDataPath of flightData){
        // Slices off the last segment (which is at -4) as it doesn't exist in the tree yet
        const flightSegmentPath = flightDataPath.slice(0, -4);
        const [treePatch] = flightDataPath.slice(-3, -2);
        const newTree = (0, _applyrouterstatepatchtotree.applyRouterStatePatchToTree)([
            "",
            ...flightSegmentPath
        ], currentTree, treePatch);
        if (newTree === null) {
            throw new Error("SEGMENT MISMATCH");
        }
        if ((0, _isnavigatingtonewrootlayout.isNavigatingToNewRootLayout)(currentTree, newTree)) {
            return (0, _navigatereducer.handleExternalUrl)(state, mutable, state.canonicalUrl, state.pushRef.pendingPush);
        }
        const canonicalUrlOverrideHref = overrideCanonicalUrl ? (0, _createhreffromurl.createHrefFromUrl)(overrideCanonicalUrl) : undefined;
        if (canonicalUrlOverrideHref) {
            mutable.canonicalUrl = canonicalUrlOverrideHref;
        }
        (0, _applyflightdata.applyFlightData)(currentCache, cache, flightDataPath);
        mutable.previousTree = currentTree;
        mutable.patchedTree = newTree;
        mutable.cache = cache;
        currentCache = cache;
        currentTree = newTree;
    }
    return (0, _handlemutable.handleMutable)(state, mutable);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=server-patch-reducer.js.map


/***/ }),

/***/ 92836:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    PrefetchKind: function() {
        return PrefetchKind;
    },
    ACTION_REFRESH: function() {
        return ACTION_REFRESH;
    },
    ACTION_NAVIGATE: function() {
        return ACTION_NAVIGATE;
    },
    ACTION_RESTORE: function() {
        return ACTION_RESTORE;
    },
    ACTION_SERVER_PATCH: function() {
        return ACTION_SERVER_PATCH;
    },
    ACTION_PREFETCH: function() {
        return ACTION_PREFETCH;
    },
    ACTION_FAST_REFRESH: function() {
        return ACTION_FAST_REFRESH;
    },
    ACTION_SERVER_ACTION: function() {
        return ACTION_SERVER_ACTION;
    }
});
const ACTION_REFRESH = "refresh";
const ACTION_NAVIGATE = "navigate";
const ACTION_RESTORE = "restore";
const ACTION_SERVER_PATCH = "server-patch";
const ACTION_PREFETCH = "prefetch";
const ACTION_FAST_REFRESH = "fast-refresh";
const ACTION_SERVER_ACTION = "server-action";
var PrefetchKind;
(function(PrefetchKind) {
    PrefetchKind["AUTO"] = "auto";
    PrefetchKind["FULL"] = "full";
    PrefetchKind["TEMPORARY"] = "temporary";
})(PrefetchKind || (PrefetchKind = {}));
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer-types.js.map


/***/ }),

/***/ 27189:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "reducer", ({
    enumerable: true,
    get: function() {
        return reducer;
    }
}));
const _routerreducertypes = __webpack_require__(92836);
const _navigatereducer = __webpack_require__(9962);
const _serverpatchreducer = __webpack_require__(75022);
const _restorereducer = __webpack_require__(69425);
const _refreshreducer = __webpack_require__(19082);
const _prefetchreducer = __webpack_require__(61910);
const _fastrefreshreducer = __webpack_require__(67300);
const _serveractionreducer = __webpack_require__(97238);
/**
 * Reducer that handles the app-router state updates.
 */ function clientReducer(state, action) {
    switch(action.type){
        case _routerreducertypes.ACTION_NAVIGATE:
            {
                return (0, _navigatereducer.navigateReducer)(state, action);
            }
        case _routerreducertypes.ACTION_SERVER_PATCH:
            {
                return (0, _serverpatchreducer.serverPatchReducer)(state, action);
            }
        case _routerreducertypes.ACTION_RESTORE:
            {
                return (0, _restorereducer.restoreReducer)(state, action);
            }
        case _routerreducertypes.ACTION_REFRESH:
            {
                return (0, _refreshreducer.refreshReducer)(state, action);
            }
        case _routerreducertypes.ACTION_FAST_REFRESH:
            {
                return (0, _fastrefreshreducer.fastRefreshReducer)(state, action);
            }
        case _routerreducertypes.ACTION_PREFETCH:
            {
                return (0, _prefetchreducer.prefetchReducer)(state, action);
            }
        case _routerreducertypes.ACTION_SERVER_ACTION:
            {
                return (0, _serveractionreducer.serverActionReducer)(state, action);
            }
        // This case should never be hit as dispatch is strongly typed.
        default:
            throw new Error("Unknown action");
    }
}
function serverReducer(state, _action) {
    return state;
}
const reducer =  true ? serverReducer : 0;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer.js.map


/***/ }),

/***/ 48072:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "shouldHardNavigate", ({
    enumerable: true,
    get: function() {
        return shouldHardNavigate;
    }
}));
const _matchsegments = __webpack_require__(17618);
function shouldHardNavigate(flightSegmentPath, flightRouterState) {
    const [segment, parallelRoutes] = flightRouterState;
    // TODO-APP: Check if `as` can be replaced.
    const [currentSegment, parallelRouteKey] = flightSegmentPath;
    // Check if current segment matches the existing segment.
    if (!(0, _matchsegments.matchSegment)(currentSegment, segment)) {
        // If dynamic parameter in tree doesn't match up with segment path a hard navigation is triggered.
        if (Array.isArray(currentSegment)) {
            return true;
        }
        // If the existing segment did not match soft navigation is triggered.
        return false;
    }
    const lastSegment = flightSegmentPath.length <= 2;
    if (lastSegment) {
        return false;
    }
    return shouldHardNavigate(flightSegmentPath.slice(2), parallelRoutes[parallelRouteKey]);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=should-hard-navigate.js.map


/***/ }),

/***/ 28437:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createSearchParamsBailoutProxy", ({
    enumerable: true,
    get: function() {
        return createSearchParamsBailoutProxy;
    }
}));
const _staticgenerationbailout = __webpack_require__(38862);
function createSearchParamsBailoutProxy() {
    return new Proxy({}, {
        get (_target, prop) {
            // React adds some properties on the object when serializing for client components
            if (typeof prop === "string") {
                (0, _staticgenerationbailout.staticGenerationBailout)("searchParams." + prop);
            }
        }
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=searchparams-bailout-proxy.js.map


/***/ }),

/***/ 38862:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "staticGenerationBailout", ({
    enumerable: true,
    get: function() {
        return staticGenerationBailout;
    }
}));
const _hooksservercontext = __webpack_require__(28047);
const _staticgenerationasyncstorage = __webpack_require__(13539);
class StaticGenBailoutError extends Error {
    constructor(...args){
        super(...args);
        this.code = "NEXT_STATIC_GEN_BAILOUT";
    }
}
function formatErrorMessage(reason, opts) {
    const { dynamic, link } = opts || {};
    const suffix = link ? " See more info here: " + link : "";
    return "Page" + (dynamic ? ' with `dynamic = "' + dynamic + '"`' : "") + " couldn't be rendered statically because it used `" + reason + "`." + suffix;
}
const staticGenerationBailout = (reason, opts)=>{
    const staticGenerationStore = _staticgenerationasyncstorage.staticGenerationAsyncStorage.getStore();
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.forceStatic) {
        return true;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.dynamicShouldError) {
        var _opts_dynamic;
        throw new StaticGenBailoutError(formatErrorMessage(reason, {
            ...opts,
            dynamic: (_opts_dynamic = opts == null ? void 0 : opts.dynamic) != null ? _opts_dynamic : "error"
        }));
    }
    if (staticGenerationStore) {
        staticGenerationStore.revalidate = 0;
    }
    if (staticGenerationStore == null ? void 0 : staticGenerationStore.isStaticGeneration) {
        const err = new _hooksservercontext.DynamicServerError(formatErrorMessage(reason, {
            ...opts,
            // this error should be caught by Next to bail out of static generation
            // in case it's uncaught, this link provides some additional context as to why
            link: "https://nextjs.org/docs/messages/dynamic-server-error"
        }));
        staticGenerationStore.dynamicUsageDescription = reason;
        staticGenerationStore.dynamicUsageStack = err.stack;
        throw err;
    }
    return false;
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-bailout.js.map


/***/ }),

/***/ 44282:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return StaticGenerationSearchParamsBailoutProvider;
    }
}));
const _interop_require_default = __webpack_require__(82147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(18038));
const _searchparamsbailoutproxy = __webpack_require__(28437);
function StaticGenerationSearchParamsBailoutProvider(param) {
    let { Component, propsForComponent } = param;
    const searchParams = (0, _searchparamsbailoutproxy.createSearchParamsBailoutProxy)();
    return /*#__PURE__*/ _react.default.createElement(Component, {
        searchParams: searchParams,
        ...propsForComponent
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map


/***/ }),

/***/ 57951:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useReducerWithReduxDevtools", ({
    enumerable: true,
    get: function() {
        return useReducerWithReduxDevtools;
    }
}));
const _react = __webpack_require__(18038);
function normalizeRouterState(val) {
    if (val instanceof Map) {
        const obj = {};
        for (const [key, value] of val.entries()){
            if (typeof value === "function") {
                obj[key] = "fn()";
                continue;
            }
            if (typeof value === "object" && value !== null) {
                if (value.$$typeof) {
                    obj[key] = value.$$typeof.toString();
                    continue;
                }
                if (value._bundlerConfig) {
                    obj[key] = "FlightData";
                    continue;
                }
            }
            obj[key] = normalizeRouterState(value);
        }
        return obj;
    }
    if (typeof val === "object" && val !== null) {
        const obj = {};
        for(const key in val){
            const value = val[key];
            if (typeof value === "function") {
                obj[key] = "fn()";
                continue;
            }
            if (typeof value === "object" && value !== null) {
                if (value.$$typeof) {
                    obj[key] = value.$$typeof.toString();
                    continue;
                }
                if (value.hasOwnProperty("_bundlerConfig")) {
                    obj[key] = "FlightData";
                    continue;
                }
            }
            obj[key] = normalizeRouterState(value);
        }
        return obj;
    }
    if (Array.isArray(val)) {
        return val.map(normalizeRouterState);
    }
    return val;
}
function devToolReducer(fn, ref) {
    return (state, action)=>{
        const res = fn(state, action);
        if (ref.current) {
            ref.current.send(action, normalizeRouterState(res));
        }
        return res;
    };
}
function useReducerWithReduxDevtoolsNoop(fn, initialState) {
    const [state, dispatch] = (0, _react.useReducer)(fn, initialState);
    return [
        state,
        dispatch,
        ()=>{}
    ];
}
function useReducerWithReduxDevtoolsImpl(fn, initialState) {
    const devtoolsConnectionRef = (0, _react.useRef)();
    const enabledRef = (0, _react.useRef)();
    (0, _react.useEffect)(()=>{
        if (devtoolsConnectionRef.current || enabledRef.current === false) {
            return;
        }
        if (enabledRef.current === undefined && typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined") {
            enabledRef.current = false;
            return;
        }
        devtoolsConnectionRef.current = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
            instanceId: 8000,
            name: "next-router"
        });
        if (devtoolsConnectionRef.current) {
            devtoolsConnectionRef.current.init(normalizeRouterState(initialState));
        }
        return ()=>{
            devtoolsConnectionRef.current = undefined;
        };
    }, [
        initialState
    ]);
    const [state, dispatch] = (0, _react.useReducer)(devToolReducer(/* logReducer( */ fn /*)*/ , devtoolsConnectionRef), initialState);
    const sync = (0, _react.useCallback)(()=>{
        if (devtoolsConnectionRef.current) {
            devtoolsConnectionRef.current.send({
                type: "RENDER_SYNC"
            }, normalizeRouterState(state));
        }
    }, [
        state
    ]);
    return [
        state,
        dispatch,
        sync
    ];
}
const useReducerWithReduxDevtools =  false ? 0 : useReducerWithReduxDevtoolsNoop;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-reducer-with-devtools.js.map


/***/ }),

/***/ 83684:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "getDomainLocale", ({
    enumerable: true,
    get: function() {
        return getDomainLocale;
    }
}));
const _normalizetrailingslash = __webpack_require__(61094);
const basePath = (/* unused pure expression or super */ null && ( false || ""));
function getDomainLocale(path, locale, locales, domainLocales) {
    if (false) {} else {
        return false;
    }
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=get-domain-locale.js.map


/***/ }),

/***/ 94374:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "hasBasePath", ({
    enumerable: true,
    get: function() {
        return hasBasePath;
    }
}));
const _pathhasprefix = __webpack_require__(54614);
const basePath =  false || "";
function hasBasePath(path) {
    return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=has-base-path.js.map


/***/ }),

/***/ 73380:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "Image", ({
    enumerable: true,
    get: function() {
        return Image;
    }
}));
const _interop_require_default = __webpack_require__(82147);
const _interop_require_wildcard = __webpack_require__(4009);
const _react = /*#__PURE__*/ _interop_require_wildcard._(__webpack_require__(18038));
const _reactdom = __webpack_require__(98704);
const _head = /*#__PURE__*/ _interop_require_default._(__webpack_require__(66864));
const _getimgprops = __webpack_require__(1830);
const _imageconfig = __webpack_require__(52210);
const _imageconfigcontext = __webpack_require__(35359);
const _warnonce = __webpack_require__(98658);
const _routercontext = __webpack_require__(17160);
const _imageloader = /*#__PURE__*/ _interop_require_default._(__webpack_require__(35246));
// This is replaced by webpack define plugin
const configEnv = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","dangerouslyAllowSVG":false,"unoptimized":false};
if (true) {
    globalThis.__NEXT_IMAGE_IMPORTED = true;
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized) {
    const src = img == null ? void 0 : img.src;
    if (!img || img["data-loaded-src"] === src) {
        return;
    }
    img["data-loaded-src"] = src;
    const p = "decode" in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentElement || !img.isConnected) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        if (placeholder !== "empty") {
            setBlurComplete(true);
        }
        if (onLoadRef == null ? void 0 : onLoadRef.current) {
            // Since we don't have the SyntheticEvent here,
            // we must create one with the same shape.
            // See https://reactjs.org/docs/events.html
            const event = new Event("load");
            Object.defineProperty(event, "target", {
                writable: false,
                value: img
            });
            let prevented = false;
            let stopped = false;
            onLoadRef.current({
                ...event,
                nativeEvent: event,
                currentTarget: img,
                target: img,
                isDefaultPrevented: ()=>prevented,
                isPropagationStopped: ()=>stopped,
                persist: ()=>{},
                preventDefault: ()=>{
                    prevented = true;
                    event.preventDefault();
                },
                stopPropagation: ()=>{
                    stopped = true;
                    event.stopPropagation();
                }
            });
        }
        if (onLoadingCompleteRef == null ? void 0 : onLoadingCompleteRef.current) {
            onLoadingCompleteRef.current(img);
        }
        if (false) {}
    });
}
function getDynamicProps(fetchPriority) {
    const [majorStr, minorStr] = _react.version.split(".");
    const major = parseInt(majorStr, 10);
    const minor = parseInt(minorStr, 10);
    if (major > 18 || major === 18 && minor >= 3) {
        // In React 18.3.0 or newer, we must use camelCase
        // prop to avoid "Warning: Invalid DOM property".
        // See https://github.com/facebook/react/pull/25927
        return {
            fetchPriority
        };
    }
    // In React 18.2.0 or older, we must use lowercase prop
    // to avoid "Warning: Invalid DOM property".
    return {
        fetchpriority: fetchPriority
    };
}
const ImageElement = /*#__PURE__*/ (0, _react.forwardRef)((param, forwardedRef)=>{
    let { src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, onLoad, onError, ...rest } = param;
    return /*#__PURE__*/ _react.default.createElement("img", {
        ...rest,
        ...getDynamicProps(fetchPriority),
        // It's intended to keep `loading` before `src` because React updates
        // props in order which causes Safari/Firefox to not lazy load properly.
        // See https://github.com/facebook/react/issues/25883
        loading: loading,
        width: width,
        height: height,
        decoding: decoding,
        "data-nimg": fill ? "fill" : "1",
        className: className,
        style: style,
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        sizes: sizes,
        srcSet: srcSet,
        src: src,
        ref: (0, _react.useCallback)((img)=>{
            if (forwardedRef) {
                if (typeof forwardedRef === "function") forwardedRef(img);
                else if (typeof forwardedRef === "object") {
                    // @ts-ignore - .current is read only it's usually assigned by react internally
                    forwardedRef.current = img;
                }
            }
            if (!img) {
                return;
            }
            if (onError) {
                // If the image has an error before react hydrates, then the error is lost.
                // The workaround is to wait until the image is mounted which is after hydration,
                // then we set the src again to trigger the error handler (if there was an error).
                // eslint-disable-next-line no-self-assign
                img.src = img.src;
            }
            if (false) {}
            if (img.complete) {
                handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized);
            }
        }, [
            src,
            placeholder,
            onLoadRef,
            onLoadingCompleteRef,
            setBlurComplete,
            onError,
            unoptimized,
            forwardedRef
        ]),
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized);
        },
        onError: (event)=>{
            // if the real image fails to load, this will ensure "alt" is visible
            setShowAltText(true);
            if (placeholder !== "empty") {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    });
});
function ImagePreload(param) {
    let { isAppRouter, imgAttributes } = param;
    const opts = {
        as: "image",
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: imgAttributes.crossOrigin,
        referrerPolicy: imgAttributes.referrerPolicy,
        ...getDynamicProps(imgAttributes.fetchPriority)
    };
    if (isAppRouter && _reactdom.preload) {
        // See https://github.com/facebook/react/pull/26940
        (0, _reactdom.preload)(imgAttributes.src, opts);
        return null;
    }
    return /*#__PURE__*/ _react.default.createElement(_head.default, null, /*#__PURE__*/ _react.default.createElement("link", {
        key: "__nimg-" + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
        rel: "preload",
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        href: imgAttributes.srcSet ? undefined : imgAttributes.src,
        ...opts
    }));
}
const Image = /*#__PURE__*/ (0, _react.forwardRef)((props, forwardedRef)=>{
    const pagesRouter = (0, _react.useContext)(_routercontext.RouterContext);
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const configContext = (0, _react.useContext)(_imageconfigcontext.ImageConfigContext);
    const config = (0, _react.useMemo)(()=>{
        const c = configEnv || configContext || _imageconfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        return {
            ...c,
            allSizes,
            deviceSizes
        };
    }, [
        configContext
    ]);
    const { onLoad, onLoadingComplete } = props;
    const onLoadRef = (0, _react.useRef)(onLoad);
    (0, _react.useEffect)(()=>{
        onLoadRef.current = onLoad;
    }, [
        onLoad
    ]);
    const onLoadingCompleteRef = (0, _react.useRef)(onLoadingComplete);
    (0, _react.useEffect)(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    const [blurComplete, setBlurComplete] = (0, _react.useState)(false);
    const [showAltText, setShowAltText] = (0, _react.useState)(false);
    const { props: imgAttributes, meta: imgMeta } = (0, _getimgprops.getImgProps)(props, {
        defaultLoader: _imageloader.default,
        imgConf: config,
        blurComplete,
        showAltText
    });
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(ImageElement, {
        ...imgAttributes,
        unoptimized: imgMeta.unoptimized,
        placeholder: imgMeta.placeholder,
        fill: imgMeta.fill,
        onLoadRef: onLoadRef,
        onLoadingCompleteRef: onLoadingCompleteRef,
        setBlurComplete: setBlurComplete,
        setShowAltText: setShowAltText,
        ref: forwardedRef
    }), imgMeta.priority ? /*#__PURE__*/ _react.default.createElement(ImagePreload, {
        isAppRouter: isAppRouter,
        imgAttributes: imgAttributes
    }) : null);
});
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image-component.js.map


/***/ }),

/***/ 50954:
/***/ ((module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
const _interop_require_default = __webpack_require__(82147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(18038));
const _resolvehref = __webpack_require__(70982);
const _islocalurl = __webpack_require__(60120);
const _formaturl = __webpack_require__(12336);
const _utils = __webpack_require__(78423);
const _addlocale = __webpack_require__(23005);
const _routercontext = __webpack_require__(17160);
const _approutercontext = __webpack_require__(57085);
const _useintersection = __webpack_require__(84254);
const _getdomainlocale = __webpack_require__(83684);
const _addbasepath = __webpack_require__(24578);
const _routerreducertypes = __webpack_require__(92836);
const prefetched = new Set();
function prefetch(router, href, as, options, appOptions, isAppRouter) {
    if (true) {
        return;
    }
    // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    if (!isAppRouter && !(0, _islocalurl.isLocalURL)(href)) {
        return;
    }
    // We should only dedupe requests when experimental.optimisticClientCache is
    // disabled.
    if (!options.bypassPrefetchedCheck) {
        const locale = typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : undefined;
        const prefetchedKey = href + "%" + as + "%" + locale;
        // If we've already fetched the key, then don't prefetch it again!
        if (prefetched.has(prefetchedKey)) {
            return;
        }
        // Mark this URL as prefetched.
        prefetched.add(prefetchedKey);
    }
    const prefetchPromise = isAppRouter ? router.prefetch(href, appOptions) : router.prefetch(href, as, options);
    // Prefetch the JSON page if asked (only in the client)
    // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch
    Promise.resolve(prefetchPromise).catch((err)=>{
        if (false) {}
    });
}
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute("target");
    return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled) {
    const { nodeName } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === "A";
    if (isAnchorNodeName && (isModifiedEvent(e) || // app-router supports external urls out of the box so it shouldn't short-circuit here as support for e.g. `replace` is added in the app-router.
    !isAppRouter && !(0, _islocalurl.isLocalURL)(href))) {
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    const navigate = ()=>{
        // If the router is an NextRouter instance it will have `beforePopState`
        const routerScroll = scroll != null ? scroll : true;
        if ("beforePopState" in router) {
            router[replace ? "replace" : "push"](href, as, {
                shallow,
                locale,
                scroll: routerScroll
            });
        } else {
            router[replace ? "replace" : "push"](as || href, {
                forceOptimisticNavigation: !prefetchEnabled,
                scroll: routerScroll
            });
        }
    };
    if (isAppRouter) {
        _react.default.startTransition(navigate);
    } else {
        navigate();
    }
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === "string") {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
/**
 * React Component that enables client-side transitions between routes.
 */ const Link = /*#__PURE__*/ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
    let children;
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = true === false, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
        children = /*#__PURE__*/ _react.default.createElement("a", null, children);
    }
    const pagesRouter = _react.default.useContext(_routercontext.RouterContext);
    const appRouter = _react.default.useContext(_approutercontext.AppRouterContext);
    const router = pagesRouter != null ? pagesRouter : appRouter;
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const prefetchEnabled = prefetchProp !== false;
    /**
     * The possible states for prefetch are:
     * - null: this is the default "auto" mode, where we will prefetch partially if the link is in the viewport
     * - true: we will prefetch if the link is visible and prefetch the full page, not just partially
     * - false: we will not prefetch if in the viewport at all
     */ const appPrefetchKind = prefetchProp === null ? _routerreducertypes.PrefetchKind.AUTO : _routerreducertypes.PrefetchKind.FULL;
    if (false) {}
    if (false) {}
    const { href, as } = _react.default.useMemo(()=>{
        if (!pagesRouter) {
            const resolvedHref = formatStringOrUrl(hrefProp);
            return {
                href: resolvedHref,
                as: asProp ? formatStringOrUrl(asProp) : resolvedHref
            };
        }
        const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(pagesRouter, hrefProp, true);
        return {
            href: resolvedHref,
            as: asProp ? (0, _resolvehref.resolveHref)(pagesRouter, asProp) : resolvedAs || resolvedHref
        };
    }, [
        pagesRouter,
        hrefProp,
        asProp
    ]);
    const previousHref = _react.default.useRef(href);
    const previousAs = _react.default.useRef(as);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if (false) {} else {
            child = _react.default.Children.only(children);
        }
    } else {
        if (false) {}
    }
    const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
    const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
        rootMargin: "200px"
    });
    const setRef = _react.default.useCallback((el)=>{
        // Before the link getting observed, check if visible state need to be reset
        if (previousAs.current !== as || previousHref.current !== href) {
            resetVisible();
            previousAs.current = as;
            previousHref.current = href;
        }
        setIntersectionRef(el);
        if (childRef) {
            if (typeof childRef === "function") childRef(el);
            else if (typeof childRef === "object") {
                childRef.current = el;
            }
        }
    }, [
        as,
        childRef,
        href,
        resetVisible,
        setIntersectionRef
    ]);
    // Prefetch the URL if we haven't already and it's visible.
    _react.default.useEffect(()=>{
        // in dev, we only prefetch on hover to avoid wasting resources as the prefetch will trigger compiling the page.
        if (false) {}
        if (!router) {
            return;
        }
        // If we don't need to prefetch the URL, don't do prefetch.
        if (!isVisible || !prefetchEnabled) {
            return;
        }
        // Prefetch the URL.
        prefetch(router, href, as, {
            locale
        }, {
            kind: appPrefetchKind
        }, isAppRouter);
    }, [
        as,
        href,
        isVisible,
        locale,
        prefetchEnabled,
        pagesRouter == null ? void 0 : pagesRouter.locale,
        router,
        isAppRouter,
        appPrefetchKind
    ]);
    const childProps = {
        ref: setRef,
        onClick (e) {
            if (false) {}
            if (!legacyBehavior && typeof onClick === "function") {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, router, href, as, replace, shallow, scroll, locale, isAppRouter, prefetchEnabled);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === "function") {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ((!prefetchEnabled || "production" === "development") && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, {
                kind: appPrefetchKind
            }, isAppRouter);
        },
        onTouchStart (e) {
            if (!legacyBehavior && typeof onTouchStartProp === "function") {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled && isAppRouter) {
                return;
            }
            prefetch(router, href, as, {
                locale,
                priority: true,
                // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
                bypassPrefetchedCheck: true
            }, {
                kind: appPrefetchKind
            }, isAppRouter);
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the domain and locale.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
        const curLocale = typeof locale !== "undefined" ? locale : pagesRouter == null ? void 0 : pagesRouter.locale;
        // we only render domain locales if we are currently on a domain locale
        // so that locale links are still visitable in development/preview envs
        const localeDomain = (pagesRouter == null ? void 0 : pagesRouter.isLocaleDomain) && (0, _getdomainlocale.getDomainLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.locales, pagesRouter == null ? void 0 : pagesRouter.domainLocales);
        childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, pagesRouter == null ? void 0 : pagesRouter.defaultLocale));
    }
    return legacyBehavior ? /*#__PURE__*/ _react.default.cloneElement(child, childProps) : /*#__PURE__*/ _react.default.createElement("a", {
        ...restProps,
        ...childProps
    }, children);
});
const _default = Link;
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map


/***/ }),

/***/ 61094:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "normalizePathTrailingSlash", ({
    enumerable: true,
    get: function() {
        return normalizePathTrailingSlash;
    }
}));
const _removetrailingslash = __webpack_require__(53750);
const _parsepath = __webpack_require__(68231);
const normalizePathTrailingSlash = (path)=>{
    if (!path.startsWith("/") || undefined) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    if (false) {}
    return "" + (0, _removetrailingslash.removeTrailingSlash)(pathname) + query + hash;
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map


/***/ }),

/***/ 42666:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "removeBasePath", ({
    enumerable: true,
    get: function() {
        return removeBasePath;
    }
}));
const _hasbasepath = __webpack_require__(94374);
const basePath =  false || "";
function removeBasePath(path) {
    if (false) {}
    // Can't trim the basePath if it has zero length!
    if (basePath.length === 0) return path;
    path = path.slice(basePath.length);
    if (!path.startsWith("/")) path = "/" + path;
    return path;
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=remove-base-path.js.map


/***/ }),

/***/ 39029:
/***/ ((module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    requestIdleCallback: function() {
        return requestIdleCallback;
    },
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    }
});
const requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map


/***/ }),

/***/ 84254:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "useIntersection", ({
    enumerable: true,
    get: function() {
        return useIntersection;
    }
}));
const _react = __webpack_require__(18038);
const _requestidlecallback = __webpack_require__(39029);
const hasIntersectionObserver = typeof IntersectionObserver === "function";
const observers = new Map();
const idList = [];
function createObserver(options) {
    const id = {
        root: options.root || null,
        margin: options.rootMargin || ""
    };
    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
    let instance;
    if (existing) {
        instance = observers.get(existing);
        if (instance) {
            return instance;
        }
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            const callback = elements.get(entry.target);
            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            if (callback && isVisible) {
                callback(isVisible);
            }
        });
    }, options);
    instance = {
        id,
        observer,
        elements
    };
    idList.push(id);
    observers.set(id, instance);
    return instance;
}
function observe(element, callback, options) {
    const { id, observer, elements } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        // Destroy observer when there's nothing left to watch:
        if (elements.size === 0) {
            observer.disconnect();
            observers.delete(id);
            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
            if (index > -1) {
                idList.splice(index, 1);
            }
        }
    };
}
function useIntersection(param) {
    let { rootRef, rootMargin, disabled } = param;
    const isDisabled = disabled || !hasIntersectionObserver;
    const [visible, setVisible] = (0, _react.useState)(false);
    const elementRef = (0, _react.useRef)(null);
    const setElement = (0, _react.useCallback)((element)=>{
        elementRef.current = element;
    }, []);
    (0, _react.useEffect)(()=>{
        if (hasIntersectionObserver) {
            if (isDisabled || visible) return;
            const element = elementRef.current;
            if (element && element.tagName) {
                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
                    root: rootRef == null ? void 0 : rootRef.current,
                    rootMargin
                });
                return unobserve;
            }
        } else {
            if (!visible) {
                const idleCallback = (0, _requestidlecallback.requestIdleCallback)(()=>setVisible(true));
                return ()=>(0, _requestidlecallback.cancelIdleCallback)(idleCallback);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isDisabled,
        rootMargin,
        rootRef,
        visible,
        elementRef.current
    ]);
    const resetVisible = (0, _react.useCallback)(()=>{
        setVisible(false);
    }, []);
    return [
        setElement,
        visible,
        resetVisible
    ];
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-intersection.js.map


/***/ }),

/***/ 80489:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    unstable_getImgProps: function() {
        return unstable_getImgProps;
    }
});
const _interop_require_default = __webpack_require__(82147);
const _getimgprops = __webpack_require__(1830);
const _warnonce = __webpack_require__(98658);
const _imagecomponent = __webpack_require__(73380);
const _imageloader = /*#__PURE__*/ _interop_require_default._(__webpack_require__(35246));
const unstable_getImgProps = (imgProps)=>{
    (0, _warnonce.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");
    const { props } = (0, _getimgprops.getImgProps)(imgProps, {
        defaultLoader: _imageloader.default,
        // This is replaced by webpack define plugin
        imgConf: {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","dangerouslyAllowSVG":false,"unoptimized":false}
    });
    for (const [key, value] of Object.entries(props)){
        if (value === undefined) {
            delete props[key];
        }
    }
    return {
        props
    };
};
const _default = _imagecomponent.Image; //# sourceMappingURL=image-external.js.map


/***/ }),

/***/ 35246:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return _default;
    }
}));
function defaultLoader(param) {
    let { config, src, width, quality } = param;
    if (false) {}
    return config.path + "?url=" + encodeURIComponent(src) + "&w=" + width + "&q=" + (quality || 75) + ( false ? 0 : "");
}
// We use this to determine if the import is the default loader
// or a custom loader defined by the user in next.config.js
defaultLoader.__next_img_default = true;
const _default = defaultLoader; //# sourceMappingURL=image-loader.js.map


/***/ }),

/***/ 89708:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    suspense: function() {
        return suspense;
    },
    NoSSR: function() {
        return NoSSR;
    }
});
const _interop_require_default = __webpack_require__(82147);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(18038));
const _nossrerror = __webpack_require__(30827);
function suspense() {
    const error = new Error(_nossrerror.NEXT_DYNAMIC_NO_SSR_CODE);
    error.digest = _nossrerror.NEXT_DYNAMIC_NO_SSR_CODE;
    throw error;
}
function NoSSR(param) {
    let { children } = param;
    if (true) {
        suspense();
    }
    return children;
} //# sourceMappingURL=dynamic-no-ssr.js.map


/***/ }),

/***/ 30827:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
// This has to be a shared module which is shared between client component error boundary and dynamic component

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "NEXT_DYNAMIC_NO_SSR_CODE", ({
    enumerable: true,
    get: function() {
        return NEXT_DYNAMIC_NO_SSR_CODE;
    }
}));
const NEXT_DYNAMIC_NO_SSR_CODE = "NEXT_DYNAMIC_NO_SSR_CODE"; //# sourceMappingURL=no-ssr-error.js.map


/***/ }),

/***/ 61363:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* eslint-disable import/no-extraneous-dependencies */ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createProxy", ({
    enumerable: true,
    get: function() {
        return createProxy;
    }
}));
const _serveredge = __webpack_require__(89642);
const createProxy = _serveredge.createClientModuleProxy; //# sourceMappingURL=module-proxy.js.map


/***/ }),

/***/ 38225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/home/ali/trello/node_modules/next/dist/client/components/app-router.js");
 //# sourceMappingURL=app-router.js.map


/***/ }),

/***/ 31823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/home/ali/trello/node_modules/next/dist/client/components/error-boundary.js");
 //# sourceMappingURL=error-boundary.js.map


/***/ }),

/***/ 97149:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/home/ali/trello/node_modules/next/dist/client/components/layout-router.js");
 //# sourceMappingURL=layout-router.js.map


/***/ }),

/***/ 26966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/home/ali/trello/node_modules/next/dist/client/components/not-found-boundary.js");
 //# sourceMappingURL=not-found-boundary.js.map


/***/ }),

/***/ 95493:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "default", ({
    enumerable: true,
    get: function() {
        return NotFound;
    }
}));
const _interop_require_default = __webpack_require__(73297);
const _react = /*#__PURE__*/ _interop_require_default._(__webpack_require__(62947));
const styles = {
    error: {
        // https://github.com/sindresorhus/modern-normalize/blob/main/modern-normalize.css#L38-L52
        fontFamily: 'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    desc: {
        display: "inline-block"
    },
    h1: {
        display: "inline-block",
        margin: "0 20px 0 0",
        padding: "0 23px 0 0",
        fontSize: 24,
        fontWeight: 500,
        verticalAlign: "top",
        lineHeight: "49px"
    },
    h2: {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "49px",
        margin: 0
    }
};
function NotFound() {
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement("title", null, "404: This page could not be found."), /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.error
    }, /*#__PURE__*/ _react.default.createElement("div", null, /*#__PURE__*/ _react.default.createElement("style", {
        dangerouslySetInnerHTML: {
            /* Minified CSS from
                body { margin: 0; color: #000; background: #fff; }
                .next-error-h1 {
                  border-right: 1px solid rgba(0, 0, 0, .3);
                }

                @media (prefers-color-scheme: dark) {
                  body { color: #fff; background: #000; }
                  .next-error-h1 {
                    border-right: 1px solid rgba(255, 255, 255, .3);
                  }
                }
              */ __html: "body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"
        }
    }), /*#__PURE__*/ _react.default.createElement("h1", {
        className: "next-error-h1",
        style: styles.h1
    }, "404"), /*#__PURE__*/ _react.default.createElement("div", {
        style: styles.desc
    }, /*#__PURE__*/ _react.default.createElement("h2", {
        style: styles.h2
    }, "This page could not be found.")))));
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=not-found-error.js.map


/***/ }),

/***/ 79278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/home/ali/trello/node_modules/next/dist/client/components/render-from-template-context.js");
 //# sourceMappingURL=render-from-template-context.js.map


/***/ }),

/***/ 89444:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "createSearchParamsBailoutProxy", ({
    enumerable: true,
    get: function() {
        return createSearchParamsBailoutProxy;
    }
}));
const _staticgenerationbailout = __webpack_require__(46164);
function createSearchParamsBailoutProxy() {
    return new Proxy({}, {
        get (_target, prop) {
            // React adds some properties on the object when serializing for client components
            if (typeof prop === "string") {
                (0, _staticgenerationbailout.staticGenerationBailout)("searchParams." + prop);
            }
        }
    });
}
if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=searchparams-bailout-proxy.js.map


/***/ }),

/***/ 26345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* __next_internal_client_entry_do_not_use__  cjs */ 
const { createProxy } = __webpack_require__(61363);
module.exports = createProxy("/home/ali/trello/node_modules/next/dist/client/components/static-generation-searchparams-bailout-provider.js");
 //# sourceMappingURL=static-generation-searchparams-bailout-provider.js.map


/***/ }),

/***/ 15153:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react-dom-server-rendering-stub.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var d = {
    usingClientEntryPoint: !1,
    Events: null,
    Dispatcher: {
        current: null
    }
};
function e(b) {
    for(var a = "https://reactjs.org/docs/error-decoder.html?invariant=" + b, c = 1; c < arguments.length; c++)a += "&args[]=" + encodeURIComponent(arguments[c]);
    return "Minified React error #" + b + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var f = d.Dispatcher;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = d;
exports.createPortal = function() {
    throw Error(e(448));
};
exports.experimental_useFormStatus = function() {
    throw Error(e(248));
};
exports.flushSync = function() {
    throw Error(e(449));
};
exports.preconnect = function(b, a) {
    var c = f.current;
    c && c.preconnect(b, a);
};
exports.prefetchDNS = function(b) {
    var a = f.current;
    a && a.prefetchDNS(b);
};
exports.preinit = function(b, a) {
    var c = f.current;
    c && c.preinit(b, a);
};
exports.preload = function(b, a) {
    var c = f.current;
    c && c.preload(b, a);
};
exports.unstable_batchedUpdates = function(b, a) {
    return b(a);
};
exports.version = "18.3.0-canary-1a001dac6-20230812";


/***/ }),

/***/ 52060:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
    module.exports = __webpack_require__(15153);
} else {}


/***/ }),

/***/ 19200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-server-dom-webpack-server.edge.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var aa = __webpack_require__(62947), ba = __webpack_require__(52060), l = null, m = 0;
function n(a, b) {
    if (0 !== b.byteLength) if (512 < b.byteLength) 0 < m && (a.enqueue(new Uint8Array(l.buffer, 0, m)), l = new Uint8Array(512), m = 0), a.enqueue(b);
    else {
        var d = l.length - m;
        d < b.byteLength && (0 === d ? a.enqueue(l) : (l.set(b.subarray(0, d), m), a.enqueue(l), b = b.subarray(d)), l = new Uint8Array(512), m = 0);
        l.set(b, m);
        m += b.byteLength;
    }
    return !0;
}
var p = new TextEncoder;
function ca(a, b) {
    "function" === typeof a.error ? a.error(b) : a.close();
}
var q = Symbol.for("react.client.reference"), t = Symbol.for("react.server.reference");
function u(a, b, d) {
    return Object.defineProperties(a, {
        $$typeof: {
            value: q
        },
        $$id: {
            value: b
        },
        $$async: {
            value: d
        }
    });
}
var da = Function.prototype.bind, ea = Array.prototype.slice;
function fa() {
    var a = da.apply(this, arguments);
    if (this.$$typeof === t) {
        var b = ea.call(arguments, 1);
        a.$$typeof = t;
        a.$$id = this.$$id;
        a.$$bound = this.$$bound ? this.$$bound.concat(b) : b;
    }
    return a;
}
var ha = Promise.prototype, ia = {
    get: function(a, b) {
        switch(b){
            case "$$typeof":
                return a.$$typeof;
            case "$$id":
                return a.$$id;
            case "$$async":
                return a.$$async;
            case "name":
                return a.name;
            case "displayName":
                return;
            case "defaultProps":
                return;
            case "toJSON":
                return;
            case Symbol.toPrimitive:
                return Object.prototype[Symbol.toPrimitive];
            case "Provider":
                throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
        }
        throw Error("Cannot access " + (String(a.name) + "." + String(b)) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
    },
    set: function() {
        throw Error("Cannot assign to a client module from a server module.");
    }
}, ja = {
    get: function(a, b) {
        switch(b){
            case "$$typeof":
                return a.$$typeof;
            case "$$id":
                return a.$$id;
            case "$$async":
                return a.$$async;
            case "name":
                return a.name;
            case "defaultProps":
                return;
            case "toJSON":
                return;
            case Symbol.toPrimitive:
                return Object.prototype[Symbol.toPrimitive];
            case "__esModule":
                var d = a.$$id;
                a.default = u(function() {
                    throw Error("Attempted to call the default export of " + d + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                }, a.$$id + "#", a.$$async);
                return !0;
            case "then":
                if (a.then) return a.then;
                if (a.$$async) return;
                var c = u({}, a.$$id, !0), e = new Proxy(c, ja);
                a.status = "fulfilled";
                a.value = e;
                return a.then = u(function(f) {
                    return Promise.resolve(f(e));
                }, a.$$id + "#then", !1);
        }
        c = a[b];
        c || (c = u(function() {
            throw Error("Attempted to call " + String(b) + "() from the server but " + String(b) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, a.$$id + "#" + b, a.$$async), Object.defineProperty(c, "name", {
            value: b
        }), c = a[b] = new Proxy(c, ia));
        return c;
    },
    getPrototypeOf: function() {
        return ha;
    },
    set: function() {
        throw Error("Cannot assign to a client module from a server module.");
    }
}, pa = {
    prefetchDNS: ka,
    preconnect: la,
    preload: ma,
    preinit: na
};
function ka(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = "D" + a;
            c.has(e) || (c.add(e), b ? w(d, "D", [
                a,
                b
            ]) : w(d, "D", a), x(d));
        }
    }
}
function la(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = null == b || "string" !== typeof b.crossOrigin ? null : "use-credentials" === b.crossOrigin ? "use-credentials" : "";
            e = "C" + (null === e ? "null" : e) + "|" + a;
            c.has(e) || (c.add(e), b ? w(d, "C", [
                a,
                b
            ]) : w(d, "C", a), x(d));
        }
    }
}
function ma(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = "L" + a;
            c.has(e) || (c.add(e), w(d, "L", [
                a,
                b
            ]), x(d));
        }
    }
}
function na(a, b) {
    if ("string" === typeof a) {
        var d = v();
        if (d) {
            var c = d.hints, e = "I" + a;
            c.has(e) || (c.add(e), w(d, "I", [
                a,
                b
            ]), x(d));
        }
    }
}
var qa = ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Dispatcher, ra = "function" === typeof AsyncLocalStorage, sa = ra ? new AsyncLocalStorage : null, C = Symbol.for("react.element"), ta = Symbol.for("react.fragment"), ua = Symbol.for("react.provider"), va = Symbol.for("react.server_context"), wa = Symbol.for("react.forward_ref"), xa = Symbol.for("react.suspense"), ya = Symbol.for("react.suspense_list"), za = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), Aa = Symbol.for("react.default_value"), Ba = Symbol.for("react.memo_cache_sentinel"), Ca = Symbol.iterator, E = null;
function F(a, b) {
    if (a !== b) {
        a.context._currentValue = a.parentValue;
        a = a.parent;
        var d = b.parent;
        if (null === a) {
            if (null !== d) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
        } else {
            if (null === d) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
            F(a, d);
            b.context._currentValue = b.value;
        }
    }
}
function Da(a) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    null !== a && Da(a);
}
function Ea(a) {
    var b = a.parent;
    null !== b && Ea(b);
    a.context._currentValue = a.value;
}
function Fa(a, b) {
    a.context._currentValue = a.parentValue;
    a = a.parent;
    if (null === a) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    a.depth === b.depth ? F(a, b) : Fa(a, b);
}
function Ga(a, b) {
    var d = b.parent;
    if (null === d) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
    a.depth === d.depth ? F(a, d) : Ga(a, d);
    b.context._currentValue = b.value;
}
function Ha(a) {
    var b = E;
    b !== a && (null === b ? Ea(a) : null === a ? Da(b) : b.depth === a.depth ? F(b, a) : b.depth > a.depth ? Fa(b, a) : Ga(b, a), E = a);
}
function Ia(a, b) {
    var d = a._currentValue;
    a._currentValue = b;
    var c = E;
    return E = a = {
        parent: c,
        depth: null === c ? 0 : c.depth + 1,
        context: a,
        parentValue: d,
        value: b
    };
}
var Ja = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`");
function Ka() {}
function La(a, b, d) {
    d = a[d];
    void 0 === d ? a.push(b) : d !== b && (b.then(Ka, Ka), b = d);
    switch(b.status){
        case "fulfilled":
            return b.value;
        case "rejected":
            throw b.reason;
        default:
            if ("string" !== typeof b.status) switch(a = b, a.status = "pending", a.then(function(c) {
                if ("pending" === b.status) {
                    var e = b;
                    e.status = "fulfilled";
                    e.value = c;
                }
            }, function(c) {
                if ("pending" === b.status) {
                    var e = b;
                    e.status = "rejected";
                    e.reason = c;
                }
            }), b.status){
                case "fulfilled":
                    return b.value;
                case "rejected":
                    throw b.reason;
            }
            G = b;
            throw Ja;
    }
}
var G = null;
function Ma() {
    if (null === G) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
    var a = G;
    G = null;
    return a;
}
var H = null, I = 0, J = null;
function Na() {
    var a = J;
    J = null;
    return a;
}
function Oa(a) {
    return a._currentValue;
}
var Sa = {
    useMemo: function(a) {
        return a();
    },
    useCallback: function(a) {
        return a;
    },
    useDebugValue: function() {},
    useDeferredValue: K,
    useTransition: K,
    readContext: Oa,
    useContext: Oa,
    useReducer: K,
    useRef: K,
    useState: K,
    useInsertionEffect: K,
    useLayoutEffect: K,
    useImperativeHandle: K,
    useEffect: K,
    useId: Pa,
    useSyncExternalStore: K,
    useCacheRefresh: function() {
        return Qa;
    },
    useMemoCache: function(a) {
        for(var b = Array(a), d = 0; d < a; d++)b[d] = Ba;
        return b;
    },
    use: Ra
};
function K() {
    throw Error("This Hook is not supported in Server Components.");
}
function Qa() {
    throw Error("Refreshing the cache is not supported in Server Components.");
}
function Pa() {
    if (null === H) throw Error("useId can only be used while React is rendering");
    var a = H.identifierCount++;
    return ":" + H.identifierPrefix + "S" + a.toString(32) + ":";
}
function Ra(a) {
    if (null !== a && "object" === typeof a || "function" === typeof a) {
        if ("function" === typeof a.then) {
            var b = I;
            I += 1;
            null === J && (J = []);
            return La(J, a, b);
        }
        if (a.$$typeof === va) return a._currentValue;
    }
    throw Error("An unsupported type was passed to use(): " + String(a));
}
function Ta() {
    return (new AbortController).signal;
}
function Ua() {
    var a = v();
    return a ? a.cache : new Map;
}
var Va = {
    getCacheSignal: function() {
        var a = Ua(), b = a.get(Ta);
        void 0 === b && (b = Ta(), a.set(Ta, b));
        return b;
    },
    getCacheForType: function(a) {
        var b = Ua(), d = b.get(a);
        void 0 === d && (d = a(), b.set(a, d));
        return d;
    }
}, Wa = Array.isArray;
function Xa(a) {
    return Object.prototype.toString.call(a).replace(/^\[object (.*)\]$/, function(b, d) {
        return d;
    });
}
function Ya(a) {
    switch(typeof a){
        case "string":
            return JSON.stringify(10 >= a.length ? a : a.slice(0, 10) + "...");
        case "object":
            if (Wa(a)) return "[...]";
            a = Xa(a);
            return "Object" === a ? "{...}" : a;
        case "function":
            return "function";
        default:
            return String(a);
    }
}
function L(a) {
    if ("string" === typeof a) return a;
    switch(a){
        case xa:
            return "Suspense";
        case ya:
            return "SuspenseList";
    }
    if ("object" === typeof a) switch(a.$$typeof){
        case wa:
            return L(a.render);
        case za:
            return L(a.type);
        case D:
            var b = a._payload;
            a = a._init;
            try {
                return L(a(b));
            } catch (d) {}
    }
    return "";
}
function M(a, b) {
    var d = Xa(a);
    if ("Object" !== d && "Array" !== d) return d;
    d = -1;
    var c = 0;
    if (Wa(a)) {
        var e = "[";
        for(var f = 0; f < a.length; f++){
            0 < f && (e += ", ");
            var g = a[f];
            g = "object" === typeof g && null !== g ? M(g) : Ya(g);
            "" + f === b ? (d = e.length, c = g.length, e += g) : e = 10 > g.length && 40 > e.length + g.length ? e + g : e + "...";
        }
        e += "]";
    } else if (a.$$typeof === C) e = "<" + L(a.type) + "/>";
    else {
        e = "{";
        f = Object.keys(a);
        for(g = 0; g < f.length; g++){
            0 < g && (e += ", ");
            var k = f[g], h = JSON.stringify(k);
            e += ('"' + k + '"' === h ? k : h) + ": ";
            h = a[k];
            h = "object" === typeof h && null !== h ? M(h) : Ya(h);
            k === b ? (d = e.length, c = h.length, e += h) : e = 10 > h.length && 40 > e.length + h.length ? e + h : e + "...";
        }
        e += "}";
    }
    return void 0 === b ? e : -1 < d && 0 < c ? (a = " ".repeat(d) + "^".repeat(c), "\n  " + e + "\n  " + a) : "\n  " + e;
}
var Za = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, $a = Za.ContextRegistry, N = JSON.stringify, ab = Za.ReactCurrentDispatcher, bb = Za.ReactCurrentCache;
function cb(a) {
    console.error(a);
}
function db(a, b, d, c, e) {
    if (null !== bb.current && bb.current !== Va) throw Error("Currently React only supports one RSC renderer at a time.");
    qa.current = pa;
    bb.current = Va;
    var f = new Set, g = [], k = new Set, h = {
        status: 0,
        flushScheduled: !1,
        fatalError: null,
        destination: null,
        bundlerConfig: b,
        cache: new Map,
        nextChunkId: 0,
        pendingChunks: 0,
        hints: k,
        abortableTasks: f,
        pingedTasks: g,
        completedImportChunks: [],
        completedHintChunks: [],
        completedRegularChunks: [],
        completedErrorChunks: [],
        writtenSymbols: new Map,
        writtenClientReferences: new Map,
        writtenServerReferences: new Map,
        writtenProviders: new Map,
        identifierPrefix: e || "",
        identifierCount: 1,
        onError: void 0 === d ? cb : d,
        toJSON: function(r, y) {
            return eb(h, this, r, y);
        }
    };
    h.pendingChunks++;
    b = fb(c);
    a = gb(h, a, b, f);
    g.push(a);
    return h;
}
var O = null;
function v() {
    if (O) return O;
    if (ra) {
        var a = sa.getStore();
        if (a) return a;
    }
    return null;
}
var hb = {};
function ib(a, b) {
    a.pendingChunks++;
    var d = gb(a, null, E, a.abortableTasks);
    switch(b.status){
        case "fulfilled":
            return d.model = b.value, jb(a, d), d.id;
        case "rejected":
            var c = P(a, b.reason);
            Q(a, d.id, c);
            return d.id;
        default:
            "string" !== typeof b.status && (b.status = "pending", b.then(function(e) {
                "pending" === b.status && (b.status = "fulfilled", b.value = e);
            }, function(e) {
                "pending" === b.status && (b.status = "rejected", b.reason = e);
            }));
    }
    b.then(function(e) {
        d.model = e;
        jb(a, d);
    }, function(e) {
        d.status = 4;
        e = P(a, e);
        Q(a, d.id, e);
        null !== a.destination && R(a, a.destination);
    });
    return d.id;
}
function kb(a) {
    if ("fulfilled" === a.status) return a.value;
    if ("rejected" === a.status) throw a.reason;
    throw a;
}
function lb(a) {
    switch(a.status){
        case "fulfilled":
        case "rejected":
            break;
        default:
            "string" !== typeof a.status && (a.status = "pending", a.then(function(b) {
                "pending" === a.status && (a.status = "fulfilled", a.value = b);
            }, function(b) {
                "pending" === a.status && (a.status = "rejected", a.reason = b);
            }));
    }
    return {
        $$typeof: D,
        _payload: a,
        _init: kb
    };
}
function S(a, b, d, c, e, f) {
    if (null !== c && void 0 !== c) throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
    if ("function" === typeof b) {
        if (b.$$typeof === q) return [
            C,
            b,
            d,
            e
        ];
        I = 0;
        J = f;
        e = b(e);
        return "object" === typeof e && null !== e && "function" === typeof e.then ? "fulfilled" === e.status ? e.value : lb(e) : e;
    }
    if ("string" === typeof b) return [
        C,
        b,
        d,
        e
    ];
    if ("symbol" === typeof b) return b === ta ? e.children : [
        C,
        b,
        d,
        e
    ];
    if (null != b && "object" === typeof b) {
        if (b.$$typeof === q) return [
            C,
            b,
            d,
            e
        ];
        switch(b.$$typeof){
            case D:
                var g = b._init;
                b = g(b._payload);
                return S(a, b, d, c, e, f);
            case wa:
                return a = b.render, I = 0, J = f, a(e, void 0);
            case za:
                return S(a, b.type, d, c, e, f);
            case ua:
                return Ia(b._context, e.value), [
                    C,
                    b,
                    d,
                    {
                        value: e.value,
                        children: e.children,
                        __pop: hb
                    }
                ];
        }
    }
    throw Error("Unsupported Server Component type: " + Ya(b));
}
function jb(a, b) {
    var d = a.pingedTasks;
    d.push(b);
    1 === d.length && (a.flushScheduled = null !== a.destination, setTimeout(function() {
        return mb(a);
    }, 0));
}
function gb(a, b, d, c) {
    var e = {
        id: a.nextChunkId++,
        status: 0,
        model: b,
        context: d,
        ping: function() {
            return jb(a, e);
        },
        thenableState: null
    };
    c.add(e);
    return e;
}
function T(a) {
    return "$" + a.toString(16);
}
function nb(a, b, d, c) {
    var e = c.$$async ? c.$$id + "#async" : c.$$id, f = a.writtenClientReferences, g = f.get(e);
    if (void 0 !== g) return b[0] === C && "1" === d ? "$L" + g.toString(16) : T(g);
    try {
        var k = a.bundlerConfig, h = c.$$id;
        g = "";
        var r = k[h];
        if (r) g = r.name;
        else {
            var y = h.lastIndexOf("#");
            -1 !== y && (g = h.slice(y + 1), r = k[h.slice(0, y)]);
            if (!r) throw Error('Could not find the module "' + h + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
        }
        var z = {
            id: r.id,
            chunks: r.chunks,
            name: g,
            async: !!c.$$async
        };
        a.pendingChunks++;
        var A = a.nextChunkId++, oa = N(z), B = A.toString(16) + ":I" + oa + "\n";
        var Fb = p.encode(B);
        a.completedImportChunks.push(Fb);
        f.set(e, A);
        return b[0] === C && "1" === d ? "$L" + A.toString(16) : T(A);
    } catch (Gb) {
        return a.pendingChunks++, b = a.nextChunkId++, d = P(a, Gb), Q(a, b, d), T(b);
    }
}
function ob(a, b) {
    a.pendingChunks++;
    var d = a.nextChunkId++;
    b = pb(a, d, b);
    a.completedRegularChunks.push(b);
    return d;
}
function eb(a, b, d, c) {
    switch(c){
        case C:
            return "$";
    }
    for(; "object" === typeof c && null !== c && (c.$$typeof === C || c.$$typeof === D);)try {
        switch(c.$$typeof){
            case C:
                var e = c;
                c = S(a, e.type, e.key, e.ref, e.props, null);
                break;
            case D:
                var f = c._init;
                c = f(c._payload);
        }
    } catch (g) {
        d = g === Ja ? Ma() : g;
        if ("object" === typeof d && null !== d && "function" === typeof d.then) return a.pendingChunks++, a = gb(a, c, E, a.abortableTasks), c = a.ping, d.then(c, c), a.thenableState = Na(), "$L" + a.id.toString(16);
        a.pendingChunks++;
        c = a.nextChunkId++;
        d = P(a, d);
        Q(a, c, d);
        return "$L" + c.toString(16);
    }
    if (null === c) return null;
    if ("object" === typeof c) {
        if (c.$$typeof === q) return nb(a, b, d, c);
        if ("function" === typeof c.then) return "$@" + ib(a, c).toString(16);
        if (c.$$typeof === ua) return c = c._context._globalName, b = a.writtenProviders, d = b.get(d), void 0 === d && (a.pendingChunks++, d = a.nextChunkId++, b.set(c, d), c = qb(a, d, "$P" + c), a.completedRegularChunks.push(c)), T(d);
        if (c === hb) {
            a = E;
            if (null === a) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
            c = a.parentValue;
            a.context._currentValue = c === Aa ? a.context._defaultValue : c;
            E = a.parent;
            return;
        }
        return c instanceof Map ? "$Q" + ob(a, Array.from(c)).toString(16) : c instanceof Set ? "$W" + ob(a, Array.from(c)).toString(16) : !Wa(c) && (null === c || "object" !== typeof c ? a = null : (a = Ca && c[Ca] || c["@@iterator"], a = "function" === typeof a ? a : null), a) ? Array.from(c) : c;
    }
    if ("string" === typeof c) {
        if ("Z" === c[c.length - 1] && b[d] instanceof Date) return "$D" + c;
        if (1024 <= c.length) return a.pendingChunks += 2, d = a.nextChunkId++, c = p.encode(c), b = c.byteLength, b = d.toString(16) + ":T" + b.toString(16) + ",", b = p.encode(b), a.completedRegularChunks.push(b, c), T(d);
        a = "$" === c[0] ? "$" + c : c;
        return a;
    }
    if ("boolean" === typeof c) return c;
    if ("number" === typeof c) return a = c, Number.isFinite(a) ? 0 === a && -Infinity === 1 / a ? "$-0" : a : Infinity === a ? "$Infinity" : -Infinity === a ? "$-Infinity" : "$NaN";
    if ("undefined" === typeof c) return "$undefined";
    if ("function" === typeof c) {
        if (c.$$typeof === q) return nb(a, b, d, c);
        if (c.$$typeof === t) return d = a.writtenServerReferences, b = d.get(c), void 0 !== b ? a = "$F" + b.toString(16) : (b = c.$$bound, b = {
            id: c.$$id,
            bound: b ? Promise.resolve(b) : null
        }, a = ob(a, b), d.set(c, a), a = "$F" + a.toString(16)), a;
        if (/^on[A-Z]/.test(d)) throw Error("Event handlers cannot be passed to Client Component props." + M(b, d) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
        throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".' + M(b, d));
    }
    if ("symbol" === typeof c) {
        e = a.writtenSymbols;
        f = e.get(c);
        if (void 0 !== f) return T(f);
        f = c.description;
        if (Symbol.for(f) !== c) throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + (c.description + ") cannot be found among global symbols.") + M(b, d));
        a.pendingChunks++;
        d = a.nextChunkId++;
        b = qb(a, d, "$S" + f);
        a.completedImportChunks.push(b);
        e.set(c, d);
        return T(d);
    }
    if ("bigint" === typeof c) return "$n" + c.toString(10);
    throw Error("Type " + typeof c + " is not supported in Client Component props." + M(b, d));
}
function P(a, b) {
    a = a.onError;
    b = a(b);
    if (null != b && "string" !== typeof b) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof b + '" instead');
    return b || "";
}
function rb(a, b) {
    null !== a.destination ? (a.status = 2, ca(a.destination, b)) : (a.status = 1, a.fatalError = b);
}
function Q(a, b, d) {
    d = {
        digest: d
    };
    b = b.toString(16) + ":E" + N(d) + "\n";
    b = p.encode(b);
    a.completedErrorChunks.push(b);
}
function w(a, b, d) {
    var c = a.nextChunkId++;
    d = N(d);
    b = "H" + b;
    c = c.toString(16) + ":" + b;
    c = p.encode(c + d + "\n");
    a.completedHintChunks.push(c);
}
function mb(a) {
    var b = ab.current;
    ab.current = Sa;
    var d = O;
    H = O = a;
    try {
        var c = a.pingedTasks;
        a.pingedTasks = [];
        for(var e = 0; e < c.length; e++){
            var f = c[e];
            var g = a;
            if (0 === f.status) {
                Ha(f.context);
                try {
                    var k = f.model;
                    if ("object" === typeof k && null !== k && k.$$typeof === C) {
                        var h = k, r = f.thenableState;
                        f.model = k;
                        k = S(g, h.type, h.key, h.ref, h.props, r);
                        for(f.thenableState = null; "object" === typeof k && null !== k && k.$$typeof === C;)h = k, f.model = k, k = S(g, h.type, h.key, h.ref, h.props, null);
                    }
                    var y = pb(g, f.id, k);
                    g.completedRegularChunks.push(y);
                    g.abortableTasks.delete(f);
                    f.status = 1;
                } catch (B) {
                    var z = B === Ja ? Ma() : B;
                    if ("object" === typeof z && null !== z && "function" === typeof z.then) {
                        var A = f.ping;
                        z.then(A, A);
                        f.thenableState = Na();
                    } else {
                        g.abortableTasks.delete(f);
                        f.status = 4;
                        var oa = P(g, z);
                        Q(g, f.id, oa);
                    }
                }
            }
        }
        null !== a.destination && R(a, a.destination);
    } catch (B) {
        P(a, B), rb(a, B);
    } finally{
        ab.current = b, H = null, O = d;
    }
}
function R(a, b) {
    l = new Uint8Array(512);
    m = 0;
    try {
        for(var d = a.completedImportChunks, c = 0; c < d.length; c++)a.pendingChunks--, n(b, d[c]);
        d.splice(0, c);
        var e = a.completedHintChunks;
        for(c = 0; c < e.length; c++)n(b, e[c]);
        e.splice(0, c);
        var f = a.completedRegularChunks;
        for(c = 0; c < f.length; c++)a.pendingChunks--, n(b, f[c]);
        f.splice(0, c);
        var g = a.completedErrorChunks;
        for(c = 0; c < g.length; c++)a.pendingChunks--, n(b, g[c]);
        g.splice(0, c);
    } finally{
        a.flushScheduled = !1, l && 0 < m && (b.enqueue(new Uint8Array(l.buffer, 0, m)), l = null, m = 0);
    }
    0 === a.pendingChunks && b.close();
}
function sb(a) {
    a.flushScheduled = null !== a.destination;
    ra ? setTimeout(function() {
        return sa.run(a, mb, a);
    }, 0) : setTimeout(function() {
        return mb(a);
    }, 0);
}
function x(a) {
    if (!1 === a.flushScheduled && 0 === a.pingedTasks.length && null !== a.destination) {
        var b = a.destination;
        a.flushScheduled = !0;
        setTimeout(function() {
            return R(a, b);
        }, 0);
    }
}
function tb(a, b) {
    try {
        var d = a.abortableTasks;
        if (0 < d.size) {
            var c = P(a, void 0 === b ? Error("The render was aborted by the server without a reason.") : b);
            a.pendingChunks++;
            var e = a.nextChunkId++;
            Q(a, e, c);
            d.forEach(function(f) {
                f.status = 3;
                var g = T(e);
                f = qb(a, f.id, g);
                a.completedErrorChunks.push(f);
            });
            d.clear();
        }
        null !== a.destination && R(a, a.destination);
    } catch (f) {
        P(a, f), rb(a, f);
    }
}
function fb(a) {
    if (a) {
        var b = E;
        Ha(null);
        for(var d = 0; d < a.length; d++){
            var c = a[d], e = c[0];
            c = c[1];
            $a[e] || ($a[e] = aa.createServerContext(e, Aa));
            Ia($a[e], c);
        }
        a = E;
        Ha(b);
        return a;
    }
    return null;
}
function pb(a, b, d) {
    a = N(d, a.toJSON);
    b = b.toString(16) + ":" + a + "\n";
    return p.encode(b);
}
function qb(a, b, d) {
    a = N(d);
    b = b.toString(16) + ":" + a + "\n";
    return p.encode(b);
}
function ub(a, b) {
    var d = "", c = a[b];
    if (c) d = c.name;
    else {
        var e = b.lastIndexOf("#");
        -1 !== e && (d = b.slice(e + 1), c = a[b.slice(0, e)]);
        if (!c) throw Error('Could not find the module "' + b + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
    }
    return {
        id: c.id,
        chunks: c.chunks,
        name: d,
        async: !1
    };
}
var U = new Map;
function vb(a) {
    var b = globalThis.__next_require__(a);
    if ("function" !== typeof b.then || "fulfilled" === b.status) return null;
    b.then(function(d) {
        b.status = "fulfilled";
        b.value = d;
    }, function(d) {
        b.status = "rejected";
        b.reason = d;
    });
    return b;
}
function wb() {}
function xb(a) {
    for(var b = a.chunks, d = [], c = 0; c < b.length; c++){
        var e = b[c], f = U.get(e);
        if (void 0 === f) {
            f = globalThis.__next_chunk_load__(e);
            d.push(f);
            var g = U.set.bind(U, e, null);
            f.then(g, wb);
            U.set(e, f);
        } else null !== f && d.push(f);
    }
    return a.async ? 0 === d.length ? vb(a.id) : Promise.all(d).then(function() {
        return vb(a.id);
    }) : 0 < d.length ? Promise.all(d) : null;
}
function V(a) {
    var b = globalThis.__next_require__(a.id);
    if (a.async && "function" === typeof b.then) if ("fulfilled" === b.status) b = b.value;
    else throw b.reason;
    return "*" === a.name ? b : "" === a.name ? b.__esModule ? b.default : b : b[a.name];
}
function W(a, b, d, c) {
    this.status = a;
    this.value = b;
    this.reason = d;
    this._response = c;
}
W.prototype = Object.create(Promise.prototype);
W.prototype.then = function(a, b) {
    switch(this.status){
        case "resolved_model":
            yb(this);
    }
    switch(this.status){
        case "fulfilled":
            a(this.value);
            break;
        case "pending":
        case "blocked":
            a && (null === this.value && (this.value = []), this.value.push(a));
            b && (null === this.reason && (this.reason = []), this.reason.push(b));
            break;
        default:
            b(this.reason);
    }
};
function zb(a, b) {
    for(var d = 0; d < a.length; d++)(0, a[d])(b);
}
function Ab(a, b) {
    if ("pending" === a.status || "blocked" === a.status) {
        var d = a.reason;
        a.status = "rejected";
        a.reason = b;
        null !== d && zb(d, b);
    }
}
function Bb(a, b, d, c, e, f) {
    var g = ub(a._bundlerConfig, b);
    a = xb(g);
    if (d) d = Promise.all([
        d,
        a
    ]).then(function(k) {
        k = k[0];
        var h = V(g);
        return h.bind.apply(h, [
            null
        ].concat(k));
    });
    else if (a) d = Promise.resolve(a).then(function() {
        return V(g);
    });
    else return V(g);
    d.then(Cb(c, e, f), Db(c));
    return null;
}
var X = null, Y = null;
function yb(a) {
    var b = X, d = Y;
    X = a;
    Y = null;
    try {
        var c = JSON.parse(a.value, a._response._fromJSON);
        null !== Y && 0 < Y.deps ? (Y.value = c, a.status = "blocked", a.value = null, a.reason = null) : (a.status = "fulfilled", a.value = c);
    } catch (e) {
        a.status = "rejected", a.reason = e;
    } finally{
        X = b, Y = d;
    }
}
function Eb(a, b) {
    a._chunks.forEach(function(d) {
        "pending" === d.status && Ab(d, b);
    });
}
function Z(a, b) {
    var d = a._chunks, c = d.get(b);
    c || (c = a._formData.get(a._prefix + b), c = null != c ? new W("resolved_model", c, null, a) : new W("pending", null, null, a), d.set(b, c));
    return c;
}
function Cb(a, b, d) {
    if (Y) {
        var c = Y;
        c.deps++;
    } else c = Y = {
        deps: 1,
        value: null
    };
    return function(e) {
        b[d] = e;
        c.deps--;
        0 === c.deps && "blocked" === a.status && (e = a.value, a.status = "fulfilled", a.value = c.value, null !== e && zb(e, c.value));
    };
}
function Db(a) {
    return function(b) {
        return Ab(a, b);
    };
}
function Hb(a, b) {
    a = Z(a, b);
    "resolved_model" === a.status && yb(a);
    if ("fulfilled" !== a.status) throw a.reason;
    return a.value;
}
function Ib(a, b, d, c) {
    if ("$" === c[0]) switch(c[1]){
        case "$":
            return c.slice(1);
        case "@":
            return b = parseInt(c.slice(2), 16), Z(a, b);
        case "S":
            return Symbol.for(c.slice(2));
        case "F":
            return c = parseInt(c.slice(2), 16), c = Hb(a, c), Bb(a, c.id, c.bound, X, b, d);
        case "Q":
            return b = parseInt(c.slice(2), 16), a = Hb(a, b), new Map(a);
        case "W":
            return b = parseInt(c.slice(2), 16), a = Hb(a, b), new Set(a);
        case "K":
            b = c.slice(2);
            var e = a._prefix + b + "_", f = new FormData;
            a._formData.forEach(function(g, k) {
                k.startsWith(e) && f.append(k.slice(e.length), g);
            });
            return f;
        case "I":
            return Infinity;
        case "-":
            return "$-0" === c ? -0 : -Infinity;
        case "N":
            return NaN;
        case "u":
            return;
        case "D":
            return new Date(Date.parse(c.slice(2)));
        case "n":
            return BigInt(c.slice(2));
        default:
            c = parseInt(c.slice(1), 16);
            a = Z(a, c);
            switch(a.status){
                case "resolved_model":
                    yb(a);
            }
            switch(a.status){
                case "fulfilled":
                    return a.value;
                case "pending":
                case "blocked":
                    return c = X, a.then(Cb(c, b, d), Db(c)), null;
                default:
                    throw a.reason;
            }
    }
    return c;
}
function Jb(a, b) {
    var d = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : new FormData, c = new Map, e = {
        _bundlerConfig: a,
        _prefix: b,
        _formData: d,
        _chunks: c,
        _fromJSON: function(f, g) {
            return "string" === typeof g ? Ib(e, this, f, g) : g;
        }
    };
    return e;
}
function Kb(a) {
    Eb(a, Error("Connection closed."));
}
function Lb(a, b, d) {
    var c = ub(a, b);
    a = xb(c);
    return d ? Promise.all([
        d,
        a
    ]).then(function(e) {
        e = e[0];
        var f = V(c);
        return f.bind.apply(f, [
            null
        ].concat(e));
    }) : a ? Promise.resolve(a).then(function() {
        return V(c);
    }) : Promise.resolve(V(c));
}
exports.createClientModuleProxy = function(a) {
    a = u({}, a, !1);
    return new Proxy(a, ja);
};
exports.decodeAction = function(a, b) {
    var d = new FormData, c = null;
    a.forEach(function(e, f) {
        if (f.startsWith("$ACTION_")) if (f.startsWith("$ACTION_REF_")) {
            e = "$ACTION_" + f.slice(12) + ":";
            e = Jb(b, e, a);
            Kb(e);
            e = Z(e, 0);
            e.then(function() {});
            if ("fulfilled" !== e.status) throw e.reason;
            e = e.value;
            c = Lb(b, e.id, e.bound);
        } else f.startsWith("$ACTION_ID_") && (e = f.slice(11), c = Lb(b, e, null));
        else d.append(f, e);
    });
    return null === c ? null : c.then(function(e) {
        return e.bind(null, d);
    });
};
exports.decodeReply = function(a, b) {
    if ("string" === typeof a) {
        var d = new FormData;
        d.append("0", a);
        a = d;
    }
    a = Jb(b, "", a);
    Kb(a);
    return Z(a, 0);
};
exports.registerClientReference = function(a, b, d) {
    return u(a, b + "#" + d, !1);
};
exports.registerServerReference = function(a, b, d) {
    return Object.defineProperties(a, {
        $$typeof: {
            value: t
        },
        $$id: {
            value: null === d ? b : b + "#" + d
        },
        $$bound: {
            value: null
        },
        bind: {
            value: fa
        }
    });
};
exports.renderToReadableStream = function(a, b, d) {
    var c = db(a, b, d ? d.onError : void 0, d ? d.context : void 0, d ? d.identifierPrefix : void 0);
    if (d && d.signal) {
        var e = d.signal;
        if (e.aborted) tb(c, e.reason);
        else {
            var f = function() {
                tb(c, e.reason);
                e.removeEventListener("abort", f);
            };
            e.addEventListener("abort", f);
        }
    }
    return new ReadableStream({
        type: "bytes",
        start: function() {
            sb(c);
        },
        pull: function(g) {
            if (1 === c.status) c.status = 2, ca(g, c.fatalError);
            else if (2 !== c.status && null === c.destination) {
                c.destination = g;
                try {
                    R(c, g);
                } catch (k) {
                    P(c, k), rb(c, k);
                }
            }
        },
        cancel: function() {}
    }, {
        highWaterMark: 0
    });
};


/***/ }),

/***/ 89642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
    module.exports = __webpack_require__(19200);
} else {}


/***/ }),

/***/ 29446:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.shared-subset.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
var m = Object.assign, n = {
    current: null
};
function p() {
    return new Map;
}
if ("function" === typeof fetch) {
    var q = fetch, r = function(a, b) {
        var d = n.current;
        if (!d || b && b.signal && b.signal !== d.getCacheSignal()) return q(a, b);
        if ("string" !== typeof a || b) {
            var c = "string" === typeof a || a instanceof URL ? new Request(a, b) : a;
            if ("GET" !== c.method && "HEAD" !== c.method || c.keepalive) return q(a, b);
            var e = JSON.stringify([
                c.method,
                Array.from(c.headers.entries()),
                c.mode,
                c.redirect,
                c.credentials,
                c.referrer,
                c.referrerPolicy,
                c.integrity
            ]);
            c = c.url;
        } else e = '["GET",[],null,"follow",null,null,null,null]', c = a;
        var f = d.getCacheForType(p);
        d = f.get(c);
        if (void 0 === d) a = q(a, b), f.set(c, [
            e,
            a
        ]);
        else {
            c = 0;
            for(f = d.length; c < f; c += 2){
                var h = d[c + 1];
                if (d[c] === e) return a = h, a.then(function(g) {
                    return g.clone();
                });
            }
            a = q(a, b);
            d.push(e, a);
        }
        return a.then(function(g) {
            return g.clone();
        });
    };
    m(r, q);
    try {
        fetch = r;
    } catch (a) {
        try {
            globalThis.fetch = r;
        } catch (b) {
            console.warn("React was unable to patch the fetch() function in this environment. Suspensey APIs might not work correctly as a result.");
        }
    }
}
var t = Symbol.for("react.element"), u = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), z = Symbol.for("react.server_context"), A = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), C = Symbol.for("react.memo"), aa = Symbol.for("react.lazy"), D = Symbol.for("react.default_value"), E = Symbol.iterator;
function ba(a) {
    if (null === a || "object" !== typeof a) return null;
    a = E && a[E] || a["@@iterator"];
    return "function" === typeof a ? a : null;
}
function F(a) {
    for(var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, d = 1; d < arguments.length; d++)b += "&args[]=" + encodeURIComponent(arguments[d]);
    return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var G = {
    isMounted: function() {
        return !1;
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}, H = {};
function I(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
I.prototype.isReactComponent = {};
I.prototype.setState = function(a, b) {
    if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(F(85));
    this.updater.enqueueSetState(this, a, b, "setState");
};
I.prototype.forceUpdate = function(a) {
    this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function J() {}
J.prototype = I.prototype;
function K(a, b, d) {
    this.props = a;
    this.context = b;
    this.refs = H;
    this.updater = d || G;
}
var L = K.prototype = new J;
L.constructor = K;
m(L, I.prototype);
L.isPureReactComponent = !0;
var M = Array.isArray, N = Object.prototype.hasOwnProperty, O = {
    current: null
}, P = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function ca(a, b) {
    return {
        $$typeof: t,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner
    };
}
function Q(a) {
    return "object" === typeof a && null !== a && a.$$typeof === t;
}
function escape(a) {
    var b = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + a.replace(/[=:]/g, function(d) {
        return b[d];
    });
}
var R = /\/+/g;
function S(a, b) {
    return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function T(a, b, d, c, e) {
    var f = typeof a;
    if ("undefined" === f || "boolean" === f) a = null;
    var h = !1;
    if (null === a) h = !0;
    else switch(f){
        case "string":
        case "number":
            h = !0;
            break;
        case "object":
            switch(a.$$typeof){
                case t:
                case u:
                    h = !0;
            }
    }
    if (h) return h = a, e = e(h), a = "" === c ? "." + S(h, 0) : c, M(e) ? (d = "", null != a && (d = a.replace(R, "$&/") + "/"), T(e, b, d, "", function(l) {
        return l;
    })) : null != e && (Q(e) && (e = ca(e, d + (!e.key || h && h.key === e.key ? "" : ("" + e.key).replace(R, "$&/") + "/") + a)), b.push(e)), 1;
    h = 0;
    c = "" === c ? "." : c + ":";
    if (M(a)) for(var g = 0; g < a.length; g++){
        f = a[g];
        var k = c + S(f, g);
        h += T(f, b, d, k, e);
    }
    else if (k = ba(a), "function" === typeof k) for(a = k.call(a), g = 0; !(f = a.next()).done;)f = f.value, k = c + S(f, g++), h += T(f, b, d, k, e);
    else if ("object" === f) throw b = String(a), Error(F(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
    return h;
}
function U(a, b, d) {
    if (null == a) return a;
    var c = [], e = 0;
    T(a, c, "", "", function(f) {
        return b.call(d, f, e++);
    });
    return c;
}
function da(a) {
    if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(d) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = d;
        }, function(d) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = d;
        });
        -1 === a._status && (a._status = 0, a._result = b);
    }
    if (1 === a._status) return a._result.default;
    throw a._result;
}
function ea() {
    return new WeakMap;
}
function V() {
    return {
        s: 0,
        v: void 0,
        o: null,
        p: null
    };
}
var W = {
    current: null
}, X = {
    transition: null
}, Y = {
    ReactCurrentDispatcher: W,
    ReactCurrentCache: n,
    ReactCurrentBatchConfig: X,
    ReactCurrentOwner: O,
    ContextRegistry: {}
}, Z = Y.ContextRegistry;
exports.Children = {
    map: U,
    forEach: function(a, b, d) {
        U(a, function() {
            b.apply(this, arguments);
        }, d);
    },
    count: function(a) {
        var b = 0;
        U(a, function() {
            b++;
        });
        return b;
    },
    toArray: function(a) {
        return U(a, function(b) {
            return b;
        }) || [];
    },
    only: function(a) {
        if (!Q(a)) throw Error(F(143));
        return a;
    }
};
exports.Fragment = v;
exports.Profiler = x;
exports.StrictMode = w;
exports.Suspense = B;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y;
exports.cache = function(a) {
    return function() {
        var b = n.current;
        if (!b) return a.apply(null, arguments);
        var d = b.getCacheForType(ea);
        b = d.get(a);
        void 0 === b && (b = V(), d.set(a, b));
        d = 0;
        for(var c = arguments.length; d < c; d++){
            var e = arguments[d];
            if ("function" === typeof e || "object" === typeof e && null !== e) {
                var f = b.o;
                null === f && (b.o = f = new WeakMap);
                b = f.get(e);
                void 0 === b && (b = V(), f.set(e, b));
            } else f = b.p, null === f && (b.p = f = new Map), b = f.get(e), void 0 === b && (b = V(), f.set(e, b));
        }
        if (1 === b.s) return b.v;
        if (2 === b.s) throw b.v;
        try {
            var h = a.apply(null, arguments);
            d = b;
            d.s = 1;
            return d.v = h;
        } catch (g) {
            throw h = b, h.s = 2, h.v = g, g;
        }
    };
};
exports.cloneElement = function(a, b, d) {
    if (null === a || void 0 === a) throw Error(F(267, a));
    var c = m({}, a.props), e = a.key, f = a.ref, h = a._owner;
    if (null != b) {
        void 0 !== b.ref && (f = b.ref, h = O.current);
        void 0 !== b.key && (e = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for(k in b)N.call(b, k) && !P.hasOwnProperty(k) && (c[k] = void 0 === b[k] && void 0 !== g ? g[k] : b[k]);
    }
    var k = arguments.length - 2;
    if (1 === k) c.children = d;
    else if (1 < k) {
        g = Array(k);
        for(var l = 0; l < k; l++)g[l] = arguments[l + 2];
        c.children = g;
    }
    return {
        $$typeof: t,
        type: a.type,
        key: e,
        ref: f,
        props: c,
        _owner: h
    };
};
exports.createElement = function(a, b, d) {
    var c, e = {}, f = null, h = null;
    if (null != b) for(c in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (f = "" + b.key), b)N.call(b, c) && !P.hasOwnProperty(c) && (e[c] = b[c]);
    var g = arguments.length - 2;
    if (1 === g) e.children = d;
    else if (1 < g) {
        for(var k = Array(g), l = 0; l < g; l++)k[l] = arguments[l + 2];
        e.children = k;
    }
    if (a && a.defaultProps) for(c in g = a.defaultProps, g)void 0 === e[c] && (e[c] = g[c]);
    return {
        $$typeof: t,
        type: a,
        key: f,
        ref: h,
        props: e,
        _owner: O.current
    };
};
exports.createRef = function() {
    return {
        current: null
    };
};
exports.createServerContext = function(a, b) {
    var d = !0;
    if (!Z[a]) {
        d = !1;
        var c = {
            $$typeof: z,
            _currentValue: b,
            _currentValue2: b,
            _defaultValue: b,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _globalName: a
        };
        c.Provider = {
            $$typeof: y,
            _context: c
        };
        Z[a] = c;
    }
    c = Z[a];
    if (c._defaultValue === D) c._defaultValue = b, c._currentValue === D && (c._currentValue = b), c._currentValue2 === D && (c._currentValue2 = b);
    else if (d) throw Error(F(429, a));
    return c;
};
exports.forwardRef = function(a) {
    return {
        $$typeof: A,
        render: a
    };
};
exports.isValidElement = Q;
exports.lazy = function(a) {
    return {
        $$typeof: aa,
        _payload: {
            _status: -1,
            _result: a
        },
        _init: da
    };
};
exports.memo = function(a, b) {
    return {
        $$typeof: C,
        type: a,
        compare: void 0 === b ? null : b
    };
};
exports.startTransition = function(a) {
    var b = X.transition;
    X.transition = {};
    try {
        a();
    } finally{
        X.transition = b;
    }
};
exports.use = function(a) {
    return W.current.use(a);
};
exports.useCallback = function(a, b) {
    return W.current.useCallback(a, b);
};
exports.useContext = function(a) {
    return W.current.useContext(a);
};
exports.useDebugValue = function() {};
exports.useId = function() {
    return W.current.useId();
};
exports.useMemo = function(a, b) {
    return W.current.useMemo(a, b);
};
exports.version = "18.3.0-canary-1a001dac6-20230812";


/***/ }),

/***/ 62947:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
    module.exports = __webpack_require__(29446);
} else {}


/***/ }),

/***/ 12502:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppRouter: function() {
        return AppRouter;
    },
    LayoutRouter: function() {
        return LayoutRouter;
    },
    RenderFromTemplateContext: function() {
        return RenderFromTemplateContext;
    },
    staticGenerationAsyncStorage: function() {
        return staticGenerationAsyncStorage;
    },
    requestAsyncStorage: function() {
        return requestAsyncStorage;
    },
    actionAsyncStorage: function() {
        return actionAsyncStorage;
    },
    staticGenerationBailout: function() {
        return staticGenerationBailout;
    },
    createSearchParamsBailoutProxy: function() {
        return createSearchParamsBailoutProxy;
    },
    serverHooks: function() {
        return serverHooks;
    },
    renderToReadableStream: function() {
        return renderToReadableStream;
    },
    decodeReply: function() {
        return decodeReply;
    },
    decodeAction: function() {
        return decodeAction;
    },
    preloadStyle: function() {
        return preloadStyle;
    },
    preloadFont: function() {
        return preloadFont;
    },
    preconnect: function() {
        return preconnect;
    },
    StaticGenerationSearchParamsBailoutProvider: function() {
        return StaticGenerationSearchParamsBailoutProvider;
    },
    NotFoundBoundary: function() {
        return NotFoundBoundary;
    }
});
const { default: AppRouter } = __webpack_require__(38225);
const { default: LayoutRouter } = __webpack_require__(97149);
const { default: RenderFromTemplateContext } = __webpack_require__(79278);
const { staticGenerationAsyncStorage } = __webpack_require__(13539);
const { requestAsyncStorage } = __webpack_require__(1715);
const { actionAsyncStorage } = __webpack_require__(34876);
const { staticGenerationBailout } = __webpack_require__(46164);
const { default: StaticGenerationSearchParamsBailoutProvider } = __webpack_require__(26345);
const { createSearchParamsBailoutProxy } = __webpack_require__(89444);
const serverHooks = __webpack_require__(81651);
const { renderToReadableStream, decodeReply, decodeAction } = __webpack_require__(89642);
const { preloadStyle, preloadFont, preconnect } = __webpack_require__(6167);
const { NotFoundBoundary } = __webpack_require__(26966); //# sourceMappingURL=entry-base.js.map


/***/ }),

/***/ 6167:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*

Files in the rsc directory are meant to be packaged as part of the RSC graph using next-app-loader.

*/ 
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    preloadStyle: function() {
        return preloadStyle;
    },
    preloadFont: function() {
        return preloadFont;
    },
    preconnect: function() {
        return preconnect;
    }
});
const _reactdom = /*#__PURE__*/ _interop_require_default(__webpack_require__(52060));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function preloadStyle(href) {
    _reactdom.default.preload(href, {
        as: "style"
    });
}
function preloadFont(href, type) {
    _reactdom.default.preload(href, {
        as: "font",
        type
    });
}
function preconnect(href, crossOrigin) {
    if (typeof crossOrigin === "string") {
        _reactdom.default.preconnect(href, {
            crossOrigin
        });
    } else {
        _reactdom.default.preconnect(href);
    }
} //# sourceMappingURL=preloads.js.map


/***/ }),

/***/ 7262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AppPageRouteModule: function() {
        return AppPageRouteModule;
    },
    default: function() {
        return _default;
    }
});
const _apprender = __webpack_require__(5868);
const _routemodule = __webpack_require__(75281);
class AppPageRouteModule extends _routemodule.RouteModule {
    render(req, res, context) {
        return (0, _apprender.renderToHTMLOrFlight)(req, res, context.page, context.query, context.renderOpts);
    }
}
const _default = AppPageRouteModule; //# sourceMappingURL=module.js.map


/***/ }),

/***/ 18399:
/***/ (() => {



/***/ }),

/***/ 52451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(80489)


/***/ }),

/***/ 11440:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(50954)


/***/ }),

/***/ 57114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(90696)


/***/ }),

/***/ 28853:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = all;

var _createChainableTypeChecker = __webpack_require__(78095);

var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function all() {
  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  function allPropTypes() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var error = null;

    validators.forEach(function (validator) {
      if (error != null) {
        return;
      }

      var result = validator.apply(undefined, args);
      if (result != null) {
        error = result;
      }
    });

    return error;
  }

  return (0, _createChainableTypeChecker2.default)(allPropTypes);
}
module.exports = exports['default'];

/***/ }),

/***/ 78095:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = createChainableTypeChecker;
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// Mostly taken from ReactPropTypes.

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    var componentNameSafe = componentName || '<<anonymous>>';
    var propFullNameSafe = propFullName || propName;

    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
      }

      return null;
    }

    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      args[_key - 6] = arguments[_key];
    }

    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
module.exports = exports['default'];

/***/ }),

/***/ 94334:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(16066);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 55601:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(94334)();
}


/***/ }),

/***/ 16066:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 26196:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
var _CloseButton = _interopRequireDefault(__webpack_require__(24792));
var _ModalContext = _interopRequireDefault(__webpack_require__(54506));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const AbstractModalHeader = /*#__PURE__*/React.forwardRef(({
  closeLabel = 'Close',
  closeVariant,
  closeButton = false,
  onHide,
  children,
  ...props
}, ref) => {
  const context = (0, React.useContext)(_ModalContext.default);
  const handleClick = (0, _useEventCallback.default)(() => {
    context == null ? void 0 : context.onHide();
    onHide == null ? void 0 : onHide();
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: ref,
    ...props,
    children: [children, closeButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(_CloseButton.default, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick
    })]
  });
});
var _default = AbstractModalHeader;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 30923:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
exports.getSharedManager = getSharedManager;
var _addClass = _interopRequireDefault(__webpack_require__(7994));
var _css = _interopRequireDefault(__webpack_require__(88119));
var _querySelectorAll = _interopRequireDefault(__webpack_require__(73793));
var _removeClass = _interopRequireDefault(__webpack_require__(26339));
var _ModalManager = _interopRequireDefault(__webpack_require__(2206));
const Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
};
class BootstrapModalManager extends _ModalManager.default {
  adjustAndStore(prop, element, adjust) {
    const actual = element.style[prop];
    // TODO: DOMStringMap and CSSStyleDeclaration aren't strictly compatible
    // @ts-ignore
    element.dataset[prop] = actual;
    (0, _css.default)(element, {
      [prop]: `${parseFloat((0, _css.default)(element, prop)) + adjust}px`
    });
  }
  restore(prop, element) {
    const value = element.dataset[prop];
    if (value !== undefined) {
      delete element.dataset[prop];
      (0, _css.default)(element, {
        [prop]: value
      });
    }
  }
  setContainerStyle(containerState) {
    super.setContainerStyle(containerState);
    const container = this.getElement();
    (0, _addClass.default)(container, 'modal-open');
    if (!containerState.scrollBarWidth) return;
    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';
    (0, _querySelectorAll.default)(container, Selector.FIXED_CONTENT).forEach(el => this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth));
    (0, _querySelectorAll.default)(container, Selector.STICKY_CONTENT).forEach(el => this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth));
    (0, _querySelectorAll.default)(container, Selector.NAVBAR_TOGGLER).forEach(el => this.adjustAndStore(marginProp, el, containerState.scrollBarWidth));
  }
  removeContainerStyle(containerState) {
    super.removeContainerStyle(containerState);
    const container = this.getElement();
    (0, _removeClass.default)(container, 'modal-open');
    const paddingProp = this.isRTL ? 'paddingLeft' : 'paddingRight';
    const marginProp = this.isRTL ? 'marginLeft' : 'marginRight';
    (0, _querySelectorAll.default)(container, Selector.FIXED_CONTENT).forEach(el => this.restore(paddingProp, el));
    (0, _querySelectorAll.default)(container, Selector.STICKY_CONTENT).forEach(el => this.restore(marginProp, el));
    (0, _querySelectorAll.default)(container, Selector.NAVBAR_TOGGLER).forEach(el => this.restore(marginProp, el));
  }
}
let sharedManager;
function getSharedManager(options) {
  if (!sharedManager) sharedManager = new BootstrapModalManager(options);
  return sharedManager;
}
var _default = BootstrapModalManager;
exports["default"] = _default;

/***/ }),

/***/ 41108:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const context = /*#__PURE__*/React.createContext(null);
context.displayName = 'CardHeaderContext';
var _default = context;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 24792:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _propTypes = _interopRequireDefault(__webpack_require__(55601));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const propTypes = {
  /** An accessible label indicating the relevant information about the Close Button. */
  'aria-label': _propTypes.default.string,
  /** A callback fired after the Close Button is clicked. */
  onClick: _propTypes.default.func,
  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: _propTypes.default.oneOf(['white'])
};
const CloseButton = /*#__PURE__*/React.forwardRef(({
  className,
  variant,
  'aria-label': ariaLabel = 'Close',
  ...props
}, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  ref: ref,
  type: "button",
  className: (0, _classnames.default)('btn-close', variant && `btn-close-${variant}`, className),
  "aria-label": ariaLabel,
  ...props
}));
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
var _default = CloseButton;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 3311:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var _css = _interopRequireDefault(__webpack_require__(88119));
var _react = _interopRequireWildcard(__webpack_require__(18038));
var _Transition = __webpack_require__(21798);
var _transitionEndListener = _interopRequireDefault(__webpack_require__(38475));
var _createChainedFunction = _interopRequireDefault(__webpack_require__(86524));
var _triggerBrowserReflow = _interopRequireDefault(__webpack_require__(14581));
var _TransitionWrapper = _interopRequireDefault(__webpack_require__(84636));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};
function getDefaultDimensionValue(dimension, elem) {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];
  return value +
  // @ts-ignore
  parseInt((0, _css.default)(elem, margins[0]), 10) +
  // @ts-ignore
  parseInt((0, _css.default)(elem, margins[1]), 10);
}
const collapseStyles = {
  [_Transition.EXITED]: 'collapse',
  [_Transition.EXITING]: 'collapsing',
  [_Transition.ENTERING]: 'collapsing',
  [_Transition.ENTERED]: 'collapse show'
};
const Collapse = /*#__PURE__*/_react.default.forwardRef(({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  className,
  children,
  dimension = 'height',
  in: inProp = false,
  timeout = 300,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  getDimensionValue = getDefaultDimensionValue,
  ...props
}, ref) => {
  /* Compute dimension */
  const computedDimension = typeof dimension === 'function' ? dimension() : dimension;

  /* -- Expanding -- */
  const handleEnter = (0, _react.useMemo)(() => (0, _createChainedFunction.default)(elem => {
    elem.style[computedDimension] = '0';
  }, onEnter), [computedDimension, onEnter]);
  const handleEntering = (0, _react.useMemo)(() => (0, _createChainedFunction.default)(elem => {
    const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(1)}`;
    elem.style[computedDimension] = `${elem[scroll]}px`;
  }, onEntering), [computedDimension, onEntering]);
  const handleEntered = (0, _react.useMemo)(() => (0, _createChainedFunction.default)(elem => {
    elem.style[computedDimension] = null;
  }, onEntered), [computedDimension, onEntered]);

  /* -- Collapsing -- */
  const handleExit = (0, _react.useMemo)(() => (0, _createChainedFunction.default)(elem => {
    elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`;
    (0, _triggerBrowserReflow.default)(elem);
  }, onExit), [onExit, getDimensionValue, computedDimension]);
  const handleExiting = (0, _react.useMemo)(() => (0, _createChainedFunction.default)(elem => {
    elem.style[computedDimension] = null;
  }, onExiting), [computedDimension, onExiting]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TransitionWrapper.default, {
    ref: ref,
    addEndListener: _transitionEndListener.default,
    ...props,
    "aria-expanded": props.role ? inProp : null,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExit: handleExit,
    onExiting: handleExiting,
    childRef: children.ref,
    in: inProp,
    timeout: timeout,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    children: (state, innerProps) => /*#__PURE__*/_react.default.cloneElement(children, {
      ...innerProps,
      className: (0, _classnames.default)(className, children.props.className, collapseStyles[state], computedDimension === 'width' && 'collapse-horizontal')
    })
  });
});

// @ts-ignore
var _default = Collapse;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 46887:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _ThemeProvider = __webpack_require__(64588);
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Container = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  fluid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'div',
  className,
  ...props
}, ref) => {
  const prefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'container');
  const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    ref: ref,
    ...props,
    className: (0, _classnames.default)(className, fluid ? `${prefix}${suffix}` : prefix)
  });
});
Container.displayName = 'Container';
var _default = Container;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 69885:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _Transition = __webpack_require__(21798);
var _transitionEndListener = _interopRequireDefault(__webpack_require__(38475));
var _triggerBrowserReflow = _interopRequireDefault(__webpack_require__(14581));
var _TransitionWrapper = _interopRequireDefault(__webpack_require__(84636));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const fadeStyles = {
  [_Transition.ENTERING]: 'show',
  [_Transition.ENTERED]: 'show'
};
const Fade = /*#__PURE__*/React.forwardRef(({
  className,
  children,
  transitionClasses = {},
  onEnter,
  ...rest
}, ref) => {
  const props = {
    in: false,
    timeout: 300,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: false,
    ...rest
  };
  const handleEnter = (0, React.useCallback)((node, isAppearing) => {
    (0, _triggerBrowserReflow.default)(node);
    onEnter == null ? void 0 : onEnter(node, isAppearing);
  }, [onEnter]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TransitionWrapper.default, {
    ref: ref,
    addEndListener: _transitionEndListener.default,
    ...props,
    onEnter: handleEnter,
    childRef: children.ref,
    children: (status, innerProps) => /*#__PURE__*/React.cloneElement(children, {
      ...innerProps,
      className: (0, _classnames.default)('fade', className, children.props.className, fadeStyles[status], transitionClasses[status])
    })
  });
});
Fade.displayName = 'Fade';
var _default = Fade;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 54506:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ModalContext = /*#__PURE__*/React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide() {}
});
var _default = ModalContext;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 72581:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var _all = _interopRequireDefault(__webpack_require__(28853));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _uncontrollable = __webpack_require__(74033);
var _Nav = _interopRequireDefault(__webpack_require__(65050));
var _ThemeProvider = __webpack_require__(64588);
var _NavbarContext = _interopRequireDefault(__webpack_require__(68079));
var _CardHeaderContext = _interopRequireDefault(__webpack_require__(41108));
var _NavItem = _interopRequireDefault(__webpack_require__(41939));
var _NavLink = _interopRequireDefault(__webpack_require__(41954));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Nav = /*#__PURE__*/React.forwardRef((uncontrolledProps, ref) => {
  const {
    as = 'div',
    bsPrefix: initialBsPrefix,
    variant,
    fill = false,
    justify = false,
    navbar,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = (0, _uncontrollable.useUncontrolled)(uncontrolledProps, {
    activeKey: 'onSelect'
  });
  const bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(initialBsPrefix, 'nav');
  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;
  const navbarContext = (0, React.useContext)(_NavbarContext.default);
  const cardHeaderContext = (0, React.useContext)(_CardHeaderContext.default);
  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({
      cardHeaderBsPrefix
    } = cardHeaderContext);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Nav.default, {
    as: as,
    ref: ref,
    activeKey: activeKey,
    className: (0, _classnames.default)(className, {
      [bsPrefix]: !isNavbar,
      [`${navbarBsPrefix}-nav`]: isNavbar,
      [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
      [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
      [`${bsPrefix}-${variant}`]: !!variant,
      [`${bsPrefix}-fill`]: fill,
      [`${bsPrefix}-justified`]: justify
    }),
    ...props
  });
});
Nav.displayName = 'Nav';
var _default = Object.assign(Nav, {
  Item: _NavItem.default,
  Link: _NavLink.default
});
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 41939:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _createWithBsPrefix = _interopRequireDefault(__webpack_require__(20346));
var _default = (0, _createWithBsPrefix.default)('nav-item');
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 41954:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _Anchor = _interopRequireDefault(__webpack_require__(26378));
var _NavItem = __webpack_require__(10816);
var _SelectableContext = __webpack_require__(49904);
var _ThemeProvider = __webpack_require__(64588);
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NavLink = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  className,
  as: Component = _Anchor.default,
  active,
  eventKey,
  disabled = false,
  ...props
}, ref) => {
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'nav-link');
  const [navItemProps, meta] = (0, _NavItem.useNavItem)({
    key: (0, _SelectableContext.makeEventKey)(eventKey, props.href),
    active,
    disabled,
    ...props
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    ...props,
    ...navItemProps,
    ref: ref,
    disabled: disabled,
    className: (0, _classnames.default)(className, bsPrefix, disabled && 'disabled', meta.isActive && 'active')
  });
});
NavLink.displayName = 'NavLink';
var _default = NavLink;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 51293:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _SelectableContext = _interopRequireDefault(__webpack_require__(49904));
var _uncontrollable = __webpack_require__(74033);
var _createWithBsPrefix = _interopRequireDefault(__webpack_require__(20346));
var _NavbarBrand = _interopRequireDefault(__webpack_require__(56520));
var _NavbarCollapse = _interopRequireDefault(__webpack_require__(37070));
var _NavbarToggle = _interopRequireDefault(__webpack_require__(99967));
var _NavbarOffcanvas = _interopRequireDefault(__webpack_require__(43646));
var _ThemeProvider = __webpack_require__(64588);
var _NavbarContext = _interopRequireDefault(__webpack_require__(68079));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NavbarText = (0, _createWithBsPrefix.default)('navbar-text', {
  Component: 'span'
});
const Navbar = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    bsPrefix: initialBsPrefix,
    expand = true,
    variant = 'light',
    bg,
    fixed,
    sticky,
    className,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'nav',
    expanded,
    onToggle,
    onSelect,
    collapseOnSelect = false,
    ...controlledProps
  } = (0, _uncontrollable.useUncontrolled)(props, {
    expanded: 'onToggle'
  });
  const bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(initialBsPrefix, 'navbar');
  const handleCollapse = (0, React.useCallback)((...args) => {
    onSelect == null ? void 0 : onSelect(...args);
    if (collapseOnSelect && expanded) {
      onToggle == null ? void 0 : onToggle(false);
    }
  }, [onSelect, collapseOnSelect, expanded, onToggle]);

  // will result in some false positives but that seems better
  // than false negatives. strict `undefined` check allows explicit
  // "nulling" of the role if the user really doesn't want one
  if (controlledProps.role === undefined && Component !== 'nav') {
    controlledProps.role = 'navigation';
  }
  let expandClass = `${bsPrefix}-expand`;
  if (typeof expand === 'string') expandClass = `${expandClass}-${expand}`;
  const navbarContext = (0, React.useMemo)(() => ({
    onToggle: () => onToggle == null ? void 0 : onToggle(!expanded),
    bsPrefix,
    expanded: !!expanded,
    expand
  }), [bsPrefix, expanded, expand, onToggle]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_NavbarContext.default.Provider, {
    value: navbarContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectableContext.default.Provider, {
      value: handleCollapse,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
        ref: ref,
        ...controlledProps,
        className: (0, _classnames.default)(className, bsPrefix, expand && expandClass, variant && `${bsPrefix}-${variant}`, bg && `bg-${bg}`, sticky && `sticky-${sticky}`, fixed && `fixed-${fixed}`)
      })
    })
  });
});
Navbar.displayName = 'Navbar';
var _default = Object.assign(Navbar, {
  Brand: _NavbarBrand.default,
  Collapse: _NavbarCollapse.default,
  Offcanvas: _NavbarOffcanvas.default,
  Text: NavbarText,
  Toggle: _NavbarToggle.default
});
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 56520:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _ThemeProvider = __webpack_require__(64588);
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NavbarBrand = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  className,
  as,
  ...props
}, ref) => {
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'navbar-brand');
  const Component = as || (props.href ? 'a' : 'span');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    ...props,
    ref: ref,
    className: (0, _classnames.default)(className, bsPrefix)
  });
});
NavbarBrand.displayName = 'NavbarBrand';
var _default = NavbarBrand;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 37070:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _Collapse = _interopRequireDefault(__webpack_require__(3311));
var _ThemeProvider = __webpack_require__(64588);
var _NavbarContext = _interopRequireDefault(__webpack_require__(68079));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NavbarCollapse = /*#__PURE__*/React.forwardRef(({
  children,
  bsPrefix,
  ...props
}, ref) => {
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'navbar-collapse');
  const context = (0, React.useContext)(_NavbarContext.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Collapse.default, {
    in: !!(context && context.expanded),
    ...props,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: ref,
      className: bsPrefix,
      children: children
    })
  });
});
NavbarCollapse.displayName = 'NavbarCollapse';
var _default = NavbarCollapse;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 68079:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// TODO: check

const context = /*#__PURE__*/React.createContext(null);
context.displayName = 'NavbarContext';
var _default = context;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 43646:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _Offcanvas = _interopRequireDefault(__webpack_require__(10242));
var _NavbarContext = _interopRequireDefault(__webpack_require__(68079));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NavbarOffcanvas = /*#__PURE__*/React.forwardRef((props, ref) => {
  const context = (0, React.useContext)(_NavbarContext.default);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Offcanvas.default, {
    ref: ref,
    show: !!(context != null && context.expanded),
    ...props,
    renderStaticNode: true
  });
});
NavbarOffcanvas.displayName = 'NavbarOffcanvas';
var _default = NavbarOffcanvas;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 99967:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
var _ThemeProvider = __webpack_require__(64588);
var _NavbarContext = _interopRequireDefault(__webpack_require__(68079));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NavbarToggle = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  className,
  children,
  label = 'Toggle navigation',
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'button',
  onClick,
  ...props
}, ref) => {
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'navbar-toggler');
  const {
    onToggle,
    expanded
  } = (0, React.useContext)(_NavbarContext.default) || {};
  const handleClick = (0, _useEventCallback.default)(e => {
    if (onClick) onClick(e);
    if (onToggle) onToggle();
  });
  if (Component === 'button') {
    props.type = 'button';
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    ...props,
    ref: ref,
    onClick: handleClick,
    "aria-label": label,
    className: (0, _classnames.default)(className, bsPrefix, !expanded && 'collapsed'),
    children: children || /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: `${bsPrefix}-icon`
    })
  });
});
NavbarToggle.displayName = 'NavbarToggle';
var _default = NavbarToggle;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 10242:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var _useBreakpoint = _interopRequireDefault(__webpack_require__(90910));
var _useEventCallback = _interopRequireDefault(__webpack_require__(90175));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _Modal = _interopRequireDefault(__webpack_require__(4854));
var _Fade = _interopRequireDefault(__webpack_require__(69885));
var _OffcanvasBody = _interopRequireDefault(__webpack_require__(81882));
var _OffcanvasToggling = _interopRequireDefault(__webpack_require__(84409));
var _ModalContext = _interopRequireDefault(__webpack_require__(54506));
var _NavbarContext = _interopRequireDefault(__webpack_require__(68079));
var _OffcanvasHeader = _interopRequireDefault(__webpack_require__(93198));
var _OffcanvasTitle = _interopRequireDefault(__webpack_require__(34616));
var _ThemeProvider = __webpack_require__(64588);
var _BootstrapModalManager = _interopRequireWildcard(__webpack_require__(30923));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DialogTransition(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OffcanvasToggling.default, {
    ...props
  });
}
function BackdropTransition(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Fade.default, {
    ...props
  });
}
const Offcanvas = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  className,
  children,
  'aria-labelledby': ariaLabelledby,
  placement = 'start',
  responsive,
  /* BaseModal props */

  show = false,
  backdrop = true,
  keyboard = true,
  scroll = false,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  renderStaticNode = false,
  ...props
}, ref) => {
  const modalManager = (0, React.useRef)();
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'offcanvas');
  const {
    onToggle
  } = (0, React.useContext)(_NavbarContext.default) || {};
  const [showOffcanvas, setShowOffcanvas] = (0, React.useState)(false);
  const hideResponsiveOffcanvas = (0, _useBreakpoint.default)(responsive || 'xs', 'up');
  (0, React.useEffect)(() => {
    // Handles the case where screen is resized while the responsive
    // offcanvas is shown. If `responsive` not provided, just use `show`.
    setShowOffcanvas(responsive ? show && !hideResponsiveOffcanvas : show);
  }, [show, responsive, hideResponsiveOffcanvas]);
  const handleHide = (0, _useEventCallback.default)(() => {
    onToggle == null ? void 0 : onToggle();
    onHide == null ? void 0 : onHide();
  });
  const modalContext = (0, React.useMemo)(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager) return propsManager;
    if (scroll) {
      // Have to use a different modal manager since the shared
      // one handles overflow.
      if (!modalManager.current) modalManager.current = new _BootstrapModalManager.default({
        handleContainerOverflow: false
      });
      return modalManager.current;
    }
    return (0, _BootstrapModalManager.getSharedManager)();
  }
  const handleEnter = (node, ...args) => {
    if (node) node.style.visibility = 'visible';
    onEnter == null ? void 0 : onEnter(node, ...args);
  };
  const handleExited = (node, ...args) => {
    if (node) node.style.visibility = '';
    onExited == null ? void 0 : onExited(...args);
  };
  const renderBackdrop = (0, React.useCallback)(backdropProps => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...backdropProps,
    className: (0, _classnames.default)(`${bsPrefix}-backdrop`, backdropClassName)
  }), [backdropClassName, bsPrefix]);
  const renderDialog = dialogProps => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...dialogProps,
    ...props,
    className: (0, _classnames.default)(className, responsive ? `${bsPrefix}-${responsive}` : bsPrefix, `${bsPrefix}-${placement}`),
    "aria-labelledby": ariaLabelledby,
    children: children
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [!showOffcanvas && (responsive || renderStaticNode) && renderDialog({}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalContext.default.Provider, {
      value: modalContext,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Modal.default, {
        show: showOffcanvas,
        ref: ref,
        backdrop: backdrop,
        container: container,
        keyboard: keyboard,
        autoFocus: autoFocus,
        enforceFocus: enforceFocus && !scroll,
        restoreFocus: restoreFocus,
        restoreFocusOptions: restoreFocusOptions,
        onEscapeKeyDown: onEscapeKeyDown,
        onShow: onShow,
        onHide: handleHide,
        onEnter: handleEnter,
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: handleExited,
        manager: getModalManager(),
        transition: DialogTransition,
        backdropTransition: BackdropTransition,
        renderBackdrop: renderBackdrop,
        renderDialog: renderDialog
      })
    })]
  });
});
Offcanvas.displayName = 'Offcanvas';
var _default = Object.assign(Offcanvas, {
  Body: _OffcanvasBody.default,
  Header: _OffcanvasHeader.default,
  Title: _OffcanvasTitle.default
});
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 81882:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _createWithBsPrefix = _interopRequireDefault(__webpack_require__(20346));
var _default = (0, _createWithBsPrefix.default)('offcanvas-body');
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 93198:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _ThemeProvider = __webpack_require__(64588);
var _AbstractModalHeader = _interopRequireDefault(__webpack_require__(26196));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OffcanvasHeader = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  className,
  closeLabel = 'Close',
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'offcanvas-header');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_AbstractModalHeader.default, {
    ref: ref,
    ...props,
    className: (0, _classnames.default)(className, bsPrefix),
    closeLabel: closeLabel,
    closeButton: closeButton
  });
});
OffcanvasHeader.displayName = 'OffcanvasHeader';
var _default = OffcanvasHeader;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 34616:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _createWithBsPrefix = _interopRequireDefault(__webpack_require__(20346));
var _divWithClassName = _interopRequireDefault(__webpack_require__(68970));
const DivStyledAsH5 = (0, _divWithClassName.default)('h5');
var _default = (0, _createWithBsPrefix.default)('offcanvas-title', {
  Component: DivStyledAsH5
});
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 84409:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _Transition = __webpack_require__(21798);
var _transitionEndListener = _interopRequireDefault(__webpack_require__(38475));
var _TransitionWrapper = _interopRequireDefault(__webpack_require__(84636));
var _ThemeProvider = __webpack_require__(64588);
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const transitionStyles = {
  [_Transition.ENTERING]: 'show',
  [_Transition.ENTERED]: 'show'
};
const OffcanvasToggling = /*#__PURE__*/React.forwardRef(({
  bsPrefix,
  className,
  children,
  in: inProp = false,
  mountOnEnter = false,
  unmountOnExit = false,
  appear = false,
  ...props
}, ref) => {
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'offcanvas');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TransitionWrapper.default, {
    ref: ref,
    addEndListener: _transitionEndListener.default,
    in: inProp,
    mountOnEnter: mountOnEnter,
    unmountOnExit: unmountOnExit,
    appear: appear,
    ...props,
    childRef: children.ref,
    children: (status, innerProps) => /*#__PURE__*/React.cloneElement(children, {
      ...innerProps,
      className: (0, _classnames.default)(className, children.props.className, (status === _Transition.ENTERING || status === _Transition.EXITING) && `${bsPrefix}-toggling`, transitionStyles[status])
    })
  });
});
OffcanvasToggling.displayName = 'OffcanvasToggling';
var _default = OffcanvasToggling;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 64588:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.ThemeConsumer = exports.DEFAULT_MIN_BREAKPOINT = exports.DEFAULT_BREAKPOINTS = void 0;
exports.createBootstrapComponent = createBootstrapComponent;
exports["default"] = void 0;
exports.useBootstrapBreakpoints = useBootstrapBreakpoints;
exports.useBootstrapMinBreakpoint = useBootstrapMinBreakpoint;
exports.useBootstrapPrefix = useBootstrapPrefix;
exports.useIsRTL = useIsRTL;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
exports.DEFAULT_BREAKPOINTS = DEFAULT_BREAKPOINTS;
const DEFAULT_MIN_BREAKPOINT = 'xs';
exports.DEFAULT_MIN_BREAKPOINT = DEFAULT_MIN_BREAKPOINT;
const ThemeContext = /*#__PURE__*/React.createContext({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT
});
const {
  Consumer,
  Provider
} = ThemeContext;
exports.ThemeConsumer = Consumer;
function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  minBreakpoint = DEFAULT_MIN_BREAKPOINT,
  dir,
  children
}) {
  const contextValue = (0, React.useMemo)(() => ({
    prefixes: {
      ...prefixes
    },
    breakpoints,
    minBreakpoint,
    dir
  }), [prefixes, breakpoints, minBreakpoint, dir]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Provider, {
    value: contextValue,
    children: children
  });
}
function useBootstrapPrefix(prefix, defaultPrefix) {
  const {
    prefixes
  } = (0, React.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
function useBootstrapBreakpoints() {
  const {
    breakpoints
  } = (0, React.useContext)(ThemeContext);
  return breakpoints;
}
function useBootstrapMinBreakpoint() {
  const {
    minBreakpoint
  } = (0, React.useContext)(ThemeContext);
  return minBreakpoint;
}
function useIsRTL() {
  const {
    dir
  } = (0, React.useContext)(ThemeContext);
  return dir === 'rtl';
}
function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const {
    prefix,
    forwardRefAs = isClassy ? 'ref' : 'innerRef'
  } = opts;
  const Wrapped = /*#__PURE__*/React.forwardRef(({
    ...props
  }, ref) => {
    props[forwardRefAs] = ref;
    const bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      ...props,
      bsPrefix: bsPrefix
    });
  });
  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}
var _default = ThemeProvider;
exports["default"] = _default;

/***/ }),

/***/ 84636:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(18038));
var _Transition = _interopRequireDefault(__webpack_require__(21798));
var _useMergedRefs = _interopRequireDefault(__webpack_require__(26835));
var _safeFindDOMNode = _interopRequireDefault(__webpack_require__(9430));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Normalizes Transition callbacks when nodeRef is used.
const TransitionWrapper = /*#__PURE__*/_react.default.forwardRef(({
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  addEndListener,
  children,
  childRef,
  ...props
}, ref) => {
  const nodeRef = (0, _react.useRef)(null);
  const mergedRef = (0, _useMergedRefs.default)(nodeRef, childRef);
  const attachRef = r => {
    mergedRef((0, _safeFindDOMNode.default)(r));
  };
  const normalize = callback => param => {
    if (callback && nodeRef.current) {
      callback(nodeRef.current, param);
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const handleEnter = (0, _react.useCallback)(normalize(onEnter), [onEnter]);
  const handleEntering = (0, _react.useCallback)(normalize(onEntering), [onEntering]);
  const handleEntered = (0, _react.useCallback)(normalize(onEntered), [onEntered]);
  const handleExit = (0, _react.useCallback)(normalize(onExit), [onExit]);
  const handleExiting = (0, _react.useCallback)(normalize(onExiting), [onExiting]);
  const handleExited = (0, _react.useCallback)(normalize(onExited), [onExited]);
  const handleAddEndListener = (0, _react.useCallback)(normalize(addEndListener), [addEndListener]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Transition.default, {
    ref: ref,
    ...props,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    nodeRef: nodeRef,
    children: typeof children === 'function' ? (status, innerProps) =>
    // TODO: Types for RTG missing innerProps, so need to cast.
    children(status, {
      ...innerProps,
      ref: attachRef
    }) : /*#__PURE__*/_react.default.cloneElement(children, {
      ref: attachRef
    })
  });
});
var _default = TransitionWrapper;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 86524:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction(...funcs) {
  return funcs.filter(f => f != null).reduce((acc, f) => {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }
    if (acc === null) return f;
    return function chainedFunction(...args) {
      // @ts-ignore
      acc.apply(this, args);
      // @ts-ignore
      f.apply(this, args);
    };
  }, null);
}
var _default = createChainedFunction;
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 20346:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = createWithBsPrefix;
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var _camelize = _interopRequireDefault(__webpack_require__(73048));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _ThemeProvider = __webpack_require__(64588);
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const pascalCase = str => str[0].toUpperCase() + (0, _camelize.default)(str).slice(1);
// TODO: emstricten & fix the typing here! `createWithBsPrefix<TElementType>...`
function createWithBsPrefix(prefix, {
  displayName = pascalCase(prefix),
  Component,
  defaultProps
} = {}) {
  const BsComponent = /*#__PURE__*/React.forwardRef(({
    className,
    bsPrefix,
    as: Tag = Component || 'div',
    ...props
  }, ref) => {
    const componentProps = {
      ...defaultProps,
      ...props
    };
    const resolvedPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, prefix);
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Tag, {
      ref: ref,
      className: (0, _classnames.default)(className, resolvedPrefix),
      ...componentProps
    });
  });
  BsComponent.displayName = displayName;
  return BsComponent;
}
module.exports = exports.default;

/***/ }),

/***/ 68970:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(18038));
var _classnames = _interopRequireDefault(__webpack_require__(89367));
var _jsxRuntime = __webpack_require__(56786);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = className => /*#__PURE__*/React.forwardRef((p, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  ...p,
  ref: ref,
  className: (0, _classnames.default)(p.className, className)
}));
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 9430:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = safeFindDOMNode;
var _reactDom = _interopRequireDefault(__webpack_require__(98704));
function safeFindDOMNode(componentOrElement) {
  if (componentOrElement && 'setState' in componentOrElement) {
    return _reactDom.default.findDOMNode(componentOrElement);
  }
  return componentOrElement != null ? componentOrElement : null;
}
module.exports = exports.default;

/***/ }),

/***/ 38475:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);
exports.__esModule = true;
exports["default"] = transitionEndListener;
var _css = _interopRequireDefault(__webpack_require__(88119));
var _transitionEnd = _interopRequireDefault(__webpack_require__(51472));
function parseDuration(node, property) {
  const str = (0, _css.default)(node, property) || '';
  const mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}
function transitionEndListener(element, handler) {
  const duration = parseDuration(element, 'transitionDuration');
  const delay = parseDuration(element, 'transitionDelay');
  const remove = (0, _transitionEnd.default)(element, e => {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}
module.exports = exports.default;

/***/ }),

/***/ 14581:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = triggerBrowserReflow;
// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;
}
module.exports = exports.default;

/***/ }),

/***/ 50694:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}

exports.polyfill = polyfill;


/***/ }),

/***/ 21798:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(55601));

var _react = _interopRequireDefault(__webpack_require__(18038));

var _reactDom = _interopRequireDefault(__webpack_require__(98704));

var _config = _interopRequireDefault(__webpack_require__(339));

var _PropTypes = __webpack_require__(17438);

var _TransitionGroupContext = _interopRequireDefault(__webpack_require__(14364));

var _reflow = __webpack_require__(38887);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var UNMOUNTED = 'unmounted';
exports.UNMOUNTED = UNMOUNTED;
var EXITED = 'exited';
exports.EXITED = EXITED;
var ENTERING = 'entering';
exports.ENTERING = ENTERING;
var ENTERED = 'entered';
exports.ENTERED = ENTERED;
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

exports.EXITING = EXITING;

var Transition = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : _reactDom.default.findDOMNode(this); // https://github.com/reactjs/react-transition-group/pull/749
          // With unmountOnExit or mountOnEnter, the enter animation should happen at the transition between `exited` and `entering`.
          // To make the animation happen,  we have to separate each rendering and avoid being processed as batched.

          if (node) (0, _reflow.forceReflow)(node);
        }

        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [_reactDom.default.findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || _config.default.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : _reactDom.default.findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || _config.default.disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : _reactDom.default.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        _in = _this$props.in,
        _mountOnEnter = _this$props.mountOnEnter,
        _unmountOnExit = _this$props.unmountOnExit,
        _appear = _this$props.appear,
        _enter = _this$props.enter,
        _exit = _this$props.exit,
        _timeout = _this$props.timeout,
        _addEndListener = _this$props.addEndListener,
        _onEnter = _this$props.onEnter,
        _onEntering = _this$props.onEntering,
        _onEntered = _this$props.onEntered,
        _onExit = _this$props.onExit,
        _onExiting = _this$props.onExiting,
        _onExited = _this$props.onExited,
        _nodeRef = _this$props.nodeRef,
        childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      _react.default.createElement(_TransitionGroupContext.default.Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : _react.default.cloneElement(_react.default.Children.only(children), childProps))
    );
  };

  return Transition;
}(_react.default.Component);

Transition.contextType = _TransitionGroupContext.default;
Transition.propTypes =  false ? 0 : {}; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
var _default = Transition;
exports["default"] = _default;

/***/ }),

/***/ 14364:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(18038));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _react.default.createContext(null);

exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 339:
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var _default = {
  disabled: false
};
exports["default"] = _default;
module.exports = exports.default;

/***/ }),

/***/ 17438:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.classNamesShape = exports.timeoutsShape = void 0;

var _propTypes = _interopRequireDefault(__webpack_require__(55601));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeoutsShape =  false ? 0 : null;
exports.timeoutsShape = timeoutsShape;
var classNamesShape =  false ? 0 : null;
exports.classNamesShape = classNamesShape;

/***/ }),

/***/ 38887:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.forceReflow = void 0;

var forceReflow = function forceReflow(node) {
  return node.scrollTop;
};

exports.forceReflow = forceReflow;

/***/ }),

/***/ 79240:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireWildcard = __webpack_require__(35876);

var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports.useUncontrolledProp = useUncontrolledProp;
exports["default"] = useUncontrolled;

var _extends3 = _interopRequireDefault(__webpack_require__(43259));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(54845));

var _react = __webpack_require__(18038);

var Utils = _interopRequireWildcard(__webpack_require__(78035));

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function useUncontrolledProp(propValue, defaultValue, handler) {
  var wasPropRef = (0, _react.useRef)(propValue !== undefined);

  var _useState = (0, _react.useState)(defaultValue),
      stateValue = _useState[0],
      setState = _useState[1];

  var isProp = propValue !== undefined;
  var wasProp = wasPropRef.current;
  wasPropRef.current = isProp;
  /**
   * If a prop switches from controlled to Uncontrolled
   * reset its value to the defaultValue
   */

  if (!isProp && wasProp && stateValue !== defaultValue) {
    setState(defaultValue);
  }

  return [isProp ? propValue : stateValue, (0, _react.useCallback)(function (value) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (handler) handler.apply(void 0, [value].concat(args));
    setState(value);
  }, [handler])];
}

function useUncontrolled(props, config) {
  return Object.keys(config).reduce(function (result, fieldName) {
    var _extends2;

    var _ref = result,
        defaultValue = _ref[Utils.defaultKey(fieldName)],
        propsValue = _ref[fieldName],
        rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, [Utils.defaultKey(fieldName), fieldName].map(_toPropertyKey));

    var handlerName = config[fieldName];

    var _useUncontrolledProp = useUncontrolledProp(propsValue, defaultValue, props[handlerName]),
        value = _useUncontrolledProp[0],
        handler = _useUncontrolledProp[1];

    return (0, _extends3.default)({}, rest, (_extends2 = {}, _extends2[fieldName] = value, _extends2[handlerName] = handler, _extends2));
  }, props);
}

/***/ }),

/***/ 74033:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

var _interopRequireWildcard = __webpack_require__(35876);

exports.__esModule = true;
exports.useUncontrolledProp = exports.uncontrollable = exports.useUncontrolled = void 0;

var _hook = _interopRequireWildcard(__webpack_require__(79240));

exports.useUncontrolled = _hook.default;
exports.useUncontrolledProp = _hook.useUncontrolledProp;

var _uncontrollable = _interopRequireDefault(__webpack_require__(53697));

exports.uncontrollable = _uncontrollable.default;

/***/ }),

/***/ 53697:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

var _interopRequireWildcard = __webpack_require__(35876);

exports.__esModule = true;
exports["default"] = uncontrollable;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(54845));

var _extends3 = _interopRequireDefault(__webpack_require__(43259));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(1847));

var _react = _interopRequireDefault(__webpack_require__(18038));

var _reactLifecyclesCompat = __webpack_require__(50694);

var _invariant = _interopRequireDefault(__webpack_require__(18457));

var Utils = _interopRequireWildcard(__webpack_require__(78035));

var _jsxFileName = "/Users/jquense/src/uncontrollable/src/uncontrollable.js";

function uncontrollable(Component, controlledValues, methods) {
  if (methods === void 0) {
    methods = [];
  }

  var displayName = Component.displayName || Component.name || 'Component';
  var canAcceptRef = Utils.canAcceptRef(Component);
  var controlledProps = Object.keys(controlledValues);
  var PROPS_TO_OMIT = controlledProps.map(Utils.defaultKey);
  !(canAcceptRef || !methods.length) ?  false ? 0 : invariant(false) : void 0;

  var UncontrolledComponent =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inheritsLoose2.default)(UncontrolledComponent, _React$Component);

    function UncontrolledComponent() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
      _this.handlers = Object.create(null);
      controlledProps.forEach(function (propName) {
        var handlerName = controlledValues[propName];

        var handleChange = function handleChange(value) {
          if (_this.props[handlerName]) {
            var _this$props;

            _this._notifying = true;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            (_this$props = _this.props)[handlerName].apply(_this$props, [value].concat(args));

            _this._notifying = false;
          }

          if (!_this.unmounted) _this.setState(function (_ref) {
            var _extends2;

            var values = _ref.values;
            return {
              values: (0, _extends3.default)(Object.create(null), values, (_extends2 = {}, _extends2[propName] = value, _extends2))
            };
          });
        };

        _this.handlers[handlerName] = handleChange;
      });
      if (methods.length) _this.attachRef = function (ref) {
        _this.inner = ref;
      };
      var values = Object.create(null);
      controlledProps.forEach(function (key) {
        values[key] = _this.props[Utils.defaultKey(key)];
      });
      _this.state = {
        values: values,
        prevProps: {}
      };
      return _this;
    }

    var _proto = UncontrolledComponent.prototype;

    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      //let setState trigger the update
      return !this._notifying;
    };

    UncontrolledComponent.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref2) {
      var values = _ref2.values,
          prevProps = _ref2.prevProps;
      var nextState = {
        values: (0, _extends3.default)(Object.create(null), values),
        prevProps: {}
      };
      controlledProps.forEach(function (key) {
        /**
         * If a prop switches from controlled to Uncontrolled
         * reset its value to the defaultValue
         */
        nextState.prevProps[key] = props[key];

        if (!Utils.isProp(props, key) && Utils.isProp(prevProps, key)) {
          nextState.values[key] = props[Utils.defaultKey(key)];
        }
      });
      return nextState;
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.unmounted = true;
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          innerRef = _this$props2.innerRef,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props2, ["innerRef"]);
      PROPS_TO_OMIT.forEach(function (prop) {
        delete props[prop];
      });
      var newProps = {};
      controlledProps.forEach(function (propName) {
        var propValue = _this2.props[propName];
        newProps[propName] = propValue !== undefined ? propValue : _this2.state.values[propName];
      });
      return _react.default.createElement(Component, (0, _extends3.default)({}, props, newProps, this.handlers, {
        ref: innerRef || this.attachRef
      }));
    };

    return UncontrolledComponent;
  }(_react.default.Component);

  (0, _reactLifecyclesCompat.polyfill)(UncontrolledComponent);
  UncontrolledComponent.displayName = "Uncontrolled(" + displayName + ")";
  UncontrolledComponent.propTypes = (0, _extends3.default)({
    innerRef: function innerRef() {}
  }, Utils.uncontrolledPropTypes(controlledValues, displayName));
  methods.forEach(function (method) {
    UncontrolledComponent.prototype[method] = function $proxiedMethod() {
      var _this$inner;

      return (_this$inner = this.inner)[method].apply(_this$inner, arguments);
    };
  });
  var WrappedComponent = UncontrolledComponent;

  if (_react.default.forwardRef) {
    WrappedComponent = _react.default.forwardRef(function (props, ref) {
      return _react.default.createElement(UncontrolledComponent, (0, _extends3.default)({}, props, {
        innerRef: ref,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        },
        __self: this
      }));
    });
    WrappedComponent.propTypes = UncontrolledComponent.propTypes;
  }

  WrappedComponent.ControlledComponent = Component;
  /**
   * useful when wrapping a Component and you want to control
   * everything
   */

  WrappedComponent.deferControlTo = function (newComponent, additions, nextMethods) {
    if (additions === void 0) {
      additions = {};
    }

    return uncontrollable(newComponent, (0, _extends3.default)({}, controlledValues, additions), nextMethods);
  };

  return WrappedComponent;
}

module.exports = exports["default"];

/***/ }),

/***/ 78035:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(92439);

exports.__esModule = true;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.isProp = isProp;
exports.defaultKey = defaultKey;
exports.canAcceptRef = canAcceptRef;

var _invariant = _interopRequireDefault(__webpack_require__(18457));

var noop = function noop() {};

function readOnlyPropType(handler, name) {
  return function (props, propName) {
    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error("You have provided a `" + propName + "` prop to `" + name + "` " + ("without an `" + handler + "` handler prop. This will render a read-only field. ") + ("If the field should be mutable use `" + defaultKey(propName) + "`. ") + ("Otherwise, set `" + handler + "`."));
      }
    }
  };
}

function uncontrolledPropTypes(controlledValues, displayName) {
  var propTypes = {};
  Object.keys(controlledValues).forEach(function (prop) {
    // add default propTypes for folks that use runtime checks
    propTypes[defaultKey(prop)] = noop;

    if (false) { var handler; }
  });
  return propTypes;
}

function isProp(props, prop) {
  return props[prop] !== undefined;
}

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */


function canAcceptRef(component) {
  return !!component && (typeof component !== 'function' || component.prototype && component.prototype.isReactComponent);
}

/***/ }),

/***/ 89025:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 11441:
/***/ ((module) => {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 49687:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 82510:
/***/ ((module) => {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 31456:
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 35202:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(31540);
var isNativeReflectConstruct = __webpack_require__(53650);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 43977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(36651);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 513:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(36651);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 43259:
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 35091:
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _getPrototypeOf(o);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 22261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(31540);
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1847:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(31540);
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}
module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 92439:
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 35876:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(67236)["default"]);
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj["default"] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
module.exports = _interopRequireWildcard, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 67982:
/***/ ((module) => {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 53650:
/***/ ((module) => {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 6506:
/***/ ((module) => {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 76874:
/***/ ((module) => {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 54845:
/***/ ((module) => {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(67236)["default"]);
var assertThisInitialized = __webpack_require__(49687);
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return assertThisInitialized(self);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 23984:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(67236)["default"]);
function _regeneratorRuntime() {
  "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return {
          value: void 0,
          done: !0
        };
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable || "" === iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    throw new TypeError(_typeof(iterable) + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 31540:
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 16522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithHoles = __webpack_require__(11441);
var iterableToArrayLimit = __webpack_require__(6506);
var unsupportedIterableToArray = __webpack_require__(16563);
var nonIterableRest = __webpack_require__(76874);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 49312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(67236)["default"]);
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 36651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(67236)["default"]);
var toPrimitive = __webpack_require__(49312);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 67236:
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 16563:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(89025);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 74908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(35091);
var setPrototypeOf = __webpack_require__(31540);
var isNativeFunction = __webpack_require__(67982);
var construct = __webpack_require__(35202);
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _wrapNativeSuper(Class);
}
module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 25353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(23984)();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ 88324:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports._ = exports._class_private_field_loose_base = _class_private_field_loose_base;
function _class_private_field_loose_base(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
        throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
}


/***/ }),

/***/ 94567:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var id = 0;

exports._ = exports._class_private_field_loose_key = _class_private_field_loose_key;
function _class_private_field_loose_key(name) {
    return "__private_" + id++ + "_" + name;
}


/***/ }),

/***/ 82147:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports._ = exports._interop_require_default = _interop_require_default;
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}


/***/ }),

/***/ 4009:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;

    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();

    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
exports._ = exports._interop_require_wildcard = _interop_require_wildcard;
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

    var cache = _getRequireWildcardCache(nodeInterop);

    if (cache && cache.has(obj)) return cache.get(obj);

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

    for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }

    newObj.default = obj;

    if (cache) cache.set(obj, newObj);

    return newObj;
}


/***/ }),

/***/ 73297:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports._ = exports._interop_require_default = _interop_require_default;
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}


/***/ })

};
;