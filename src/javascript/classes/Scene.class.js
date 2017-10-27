class Scene {

    constructor(options) {

      STORAGE.SceneClass = this
      this.scene = new THREE.Scene()
      STORAGE.scene = this.scene
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      STORAGE.camera = this.camera
      STORAGE.camera.position.z = 480
      // this.controls = new THREE.OrbitControls( STORAGE.camera )
      // this.controls.target.set( 0, 0, 0 )
      this.light = new THREE.PointLight(0xffffff, 1, Infinity)
      this.light.position.set(20, 20, 20)
      STORAGE.scene.add(this.light)
      this.lightAmb = new THREE.AmbientLight(0x777777)
      STORAGE.scene.add(this.lightAmb)

      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()

      this.homeSlider1 = document.querySelector('.js-home-slider')

      this.init()
      this.bind()
      this.animate()
    }

    init() {
      this.createBackground()
      this.createStatue()
    }

    createStatue() {
      let that = this

      this.manager = new THREE.LoadingManager()
      this.manager.onProgress = function ( item, loaded, total ) {
      }

      this.myObjects = []
      this.loader = new THREE.OBJLoader( this.manager )
      this.loader.load( 'assets/statue.obj', function ( object ) {
        // object.traverse( function ( child ) {
        //   if ( child instanceof THREE.Mesh ) {
        //     child.material.map = texture
        //   }
        // } )

        object.position.x = 20
        object.position.y = -200
        object.position.z = 150
        //object.rotation.x = -300
        object.rotation.y = Math.PI/2
        //object.rotation.z = 100
        object.scale.x = 2.8
        object.scale.y = 2.8
        object.scale.z = 2.8

        STORAGE.scene.add( object )
        that.myObjects.push(object)

        // that.box = new THREE.Box3().setFromObject( object )
        // that.box.getCenter( object.position ) // this re-sets the mesh position
        // object.position.multiplyScalar( - 1 )

        // that.pivot = new THREE.Group()
        // STORAGE.scene.add( that.pivot )
        // that.pivot.add( object )

      } )

    }

    createBackground() {
      let that = this
      this.texture = new THREE.TextureLoader().load( 'assets/textures/church.jpg' )
      this.textureWidth = 3000
      this.textureHeight = 500
      this.ratio = this.textureWidth / this.textureHeight
      this.newTextureWidth = this.ratio * window.innerHeight

      this.backgroundMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(that.newTextureWidth, window.innerHeight, 0),
        new THREE.MeshBasicMaterial({
          map: that.texture
        })
      )
      STORAGE.scene.add(this.backgroundMesh)
      STORAGE.carrousel = this.backgroundMesh        
    }

    onMouseMove(event) {
      let that = STORAGE.SceneClass
      that.statue = that.myObjects[0]

      that.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
      that.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

      that.actualMouseX = that.mouse.x
      setTimeout(function() {
        that.newMouseX = that.mouse.x
      }, 500)
   
      if (that.actualMouseX < that.newMouseX && that.statue.rotation.y > 1.2) {
        console.log("tourche à gauche")
        that.statue.rotation.y -= 0.007
      }
      else if (that.actualMouseX > that.newMouseX && that.statue.rotation.y < 2.1) {
        console.log("tourne à droite")
        that.statue.rotation.y += 0.007
      }

    }

    bind() {
      document.addEventListener( 'wheel', this.onDocumentMouseWheel, false )
      document.addEventListener('mousemove', this.onMouseMove, false )
      window.addEventListener( 'resize', this.onWindowResize, false )
    }

    onWindowResize() {
      STORAGE.camera.aspect = window.innerWidth / window.innerHeight
      STORAGE.camera.updateProjectionMatrix()
      STORAGE.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    onDocumentMouseWheel(event) {
      let that = STORAGE.SceneClass
            
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
      STORAGE.renderer.render(STORAGE.scene, STORAGE.camera)
      requestAnimationFrame( that.animate )
    }
}

export default Scene
