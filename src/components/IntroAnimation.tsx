'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface IntroAnimationProps {
  onComplete: () => void
}

/**
 * Procedurally generates a photorealistic American Hickory wood grain texture
 * with realistic fibers, satin finish, and custom laser-etched "JAKE PARSONS" 5A branding.
 */
function createHickoryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // 1. Base Hickory Wood Tone Gradient (circumference along Y, length along X)
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
  grad.addColorStop(0.0, '#362315')
  grad.addColorStop(0.08, '#6e4c2f')
  grad.addColorStop(0.22, '#bc966a')
  grad.addColorStop(0.5, '#f4e0c4') // Highlights on the wood cylinder
  grad.addColorStop(0.78, '#b89165')
  grad.addColorStop(0.92, '#5e3e23')
  grad.addColorStop(1.0, '#2d1b10')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 2. Fine longitudinal wood fibers and grain rings
  const grainCount = 380
  for (let i = 0; i < grainCount; i++) {
    const y = Math.random() * canvas.height
    const alpha = 0.03 + Math.random() * 0.09
    const isDark = Math.random() > 0.35
    ctx.strokeStyle = isDark ? `rgba(40, 24, 12, ${alpha})` : `rgba(255, 245, 230, ${alpha * 0.8})`
    ctx.lineWidth = 0.5 + Math.random() * 2.2

    ctx.beginPath()
    let currY = y
    ctx.moveTo(0, currY)
    for (let x = 0; x <= canvas.width; x += 32) {
      currY += (Math.random() - 0.5) * 2.5
      ctx.lineTo(x, currY)
    }
    ctx.stroke()
  }

  // 3. Wood Pores and Natural Grain Imperfections
  for (let p = 0; p < 600; p++) {
    const px = Math.random() * canvas.width
    const py = Math.random() * canvas.height
    const pLen = 3 + Math.random() * 14
    ctx.fillStyle = 'rgba(45, 25, 12, 0.12)'
    ctx.fillRect(px, py, pLen, 0.8)
  }

  // 4. Lathe Micro-grooves / Turning Tool Lines
  const latheLines = [60, 140, 220, 310, 480, 620, 750, 890]
  latheLines.forEach((lx) => {
    ctx.strokeStyle = 'rgba(35, 20, 10, 0.18)'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.moveTo(lx, 0)
    ctx.lineTo(lx, canvas.height)
    ctx.stroke()
  })

  // 5. Laser-etched 5A Branding along handle shaft (X ~ 140 to 440, center Y)
  ctx.save()
  const centerY = canvas.height * 0.5

  // Brand Badge Border
  ctx.strokeStyle = 'rgba(28, 16, 8, 0.75)'
  ctx.lineWidth = 1.5
  ctx.strokeRect(170, centerY - 42, 290, 84)
  ctx.strokeRect(173, centerY - 39, 284, 78)

  // Top model tag
  ctx.fillStyle = 'rgba(28, 16, 8, 0.85)'
  ctx.font = 'bold 15px "Courier New", Courier, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('★  5A AMERICAN HICKORY  ★', 315, centerY - 18)

  // Artist Name in bold
  ctx.font = '900 24px "Impact", "Arial Black", sans-serif'
  ctx.letterSpacing = '3px'
  ctx.fillText('JAKE PARSONS', 315, centerY + 12)

  // Sub-series
  ctx.font = '10px "Courier New", Courier, monospace'
  ctx.letterSpacing = '2px'
  ctx.fillText('SIGNATURE // BULLET-SERIES', 315, centerY + 30)

  ctx.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  return texture
}

/**
 * Creates the true 3D Lathe geometry for a standard 5A American Hickory drumstick
 * with precise butt cap, taper, neck, and acorn tip.
 */
