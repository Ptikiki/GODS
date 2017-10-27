import { TweenLite } from 'gsap'

class Slider {

  constructor(index) {
    STORAGE.sliderClass = this
    this.homeSlider = document.querySelector('.js-home-slider')

    this.sliderMedias = document.querySelectorAll('.media')
    this.sliderTitles = document.querySelectorAll('.title')
    this.sliderDates = document.querySelectorAll('.date')

    this.init()
    this.bind()
  }

  init() {
    console.log(this.sliderMedias)
    console.log(this.sliderTitles)
    console.log(this.sliderDates)
  }

  onDocumentMouseWheel(event) {
    let that = STORAGE.sliderClass
              
    if (Math.abs(STORAGE.scene.position.x - window.innerWidth) < 3000 - 45 && event.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les sprites-1)
      STORAGE.scene.position.x -= Math.abs(event.deltaY) / 3
    } else if (STORAGE.scene.position.x > -45) {
      return
    } else if (event.deltaY < 0) {
      STORAGE.scene.position.x += Math.abs(event.deltaY) / 3
    }

    // console.log(Math.abs(STORAGE.scene.position.x))

    // first project
    if (Math.abs(STORAGE.scene.position.x) > 10 && Math.abs(STORAGE.scene.position.x) <= 400) {   
      TweenLite.to(that.homeSlider, 0.5, {
        display: "block",
        alpha: 1,
        x: +window.innerWidth/2,
      })
      for (let i = 0; i < that.sliderMedias.length; i++) {
        TweenLite.to([that.sliderMedias[i], that.sliderTitles[i], that.sliderDates[i]], 0, {
          display: "none"
        })
        TweenLite.to([that.sliderMedias[0], that.sliderTitles[0], that.sliderDates[0]], 0, {
          display: "block"
        })
      } 
    }
    // second project
    else if (Math.abs(STORAGE.scene.position.x) > 400 && Math.abs(STORAGE.scene.position.x) <= 1030) {   
      TweenLite.to(that.homeSlider, 0.5, {
        x: window.innerWidth/8,
      })
      for (let i = 0; i < that.sliderMedias.length; i++) {
         TweenLite.to([that.sliderMedias[i], that.sliderTitles[i], that.sliderDates[i]], 0, {
          display: "none"
        })
        TweenLite.to([that.sliderMedias[1], that.sliderTitles[1], that.sliderDates[1]], 0, {
          display: "block"
        })
      } 
    }
    // third project
    else if (Math.abs(STORAGE.scene.position.x) > 1030) {
      TweenLite.to(that.homeSlider, 0.5, {
        display: "block",
        alpha: 1,
        x: +window.innerWidth/2,
      })
      for (let i = 0; i < that.sliderMedias.length; i++) {
         TweenLite.to([that.sliderMedias[i], that.sliderTitles[i], that.sliderDates[i]], 0, {
          display: "none"
        })
        TweenLite.to([that.sliderMedias[2], that.sliderTitles[2], that.sliderDates[2]], 0, {
          display: "block"
        })
      }
    }
  }

  bind() {
    let that = this
    document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
  }

  unbind() {
    let that = this
    document.aremoveEventListener( 'wheel', this.onDocumentMouseWheel, false )
  }

}

export default Slider
