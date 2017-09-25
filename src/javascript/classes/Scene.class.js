class Scene {

    constructor(options) {
      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      STORAGE.camera = this.camera
      this.light = new THREE.PointLight(0xffffff, 1, Infinity)
      this.light.position.set(20, 0, 20)
      STORAGE.scene.add(this.light)
      this.lightAmb = new THREE.AmbientLight(0x777777)
      STORAGE.scene.add(this.lightAmb)

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      this.createCube()
      this.createBackground()
    }

    createCube() {
      this.geometry = new THREE.BoxGeometry( 50, 50, 50 )
      this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
      this.cube = new THREE.Mesh( this.geometry, this.material )
      STORAGE.scene.add( this.cube )
      STORAGE.camera.position.z = 480
    }

    createBackground() {
      let that = this
      this.texture = new THREE.TextureLoader().load( 'assets/textures/church.jpg' )
      this.textureWidth = 3000
      this.textureHeight = 500
      //console.log(this.texture.encoding)
      this.ratio = this.textureWidth / this.textureHeight
      //console.log(this.ratio)
      this.newTextureWidth = this.ratio * window.innerHeight
      //console.log(this.newTextureWidth)

      this.backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(that.newTextureWidth, window.innerHeight, 0),
        new THREE.MeshBasicMaterial({
          map: that.texture
        })
      )
      //this.backgroundMesh.material.depthTest = false
      //this.backgroundMesh.material.depthWrite = false

      /*this.backgroundScene = new THREE.Scene()
      STORAGE.backgroundScene = this.backgroundScene
      this.backgroundCamera = new THREE.Camera()
      STORAGE.backgroundCamera = this.backgroundCamera
      STORAGE.backgroundScene.add(STORAGE.backgroundCamera )
      STORAGE.backgroundScene.add(this.backgroundMesh )*/
      STORAGE.scene.add(this.backgroundMesh)
      STORAGE.carrousel = this.backgroundMesh
    }

    bind() {
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onDocumentMouseWheel(event) {
      // ZOOM
      /*  
      STORAGE.camera.fov += event.deltaY * 0.05
      STORAGE.camera.updateProjectionMatrix()
      */
            
      console.log(STORAGE.scene.position.x)
      if (Math.abs(STORAGE.scene.position.x - window.innerWidth) < 3000 - 45 && event.deltaY > 0 ) { // stop le défilement au dernier sprite (défile tant que x abs < à largeur totale de tous les sprites-1)
        STORAGE.scene.position.x -= Math.abs(event.deltaY) / 3
      } else if (STORAGE.scene.position.x > -45) {
        return
      } else if (event.deltaY < 0) {
        STORAGE.scene.position.x += Math.abs(event.deltaY) / 3
      }
    }

    animate() {
      let that = STORAGE.SceneClass
      that.cube.rotation.x += 0.05
      that.cube.rotation.y += 0.02
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Scene
