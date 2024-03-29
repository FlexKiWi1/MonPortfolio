import * as THREE from 'three'

function createTypingEffect(text, elementOuEcrire, spd) {
    let i = 0;
    const speed = spd;

    function writeText() {
        const element = document.querySelector(elementOuEcrire);
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(writeText, speed);
        }
    }

    function checkScroll() {
        const textContainer = document.querySelector(elementOuEcrire);
        const rect = textContainer.getBoundingClientRect();
        const isTextVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

        if (isTextVisible && i === 0) {
            writeText();
        }
    }

    window.addEventListener('load', function () {
        checkScroll();
    });

    window.addEventListener('scroll', function () {
        checkScroll();
    });
}

createTypingEffect("Expériences", '.experiences-heading', 100);
createTypingEffect("Loris Caruhel", '.mon_nom', 100);
createTypingEffect("Scolarité", '.scolarite-heading', 100);
createTypingEffect("Futur Développeur", '.moi-heading', 100);
createTypingEffect("Compétences", '.competences-heading', 100);


window.canvas = document.getElementById('canvas')
window.canvas.width = innerWidth
window.canvas.height = innerHeight
window.iw = innerWidth
window.ih = innerHeight

const scene = new THREE.Scene()
scene.background = new THREE.Color('black');

const camera = new THREE.PerspectiveCamera(45, iw / ih)

const geometry = computeGeometry()
const material = new THREE.PointsMaterial( { size: 0.0009, vertexColors: true } )
const mesh = new THREE.Points( geometry, material )

scene.add( mesh )

camera.position.set(0, 1, 2)
camera.lookAt(0, -0.5, 0)

const renderer = new THREE.WebGLRenderer({ canvas })

const clock = new THREE.Clock()
let t = 0

loop()

// Effet pour faire tourner l'animation 3D
function loop() {
  t += clock.getDelta()
  animeGeometry(geometry, t)
  mesh.rotation.y = 0.1*t
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

// Créer l'effet de vague et la couleur
function computeGeometry() {
    const space = 4, nb = 100, amp = 0.1, fre = 1, pi2= Math.PI*2
  
    const geometry = new THREE.BufferGeometry()
  
    const positions = new Float32Array( nb * nb * 3 )
      const colors = new Float32Array( nb * nb * 3 )
  
    const color1 = new THREE.Color("#079BEE")
    const color2 = new THREE.Color("#4EC1AF")
  
    let k = 0
    for ( let i = 0; i < nb; i ++ ) {
      for ( let j = 0; j < nb; j ++ ) {
        const x = i*(space/nb)-space/2
        const z = j*(space/nb)-space/2
        const y = amp * ( Math.cos(x*pi2*fre) + Math.sin(z*pi2*fre) )
        positions[ 3 * k + 0 ] = x
        positions[ 3 * k + 1 ] = y
        positions[ 3 * k + 2 ] = z
  
        const yPosNormalized = (y + amp) / (2 * amp)
        const weight = 1 - yPosNormalized 
  
        const interpolatedColor = new THREE.Color().copy(color1).lerp(color2, weight)
  
        colors[ 3 * k + 0] = interpolatedColor.r
        colors[ 3 * k + 1 ] = interpolatedColor.g
        colors[ 3 * k + 2 ] = interpolatedColor.b
        
        k ++
      }
    }
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) )
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) )
    geometry.computeBoundingBox()
    return geometry
  }
  
function animeGeometry(geometry, progress) {
  const space = 4, nb = 100, amp = 0.1, pi2= Math.PI*2
  const phase = progress
  const fre = 0.8 + Math.cos(progress)/2

  let k = 0
  for ( let i = 0; i < nb; i ++ ) {
    for ( let j = 0; j < nb; j ++ ) {
      const x = i*(space/nb)-space/2
      const z = j*(space/nb)-space/2
      const y = amp * ( Math.cos(x*pi2*fre+phase) + Math.sin(z*pi2*fre+phase) )
      geometry.attributes.position.setY(k, y)
      geometry.attributes.color.setX(k, 0.306)
      geometry.attributes.color.setY(k, 0.756) 
      geometry.attributes.color.setZ(k, 0.686) 
      k ++
    }
  }
  geometry.attributes.position.needsUpdate = true
  geometry.attributes.color.needsUpdate = true 
}


function detecterOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
  } else if (/Android/.test(userAgent)) {
      os = 'Android';
  } else if (/Linux/.test(platform)) {
      os = 'Linux';
  }

  return os;
}

function afficherPopupSiLinux() {
    var os = detecterOS();
    if (os === 'Linux') {
        alert('Pour une meilleur experience de mon portfolio utiliser windows ou mac OS.');
    }
}

afficherPopupSiLinux();