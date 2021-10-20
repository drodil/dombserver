"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _devtoolsDetect = _interopRequireDefault(require("devtools-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Dombserver = props => {
  const [domModified, setDomModified] = (0, _react.useState)(false);

  const handleDomModification = (mutationList, observer) => {
    // only check mutations if devtools is open and dom is ready
    // note: there is possibility for false positive from devtools
    if (!_devtoolsDetect.default.isOpen || document.readyState !== 'complete') {
      return;
    } // todo: is it possible to somehow know if this is react rendering
    // dom or is it modified from the devtools?


    let trigger = true; // some filtering for trigger

    mutationList.forEach(elem => {
      elem.addedNodes.forEach(node => {
        // discard chrome extensions
        if (node.outerHTML.includes('chrome-extension://')) {
          trigger = false;
          return;
        } // todo: more filtering of known sources and refactor this

      });

      if (!trigger) {
        return;
      }
    });

    if (trigger) {
      setDomModified(true);
    }
  };

  _react.default.useEffect(() => {
    // start mutation observer
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    };
    const observer = new MutationObserver(handleDomModification);
    observer.observe(document, config); // disconnect observer in the end

    return () => {
      observer.disconnect();
    };
  });

  return domModified === true ? props.children : null;
};

Dombserver.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.node), _propTypes.default.node]).isRequired
};
var _default = Dombserver;
exports.default = _default;