function create5ADrumstickGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [
    new THREE.Vector2(0, 0), // Butt center
    new THREE.Vector2(0.2, 0.1), // Butt bevel
    new THREE.Vector2(0.28, 0.35), // Main shaft start
    new THREE.Vector2(0.28, 6.8), // Main shaft length
    new THREE.Vector2(0.25, 7.5), // Taper start
    new THREE.Vector2(0.19, 8.3), // Taper shoulder
    new THREE.Vector2(0.14, 9.1), // Slender neck
    new THREE.Vector2(0.15, 9.3), // Acorn tip base
    new THREE.Vector2(0.21, 9.7), // Acorn tip swelling
    new THREE.Vector2(0.16, 10.0), // Acorn tip crown
    new THREE.Vector2(0, 10.2), // Acorn tip point
  ]

  // 36 lathe segments produces silky-smooth cylindrical curvature
  const geometry = new THREE.LatheGeometry(points, 36)
  // Center geometry so rotation/tumble naturally pivots around physical center of mass
  geometry.center()
  return geometry
}

/**
 * Air-wake / shockwave ring for Matrix bullet-time disturbance
 */
interface WakeRing {
  mesh: THREE.Mesh
  active: boolean
  birthTime: number
  originPos: THREE.Vector3
  normal: THREE.Vector3
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [crackOpacity, setCrackOpacity] = useState(0)
  const [impactFlash, setImpactFlash] = useState(0)
  const [shockwaveScale, setShockwaveScale] = useState(0)
  const [shockwaveOpacity, setShockwaveOpacity] = useState(0)
  const [shake, setShake] = useState({ x: 0, y: 0, r: 0 })
  const [containerOpacity, setContainerOpacity] = useState(1)
  const completedRef = useRef(false)

