class Loader {

  constructor(options) {
    this.loader = PIXI.loader
    STORAGE.loaderClass = this
    STORAGE.loader = this.loader
  }

  // loadCarouselPictures(pictures) {
  //   this.loader.resources = {}

  //   for (var i = 0; i < pictures.length; i++) {
  //     this.loader
  //     .add([pictures[i]])
  //   }
  //   this.loader
  //   .load(function(){
  //     STORAGE.carouselClass.setupCarouselPicturesLoaded()
  //   })

  //   if (STORAGE.carouselClass.carouselNumber == 1) {
  //     this.loader.carousel1 = this.loader.resources
  //   } else if (STORAGE.carouselClass.carouselNumber == 2) {
  //     this.loader.carousel2 = this.loader.resources
  //   } else if (STORAGE.carouselClass.carouselNumber == 3) {
  //     this.loader.carousel3 = this.loader.resources
  //   }
  // }

}

export default Loader
