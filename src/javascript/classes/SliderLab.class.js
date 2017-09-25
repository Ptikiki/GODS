import { TweenLite } from 'gsap'

class SliderLab {

  constructor(index) {
    STORAGE.sliderLabClass = this
    this.sliderLabs = document.querySelectorAll('.js-slider-lab')
    this.index = index || 0

    this.prevButtons = document.querySelectorAll('.js-lab-slider-prev')
    this.nextButtons = document.querySelectorAll('.js-lab-slider-next')

    this.activeLab = this.sliderLabs[this.index]

    this.swipeValue

    this.bind()
  }

  bind() {
    let that = this
    for (var i = 0; i < this.prevButtons.length; i++) {
      this.prevButtons[i].addEventListener('click', that.handleClick)
    }
    for (var i = 0; i < this.nextButtons.length; i++) {
      this.nextButtons[i].addEventListener('click', that.handleClick)
    }
    window.addEventListener('keydown', that.handleClick)
    window.addEventListener('touchstart', that.handleSwipeStart)
    window.addEventListener('touchend', that.handleSwipeEnd)
  }

  unbind() {
    let that = this
    window.removeEventListener('keydown', that.handleClick)
    window.removeEventListener('touchstart', that.handleSwipeStart)
    window.removeEventListener('touchend', that.handleSwipeEnd)
  }

  setActive() {
    STORAGE.gridClass.animateGrid()
    STORAGE.currentLabIndex = Number(this.index)
    this.doSliderLabDesaparition()

    this.activeLab.querySelector('video').pause()
    this.activeLab = this.sliderLabs[this.index]
    this.activeLab.querySelector('video').play()


    let that = this
    setTimeout(function(){
      that.doSliderLabAparition()
    }, 400)
  }

  doSliderLabDesaparition() {
    TweenLite.to(this.activeLab, 0.3, {
      autoAlpha: 0
    })
    TweenLite.set(this.activeLab, {
      display: "none",
      delay: 0.3
    })
  }

  doSliderLabAparition() {
    const desc = this.activeLab.querySelector('.desc')
    const title = desc.querySelector('.title')
    const date = desc.querySelector('.date')
    const techno = desc.querySelector('.techno')
    TweenLite.set(this.activeLab, {
      display: "block"
    })
    TweenLite.to(this.activeLab, 0.6, {
      autoAlpha: 1
    })
    TweenLite.from(title, 0.4, {
      alpha: 0,
      y: -20,
      delay: 0.6
    })
    TweenLite.from(date, 0.4, {
      alpha: 0,
      y: 20,
      delay: 0.9
    })
    TweenLite.from(techno, 0.4, {
      alpha: 0,
      y: 20,
      delay: 1.1
    })
  }

  handlePrevClick() {
    if (this.index > 0) {
      this.index--
    } else {
      this.index = this.sliderLabs.length - 1
    }
    this.setActive()
  }

  handleNextClick() {
    if (this.index < this.sliderLabs.length - 1) {
      this.index++
    } else {
      this.index = 0
    }
    this.setActive()
  }

  handleClick(e) {
    if (e.keyCode && ( e.keyCode != 37 && e.keyCode != 39 ) ) {
      return
    }
    if (e.keyCode && e.keyCode == 37) {
      STORAGE.sliderLabClass.handlePrevClick()
    } else if (e.keyCode && e.keyCode == 39) {
      STORAGE.sliderLabClass.handleNextClick()
    } else if (this.classList.contains('js-lab-slider-prev')) {
      STORAGE.sliderLabClass.handlePrevClick()
    } else {
      STORAGE.sliderLabClass.handleNextClick()
    }
  }

  handleSwipeStart(e) {
    this.swipeValue = e.touches[0].clientX
  }

  handleSwipeEnd(e) {
    let delta = e.changedTouches[0].clientX - this.swipeValue

    if (delta > 0 && Math.abs(delta) > 100) {
      STORAGE.sliderLabClass.handlePrevClick()
    } else if (delta < 0 && Math.abs(delta) > 100) {
      STORAGE.sliderLabClass.handleNextClick()
    }
  }

}

export default SliderLab
