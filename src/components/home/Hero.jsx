import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

gsap.registerPlugin(ScrollTrigger)

class SceneErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('The hero 3D scene failed; its static visual remains available.', error)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

function HeroFallback() {
  return (
    <svg
      className="hero__fallback"
      viewBox="0 0 440 440"
      role="presentation"
      focusable="false"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hero-glow">
          <stop offset="0" stopColor="#0878f9" stopOpacity=".28" />
          <stop offset="1" stopColor="#0878f9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f7fa" />
          <stop offset="1" stopColor="#8993a0" />
        </linearGradient>
        <linearGradient id="hero-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0878f9" />
          <stop offset="1" stopColor="#12c8f5" />
        </linearGradient>
      </defs>
      <circle cx="220" cy="220" r="190" fill="url(#hero-glow)" />
      <circle cx="220" cy="220" r="152" fill="none" stroke="#28313d" strokeOpacity=".7" />
      <circle
        cx="220"
        cy="220"
        r="178"
        fill="none"
        stroke="#12c8f5"
        strokeDasharray="1 12"
        strokeLinecap="round"
        strokeOpacity=".7"
      />
      <path
        d="M210 106h-49l-28 19v190l28 19h49v-38h-49V144h49z"
        fill="url(#hero-silver)"
      />
      <path
        d="M230 106h49l28 19v68l-38 22v-71h-39zm0 228h49l28-19v-68l-38-22v71h-39z"
        fill="url(#hero-blue)"
      />
      <path d="m195 194-22 26 22 26m50-52 22 26-22 26m-6-62-26 72" fill="none" stroke="#12c8f5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
      <circle cx="220" cy="43" r="4" fill="#12c8f5" />
      <circle cx="390" cy="220" r="3" fill="#c8cdd5" />
      <circle cx="73" cy="315" r="3" fill="#0878f9" />
    </svg>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frameId

    function updateSceneAvailability() {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(() => {
        const saveData = navigator.connection?.saveData ?? false
        setShowScene(
          window.innerWidth > 760 && !motionPreference.matches && !saveData,
        )
      })
    }

    updateSceneAvailability()
    window.addEventListener('resize', updateSceneAvailability, { passive: true })
    motionPreference.addEventListener('change', updateSceneAvailability)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', updateSceneAvailability)
      motionPreference.removeEventListener('change', updateSceneAvailability)
    }
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })

      entrance
        .fromTo(
          '.hero__eyebrow',
          { y: 14 },
          { y: 0, duration: 0.55 },
        )
        .fromTo(
          '.hero__title',
          { y: 24 },
          { y: 0, duration: 0.8 },
          '-=0.25',
        )
        .fromTo(
          '.hero__description',
          { y: 16 },
          { y: 0, duration: 0.6 },
          '-=0.35',
        )
        .fromTo(
          '.hero__actions',
          { y: 12 },
          { y: 0, duration: 0.5 },
          '-=0.25',
        )

      gsap.to('.hero__art', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, hero)

    return () => context.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <Container className="hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow eyebrow">
            <span className="hero__eyebrow-mark" aria-hidden="true" />
            Independent digital agency
          </p>
          <h1 className="hero__title" id="hero-title">
            We turn ambitious <span className="text-gradient">ideas</span> into digital
            experiences.
          </h1>
          <p className="hero__description">
            We design and build modern websites, web applications, and AI-powered
            solutions to help businesses move forward.
          </p>
          <div className="hero__actions">
            <Button to="/contact">Start a project</Button>
            <Button to="/work" variant="secondary">
              Explore our work
              <span className="hero__arrow" aria-hidden="true">
                ↗
              </span>
            </Button>
          </div>
        </div>

        <div className="hero__art" aria-hidden="true">
          <HeroFallback />
          {showScene && (
            <SceneErrorBoundary>
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>
            </SceneErrorBoundary>
          )}
          <div className="hero__art-caption">
            <span>CODE CRAFT LABS</span>
            <span>BUILDING SOLUTIONS. CRAFTING FUTURES.</span>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-line" />
          <span>Scroll to explore</span>
        </div>
      </Container>
    </section>
  )
}

export default Hero
