"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Check, Star, Sparkles } from "lucide-react"

// Step types
type StepType = "continue" | "journey" | "unlocked" | "question" | "unlock-screen" | "motivational" | "final"

interface QuestionStep {
  type: "question"
  question: string
  options: string[]
  badge: string
  progress: number
}

interface UnlockStep {
  type: "unlock-screen"
  title: string
  description: string
  image: string
  buttonText?: string
}

interface MotivationalStep {
  type: "motivational"
  title: string
  description: string
  image: string
  buttonText: string
  addToBalance?: number
}

// All steps data
const quizSteps: Array<QuestionStep | UnlockStep | MotivationalStep | { type: "continue" } | { type: "journey" } | { type: "unlocked" } | { type: "final" }> = [
  { type: "continue" },
  { type: "journey" },
  { type: "unlocked" },
  {
    type: "question",
    question: "{name}, ¿sientes que estás viviendo la vida que Dios soñó para ti?",
    options: ["Sí, pero sé que puedo vivir más", "No, siento que estoy lejos de eso", "A veces me pregunto sobre esto..."],
    badge: "Despertar Financiero",
    progress: 10,
  },
  {
    type: "question",
    question: "¿Con qué frecuencia sientes un vacío en tu pecho... como si algo faltara?",
    options: ["Todos los días", "Algunas veces a la semana", "Raramente"],
    badge: "Despertar Financiero",
    progress: 14,
  },
  {
    type: "question",
    question: "¿Te sientes atrapado en los mismos ciclos negativos durante años?",
    options: ["Sí, se siente como un bucle", "A veces siento esto", "No estoy seguro"],
    badge: "Despertar Financiero",
    progress: 19,
  },
  {
    type: "question",
    question: "Si la vida que vives hoy fuera el resultado directo de tus propias decisiones... ¿estarías satisfecho?",
    options: ["No, quiero cambiar", "Más o menos", "Sí, pero quiero más"],
    badge: "Despertar Financiero",
    progress: 24,
  },
  {
    type: "unlock-screen",
    title: "Yo Elijo Mi Futuro",
    description: "¡El poder de cambiar tu vida está en tus manos!",
    image: "/images/man-silhouette-stars.jpg",
  },
  {
    type: "question",
    question: "¿Cuántas veces le has pedido a Dios una señal para cambiar tu vida?",
    options: ["Muchas veces", "Algunas veces", "No suelo pedir señales", "Esta es mi primera vez"],
    badge: "Fe y Propósito Espiritual",
    progress: 29,
  },
  {
    type: "question",
    question: "{name}, si hoy fuera tu prueba final de fe... ¿qué harías ahora mismo?",
    options: [
      "Tomaría acción como alguien que cree en milagros",
      "Daría un pequeño paso con miedo... pero aún así daría un paso",
      "Me quedaría paralizado... una vez más... como las otras veces que me rendí",
    ],
    badge: "Fe y Propósito Espiritual",
    progress: 33,
  },
  {
    type: "question",
    question: "¿Crees que Dios puede transformar tu vida con una sola decisión tuya?",
    options: ["Sí, absolutamente", "Tengo dudas", "No lo sé"],
    badge: "Fe y Propósito Espiritual",
    progress: 38,
  },
  {
    type: "question",
    question: "¿Estás dispuesto a hacer de HOY tu día de fe y responsabilidad por tu nueva vida?",
    options: ["Sí, estoy listo", "Necesito una señal más clara", "No"],
    badge: "Fe y Propósito Espiritual",
    progress: 43,
  },
  {
    type: "unlock-screen",
    title: "Decisión de Fe",
    description: "Tu Fe Moverá Montañas",
    image: "/images/praying-hands.jpg",
  },
  {
    type: "question",
    question: "Si Dios te diera la oportunidad de ganar la casa de tus sueños... ¿cómo sería?",
    options: ["Grande, con varias habitaciones", "Un apartamento moderno", "Una casa sencilla, pero llena de paz", "No pienso mucho en eso"],
    badge: "Visualización del Futuro",
    progress: 48,
  },
  {
    type: "unlock-screen",
    title: "Casa Soñada",
    description: "Tu Casa Soñada Está en Camino",
    image: "/images/dream-home.jpg",
  },
  {
    type: "question",
    question: "¿Qué auto imaginas estacionado frente a tu hogar ideal?",
    options: ["Un SUV de lujo", "Un sedán cómodo", "Un auto sencillo pero confiable", "No me importan los autos"],
    badge: "Visualización del Futuro",
    progress: 52,
  },
  {
    type: "unlock-screen",
    title: "Auto Soñado",
    description: "Tu Auto Soñado Está Reservado",
    image: "/images/dream-car.jpg",
  },
  {
    type: "question",
    question: "¿Cómo es tu vida familiar hoy?",
    options: [
      "Siento que falta unidad",
      "Extraño a alguien especial",
      "Tengo una buena familia, pero podemos ser más felices",
      "No pienso mucho en eso",
    ],
    badge: "Visualización del Futuro",
    progress: 57,
  },
  {
    type: "unlock-screen",
    title: "Familia Feliz",
    description: "La Familia Feliz Que Mereces",
    image: "/images/happy-family.jpg",
  },
  {
    type: "question",
    question: "Si pudieras despertar mañana con salud perfecta... ¿qué sería diferente?",
    options: [
      "Más energía para perseguir mis sueños",
      "Poder hacer deportes sin dolor",
      "Sentirme bien con mi cuerpo",
      "Mi salud es buena, pero quiero más vitalidad",
    ],
    badge: "Visualización del Futuro",
    progress: 62,
  },
  {
    type: "unlock-screen",
    title: "Salud Perfecta",
    description: "Tu Salud Perfecta Está Activada",
    image: "/images/perfect-health.jpg",
  },
  {
    type: "question",
    question: "Si recibieras una gran suma de dinero hoy... ¿qué harías primero?",
    options: ["Pagar mis deudas", "Comprar una casa", "Cumplir el sueño de mi familia", "Invertir en mi futuro"],
    badge: "Visualización del Futuro",
    progress: 67,
  },
  {
    type: "unlock-screen",
    title: "Abundancia",
    description: "¡Imagina... $277,000 siendo depositados en tu cuenta ahora mismo!",
    image: "/images/abundance.jpg",
    buttonText: "¡SÍ! ¡Creo, recibo!",
  },
  {
    type: "motivational",
    title: "{name}",
    description: "Tu potencial de manifestación depende de tu elección, piensa en grande para manifestar cosas grandes, eres del tamaño de tu coraje.",
    image: "/images/abundance.jpg",
    buttonText: "Continuar Viaje",
    addToBalance: 2000000,
  },
  {
    type: "question",
    question: "Imagina que dentro de 30 días, tu vida está 100% transformada. ¿Cuál de estas imágenes representa tu futuro?",
    options: [
      "Casa de lujo y libertad financiera",
      "Salud perfecta y vitalidad",
      "Familia feliz y amor",
      "Viajes y nuevas experiencias",
    ],
    badge: "Visualización del Futuro",
    progress: 71,
  },
  {
    type: "unlock-screen",
    title: "Impulso 100x",
    description: "Tu Poder de Manifestación Se Multiplicó por 100x",
    image: "/images/100x-boost.jpg",
  },
  {
    type: "question",
    question: "¿Sientes que hay algo espiritual o emocional bloqueándote?",
    options: ["Sí, un peso que no puedo explicar", "A veces siento esto", "No"],
    badge: "Rompiendo Bloqueos",
    progress: 76,
  },
  {
    type: "question",
    question: "¿Cuál de estas afirmaciones te describe mejor?",
    options: [
      "Me siento maldecido, nada me sale bien",
      "Mi vida nunca ha sido fácil",
      "No me siento merecedor",
      "Me falta energía y motivación",
    ],
    badge: "Rompiendo Bloqueos",
    progress: 81,
  },
  {
    type: "unlock-screen",
    title: "Bloqueos Rotos",
    description: "Todos los Bloqueos Mentales Han Sido Eliminados",
    image: "/images/blocks-broken.jpg",
  },
  {
    type: "question",
    question: "¿Aceptas ser parte de un grupo de personas que decidieron crear la vida de sus sueños a través del poder de la fe?",
    options: ["Sí, acepto", "No estoy seguro", "Necesito pensarlo"],
    badge: "Elección Final",
    progress: 86,
  },
  {
    type: "question",
    question: "Si pudieras cambiar solo una cosa ahora mismo... ¿qué sería?",
    options: ["Mi situación financiera", "Mis relaciones", "Mi salud", "Mi propósito de vida"],
    badge: "Elección Final",
    progress: 90,
  },
  {
    type: "question",
    question: "Si Dios te diera la oportunidad de comenzar de nuevo hoy... ¿aceptarías?",
    options: ["Sí, sin dudarlo", "Sí, pero con algo de miedo", "No estoy listo"],
    badge: "Elección Final",
    progress: 95,
  },
  {
    type: "question",
    question: 'Para terminar... completa esta frase:\n"A partir de hoy..."',
    options: [
      "Elijo vivir en abundancia",
      "Acepto el destino que Dios ha reservado para mí",
      "Me libero de todo lo que me estaba bloqueando",
    ],
    badge: "Elección Final",
    progress: 100,
  },
  { type: "final" },
]

