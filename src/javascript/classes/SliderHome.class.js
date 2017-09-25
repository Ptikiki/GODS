import { TweenLite } from 'gsap'

class SliderHome {

  constructor(index, type) {
    STORAGE.sliderHomeClass = this
    this.el = document.querySelector('.js-home-slider')
    this.sliderMedias = this.el.querySelectorAll('.js-home-slider-media')
    this.sliderImages = this.el.querySelectorAll('.js-home-slider-media.is-image')
    this.sliderTitles = this.el.querySelectorAll('.js-home-slider-title')
    this.sliderDates = this.el.querySelectorAll('.js-home-slider-date')

    this.prevButton = this.el.querySelector('.js-home-slider-prev')
    this.nextButton = this.el.querySelector('.js-home-slider-next')
    this.index = index || 0
    this.actualType = type

    this.activeMedia = this.sliderMedias[this.index]
    this.activeTitle = this.sliderTitles[this.index]
    this.activeDate = this.sliderDates[this.index]

    this.swipeValue

    this.initialDisplacement = [0,0]

    this.bind()
  }

  bind() {
    let that = this
    this.prevButton.addEventListener('click', that.handleClick)
    this.nextButton.addEventListener('click', that.handleClick)
    window.addEventListener('keydown', that.handleClick)
    window.addEventListener('resize', that.handleResize)

    window.addEventListener('touchstart', that.handleSwipeStart)
    window.addEventListener('touchend', that.handleSwipeEnd)

    window.addEventListener('mousemove', that.handleMouseMove)
    window.addEventListener('mousewheel', that.handleScroll)
  }

  unbind() {
    let that = this
    this.prevButton.removeEventListener('click', that.handleClick)
    this.nextButton.removeEventListener('click', that.handleClick)
    window.removeEventListener('keydown', that.handleClick)
    window.removeEventListener('resize', that.handleResize)

    window.removeEventListener('touchstart', that.handleSwipeStart)
    window.removeEventListener('touchend', that.handleSwipeEnd)

    window.removeEventListener('mousemove', that.handleMouseMove)
    window.removeEventListener('mousewheel', that.handleScroll)
  }

  setActive() {
    STORAGE.gridClass.animateGrid()
    this.doSliderHomeDesaparition()

    if (this.activeMedia.classList.contains('is-video'))
      this.activeMedia.pause()

    this.activeMedia = this.sliderMedias[this.index]
    this.activeTitle = this.sliderTitles[this.index]
    this.activeDate = this.sliderDates[this.index]

    if (this.activeMedia.classList.contains('is-video'))
      this.activeMedia.play()

    let that = this
    setTimeout(function(){
      that.doSliderHomeAparition()
      STORAGE.resizerClass.resizeHomeMedias(that.activeMedia)
    }, 400)

    this.handleTypeChange()
  }

  doSliderHomeDesaparition() {
    TweenLite.to([this.activeMedia, this.activeTitle, this.activeDate], 0.3, {
      autoAlpha: 0
    })
    TweenLite.set([this.activeMedia, this.activeTitle, this.activeDate], {
      display: "none",
      delay: 0.3
    })
  }

  doSliderHomeAparition() {
    TweenLite.set([this.activeMedia, this.activeTitle, this.activeDate], {
      display: "block"
    })
    TweenLite.to([this.activeMedia], 0.6, {
      autoAlpha: 1
    })
    TweenLite.to([this.activeTitle, this.activeDate], 0.9, {
      autoAlpha: 1,
      delay: 0.2
    })
    TweenLite.from(this.activeTitle, 0.6, {
      x: -60,
      delay: 0.1
    })
    TweenLite.from(this.activeDate, 0.6, {
      x: 30,
      delay: 0.3
    })
  }

  handlePrevClick() {
    if (this.index > 0) {
      this.index--
    } else {
      this.index = this.sliderMedias.length - 1
    }
    this.setActive()
  }

  handleNextClick() {
    if (this.index < this.sliderMedias.length - 1) {
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
      STORAGE.sliderHomeClass.handlePrevClick()
    } else if (e.keyCode && e.keyCode == 39) {
      STORAGE.sliderHomeClass.handleNextClick()
    } else if (this.classList.contains('js-home-slider-prev')) {
      STORAGE.sliderHomeClass.handlePrevClick()
    } else {
      STORAGE.sliderHomeClass.handleNextClick()
    }
  }

  handleTypeChange() {
    this.actualType = this.activeMedia.getAttribute('data-type')
    if (this.actualType == 'project') {
      document.querySelector('.js-nav-lab').classList.remove('is-active')
      document.querySelector('.js-nav-project').classList.add('is-active')
      STORAGE.currentProjectIndex = Number(this.index)
    } else {
      document.querySelector('.js-nav-project').classList.remove('is-active')
      document.querySelector('.js-nav-lab').classList.add('is-active')
      STORAGE.currentLabIndex = Number(this.index - 7)
    }
  }

  handleResize() {
    setTimeout(function(){
      STORAGE.resizerClass.resizeHomeMedias(STORAGE.sliderHomeClass.activeMedia)
    }, 50)
  }

  handleSwipeStart(e) {
    this.swipeValue = e.touches[0].clientX
  }

  handleSwipeEnd(e) {
    let delta = e.changedTouches[0].clientX - this.swipeValue

    if (delta > 0 && Math.abs(delta) > 100) {
      STORAGE.sliderHomeClass.handlePrevClick()
    } else if (delta < 0 && Math.abs(delta) > 100) {
      STORAGE.sliderHomeClass.handleNextClick()
    }
  }

  handleScroll(e) {
      e.preventDefault()
      if (e.deltaY < -30) {
        STORAGE.sliderHomeClass.handlePrevClick()
        window.removeEventListener('mousewheel', STORAGE.sliderHomeClass.handleScroll)
        setTimeout(function() {
          window.addEventListener('mousewheel', STORAGE.sliderHomeClass.handleScroll)
        }, 1000)
      } else if (e.deltaY > 30) {
        STORAGE.sliderHomeClass.handleNextClick()
        window.removeEventListener('mousewheel', STORAGE.sliderHomeClass.handleScroll)
        setTimeout(function() {
          window.addEventListener('mousewheel', STORAGE.sliderHomeClass.handleScroll)
        }, 1000)
      }
    }

  handleMouseMove(e) {
    if (STORAGE.sliderHomeClass.sliderImages[STORAGE.sliderHomeClass.index] && window.innerWidth > 640) {
      TweenLite.set(STORAGE.sliderHomeClass.sliderImages[STORAGE.sliderHomeClass.index], {
        x: STORAGE.sliderHomeClass.initialDisplacement[0] - (window.innerWidth / 2 - e.clientX) / 50 ,
        y: STORAGE.sliderHomeClass.initialDisplacement[1] - (window.innerHeight / 2 - e.clientY) / 50
      })
    }
  }

}

export default SliderHome
