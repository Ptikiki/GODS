import { TweenLite } from 'gsap'

class Grid {

  constructor(el) {
    STORAGE.gridClass = this
  }

  animateGrid() {
    if (window.innerWidth > 640) {
      let gridLeft = document.querySelector('.js-grid-left')
      let gridRight = document.querySelector('.js-grid-right')

      TweenMax.to(gridLeft, 0.3, {
        alpha: 0.01,
        scaleX: 0.5
      })
      TweenMax.to(gridRight, 0.1, {
        alpha: 0,
        scaleX: 0
      })
      TweenMax.set([gridLeft, gridRight], {
        clearProps:"all",
        delay: 0.3
      })
      TweenLite.to(gridLeft, 0.6, {
        alpha: 0.08,
        scaleX: 1,
        delay: 0.3
      })
      TweenLite.to(gridRight, 0.6, {
        alpha: 0.07,
        scaleX: 1,
        delay: 0.5
      })
    }  
  }
}

export default Grid
