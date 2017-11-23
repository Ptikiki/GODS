import { TweenLite } from 'gsap'
import sliderHomeDatas from '../datas/Slider-Home-Datas'


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
    
  }

  onDocumentMouseWheel(event) {
    let that = STORAGE.sliderClass
              
    if (Math.abs(STORAGE.scene.position.x ) < 700 - 45 && event.deltaY > 0 ) {
      STORAGE.scene.position.x -= Math.abs(event.deltaY) / 3
    } else if (STORAGE.scene.position.x > -45) {
      return
    } else if (event.deltaY < 0) {
      STORAGE.scene.position.x += Math.abs(event.deltaY) / 3
    }

    sliderHomeDatas.slider.forEach((project, index) => {
      if (Math.abs(STORAGE.scene.position.x) > project.minPos && Math.abs(STORAGE.scene.position.x) <= project.maxPos) {   
        TweenLite.to(that.homeSlider, 0.5, {
          display: "block",
          alpha: 1,
          x: project.slideValue,
        })
        that.sliderMedias.forEach((slide, index) => {
          TweenLite.to([slide, that.sliderTitles[index], that.sliderDates[index]], 0, {
            display: "none"
          })
        })
        TweenLite.to([that.sliderMedias[index], that.sliderTitles[index], that.sliderDates[index]], 0, {
          display: "block"
        })
      }
    })
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