  const handleSkip = () => {
    if (completedRef.current) return
    completedRef.current = true
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('jake-intro-seen', '1')
    }
    setContainerOpacity(0)
    setTimeout(() => {
      onComplete()
    }, 200)
  }

  useEffect(() => {
    // Keyboard shortcut ESC to skip
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    // Check if user already saw it in this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('jake-intro-seen') === '1') {
      onComplete()
      return () => {
        window.removeEventListener('keydown', onKeyDown)
      }
    }

    if (!containerRef.current) return

    // --- THREE.JS SCENE SETUP ---
    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000)
    camera.position.set(0, 0, 7.5)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25

    const mount = containerRef.current
    mount.appendChild(renderer.domElement)

    if (typeof window !== 'undefined') {
      ;(window as any).__threeScene = scene
      ;(window as any).__threeRenderer = renderer
      ;(window as any).__threeCamera = camera
    }

    // --- CINEMATIC LIGHTING (Studio High-Contrast Setup) ---
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0x404048, 1.2)
    scene.add(ambientLight)

    // High-intensity key directional light from above-front
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(4, 8, 10)
    scene.add(keyLight)

    // Matrix cyan rim light from behind (razor-sharp contour highlight)
    const rimLight = new THREE.DirectionalLight(0x50d0ff, 3.8)
    rimLight.position.set(-6, 4, -6)
    scene.add(rimLight)

    // Warm amber fill light from below
    const bounceLight = new THREE.DirectionalLight(0xffaa50, 1.8)
    bounceLight.position.set(6, -5, 5)
    scene.add(bounceLight)

    // Dynamic point light at impact point
    const impactPointLight = new THREE.PointLight(0xffffff, 0, 30)
    impactPointLight.position.set(0, 0, 6)
    scene.add(impactPointLight)

    // --- 3D 5A DRUMSTICKS (Group + Mesh architecture for true Matrix bullet spin) ---
    const stickGeometry = create5ADrumstickGeometry()
    const hickoryTexture = createHickoryTexture()
    hickoryTexture.needsUpdate = true

    const drumstickMaterial = new THREE.MeshPhysicalMaterial({
      map: hickoryTexture,
      roughness: 0.22,
      metalness: 0.02,
      clearcoat: 0.95,
      clearcoatRoughness: 0.12,
      reflectivity: 0.7,
    })

    // Stick 1 (Left projectile)
    const stickGroup1 = new THREE.Group()
    const mesh1 = new THREE.Mesh(stickGeometry, drumstickMaterial)
    stickGroup1.add(mesh1)
    stickGroup1.position.set(-3.2, -1.2, -16)
    stickGroup1.rotation.set(Math.PI * 0.38, -0.08, 0.05)
    scene.add(stickGroup1)

    // Stick 2 (Right projectile)
    const stickGroup2 = new THREE.Group()
    const mesh2 = new THREE.Mesh(stickGeometry, drumstickMaterial)
    stickGroup2.add(mesh2)
    stickGroup2.position.set(3.8, 1.4, -18)
    stickGroup2.rotation.set(Math.PI * 0.37, 0.1, -0.05)
    scene.add(stickGroup2)

    // --- MATRIX BULLET-TIME AIR WAKE / SHOCKWAVE RINGS ---
    const ringGeometry = new THREE.TorusGeometry(0.45, 0.038, 16, 36)
    const wakeRings: WakeRing[] = []
    const MAX_RINGS = 36

    for (let i = 0; i < MAX_RINGS; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x78e8ff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(ringGeometry, ringMat)
      mesh.visible = false
      scene.add(mesh)
      wakeRings.push({
        mesh,
        active: false,
        birthTime: 0,
        originPos: new THREE.Vector3(),
        normal: new THREE.Vector3(0, 0, 1),
      })
    }

    let nextRingIdx = 0
    const spawnWakeRing = (pos: THREE.Vector3, dir: THREE.Vector3, time: number) => {
      const ring = wakeRings[nextRingIdx]
      nextRingIdx = (nextRingIdx + 1) % MAX_RINGS
      ring.active = true
      ring.birthTime = time
      ring.originPos.copy(pos)
      ring.mesh.position.copy(pos)
      ring.mesh.scale.set(0.7, 0.7, 0.7)
      ring.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.clone().normalize())
      ring.mesh.visible = true
      ;(ring.mesh.material as THREE.MeshBasicMaterial).opacity = 0.85
    }

    // --- SUSPENDED MATRIX DUST PARTICLES ---
    const dustCount = 300
    const dustGeo = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 18
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 12
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    const dustMat = new THREE.PointsMaterial({
      color: 0x90e8ff,
      size: 0.07,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    })
    const dustParticles = new THREE.Points(dustGeo, dustMat)
    scene.add(dustParticles)

    // --- ANIMATION TIMING & LOOP ---
    const startTime = performance.now()
    let animationFrameId: number
    let lastRingSpawnTime = 0

    // Local tip offset in centered lathe geometry (length 10.2 -> tip at y = 5.05)
    const tipLocalOffset = new THREE.Vector3(0, 5.05, 0)

    const animate = (timestamp: number) => {
      const elapsed = (timestamp - startTime) / 1000 // elapsed seconds

      // -------------------------------------------------------------
      // 1. THE THROW & MATRIX BULLET-TIME SPEED RAMP
      // -------------------------------------------------------------
      let bulletT: number
      if (elapsed < 0.28) {
        // Fast launch: 0.0 -> 0.22
        const n = elapsed / 0.28
        bulletT = Math.pow(n, 1.3) * 0.22
      } else if (elapsed < 1.55) {
        // Matrix Bullet-time dilation: 0.22 -> 0.84
        const n = (elapsed - 0.28) / 1.27
        bulletT = 0.22 + n * 0.62
      } else if (elapsed < 1.7) {
        // Point-blank surge into camera lens: 0.84 -> 1.0
        const n = (elapsed - 1.55) / 0.15
        bulletT = 0.84 + Math.pow(n, 2.4) * 0.16
      } else {
        bulletT = 1.0
      }

      // Dynamic pitch transition:
      // In bullet-time, pitch is ~68° (Math.PI * 0.38) so full 3D body and grain are visible.
      // Near impact (1.55s - 1.7s), pitch snaps to 88° (Math.PI * 0.49) to hit the lens glass tip-first!
      const impactAlignT = Math.min(1, Math.max(0, (elapsed - 1.48) / 0.22))
      const pitch1 = THREE.MathUtils.lerp(Math.PI * 0.38, Math.PI * 0.49, impactAlignT)
      const pitch2 = THREE.MathUtils.lerp(Math.PI * 0.37, Math.PI * 0.49, impactAlignT)

      // --- STICK 1 (LEFT THROWN DRUMSTICK: Flying head-on at the viewer) ---
      const s1StartZ = -16
      const s1EndZ = 2.4
      const s1Z = s1StartZ + bulletT * (s1EndZ - s1StartZ)
      const s1X = -3.2 * (1 - bulletT) - 0.25 * bulletT
      const s1Y = -1.2 * (1 - bulletT) - 0.05 * bulletT
      stickGroup1.position.set(s1X, s1Y, s1Z)

      // Authentic bullet rifling spin around the stick's own axis:
      mesh1.rotation.y = elapsed * 26.0

      // Dynamic pitch & corkscrew wobble
      const wobble1X = pitch1 + Math.sin(elapsed * 2.5) * 0.05 * (1 - impactAlignT)
      const wobble1Y = -0.08 * (1 - impactAlignT) + Math.cos(elapsed * 2.0) * 0.06 * (1 - impactAlignT)
      const wobble1Z = Math.sin(elapsed * 1.8) * 0.04 * (1 - impactAlignT)
      stickGroup1.rotation.set(wobble1X, wobble1Y, wobble1Z)

      // --- STICK 2 (RIGHT THROWN DRUMSTICK: Crossing trajectory) ---
      const s2StartZ = -18
      const s2EndZ = 2.3
      const s2Z = s2StartZ + bulletT * (s2EndZ - s2StartZ)
      const s2X = 3.8 * (1 - bulletT) + 0.3 * bulletT
      const s2Y = 1.4 * (1 - bulletT) + 0.1 * bulletT
      stickGroup2.position.set(s2X, s2Y, s2Z)

      // Counter-rotating rifling spin
      mesh2.rotation.y = -elapsed * 28.0

      const wobble2X = pitch2 + Math.sin(elapsed * 2.2 + 1.2) * 0.06 * (1 - impactAlignT)
      const wobble2Y = 0.09 * (1 - impactAlignT) + Math.cos(elapsed * 1.7 + 0.8) * 0.07 * (1 - impactAlignT)
      const wobble2Z = -Math.sin(elapsed * 1.5) * 0.05 * (1 - impactAlignT)
      stickGroup2.rotation.set(wobble2X, wobble2Y, wobble2Z)

      // --- MATRIX DUST DRIFT ---
      dustParticles.rotation.y = elapsed * 0.03
      dustParticles.rotation.z = elapsed * 0.015

      // --- MATRIX CAMERA BULLET-TIME ORBIT ---
      if (elapsed < 1.7) {
        camera.position.x = Math.sin(elapsed * 1.3) * 0.5
        camera.position.y = Math.cos(elapsed * 1.0) * 0.35
        camera.lookAt(0, 0, s1Z * 0.6)
      }

      // --- SPAWN MATRIX CONICAL AIR-WAKE SHOCKWAVES ---
      if (elapsed > 0.12 && elapsed < 1.68) {
        if (elapsed - lastRingSpawnTime > 0.04) {
          lastRingSpawnTime = elapsed
          stickGroup1.updateMatrixWorld(true)
          stickGroup2.updateMatrixWorld(true)

          const tip1World = tipLocalOffset.clone()
          mesh1.localToWorld(tip1World)
          const forward1 = new THREE.Vector3(0, 0, 1)
          spawnWakeRing(tip1World, forward1, elapsed)

          const tip2World = tipLocalOffset.clone()
          mesh2.localToWorld(tip2World)
          const forward2 = new THREE.Vector3(0, 0, 1)
          spawnWakeRing(tip2World, forward2, elapsed)
        }
      }

      // Update existing wake rings
      wakeRings.forEach((ring) => {
        if (!ring.active) return
        const ringAge = elapsed - ring.birthTime
        if (ringAge > 0.42) {
          ring.active = false
          ring.mesh.visible = false
        } else {
          const ringProgress = ringAge / 0.42
          const currentScale = 0.7 + ringProgress * 3.4
          ring.mesh.scale.set(currentScale, currentScale, currentScale)
          const mat = ring.mesh.material as THREE.MeshBasicMaterial
          mat.opacity = (1 - ringProgress) * 0.75
        }
      })

      // -------------------------------------------------------------
      // 2. POINT-BLANK SCREEN IMPACT MOMENT (1.70s -> 2.10s)
      // -------------------------------------------------------------
      if (elapsed >= 1.7 && elapsed < 2.1) {
        const impactTime = elapsed - 1.7
        const normImpact = impactTime / 0.4 // 0 to 1

        // Camera Glass Shake
        const shakeDecay = Math.max(0, 1 - normImpact)
        const freq = impactTime * 70
        setShake({
          x: Math.sin(freq) * 20 * shakeDecay,
          y: Math.cos(freq * 1.4) * 16 * shakeDecay,
          r: Math.sin(freq * 0.8) * 3.0 * shakeDecay,
        })

        // Glass crack overlay instantly visible
        setCrackOpacity(1)

        // Impact flash spike & point light flash
        const flashIntensity = Math.max(0, 1 - normImpact * 2.2)
        setImpactFlash(flashIntensity)
        impactPointLight.intensity = flashIntensity * 160

        // Expanding radial shockwave ring
        setShockwaveScale(normImpact * 4.5)
        setShockwaveOpacity(Math.max(0, 1 - normImpact))

        // Sticks violently deflect off the lens glass
        stickGroup1.position.x -= normImpact * 4.0
        stickGroup1.position.y += normImpact * 2.5
        stickGroup1.position.z -= normImpact * 6.0
        stickGroup1.rotation.x += normImpact * 4
        stickGroup1.rotation.z += normImpact * 6

        stickGroup2.position.x += normImpact * 4.2
        stickGroup2.position.y -= normImpact * 2.8
        stickGroup2.position.z -= normImpact * 6.5
        stickGroup2.rotation.x -= normImpact * 5
        stickGroup2.rotation.z -= normImpact * 7
      }
      // -------------------------------------------------------------
      // 3. DISSOLVE INTO WEBSITE (2.10s -> 2.55s)
      // -------------------------------------------------------------
      else if (elapsed >= 2.1 && elapsed < 2.55) {
        const transTime = (elapsed - 2.1) / 0.45
        setShake({ x: 0, y: 0, r: 0 })
        setContainerOpacity(Math.max(0, 1 - transTime))
        setCrackOpacity(Math.max(0, 1 - transTime * 1.6))
        setShockwaveOpacity(0)
      }
      // -------------------------------------------------------------
      // 4. ANIMATION COMPLETE
      // -------------------------------------------------------------
      else if (elapsed >= 2.55) {
        if (!completedRef.current) {
          completedRef.current = true
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('jake-intro-seen', '1')
          }
          onComplete()
        }
        return
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Handle Window Resizing
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup resources
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      stickGeometry.dispose()
      hickoryTexture.dispose()
      drumstickMaterial.dispose()
      ringGeometry.dispose()
      wakeRings.forEach((r) => {
        ;(r.mesh.material as THREE.Material).dispose()
      })
      dustGeo.dispose()
      dustMat.dispose()
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[120] bg-[#050505] overflow-hidden select-none flex items-center justify-center transition-opacity duration-300"
      style={{
        opacity: containerOpacity,
        transform: `translate3d(${shake.x}px, ${shake.y}px, 0px) rotate(${shake.r}deg)`,
      }}
    >
      {/* 3D WebGL Three.js Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Atmospheric Stage Volumetric Backlight Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1100px] h-[160%] pointer-events-none opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(130, 220, 255, 0.25) 0%, rgba(80, 180, 240, 0.08) 35%, transparent 70%)',
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
            filter: 'blur(35px)',
          }}
        />
      </div>

      {/* IMPACT EFFECTS: Procedural Spiderweb Glass Fracture */}
      {crackOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-150"
          style={{ opacity: crackOpacity }}
        >
          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glassGlint" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Impact Centers */}
            <circle cx="500" cy="500" r="14" fill="#ffffff" filter="url(#glassGlint)" />
            <circle cx="500" cy="500" r="34" fill="rgba(255,255,255,0.45)" filter="url(#glassGlint)" />

            {/* Spiderweb Radial Fractures */}
            <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.95" filter="url(#glassGlint)">
              <path d="M500 500 L550 420 L610 370 L700 290 L820 190 L950 110" />
              <path d="M550 420 L640 400 L740 360 L870 330" strokeWidth="1.8" opacity="0.85" />
              <path d="M500 500 L440 410 L380 340 L300 270 L190 190 L70 120" />
              <path d="M440 410 L350 430 L250 420 L130 400" strokeWidth="1.8" opacity="0.85" />
              <path d="M500 500 L570 560 L660 630 L760 720 L870 820 L980 930" />
              <path d="M570 560 L680 580 L800 600 L930 630" strokeWidth="1.8" opacity="0.85" />
              <path d="M500 500 L430 570 L350 640 L260 740 L160 840 L40 940" />
              <path d="M430 570 L400 680 L360 800 L320 950" strokeWidth="1.8" opacity="0.85" />
              <path d="M500 500 L515 370 L505 240 L520 80" strokeWidth="2" opacity="0.85" />
              <path d="M500 500 L485 630 L495 780 L480 960" strokeWidth="2" opacity="0.85" />
              <path d="M500 500 L640 510 L780 495 L950 515" strokeWidth="2" opacity="0.85" />
              <path d="M500 500 L360 490 L220 505 L50 485" strokeWidth="2" opacity="0.85" />

              {/* Concentric Impact Rings */}
              <path
                d="M440 460 Q470 410 520 420 Q570 450 560 510 Q530 570 480 560 Q430 530 440 460 Z"
                fill="rgba(255, 255, 255, 0.15)"
                strokeWidth="2.2"
              />
              <path
                d="M390 420 Q480 340 590 370 Q670 440 640 560 Q580 670 450 640 Q340 570 390 420 Z"
                fill="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.8"
                opacity="0.8"
              />
              <path
                d="M320 370 Q480 260 670 310 Q770 430 730 630 Q630 780 410 730 Q250 630 320 370 Z"
                fill="rgba(255, 255, 255, 0.04)"
                strokeWidth="1.4"
                opacity="0.6"
              />
            </g>
          </svg>
        </div>
      )}

      {/* EXPANDING RADIAL SHOCKWAVE RING */}
      {shockwaveOpacity > 0 && (
        <div
          className="absolute w-72 h-72 rounded-full border-2 border-white pointer-events-none z-40"
          style={{
            transform: `scale(${shockwaveScale})`,
            opacity: shockwaveOpacity,
            boxShadow:
              '0 0 60px 15px rgba(160, 230, 255, 0.85), inset 0 0 35px 12px rgba(255, 255, 255, 0.6)',
          }}
        />
      )}

      {/* FULL-SCREEN IMPACT FLASH */}
      {impactFlash > 0 && (
        <div
          className="absolute inset-0 bg-white pointer-events-none z-50"
          style={{
            opacity: impactFlash,
            transition: 'opacity 0.06s ease-out',
          }}
        />
      )}

      {/* QUICK SKIP BUTTON (Top Right) */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 font-mono text-[10px] tracking-[0.25em] text-[#888] hover:text-white uppercase border border-white/20 hover:border-white/50 px-3.5 py-1.5 bg-black/60 backdrop-blur-sm transition-all duration-200"
      >
        SKIP INTRO ✕
      </button>
    </div>
  )
}
