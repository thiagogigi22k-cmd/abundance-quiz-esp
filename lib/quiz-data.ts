export interface QuizCategory {
  id: string
  name: string
  shortName?: string
  image: string
  unlockedAt: number // step index where it gets unlocked
  unlockMessage: string
  unlockEmoji?: string
}

export interface QuizStep {
  type: "question" | "unlocked" | "continue" | "journey"
  category?: string
  question?: string
  options?: string[]
  inputType?: "number" | "text"
  inputPlaceholder?: string
  balanceAdd?: number
  progressAdd?: number
  // For unlocked type
  unlockedCategory?: string
}

export const categories: QuizCategory[] = [
  {
    id: "i-choose-my-future",
    name: "Yo Elijo Mi Futuro",
    image: "/images/man-silhouette-stars.jpg",
    unlockedAt: 2,
    unlockMessage: "¡Tienes el poder de elegir tu futuro!",
  },
  {
    id: "100x-multiplication",
    name: "Multiplicación 100x",
    image: "/images/golden-tree.png",
    unlockedAt: 4,
    unlockMessage: "¡Tus bendiciones se multiplicarán 100 veces!",
  },
  {
    id: "faith-decision",
    name: "Decisión de Fe",
    image: "/images/praying-hands.jpg",
    unlockedAt: 8,
    unlockMessage: "¡Tu fe ha abierto las puertas de la abundancia!",
  },
  {
    id: "dream-home",
    name: "Casa Soñada",
    image: "/images/dream-home.jpg",
    unlockedAt: 11,
    unlockMessage: "¡Tu casa soñada está siendo preparada para ti!",
  },
  {
    id: "dream-car",
    name: "Auto Soñado",
    image: "/images/dream-car.jpg",
    unlockedAt: 14,
    unlockMessage: "¡El auto de tus sueños está en camino!",
  },
  {
    id: "happy-family",
    name: "Familia Feliz",
    image: "/images/happy-family.jpg",
    unlockedAt: 17,
    unlockMessage: "La Familia Feliz Que Mereces",
    unlockEmoji: "family",
  },
  {
    id: "perfect-health",
    name: "Salud Perfecta",
    image: "/images/perfect-health.jpg",
    unlockedAt: 19,
    unlockMessage: "¡La salud perfecta fluye a través de tu cuerpo!",
  },
  {
    id: "abundance",
    name: "Abundancia",
    image: "/images/abundance.jpg",
    unlockedAt: 21,
    unlockMessage: "¡Imagina... $277,000 siendo depositados en tu cuenta ahora mismo!",
  },
  {
    id: "100x-boost",
    name: "Impulso 100x",
    image: "/images/100x-boost.jpg",
    unlockedAt: 23,
    unlockMessage: "¡Tu abundancia ha sido multiplicada 100x!",
  },
  {
    id: "blocks-broken",
    name: "Bloqueos Rotos",
    image: "/images/blocks-broken.jpg",
    unlockedAt: 27,
    unlockMessage: "¡Todos los bloqueos espirituales han sido rotos!",
  },
]