const achievements = [
  { name: "Yo Elijo Mi Futuro", image: "/images/man-silhouette-stars.jpg", unlockedAtStep: 7 },
  { name: "Decisión de Fe", image: "/images/praying-hands.jpg", unlockedAtStep: 12 },
  { name: "Casa Soñada", image: "/images/dream-home.jpg", unlockedAtStep: 14 },
  { name: "Auto Soñado", image: "/images/dream-car.jpg", unlockedAtStep: 16 },
  { name: "Familia Feliz", image: "/images/happy-family.jpg", unlockedAtStep: 18 },
  { name: "Salud Perfecta", image: "/images/perfect-health.jpg", unlockedAtStep: 20 },
  { name: "Abundancia", image: "/images/abundance.jpg", unlockedAtStep: 22 },
  { name: "Impulso 100x", image: "/images/100x-boost.jpg", unlockedAtStep: 25 },
  { name: "Bloqueos Rotos", image: "/images/blocks-broken.jpg", unlockedAtStep: 28 },
  { name: "Multiplicación 100x", image: "/images/100x-multiplication.jpg", unlockedAtStep: 2 },
]

const notifications = [
  { emoji: "\u{1F3E0}", text: "Manifestando tu casa soñada en el reino espiritual..." },
  { emoji: "\u{1F697}", text: "Reservando tu auto ideal..." },
  { emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}", text: "Alineando tu felicidad familiar..." },
  { emoji: "\u{1F497}", text: "Activando protocolos de salud perfecta..." },
  { emoji: "\u{1F513}", text: "Rompiendo bloqueos espirituales y emocionales..." },
  { emoji: "\u{1F31F}", text: "Preparando tu impulso de manifestación 100x..." },
  { emoji: "\u{1F4B0}", text: "Desbloqueando canales de abundancia..." },
  { emoji: "\u2728", text: "Finalizando tu guion divino..." },
]

