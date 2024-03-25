import { polyfill } from 'mobile-drag-drop';
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import 'mobile-drag-drop/default.css';

// Makes the HTML default Drag & Drop work on mobile
const usePolyfill = polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});

if (usePolyfill) {
  document.addEventListener('dragenter', function(event) {
    event.preventDefault();
  });
  window.addEventListener('touchmove', function() {}, { passive: false });
}