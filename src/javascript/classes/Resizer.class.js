import { TweenLite } from 'gsap'

class Resizer {

  constructor(el) {
    STORAGE.resizerClass = this
  }

  resizeHomeMedias(media) {
    let homeSLider = document.querySelector('.js-home-slider')

    let ratioHorizontal = homeSLider.offsetWidth / media.offsetWidth
    let ratioVertical = homeSLider.offsetHeight / media.offsetHeight

    if (ratioVertical < ratioHorizontal){
      TweenLite.set(media, {
        scaleY: ratioHorizontal,
        scaleX: ratioHorizontal
      })
      TweenLite.set(media, {
        y: (homeSLider.offsetHeight - (media.offsetHeight * ratioHorizontal)) / 2,
        x: 0
      })
      STORAGE.sliderHomeClass.initialDisplacement = [0, ((homeSLider.offsetHeight - (media.offsetHeight * ratioHorizontal)) / 2)]
    } else {
      TweenLite.set(media, {
        scaleY: ratioVertical,
        scaleX: ratioVertical
      })
      TweenLite.set(media, {
        x: (homeSLider.offsetWidth - (media.offsetWidth * ratioVertical)) / 2,
        y: 0
      })
      STORAGE.sliderHomeClass.initialDisplacement = [((homeSLider.offsetWidth - (media.offsetWidth * ratioVertical)) / 2), 0]
    }
  }

}

export default Resizer