const portals = [
  { name: "Yo Elijo Mi Futuro", image: "/images/man-silhouette-stars.jpg" },
  { name: "Decisión de Fe", image: "/images/praying-hands.jpg" },
  { name: "Casa Soñada", image: "/images/dream-home.jpg" },
  { name: "Auto Soñado", image: "/images/dream-car.jpg" },
  { name: "Familia Feliz", image: "/images/happy-family.jpg" },
  { name: "Salud Perfecta", image: "/images/perfect-health.jpg" },
  { name: "Abundancia", image: "/images/abundance.jpg" },
  { name: "Impulso 100x", image: "/images/100x-boost.jpg" },
  { name: "Bloqueos Rotos", image: "/images/blocks-broken.jpg" },
  { name: "Multiplicación 100x", image: "/images/100x-multiplication.jpg" },
]

export default function UnifiedQuiz() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [name, setName] = useState(searchParams.get("name") || "Amigo")
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState("Iniciando transformación...")
  const [isComplete, setIsComplete] = useState(false)
  const [visibleNotifications, setVisibleNotifications] = useState<Array<{ id: number; index: number }>>([])
  const [cardAnimationIndex, setCardAnimationIndex] = useState(-1)
  const notificationIdRef = useRef(0)
  const notificationTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentNotificationIndexRef = useRef(0)
  const [showOffer, setShowOffer] = useState(false)
  const vturbRef = useRef<HTMLDivElement>(null)
  const offerRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" })

  const formatBalance = (value: number) => value.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const stepData = quizSteps[currentStep]

  // Derive visible portals directly from progress (0-100 maps to 1-10 portals)
  const visiblePortalCount = stepData?.type === "final" ? Math.min(portals.length, Math.max(1, Math.ceil((progress / 100) * portals.length))) : 0

  const getUnlockedAchievements = () => achievements.filter((a) => currentStep >= a.unlockedAtStep)

  const goToNextStep = (delay = 0) => {
    if (delay > 0) {
      setIsLoading(true)
      setTimeout(() => { setIsLoading(false); setCurrentStep((prev) => prev + 1); setSelectedOption(null) }, delay)
    } else {
      setCurrentStep((prev) => prev + 1); setSelectedOption(null)
    }
  }

  const handleOptionClick = (index: number) => { setSelectedOption(index); goToNextStep(1000) }
  const handleContinue = () => goToNextStep(0)
  const handleJourneySubmit = () => { if (amount) { setBalance(Number.parseFloat(amount) * 100); goToNextStep(0) } }
  const handleMotivational = (addAmount?: number) => { if (addAmount) setBalance((prev) => prev + addAmount); goToNextStep(0) }

  const replaceNamePlaceholder = (text: string) => text.replace(/{name}/g, name)

  const getProgress = () => {
    if (stepData?.type === "question") return (stepData as QuestionStep).progress
    for (let i = currentStep - 1; i >= 0; i--) { if (quizSteps[i]?.type === "question") return (quizSteps[i] as QuestionStep).progress }
    return 5
  }

  // Preload seed card images from the very start of the quiz
  useEffect(() => {
    const seedImages = ["/images/seed-barren.jpg", "/images/seed-sprout.jpg", "/images/seed-tree.jpg", "/images/seed-golden.jpg", "/images/seed-divine.jpg"]
    seedImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  // Final screen progress animation
  useEffect(() => {
    if (stepData?.type !== "final") return
    const duration = 25000; const interval = 100; const increment = 100 / (duration / interval)
    const timer = setInterval(() => {
      setProgress((prev) => {
        const np = prev + increment
        if (np < 20) setStatusText("Iniciando transformación...")
        else if (np < 40) setStatusText("Analizando tus respuestas...")
        else if (np < 60) setStatusText("Alineando energías divinas...")
        else if (np < 80) setStatusText("Preparando tu manifestación...")
        else setStatusText("Finalizando tu guion...")
        if (np >= 100) {
          clearInterval(timer); setIsComplete(true)
          setTimeout(() => { let idx = 0; const ct = setInterval(() => { setCardAnimationIndex(idx); idx++; if (idx >= portals.length) clearInterval(ct) }, 150) }, 300)
          return 100
        }
        return np
      })
    }, interval)
    return () => clearInterval(timer)
  }, [stepData?.type])



  // Final screen notifications
  useEffect(() => {
    if (stepData?.type !== "final") return
    if (isComplete) { if (notificationTimerRef.current) clearInterval(notificationTimerRef.current); setVisibleNotifications([]); return }
    const startDelay = setTimeout(() => {
      const firstId = notificationIdRef.current++
      setVisibleNotifications([{ id: firstId, index: 0 }]); currentNotificationIndexRef.current = 0
      notificationTimerRef.current = setInterval(() => {
        currentNotificationIndexRef.current = (currentNotificationIndexRef.current + 1) % notifications.length
        const newId = notificationIdRef.current++; const newIndex = currentNotificationIndexRef.current
        setVisibleNotifications((prev) => { const updated = [...prev, { id: newId, index: newIndex }]; return updated.length > 3 ? updated.slice(-3) : updated })
      }, 3000)
    }, 3000)
    return () => { clearTimeout(startDelay); if (notificationTimerRef.current) clearInterval(notificationTimerRef.current) }
  }, [stepData?.type, isComplete])

  // Load Vturb script when final screen completes
  useEffect(() => {
    if (!isComplete) return
    const DELAY_SECONDS = 490 // 8:10
    const timer = setTimeout(() => {
      if (vturbRef.current && !vturbRef.current.querySelector("vturb-smartplayer")) {
        const player = document.createElement("vturb-smartplayer")
        player.id = "vid-6a087eb0dca0bf66780c5301"
        player.style.cssText = "display: block; margin: 0 auto; width: 100%; max-width: 400px;"
        vturbRef.current.appendChild(player)
        const s = document.createElement("script")
        s.src = "https://scripts.converteai.net/f8e465b5-f483-4d08-be19-bc14de388e59/players/6a087eb0dca0bf66780c5301/v4/player.js"
        s.async = true
        document.head.appendChild(s)

        // Listen for player ready, then watch video time to show offer at 7:28
        player.addEventListener("player:ready", () => {
          const checkTime = setInterval(() => {
            try {
              const w = window as any
              if (w.smartplayer?.instances?.[0]?.video?.currentTime >= DELAY_SECONDS) {
                setShowOffer(true)
                clearInterval(checkTime)
              }
            } catch {}
          }, 1000)
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [isComplete])

  // Auto-scroll to offer when it appears
  useEffect(() => {
    if (showOffer && offerRef.current) {
      setTimeout(() => {
        const element = offerRef.current
        if (element) {
          const rect = element.getBoundingClientRect()
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop
          // Scroll to offer section + extra offset to show middle cards ($47, $77)
          const extraOffset = window.innerWidth < 768 ? 600 : 400
          window.scrollTo({ top: scrollTop + rect.top + extraOffset, behavior: "smooth" })
        }
      }, 200)
    }
  }, [showOffer])

  // Render Continue screen
  const renderContinueScreen = () => (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image src="/images/design-20sem-20nome-20-281-29.png" alt="Background" fill className="object-cover" priority />
      </div>
      <div className="relative z-10 w-full max-w-sm px-4 flex flex-col items-center">
        <div className="mb-4 flex justify-center">
          <Image src="/images/sem-20nome-20-281080-20x-201080-20px-29-20-281-29.png" alt="Logo" width={112} height={112} className="object-contain" priority />
        </div>
        <div className="w-full bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-5">
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-xl font-bold text-white leading-tight">{name}, antes de continuar...</h2>
            <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0 ml-2 animate-spin" style={{ animationDuration: "2s" }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="w-full bg-transparent rounded-lg border border-[#D4AF37] p-4 mb-5">
            <p className="text-[#D4AF37] font-semibold text-center mb-3 text-sm">Repite esta frase en voz alta:</p>
            <p className="text-white italic text-center text-base leading-relaxed">{"\"La vida de mis sueños comienza"}<br />{"con mi elección.\""}</p>
          </div>
          <p className="text-gray-500 text-xs text-center mb-5">Solo haz clic en continuar después de repetirla en voz alta.</p>
          <button onClick={handleContinue} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base flex items-center justify-center gap-2 hover:bg-[#E5C31F] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            Continuar Viaje
          </button>
        </div>
      </div>
    </div>
  )

  // Render Journey screen
  const renderJourneyScreen = () => (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image src="/images/design-20sem-20nome-20-281-29.png" alt="Background" fill className="object-cover object-bottom" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" style={{ height: "60%" }} />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center px-4 pt-6 pb-8">
        <div className="mb-4">
          <Image src="/images/sem-20nome-20-281080-20x-201080-20px-29-20-281-29.png" alt="Logo" width={80} height={80} className="object-contain" priority />
        </div>
        <h1 className="text-[#D4AF37] text-xl font-bold text-center mb-4">Hola, {name} Tu Viaje ha comenzado...</h1>
        <p className="text-gray-400 text-sm tracking-wider mb-1">SALDO DE CUENTA</p>
        <p className="text-3xl font-bold animate-pulse-gold mb-4">$0.00</p>
        <div className="w-full max-w-sm mb-4">
          <p className="text-[#D4AF37] text-sm italic animate-pulse-gold mb-2">Tu energía se está alineando con lo divino...</p>
          <div className="flex justify-end mb-2"><span className="text-gray-400 text-sm">5%</span></div>
          <div className="w-full h-[6px] bg-[#0d1829] rounded-full relative overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[10px] bg-[#F9D423] rounded-full z-10" />
            <div className="absolute left-3 top-0 h-full bg-[#F9D423] rounded-r-full" style={{ width: "5%" }} />
          </div>
        </div>
        <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-6 mt-2">
          <div className="flex justify-center mb-4">
            <span className="bg-[#2a2a3e] text-gray-300 text-sm px-4 py-1.5 rounded-full">Despertar Financiero</span>
          </div>
          <h2 className="text-white text-lg font-bold text-center mb-6 leading-relaxed">
            {name}, si miraras tu cuenta bancaria hoy, ¿cuánto tendrías disponible?
          </h2>
          <input type="text" inputMode="numeric" placeholder="Ingresa solo números (ej. 1500)" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))} className="w-full bg-white border-2 border-[#D4AF37] rounded-lg py-3.5 px-4 text-black text-center placeholder-gray-500 focus:outline-none focus:border-[#F9D423] mb-4" />
          <button onClick={handleJourneySubmit} disabled={!amount} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-[#E5C31F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Continuar</button>
        </div>
      </div>
    </div>
  )

  // Render Unlocked (100x multiplication) screen
  const renderUnlockedScreen = () => {
    const displayBalance = formatBalance(balance)
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/images/design-20sem-20nome-20-281-29.png" alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" style={{ height: "70%" }} />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center px-4 pt-8 pb-8">
          <div className="mb-6">
            <Image src="/images/sem-20nome-20-281080-20x-201080-20px-29-20-281-29.png" alt="Logo" width={70} height={70} className="object-contain" priority />
          </div>
          <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-5">
            <div className="flex items-center justify-center gap-2 mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="text-[#D4AF37] text-xl font-bold tracking-wide">¡DESBLOQUEADO!</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37" className="animate-spin-slow"><path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" /></svg>
            </div>
            <div className="flex justify-center mb-5">
              <div className="w-40 h-40 rounded-xl border-2 border-[#D4AF37] overflow-hidden">
                <Image src="/images/100x-multiplication.jpg" alt="Abundancia dorada" width={160} height={160} className="object-cover w-full h-full" />
              </div>
            </div>
            <h2 className="text-[#D4AF37] text-2xl font-bold text-center mb-3">Multiplicación 100x</h2>
            <p className="text-white text-center text-base mb-5 leading-relaxed">{name}, hoy estoy añadiendo 100x más a tu cuenta {"—"} ¿lo crees?</p>
            <div className="bg-[#1a1a2e] rounded-lg py-3 px-4 mb-4">
              <p className="text-center"><span className="text-[#D4AF37] font-bold text-lg">Nuevo Saldo: </span><span className="text-[#D4AF37] font-bold text-lg">${displayBalance}</span></p>
            </div>
            <button onClick={handleContinue} className="w-full bg-[#F9D423] text-black font-bold py-3.5 px-6 rounded-lg text-base hover:bg-[#E5C31F] transition-colors flex items-center justify-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              ¡SÍ! ¡Recibo 100x más!
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Question screen
  const renderQuestionScreen = () => {
    const data = stepData as QuestionStep
    const unlockedAchievements = getUnlockedAchievements()
    const totalPortals = portals.length
    const lockedCount = totalPortals - unlockedAchievements.length
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/images/design-20sem-20nome-20-281-29.png" alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent" style={{ height: "60%" }} />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center px-4 pt-6 pb-8">
          <div className="mb-4"><Image src="/images/sem-20nome-20-281080-20x-201080-20px-29-20-281-29.png" alt="Logo" width={60} height={60} className="object-contain" priority /></div>
          <h1 className="text-[#D4AF37] text-xl font-bold text-center mb-3">Hola, {name} Tu Viaje ha comenzado...</h1>
          <p className="text-gray-400 text-sm tracking-wider mb-1">SALDO DE CUENTA</p>
          <p className="text-[#D4AF37] text-3xl font-bold mb-4 animate-pulse-gold">${formatBalance(balance)}</p>
          <div className="w-full max-w-md mb-4">
            <p className="text-[#D4AF37] text-sm italic animate-pulse-gold mb-2">Tu energía se está alineando con lo divino...</p>
            <div className="flex justify-end mb-1"><span className="text-gray-400 text-sm">{data.progress}%</span></div>
            <div className="relative w-full h-[6px] bg-[#1a2744] rounded-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-3 bg-[#F9D423] rounded-full z-10" />
              <div className="absolute left-4 top-0 h-full bg-[#F9D423] rounded-r-full" style={{ width: `${data.progress}%` }} />
            </div>
          </div>
          <div className="w-full max-w-md mb-4">
            <div className="grid grid-cols-5 gap-2">
              {portals.slice(0, Math.ceil(Math.max(unlockedAchievements.length, 1) / 5) * 5).map((portal, i) => {
                const isUnlocked = i < unlockedAchievements.length
                return isUnlocked ? (
                  <div key={i} className="bg-[#0d0d1a] rounded-lg border border-[#D4AF37] p-1.5 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden mb-1 border border-[#D4AF37]">
                      <Image src={unlockedAchievements[i]?.image || "/placeholder.svg"} alt={unlockedAchievements[i]?.name || ""} width={56} height={56} className="object-cover w-full h-full" />
                    </div>
                    <span className="text-[#D4AF37] text-[10px] font-bold text-center leading-tight">{unlockedAchievements[i]?.name.split(" ").slice(0, 2).join("\n")}</span>
                  </div>
                ) : (
                  <div key={`locked-${i}`} className="bg-[#1a1a2e] rounded-lg border border-gray-600 p-1.5 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-lg bg-[#2a2a3e] flex items-center justify-center mb-1">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-500"><rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </div>
                    <span className="text-gray-500 text-[10px] font-medium">Bloqueado</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="w-full max-w-md bg-[#0d0d1a]/95 rounded-xl border-2 border-[#D4AF37] p-5">
            <div className="flex justify-center mb-4"><span className="bg-[#2a2a3e] text-gray-300 text-sm px-4 py-1.5 rounded-full">{data.badge}</span></div>
            {isLoading ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[#D4AF37] text-base font-medium mb-2">Procesando tu respuesta...</p>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            ) : (
              <>
                <p className="text-white text-lg font-bold text-center mb-5 leading-relaxed whitespace-pre-line">{replaceNamePlaceholder(data.question)}</p>
                <div className="space-y-3">
                  {data.options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(index)} className={`w-full bg-[#F9D423] text-black font-medium py-3.5 px-4 rounded-lg text-left transition-all ${selectedOption === index ? "ring-4 ring-[#D4AF37] ring-offset-2 ring-offset-[#0d0d1a] scale-[1.02]" : "hover:bg-[#E5C31F]"}`}>
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render Unlock achievement screen
  const renderUnlockScreen = () => {
    const data = stepData as UnlockStep
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/images/design-20sem-20nome-20-281-29.png" alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-2xl border-2 border-[#D4AF37] p-6 shadow-2xl shadow-[#D4AF37]/20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h1 className="text-[#D4AF37] text-2xl font-bold tracking-wide">¡DESBLOQUEADO!</h1>
              <div className="animate-spin-slow">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#D4AF37]"><path d="M12 2L14.09 8.26L20.18 8.63L15.54 12.74L16.91 18.72L12 15.27L7.09 18.72L8.46 12.74L3.82 8.63L9.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 rounded-xl border-2 border-[#D4AF37] overflow-hidden bg-[#1a1a2e]">
                <Image src={data.image || "/placeholder.svg"} alt={data.title} width={144} height={144} className="object-cover w-full h-full" />
              </div>
            </div>
            <h2 className="text-[#D4AF37] text-2xl font-bold text-center mb-3">{data.title}</h2>
            <p className="text-gray-300 text-base text-center mb-6 leading-relaxed">{data.description}</p>
            <button onClick={handleContinue} className="w-full bg-[#F9D423] hover:bg-[#E5C31F] text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
              <span className="text-lg">{data.buttonText || "Continuar Evolución"}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Motivational screen
  const renderMotivationalScreen = () => {
    const data = stepData as MotivationalStep
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/images/design-20sem-20nome-20-281-29.png" alt="Background" fill className="object-cover object-bottom" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/70" />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="w-full max-w-sm bg-[#0d0d1a]/95 rounded-2xl border-2 border-[#D4AF37] p-6 shadow-2xl shadow-[#D4AF37]/20">
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 rounded-xl border-2 border-[#D4AF37] overflow-hidden bg-[#1a1a2e]">
                <Image src={data.image || "/placeholder.svg"} alt={data.title} width={160} height={160} className="object-cover w-full h-full" />
              </div>
            </div>
            <h2 className="text-[#D4AF37] text-2xl font-bold text-center mb-4">{replaceNamePlaceholder(data.title)}</h2>
            <p className="text-gray-300 text-base text-center mb-8 leading-relaxed">{data.description}</p>
            <button onClick={() => handleMotivational(data.addToBalance)} className="w-full bg-[#F9D423] hover:bg-[#E5C31F] text-black font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" /></svg>
              <span className="text-lg">{data.buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render Final screen
  const renderFinalScreen = () => {
    if (isComplete) {
      return (
      <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-[#1a1510] via-[#0d0d0d] to-black px-6 py-8 relative overflow-x-hidden">
          <div className="absolute top-4 right-4">
            <Star className="w-8 h-8 text-[#F9D423] animate-spin-slow" fill="#F9D423" />
          </div>
          <div className="flex flex-col items-center mb-6 mt-4 animate-pulse-soft">
            <Image src="/images/sem-20nome-20-281080-20x-201080-20px-29-20-281-29.png" alt="Logo" width={80} height={80} className="object-contain" priority />
          </div>
          <h1 className="text-white text-[28px] font-bold text-center mb-6 leading-tight">
            {name.toLowerCase()}, has llegado<br />hasta aquí... y eso no<br />es casualidad.
          </h1>
          <p className="text-[#D4AF37] text-lg text-center mb-4 leading-relaxed italic">
            Hoy es {currentDate} {"–"} el primer día<br />de tu nueva realidad.
          </p>
          <div className="w-32 h-2 bg-[#D4AF37] rounded-full mb-8 animate-pulse-soft" />

          {/* Vturb Video Embed */}
          <h2 className="text-[#F9D423] text-xl font-bold text-center mb-4">Mira el video a continuación para reclamar tu bendición</h2>
          <div className="w-full max-w-md">
            <div ref={vturbRef} className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.25)]" />
          </div>

          {/* Preload offer images hidden */}
          <div className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
            {["/images/seed-sprout.jpg", "/images/seed-golden.jpg", "/images/seed-divine.jpg"].map((src) => (
              <Image key={src} src={src} alt="" width={1} height={1} priority />
            ))}
          </div>

          {/* Offer Section - only visible after 8:10 of video */}
          {showOffer && (
            <div ref={offerRef} className="w-full max-w-md mt-10 flex flex-col items-center animate-fade-in-offer">
              <h2 className="text-[#F9D423] text-2xl font-bold italic text-center mb-8">
                {name}, ¡Haz tu elección ahora!
              </h2>

              {/* Seed Cards */}
              <div className="w-full flex flex-col gap-8">
                {[
                  { price: "$17", image: "/images/seed-sprout.jpg", link: "https://ageofabundance.mycartpanda.com/checkout/210183499:1" },
                  { price: "$27", image: "/images/seed-golden.jpg", link: "https://ageofabundance.mycartpanda.com/checkout/210183496:1" },
                  { price: "$37", image: "/images/seed-divine.jpg", link: "https://ageofabundance.mycartpanda.com/checkout/210183451:1" },
                ].map((seed, index) => (
                  <div key={index} className="w-full flex flex-col items-center">
                    {/* Image */}
                    <div className="w-full rounded-2xl overflow-hidden border border-[#D4AF37]/30">
                      <div className="relative w-full aspect-[4/3]">
                        <Image src={seed.image} alt={`Semilla ${seed.price}`} fill className="object-cover" priority />
                      </div>
                    </div>
                    {/* Button */}
                    <a
                      href={seed.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 rounded-full text-center font-bold text-lg transition-all duration-300 active:scale-[0.97] block bg-[#F5A623] text-[#1a1a00] shadow-[0_0_20px_rgba(245,166,35,0.3)]"
                    >
                      {"Esta es la vida que elijo"} {"–"} {seed.price}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    // Loading state
    return (
      <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-[#1a1510] via-[#0d0d0d] to-black px-6 py-8 relative overflow-x-hidden">
        {visibleNotifications.length > 0 && !isComplete && (
          <div className="fixed top-2 left-3 right-3 z-50 flex flex-col gap-2">
            {visibleNotifications.map((notif) => (
              <div key={notif.id} className="bg-gradient-to-r from-[#b8860b] to-[#d4a017] rounded-lg px-3 py-2 flex items-center gap-2 shadow-md border border-[#F9D423]/50 animate-slide-in-right">
                <div className="w-7 h-7 bg-[#F9D423] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#8B7500]" strokeWidth={3} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1a1a00] font-bold text-xs leading-none mb-0.5">PROCESANDO</p>
                  <p className="text-[#1a1a00] text-xs leading-tight">{notifications[notif.index].emoji} {notifications[notif.index].text}</p>
                </div>
                <Star className="w-4 h-4 text-[#8B7500] flex-shrink-0 animate-spin-slow" />
              </div>
            ))}
          </div>
        )}
        <div className="absolute top-20 left-8 w-3 h-3 bg-[#F9D423] rounded-full animate-pulse-circle" />
        <div className="absolute top-16 right-10 w-4 h-4 bg-[#F9D423] rounded-full animate-pulse-circle" style={{ animationDelay: "0.5s" }} />
        <div className="flex flex-col items-center mb-8 mt-8">
          <Image src="/images/sem-20nome-20-281080-20x-201080-20px-29-20-281-29.png" alt="Logo" width={70} height={70} className="object-contain" priority />
        </div>
        <h1 className="text-white text-[26px] font-bold text-center mb-6 leading-tight">{name.toUpperCase()}, tu Guion<br />de Manifestación<br />Divina está siendo<br />creado...</h1>
        <p className="text-[#D4AF37] text-lg text-center mb-10 leading-relaxed">Procesando tus respuestas<br />con precisión divina</p>
        <div className="w-full max-w-sm mb-3">
          <div className="relative w-full h-3 bg-[#3a3a4a] rounded-full overflow-visible">
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F9D423] rounded-full z-10 shadow-lg" style={{ left: `calc(${Math.min(progress, 100)}% - 8px)` }} />
            <div className="h-full bg-[#F9D423] rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="w-full max-w-sm flex justify-between items-center mb-10">
          <span className="text-[#D4AF37] text-sm">{statusText}</span>
          <span className="text-[#F9D423] text-3xl font-bold">{Math.round(progress)}%</span>
        </div>
        {/* Achievements Unlocked - Single Cycling Card */}
        {visiblePortalCount > 0 && (
          <div className="w-full max-w-sm mb-8 flex flex-col items-center">
            <p className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">Logros Desbloqueados</p>
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] mb-3">
              <Image
                key={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                src={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].image || "/placeholder.svg"}
                alt={portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                fill
                className="object-cover portal-enter"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-4 px-4 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-[#F9D423] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" strokeWidth={3} />
                  </div>
                  <span className="text-[#D4AF37] text-sm font-bold tracking-wider">DESBLOQUEADO</span>
                </div>
                <h3 className="text-white text-xl font-bold text-center">
                  {portals[Math.min(visiblePortalCount - 1, portals.length - 1)].name}
                </h3>
              </div>
            </div>
          </div>
        )}
        <div className="w-full max-w-sm text-center mt-4">
          <p className="text-[#F9D423] text-lg italic leading-relaxed mb-2">{"\"Estamos preparando tu Guion"}<br />{"de Manifestación Divina, basado"}<br />{"en todo lo que nos has contado,"}<br />{name}...{"\""}</p>
          <p className="text-gray-400 text-sm mb-4">Serás redirigido automáticamente</p>
          <div className="flex justify-center gap-2">
            <span className="w-3 h-3 bg-[#F9D423] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-3 h-3 bg-[#F9D423] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-3 h-3 bg-[#F9D423] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    )
  }

  // Main render
  return (
    <div>
      {stepData?.type === "continue" && renderContinueScreen()}
      {stepData?.type === "journey" && renderJourneyScreen()}
      {stepData?.type === "unlocked" && renderUnlockedScreen()}
      {stepData?.type === "question" && renderQuestionScreen()}
      {stepData?.type === "unlock-screen" && renderUnlockScreen()}
      {stepData?.type === "motivational" && renderMotivationalScreen()}
      {stepData?.type === "final" && renderFinalScreen()}
      <style jsx global>{`
        @keyframes pulseGold { 0%, 100% { color: #d4af37; } 50% { color: #8b7520; } }
        .animate-pulse-gold { animation: pulseGold 1.5s ease-in-out infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 3s linear infinite; }
        @keyframes pulseSoft { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
        .animate-pulse-soft { animation: pulseSoft 2s ease-in-out infinite; }
        @keyframes cardPop { 0% { opacity: 0; transform: scale(0.5); } 60% { opacity: 1; transform: scale(1.15); } 100% { opacity: 1; transform: scale(1); } }
        .card-pop { animation: cardPop 0.4s ease-out forwards; }
        @keyframes pulseCircle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }
        .animate-pulse-circle { animation: pulseCircle 2s ease-in-out infinite; }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-right { animation: slideInRight 0.5s ease-out; }
        @keyframes portalEnter {
          0% { opacity: 0; transform: scale(0.8); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes portalExit {
          0% { opacity: 1; transform: scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.08); filter: blur(6px); }
        }
        .portal-enter { animation: portalEnter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .portal-exit { animation: portalExit 0.7s cubic-bezier(0.55, 0, 1, 0.45) forwards; }
        @keyframes fadeInOffer { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-offer { animation: fadeInOffer 0.8s ease-out forwards; }
      `}</style>
    </div>
  )
}