export const quizSteps: QuizStep[] = [
  // Step 1 (index 0) - Quiz start / Continue page
  {
    type: "continue",
  },
  // Step 2 (index 1) - Question: Financial Awakening (number input)
  {
    type: "question",
    category: "Despertar Financiero",
    question: "{name}, si miraras tu cuenta bancaria hoy, ¿cuánto tendrías disponible?",
    inputType: "number",
    inputPlaceholder: "Ingresa solo números (ej. 1500)",
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 3 (index 2) - Unlocked: I Choose My Future
  {
    type: "unlocked",
    unlockedCategory: "i-choose-my-future",
  },
  // Step 4 (index 3) - Question: Financial Awakening
  {
    type: "question",
    category: "Despertar Financiero",
    question: "¿Te sientes atrapado en los mismos ciclos negativos durante años?",
    options: ["Sí, se siente como un bucle", "A veces siento esto", "No estoy seguro"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 5 (index 4) - Unlocked: 100x Multiplication
  {
    type: "unlocked",
    unlockedCategory: "100x-multiplication",
  },
  // Step 6 (index 5) - Question
  {
    type: "question",
    category: "Despertar Financiero",
    question: "Si Dios te prometiera un milagro financiero en los próximos 7 días, ¿lo creerías?",
    options: ["Sí, completamente", "Intentaría creerlo", "Tengo muchas dudas"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 7 (index 6) - Question
  {
    type: "question",
    category: "Fe y Propósito Espiritual",
    question: "¿Sientes que algo poderoso te trajo aquí hoy?",
    options: ["Sí, siento la mano de Dios en esto", "Tal vez, tengo curiosidad", "No lo sé todavía"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 8 (index 7) - Question
  {
    type: "question",
    category: "Fe y Propósito Espiritual",
    question: "¿Crees que Dios puede transformar tu vida con una sola decisión tuya?",
    options: ["Sí, absolutamente", "Tengo dudas", "No lo sé"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 9 (index 8) - Unlocked: Faith Decision
  {
    type: "unlocked",
    unlockedCategory: "faith-decision",
  },
  // Step 10 (index 9) - Question
  {
    type: "question",
    category: "Fe y Propósito Espiritual",
    question: "¿Estás dispuesto a hacer de HOY tu día de fe y responsabilidad por tu nueva vida?",
    options: ["Sí, estoy listo", "Necesito una señal más clara", "No"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 11 (index 10) - Question
  {
    type: "question",
    category: "Casa Soñada",
    question: "¿Alguna vez te has visualizado viviendo en la casa de tus sueños?",
    options: ["Sí, todos los días", "A veces", "No realmente"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 12 (index 11) - Unlocked: Dream Home
  {
    type: "unlocked",
    unlockedCategory: "dream-home",
  },
  // Step 13 (index 12) - Question
  {
    type: "question",
    category: "Casa Soñada",
    question: "¿Crees que mereces vivir en abundancia y comodidad?",
    options: ["Sí, sé que lo merezco", "Estoy empezando a creerlo", "Me cuesta trabajo creerlo"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 14 (index 13) - Question
  {
    type: "question",
    category: "Auto Soñado",
    question: "Si el auto de tus sueños apareciera frente a ti ahora mismo, ¿lo aceptarías?",
    options: ["¡Sí, sin dudarlo!", "Me sorprendería pero sí", "Me preguntaría si lo merezco"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 15 (index 14) - Unlocked: Dream Car
  {
    type: "unlocked",
    unlockedCategory: "dream-car",
  },
  // Step 16 (index 15) - Question
  {
    type: "question",
    category: "Familia Feliz",
    question: "¿Sueñas con darle a tu familia la mejor vida posible?",
    options: ["Sí, es mi mayor motivación", "Pienso en ello a menudo", "Me enfoco en mí primero"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 17 (index 16) - Question
  {
    type: "question",
    category: "Familia Feliz",
    question: "¿Crees que la felicidad de tu familia está conectada con tu abundancia espiritual?",
    options: ["Sí, completamente", "Estoy empezando a verlo", "No estoy seguro"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 18 (index 17) - Unlocked: Happy Family
  {
    type: "unlocked",
    unlockedCategory: "happy-family",
  },
  // Step 19 (index 18) - Question
  {
    type: "question",
    category: "Salud Perfecta",
    question: "¿Crees que la salud divina es parte de la promesa de Dios para ti?",
    options: ["Sí, la reclamo", "Eso espero", "Me cuesta creerlo"],
    balanceAdd: 0,
    progressAdd: 5,
  },
  // Step 20 (index 19) - Unlocked: Perfect Health
  {
    type: "unlocked",
    unlockedCategory: "perfect-health",
  },
  // Step 21 (index 20) - Question: Future Visualization
  {
    type: "question",
    category: "Visualización del Futuro",
    question: "Si recibieras una gran suma de dinero hoy... ¿qué harías primero?",
    options: ["Pagar mis deudas", "Comprar una casa", "Cumplir el sueño de mi familia", "Invertir en mi futuro"],
    balanceAdd: 2000000,
    progressAdd: 4,
  },
  // Step 22 (index 21) - Unlocked: Abundance
  {
    type: "unlocked",
    unlockedCategory: "abundance",
  },
  // Step 23 (index 22) - Question
  {
    type: "question",
    category: "Activación de Abundancia",
    question: "¿Estás listo para recibir más de lo que jamás imaginaste?",
    options: ["¡SÍ! Estoy listo", "Quiero estar listo", "Necesito más fe"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 24 (index 23) - Unlocked: 100x Boost
  {
    type: "unlocked",
    unlockedCategory: "100x-boost",
  },
  // Step 25 (index 24) - Question
  {
    type: "question",
    category: "Rompiendo Bloqueos",
    question: "¿Sientes que hay algo espiritual o emocional bloqueándote?",
    options: ["Sí, un peso que no puedo explicar", "A veces siento esto", "No"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 26 (index 25) - Question
  {
    type: "question",
    category: "Rompiendo Bloqueos",
    question: "¿Estás dispuesto a liberar toda energía negativa y abrazar tu nuevo comienzo?",
    options: ["Sí, lo libero todo ahora", "Quiero intentarlo", "Tengo miedo de dejarlo ir"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 27 (index 26) - Question
  {
    type: "question",
    category: "Rompiendo Bloqueos",
    question: "¿Crees que las cadenas del pasado pueden romperse hoy?",
    options: ["¡Sí, las rompo ahora!", "Eso espero", "No estoy seguro"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 28 (index 27) - Unlocked: Blocks Broken
  {
    type: "unlocked",
    unlockedCategory: "blocks-broken",
  },
  // Step 29 (index 28) - Question: Final Choice
  {
    type: "question",
    category: "Elección Final",
    question: "¿Aceptas ser parte de un grupo de personas que decidieron crear la vida de sus sueños a través del poder de la fe?",
    options: ["Sí, acepto", "No estoy seguro", "Necesito pensarlo"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 30 (index 29) - Question
  {
    type: "question",
    category: "Compromiso Final",
    question: "¿Estás listo para dar el paso final hacia tu vida abundante?",
    options: ["¡Sí, estoy totalmente comprometido!", "Casi listo", "Necesito más guía"],
    balanceAdd: 0,
    progressAdd: 4,
  },
  // Step 31 (index 30) - Journey complete
  {
    type: "journey",
  },
]

export function getUnlockedCategories(currentStepIndex: number): string[] {
  return categories
    .filter((cat) => currentStepIndex >= cat.unlockedAt)
    .map((cat) => cat.id)
}

export function getBalance(currentStepIndex: number): number {
  let balance = 101
  for (let i = 0; i <= currentStepIndex; i++) {
    if (quizSteps[i]?.balanceAdd) {
      balance += quizSteps[i].balanceAdd!
    }
  }
  return balance
}

export function getProgress(currentStepIndex: number): number {
  const totalSteps = quizSteps.length
  const progress = Math.min(Math.round(((currentStepIndex + 1) / totalSteps) * 100), 100)
  return progress
}
