/* Inspired from Animating from “display: block” to “display: none”
- +++>>> https://www.impressivewebs.com/animate-display-block-none/ */

export const displayNoneToBlockAnimator = (target, activator, displayNoneClassName, visuallyHiddenClassName) => {
  activator.addEventListener('click', () => {
    if (target.classList.contains(displayNoneClassName)) {
      target.classList.remove(displayNoneClassName);
      setTimeout(() => {
        target.classList.remove(visuallyHiddenClassName);
      }, 20);
    } else {
      target.classList.add(visuallyHiddenClassName);
      target.addEventListener('transitionend', (evt) => {
        target.classList.add(displayNoneClassName);
      }, {
        capture: false,
        once: true,
        passive: false,
      });
    }
  }, false);
};
