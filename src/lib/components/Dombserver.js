import React, {useState} from 'react';
import PropTypes from 'prop-types'
import devtools from 'devtools-detect';

const Dombserver = (props) => {
  const [domModified, setDomModified] = useState(false);

  const handleDomModification = (mutationList, observer) => {
    // only check mutations if devtools is open and dom is ready
    // note: there is possibility for false positive from devtools
    if(!devtools.isOpen || document.readyState !== 'complete') {
      return;
    }

    // todo: is it possible to somehow know if this is react rendering
    // dom or is it modified from the devtools?

    let trigger = true;
    // some filtering for trigger
    mutationList.forEach((elem) => {
      elem.addedNodes.forEach((node) => {
        // discard chrome extensions
        if(node.outerHTML.includes('chrome-extension://')) {
          trigger = false;
          return;
        }

        // todo: more filtering of known sources and refactor this
      });

      if(!trigger) {
        return;
      }

    });

    if(trigger) {
      setDomModified(true);
    }
  }

  React.useEffect(() => {
    // start mutation observer
    const config = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    };

    const observer = new MutationObserver(handleDomModification);
    observer.observe(document, config);

    // disconnect observer in the end
    return () => {
      observer.disconnect();
    };
  });

  return (
    domModified === true ? props.children : null
  )
}

Dombserver.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
 ]).isRequired
}

export default Dombserver;
