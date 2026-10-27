import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Shape } from 'three'

function createBracketShape() {
  const shape = new Shape()
  const points = [
    [-0.42, 1.08],
    [-1.04, 1.08],
    [-1.32, 0.88],
    [-1.32, -0.88],
    [-1.04, -1.08],
    [-0.42, -1.08],
    [-0.42, -0.73],
    [-0.96, -0.73],
    [-0.98, -0.68],
    [-0.98, 0.68],
    [-0.96, 0.73],
    [-0.42, 0.73],
  ]

  shape.moveTo(points[0][0], points[0][1])
  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y))
  shape.closePath()
  return shape
}

function Bracket({ mirrored = false, color }) {
  const shape = useMemo(() => createBracketShape(), [])

  return (
    <group position={[mirrored ? 0.34 : -0.34, 0, 0]} scale={[mirrored ? -1 : 1, 1, 1]}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry
          args={[
            shape,
            {
              depth: 0.22,
              bevelEnabled: true,
              bevelSegments: 2,
              bevelSize: 0.025,
              bevelThickness: 0.025,
              curveSegments: 4,
            },
          ]}
        />
        <meshStandardMaterial
          color={color}
          metalness={0.72}
          roughness={0.26}
          emissive={color}
          emissiveIntensity={0.13}
        />
      </mesh>
    </group>
  )
}

function Sculpture() {
  const group = useRef(null)
  const pointerTarget = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.elapsedTime
    group.current.position.y = Math.sin(time * 0.7) * 0.08
    group.current.rotation.x += (pointerTarget.current.x - group.current.rotation.x) * 0.035
    group.current.rotation.y += (pointerTarget.current.y + Math.sin(time * 0.24) * 0.08 - group.current.rotation.y) * 0.025
  })

  return (
    <group
      ref={group}
      onPointerMove={(event) => {
        pointerTarget.current.x = -event.pointer.y * 0.18
        pointerTarget.current.y = event.pointer.x * 0.28
      }}
      onPointerLeave={() => {
        pointerTarget.current.x = 0
        pointerTarget.current.y = 0
      }}
    >
      <Bracket color="#c8cdd5" />
      <Bracket color="#0878f9" mirrored />
      <mesh position={[0, 0, 0.26]}>
        <torusGeometry args={[0.78, 0.012, 6, 64]} />
        <meshBasicMaterial color="#12c8f5" transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2.7, 0.15, 0]}>
        <torusGeometry args={[1.52, 0.008, 6, 80]} />
        <meshBasicMaterial color="#7e8a9a" transparent opacity={0.38} />
      </mesh>
      <mesh position={[0, 0, 0.43]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color="#12c8f5"
          emissive="#0878f9"
          emissiveIntensity={1.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

function HeroScene() {
  return (
    <Canvas
      className="hero__canvas"
      camera={{ position: [0, 0, 5.6], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight color="#e6edf8" intensity={3.2} position={[-3, 4, 5]} />
      <pointLight color="#0878f9" intensity={18} distance={8} position={[3, -1, 2]} />
      <pointLight color="#12c8f5" intensity={8} distance={6} position={[-2, 1, -2]} />
      <Sculpture />
    </Canvas>
  )
}

export default HeroScene
