import { useState, useEffect } from 'react'

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Section = 'inicio' | 'modernismo' | 'positivismo' | 'antipositivismo' | 'linea' | 'comparativo' | 'glosario' | 'quiz'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'modernismo', label: 'Modernismo' },
  { id: 'positivismo', label: 'Positivismo' },
  { id: 'antipositivismo', label: 'Antipositivismo' },
  { id: 'linea', label: 'Línea de tiempo' },
  { id: 'comparativo', label: 'Comparativo' },
  { id: 'glosario', label: 'Glosario' },
  { id: 'quiz', label: 'Quiz' },
]

const GLOSARIO: { termino: string; definicion: string; cat: 'Modernismo' | 'Positivismo' | 'Antipositivismo' | 'General'; color: string }[] = [
  { termino: 'Positivismo', definicion: 'Corriente filosófica que sostiene que el único conocimiento válido es el científico, basado en la observación y la verificación empírica de los hechos.', cat: 'Positivismo', color: '#1b3a5c' },
  { termino: 'Ley de los Tres Estados', definicion: 'Teoría de Auguste Comte según la cual el pensamiento humano evoluciona por tres etapas: teológica, metafísica y positiva.', cat: 'Positivismo', color: '#1b3a5c' },
  { termino: 'Empirismo', definicion: 'Doctrina que afirma que todo conocimiento proviene de la experiencia sensible y la observación, rechazando las ideas innatas.', cat: 'Positivismo', color: '#1b3a5c' },
  { termino: 'Determinismo', definicion: 'Idea de que todos los fenómenos, naturales y sociales, están regidos por leyes fijas y relaciones de causa-efecto.', cat: 'Positivismo', color: '#1b3a5c' },
  { termino: 'Cientificismo', definicion: 'Postura que considera al método científico como la única vía legítima de conocimiento, aplicable a todos los ámbitos del saber.', cat: 'Positivismo', color: '#1b3a5c' },
  { termino: 'Modernismo', definicion: 'Movimiento artístico y literario de fines del siglo XIX que buscó la renovación estética y la belleza, en ruptura con el academicismo.', cat: 'Modernismo', color: '#2d6a4f' },
  { termino: 'Esteticismo', definicion: 'Doctrina que eleva la belleza a valor supremo, resumida en la fórmula "el arte por el arte" (L\'art pour l\'art).', cat: 'Modernismo', color: '#2d6a4f' },
  { termino: 'Simbolismo', definicion: 'Corriente que emplea símbolos, sinestesias y musicalidad para sugerir ideas y estados de ánimo en lugar de describirlos literalmente.', cat: 'Modernismo', color: '#2d6a4f' },
  { termino: 'Cosmopolitismo', definicion: 'Actitud modernista de apertura y admiración hacia culturas foráneas, en especial la francesa y la oriental.', cat: 'Modernismo', color: '#2d6a4f' },
  { termino: 'Sinestesia', definicion: 'Recurso literario que mezcla sensaciones de sentidos distintos, como "escuchar colores" o "ver sonidos".', cat: 'Modernismo', color: '#2d6a4f' },
  { termino: 'Antipositivismo', definicion: 'Reacción filosófica que rechaza aplicar el método de las ciencias naturales al estudio de los fenómenos humanos e históricos.', cat: 'Antipositivismo', color: '#7b2d8b' },
  { termino: 'Verstehen', definicion: 'Término alemán ("comprensión") que designa el método interpretativo propio de las ciencias humanas, frente a la explicación causal.', cat: 'Antipositivismo', color: '#7b2d8b' },
  { termino: 'Hermenéutica', definicion: 'Disciplina que estudia la interpretación de textos, símbolos y acciones humanas para captar su sentido y contexto.', cat: 'Antipositivismo', color: '#7b2d8b' },
  { termino: 'Ciencias del espíritu', definicion: 'Concepto de Wilhelm Dilthey para las disciplinas que estudian la vida humana (historia, arte, cultura) con un método propio.', cat: 'Antipositivismo', color: '#7b2d8b' },
  { termino: 'Tipo ideal', definicion: 'Herramienta metodológica de Max Weber: un modelo conceptual puro que sirve para comparar y comprender fenómenos sociales reales.', cat: 'Antipositivismo', color: '#7b2d8b' },
  { termino: 'Metafísica', definicion: 'Rama de la filosofía que estudia la naturaleza última de la realidad; el positivismo la rechaza por no ser verificable.', cat: 'General', color: '#b87333' },
  { termino: 'Epistemología', definicion: 'Estudio filosófico del conocimiento: su origen, alcance, validez y límites.', cat: 'General', color: '#b87333' },
  { termino: 'Subjetividad', definicion: 'Perspectiva individual, interior y personal desde la que se experimenta y valora la realidad.', cat: 'General', color: '#b87333' },
]

const TIMELINE_EVENTS = [
  { year: '1830', label: 'Auguste Comte publica el "Curso de filosofía positiva"', color: '#1b3a5c', cat: 'Positivismo' },
  { year: '1848', label: 'Revoluciones de 1848 en Europa; auge del pensamiento científico', color: '#1b3a5c', cat: 'Positivismo' },
  { year: '1859', label: 'Darwin publica "El origen de las especies"', color: '#1b3a5c', cat: 'Positivismo' },
  { year: '1863', label: 'Nace el término "Modernismo" en literatura latinoamericana', color: '#2d6a4f', cat: 'Modernismo' },
  { year: '1883', label: 'Nietzsche escribe "Así habló Zaratustra"; crítica al positivismo', color: '#7b2d8b', cat: 'Antipositivismo' },
  { year: '1888', label: 'Rubén Darío publica "Azul..."; cúspide del Modernismo literario', color: '#2d6a4f', cat: 'Modernismo' },
  { year: '1889', label: 'Wilhelm Dilthey desarrolla las "ciencias del espíritu"', color: '#7b2d8b', cat: 'Antipositivismo' },
  { year: '1900', label: 'Siglo XX: crisis del positivismo y auge del antipositivismo', color: '#7b2d8b', cat: 'Antipositivismo' },
  { year: '1905', label: 'Einstein publica la teoría de la relatividad especial', color: '#1b3a5c', cat: 'Positivismo' },
  { year: '1910', label: 'Consolidación del Modernismo arquitectónico y artístico', color: '#2d6a4f', cat: 'Modernismo' },
]

const QUIZ_QUESTIONS = [
  {
    q: '¿Quién es considerado el fundador del Positivismo?',
    opts: ['Karl Marx', 'Auguste Comte', 'Friedrich Nietzsche', 'Rubén Darío'],
    ans: 1,
    exp: 'Auguste Comte (1798–1857) acuñó el término "positivismo" y formuló la Ley de los Tres Estados.',
  },
  {
    q: '¿Cuál es el principio central del Positivismo?',
    opts: [
      'El conocimiento verdadero proviene de la intuición',
      'Solo el conocimiento empírico y científico es válido',
      'La fe religiosa supera a la razón',
      'La historia es cíclica e irracional',
    ],
    ans: 1,
    exp: 'El positivismo sostiene que el único conocimiento auténtico es el científico, basado en hechos observables y verificables.',
  },
  {
    q: '¿Cuál de estos autores pertenece al Antipositivismo?',
    opts: ['Herbert Spencer', 'John Stuart Mill', 'Wilhelm Dilthey', 'Auguste Comte'],
    ans: 2,
    exp: 'Wilhelm Dilthey (1833–1911) fundó las "ciencias del espíritu" y criticó la aplicación del método científico a las ciencias humanas.',
  },
  {
    q: '¿Qué movimiento literario y artístico surgió como reacción al racionalismo y al cientificismo del siglo XIX?',
    opts: ['Realismo', 'Naturalismo', 'Modernismo', 'Ilustración'],
    ans: 2,
    exp: 'El Modernismo surgió como reacción al positivismo, valorando la estética, la subjetividad y la sensibilidad artística.',
  },
  {
    q: '¿Cuál es la "Ley de los Tres Estados" de Comte?',
    opts: [
      'Tesis, antítesis y síntesis',
      'Teológico, metafísico y positivo',
      'Antiguo, medieval y moderno',
      'Salvajismo, barbarie y civilización',
    ],
    ans: 1,
    exp: 'Comte propuso que la humanidad atraviesa tres estadios: teológico (mito), metafísico (razón abstracta) y positivo (ciencia).',
  },
  {
    q: '¿Qué caracteriza al Antipositivismo respecto al conocimiento social?',
    opts: [
      'Solo acepta datos cuantitativos',
      'Valora la comprensión interpretativa (Verstehen) sobre la explicación causal',
      'Rechaza toda forma de investigación empírica',
      'Sostiene que la física es el modelo de todas las ciencias',
    ],
    ans: 1,
    exp: 'El antipositivismo, especialmente a través de Weber y Dilthey, propone la "comprensión" (Verstehen) como método propio de las ciencias humanas.',
  },
  {
    q: '¿Con qué frase se asocia popularmente el Modernismo en América Latina?',
    opts: [
      '"El ser o no ser"',
      '"Dios ha muerto"',
      '"Arte por el arte"',
      '"La religión es el opio del pueblo"',
    ],
    ans: 2,
    exp: '"Arte por el arte" (L\'art pour l\'art) resume la búsqueda modernista de belleza pura e independencia artística respecto a fines utilitarios.',
  },
  {
    q: '¿Cuál es la principal crítica del Antipositivismo al Positivismo?',
    opts: [
      'Que ignora la matemática',
      'Que el método científico no puede aplicarse a fenómenos sociales e históricos',
      'Que promueve la religión',
      'Que es demasiado subjetivo',
    ],
    ans: 1,
    exp: 'El antipositivismo sostiene que los fenómenos humanos tienen significado y contexto que no pueden reducirse a leyes naturales universales.',
  },
]

const AUTORES = {
  modernismo: [
    { nombre: 'Rubén Darío', años: '1867–1916', aporte: 'Máximo exponente del Modernismo literario latinoamericano. "Azul..." (1888) marcó el inicio del movimiento.', pais: 'Nicaragua' },
    { nombre: 'José Martí', años: '1853–1895', aporte: 'Poeta, ensayista y revolucionario cubano. Fusionó modernismo con compromiso político y nacional.', pais: 'Cuba' },
    { nombre: 'Gustav Klimt', años: '1862–1918', aporte: 'Líder del movimiento de la Secesión Vienesa. Sus obras unen arte decorativo y simbolismo.', pais: 'Austria' },
    { nombre: 'Antonio Gaudí', años: '1852–1926', aporte: 'Arquitecto catalán, máximo exponente del modernismo arquitectónico con la Sagrada Familia.', pais: 'España' },
  ],
  positivismo: [
    { nombre: 'Auguste Comte', años: '1798–1857', aporte: 'Fundador del positivismo. Elaboró la Ley de los Tres Estados y la clasificación de las ciencias.', pais: 'Francia' },
    { nombre: 'John Stuart Mill', años: '1806–1873', aporte: 'Desarrolló el empirismo y la lógica inductiva. Defensor del utilitarismo y las libertades civiles.', pais: 'Inglaterra' },
    { nombre: 'Herbert Spencer', años: '1820–1903', aporte: 'Aplicó el evolucionismo a la sociología. Acuñó la expresión "supervivencia del más apto".', pais: 'Inglaterra' },
    { nombre: 'Émile Durkheim', años: '1858–1917', aporte: 'Fundador de la sociología científica. Aplicó el método positivo al estudio de los hechos sociales.', pais: 'Francia' },
  ],
  antipositivismo: [
    { nombre: 'Wilhelm Dilthey', años: '1833–1911', aporte: 'Fundó las "ciencias del espíritu". Propuso la "comprensión" (Verstehen) como método humanístico.', pais: 'Alemania' },
    { nombre: 'Friedrich Nietzsche', años: '1844–1900', aporte: 'Crítico radical del cientificismo y el racionalismo. Propuso la voluntad de poder y el superhombre.', pais: 'Alemania' },
    { nombre: 'Max Weber', años: '1864–1920', aporte: 'Introdujo la acción social comprensiva y el concepto de "tipo ideal" en las ciencias sociales.', pais: 'Alemania' },
    { nombre: 'Henri Bergson', años: '1859–1941', aporte: 'Filósofo del vitalismo. Propuso el "élan vital" y criticó el mecanicismo positivista.', pais: 'Francia' },
  ],
}

const COMPARATIVO = [
  { aspecto: 'Origen', modernismo: 'Fines del siglo XIX, América Latina y Europa', positivismo: 'Primera mitad del siglo XIX, Francia', antipositivismo: 'Segunda mitad del siglo XIX, Alemania' },
  { aspecto: 'Enfoque', modernismo: 'Estético, subjetivo, artístico', positivismo: 'Científico, empírico, objetivo', antipositivismo: 'Interpretativo, comprensivo, humanístico' },
  { aspecto: 'Método', modernismo: 'Creatividad, belleza, simbolismo', positivismo: 'Observación, experimentación, leyes', antipositivismo: 'Verstehen (comprensión), hermenéutica' },
  { aspecto: 'Relación con la ciencia', modernismo: 'Crítica o indiferente al cientificismo', positivismo: 'La ciencia como modelo supremo', antipositivismo: 'Distingue ciencias naturales de humanas' },
  { aspecto: 'Visión del ser humano', modernismo: 'Ser sensible, creativo, espiritual', positivismo: 'Ser racional determinado por leyes', antipositivismo: 'Ser histórico, libre, con significado' },
  { aspecto: 'Representantes', modernismo: 'Darío, Martí, Klimt, Gaudí', positivismo: 'Comte, Mill, Spencer, Durkheim', antipositivismo: 'Dilthey, Nietzsche, Weber, Bergson' },
]

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Tag({ color, children }: { color: string; children: string }) {
  return (
    <span
      className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full"
      style={{ backgroundColor: color + '18', color, border: `1px solid ${color}30`, fontFamily: 'JetBrains Mono, monospace' }}
    >
      {children}
    </span>
  )
}

function AuthorCard({ nombre, años, aporte, pais, color }: { nombre: string; años: string; aporte: string; pais: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e2ddd6] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-bold text-[#1e1e1e] text-base" style={{ fontFamily: 'Playfair Display, serif' }}>{nombre}</h4>
          <p className="text-xs text-[#6b7280] mt-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{años} · {pais}</p>
        </div>
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: color }}
        >
          {nombre[0]}
        </div>
      </div>
      <p className="text-sm text-[#4b5563] leading-relaxed">{aporte}</p>
    </div>
  )
}

function CharacteristicCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-[#e2ddd6] flex gap-4">
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <h5 className="font-semibold text-[#1e1e1e] mb-1 text-sm">{title}</h5>
        <p className="text-sm text-[#6b7280] leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function SectionBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
      style={{ backgroundColor: color + '12', color, fontFamily: 'JetBrains Mono, monospace' }}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}

// ─── TOPIC SECTION: MODERNISMO ────────────────────────────────────────────────

function ModernismoSection() {
  const color = '#2d6a4f'
  return (
    <section id="modernismo" className="py-20 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionBadge label="Movimiento" color={color} />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mt-4 mb-3"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
        >
          Modernismo
        </h2>
        <p className="text-lg text-[#6b7280] max-w-2xl mb-10 leading-relaxed">
          Un movimiento cultural y artístico que renovó la sensibilidad estética a fines del siglo XIX, rompiendo con el academicismo y el positivismo.
        </p>

        {/* Imagen + Definición */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl overflow-hidden bg-[#c8d8c8]" style={{ minHeight: 260 }}>
            <img
              src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&h=500&fit=crop&auto=format"
              alt="Arte modernista, ornamentos y formas orgánicas"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="bg-[#f0f7f4] border border-[#c3ddd1] rounded-2xl p-6">
              <h3 className="font-bold text-[#2d6a4f] mb-2 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Definición</h3>
              <p className="text-sm text-[#374151] leading-relaxed">
                El <strong>Modernismo</strong> es un movimiento artístico, literario y cultural que surge en la segunda mitad del siglo XIX, caracterizado por la búsqueda de la belleza, la renovación estética y la ruptura con las tradiciones académicas. Rechaza el utilitarismo y el positivismo, exaltando la subjetividad y la sensibilidad artística.
              </p>
            </div>
            <div className="bg-white border border-[#e2ddd6] rounded-2xl p-6">
              <h3 className="font-bold text-[#1e1e1e] mb-2 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Contexto histórico</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Surge en Europa y América Latina entre 1880 y 1920, en el marco de la Revolución Industrial, el auge del capitalismo y la colonización. Es una reacción estética ante el materialismo y el cientificismo dominantes.
              </p>
            </div>
          </div>
        </div>

        {/* Características */}
        <h3 className="font-bold text-[#1e1e1e] text-xl mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Características principales</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <CharacteristicCard icon="🌸" title="Esteticismo" desc="Búsqueda de la belleza como valor supremo. «Arte por el arte» (L'art pour l'art)." />
          <CharacteristicCard icon="🔮" title="Simbolismo y sensorialidad" desc="Uso de símbolos, sinestesia y musicalidad en el lenguaje artístico y literario." />
          <CharacteristicCard icon="🌍" title="Cosmopolitismo" desc="Admiración por las culturas exóticas, especialmente la francesa y la oriental." />
          <CharacteristicCard icon="✨" title="Subjetivismo" desc="Primacía de la experiencia interior, los sueños y las emociones sobre la razón pura." />
          <CharacteristicCard icon="🏛️" title="Eclecticismo formal" desc="Mezcla de estilos: gótico, rococó, árabe, japonés. Ornamentación rica y sofisticada." />
          <CharacteristicCard icon="⚡" title="Rebeldía anti-burguesa" desc="Rechazo al conformismo y al utilitarismo de la sociedad industrial burguesa." />
        </div>

        {/* Autores */}
        <h3 className="font-bold text-[#1e1e1e] text-xl mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Principales autores</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {AUTORES.modernismo.map((a) => (
            <AuthorCard key={a.nombre} {...a} color={color} />
          ))}
        </div>

        {/* Ejemplos */}
        <div className="bg-white border border-[#e2ddd6] rounded-2xl p-6">
          <h3 className="font-bold text-[#1e1e1e] text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Ejemplos representativos</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { cat: 'Literatura', ej: '"Azul..." de Rubén Darío (1888) — primer gran obra del modernismo literario latinoamericano.' },
              { cat: 'Arquitectura', ej: 'La Sagrada Familia de Gaudí (Barcelona, 1882–) — máxima obra del modernismo arquitectónico.' },
              { cat: 'Pintura', ej: '"El beso" de Gustav Klimt (1907–08) — síntesis del simbolismo y la decoración modernista.' },
            ].map((e) => (
              <div key={e.cat} className="rounded-xl bg-[#f0f7f4] p-4">
                <Tag color={color}>{e.cat}</Tag>
                <p className="text-sm text-[#374151] mt-2 leading-relaxed">{e.ej}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TOPIC SECTION: POSITIVISMO ──────────────────────────────────────────────

function PositivismoSection() {
  const color = '#1b3a5c'
  return (
    <section id="positivismo" className="py-20 scroll-mt-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionBadge label="Corriente filosófica" color={color} />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mt-4 mb-3"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
        >
          Positivismo
        </h2>
        <p className="text-lg text-[#6b7280] max-w-2xl mb-10 leading-relaxed">
          La corriente filosófica que afirma que el único conocimiento genuino es el científico, basado en la observación y la verificación empírica.
        </p>

        {/* Imagen + Definición */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="flex flex-col justify-center gap-4 order-2 md:order-1">
            <div className="bg-[#eef3f8] border border-[#c5d5e8] rounded-2xl p-6">
              <h3 className="font-bold text-[#1b3a5c] mb-2 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Definición</h3>
              <p className="text-sm text-[#374151] leading-relaxed">
                El <strong>Positivismo</strong> es una corriente filosófica fundada por Auguste Comte que sostiene que el conocimiento válido es aquel basado en la ciencia, la observación y los hechos comprobables. Rechaza la metafísica y la teología como fuentes de conocimiento, y propone a la ciencia como modelo de todo saber.
              </p>
            </div>
            <div className="bg-white border border-[#e2ddd6] rounded-2xl p-6">
              <h3 className="font-bold text-[#1e1e1e] mb-2 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Ley de los Tres Estados</h3>
              <div className="flex gap-2 mt-2 flex-wrap">
                {[
                  { n: '1. Teológico', d: 'Explicaciones míticas y religiosas' },
                  { n: '2. Metafísico', d: 'Explicaciones abstractas y filosóficas' },
                  { n: '3. Positivo', d: 'Explicaciones científicas y verificables' },
                ].map((e, i) => (
                  <div key={i} className="rounded-lg bg-[#eef3f8] px-3 py-2 flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#1b3a5c]">{e.n}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5">{e.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden bg-[#c5d5e8] order-1 md:order-2" style={{ minHeight: 260 }}>
            <img
              src="https://images.unsplash.com/photo-1532094349884-543559196c72?w=700&h=500&fit=crop&auto=format"
              alt="Laboratorio científico, microscopio, ciencia empírica"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Características */}
        <h3 className="font-bold text-[#1e1e1e] text-xl mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Características principales</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <CharacteristicCard icon="🔬" title="Empirismo" desc="Solo el conocimiento obtenido por la experiencia sensible y la observación es válido." />
          <CharacteristicCard icon="⚖️" title="Determinismo" desc="Los fenómenos sociales y naturales están regidos por leyes fijas y universales." />
          <CharacteristicCard icon="🚫" title="Anti-metafísica" desc="Rechaza toda especulación que no pueda verificarse empíricamente." />
          <CharacteristicCard icon="🔗" title="Unidad del método científico" desc="Propone aplicar el método de las ciencias naturales a todos los campos del conocimiento." />
          <CharacteristicCard icon="📊" title="Progreso social" desc="La ciencia y la tecnología son motores del progreso y la mejora de la sociedad." />
          <CharacteristicCard icon="🧩" title="Jerarquía de las ciencias" desc="Comte clasificó las ciencias: matemática, astronomía, física, química, biología y sociología." />
        </div>

        {/* Autores */}
        <h3 className="font-bold text-[#1e1e1e] text-xl mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Principales autores</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {AUTORES.positivismo.map((a) => (
            <AuthorCard key={a.nombre} {...a} color={color} />
          ))}
        </div>

        {/* Ejemplos */}
        <div className="bg-[#f7f5f0] border border-[#e2ddd6] rounded-2xl p-6">
          <h3 className="font-bold text-[#1e1e1e] text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Ejemplos e influencias</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { cat: 'Sociología', ej: 'Durkheim aplicó el método positivista para estudiar el suicidio como hecho social en "El suicidio" (1897).' },
              { cat: 'Política', ej: 'El lema "Orden y progreso" del positivismo influyó en la Constitución brasileña de 1891.' },
              { cat: 'Educación', ej: 'Las reformas educativas laicas en América Latina del siglo XIX se basaron en principios positivistas.' },
            ].map((e) => (
              <div key={e.cat} className="rounded-xl bg-white border border-[#e2ddd6] p-4">
                <Tag color={color}>{e.cat}</Tag>
                <p className="text-sm text-[#374151] mt-2 leading-relaxed">{e.ej}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TOPIC SECTION: ANTIPOSITIVISMO ─────────────────────────────────────────

function AntiPositivismoSection() {
  const color = '#7b2d8b'
  return (
    <section id="antipositivismo" className="py-20 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionBadge label="Corriente crítica" color={color} />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mt-4 mb-3"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
        >
          Antipositivismo
        </h2>
        <p className="text-lg text-[#6b7280] max-w-2xl mb-10 leading-relaxed">
          La corriente que critica la aplicación del método científico a los fenómenos humanos, reivindicando la comprensión, la historia y la libertad.
        </p>

        {/* Imagen + Definición */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-2xl overflow-hidden bg-[#e8d5ec]" style={{ minHeight: 260 }}>
            <img
              src="https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=700&h=500&fit=crop&auto=format"
              alt="Filosofía, biblioteca, reflexión humanística"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="bg-[#f5eef8] border border-[#d9bde3] rounded-2xl p-6">
              <h3 className="font-bold text-[#7b2d8b] mb-2 text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Definición</h3>
              <p className="text-sm text-[#374151] leading-relaxed">
                El <strong>Antipositivismo</strong> es la corriente filosófica y metodológica que critica los fundamentos del positivismo, especialmente su pretensión de extender el método científico-natural a las ciencias humanas y sociales. Afirma que los fenómenos humanos tienen una dimensión de significado, intencionalidad e historicidad irreducible a leyes causales.
              </p>
            </div>
            <div className="bg-white border border-[#e2ddd6] rounded-2xl p-6">
              <h3 className="font-bold text-[#1e1e1e] mb-3 text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Conceptos clave</h3>
              <div className="space-y-2">
                {[
                  { t: 'Verstehen', d: 'Comprensión interpretativa (Dilthey, Weber)' },
                  { t: 'Hermenéutica', d: 'Arte de interpretar textos y acciones humanas' },
                  { t: 'Historicidad', d: 'El ser humano como ser histórico y cultural' },
                ].map((c) => (
                  <div key={c.t} className="flex gap-3">
                    <span className="text-xs font-bold text-[#7b2d8b] mt-0.5 flex-shrink-0" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{c.t}</span>
                    <span className="text-xs text-[#6b7280]">{c.d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Características */}
        <h3 className="font-bold text-[#1e1e1e] text-xl mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Características principales</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <CharacteristicCard icon="🧠" title="Comprensión vs. Explicación" desc="Las ciencias humanas buscan comprender el significado; las naturales, explicar causas." />
          <CharacteristicCard icon="📚" title="Historicismo" desc="El ser humano y la sociedad sólo pueden entenderse en su contexto histórico." />
          <CharacteristicCard icon="🎭" title="Subjetividad legítima" desc="La subjetividad del investigador no es un defecto sino parte del proceso de comprensión." />
          <CharacteristicCard icon="🔄" title="Circularidad hermenéutica" desc="La comprensión se da en un círculo entre las partes y el todo de un texto o acción." />
          <CharacteristicCard icon="🌐" title="Pluralidad de métodos" desc="Cada ciencia debe desarrollar métodos propios según su objeto de estudio." />
          <CharacteristicCard icon="🚶" title="Agencia humana" desc="El ser humano es libre y actúa por razones, no solo por causas mecánicas." />
        </div>

        {/* Autores */}
        <h3 className="font-bold text-[#1e1e1e] text-xl mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Principales autores</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {AUTORES.antipositivismo.map((a) => (
            <AuthorCard key={a.nombre} {...a} color={color} />
          ))}
        </div>

        {/* Ejemplos */}
        <div className="bg-white border border-[#e2ddd6] rounded-2xl p-6">
          <h3 className="font-bold text-[#1e1e1e] text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Ejemplos e influencias</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { cat: 'Metodología', ej: 'Weber usó el "tipo ideal" para estudiar el capitalismo sin reducirlo a leyes naturales.' },
              { cat: 'Filosofía', ej: 'Nietzsche cuestionó radicalmente la objetividad científica en "La gaya ciencia" (1882).' },
              { cat: 'Hermenéutica', ej: 'La "Introducción a las ciencias del espíritu" de Dilthey (1883) fundó la metodología humanística.' },
            ].map((e) => (
              <div key={e.cat} className="rounded-xl bg-[#f5eef8] p-4">
                <Tag color={color}>{e.cat}</Tag>
                <p className="text-sm text-[#374151] mt-2 leading-relaxed">{e.ej}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────

function TimelineSection() {
  const [filter, setFilter] = useState<string>('Todos')
  const cats = ['Todos', 'Modernismo', 'Positivismo', 'Antipositivismo']
  const catColors: Record<string, string> = { Modernismo: '#2d6a4f', Positivismo: '#1b3a5c', Antipositivismo: '#7b2d8b' }
  const filtered = filter === 'Todos' ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter((e) => e.cat === filter)

  return (
    <section id="linea" className="py-20 scroll-mt-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionBadge label="Cronología" color="#b87333" />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mt-4 mb-3"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
        >
          Línea de tiempo
        </h2>
        <p className="text-lg text-[#6b7280] max-w-2xl mb-8 leading-relaxed">
          Los eventos históricos e intelectuales que marcaron el desarrollo de estos tres movimientos a lo largo del siglo XIX y XX.
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className="text-xs px-4 py-1.5 rounded-full border transition-all"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                backgroundColor: filter === c ? (c === 'Todos' ? '#1e1e1e' : catColors[c]) : 'transparent',
                color: filter === c ? '#fff' : '#6b7280',
                borderColor: filter === c ? 'transparent' : '#e2ddd6',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-16 md:left-20 top-0 bottom-0 w-px bg-[#e2ddd6]" />
          <div className="space-y-6">
            {filtered.map((evt, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start">
                <div
                  className="flex-shrink-0 w-14 md:w-16 text-right"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: evt.color, fontWeight: 600 }}
                >
                  {evt.year}
                </div>
                <div className="relative flex-shrink-0 mt-1">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: evt.color, animation: 'pulse-dot 2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }}
                  />
                </div>
                <div className="bg-white border border-[#e2ddd6] rounded-xl px-4 py-3 flex-1 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-1">
                    <Tag color={catColors[evt.cat]}>{evt.cat}</Tag>
                  </div>
                  <p className="text-sm text-[#374151] leading-relaxed">{evt.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── COMPARATIVO ─────────────────────────────────────────────────────────────

function ComparativoSection() {
  return (
    <section id="comparativo" className="py-20 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionBadge label="Análisis comparado" color="#b87333" />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mt-4 mb-3"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
        >
          Cuadro comparativo
        </h2>
        <p className="text-lg text-[#6b7280] max-w-2xl mb-10 leading-relaxed">
          Una visión sinóptica de las diferencias y similitudes entre los tres movimientos.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#e2ddd6] shadow-sm">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="bg-[#1e1e1e] text-white">
                <th className="py-4 px-5 text-left font-semibold text-xs tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Aspecto</th>
                <th className="py-4 px-5 text-left font-semibold text-xs tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', borderLeft: '1px solid #333' }}>
                  <span style={{ color: '#a3c4a3' }}>● </span>Modernismo
                </th>
                <th className="py-4 px-5 text-left font-semibold text-xs tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', borderLeft: '1px solid #333' }}>
                  <span style={{ color: '#7eaed4' }}>● </span>Positivismo
                </th>
                <th className="py-4 px-5 text-left font-semibold text-xs tracking-wider" style={{ fontFamily: 'JetBrains Mono, monospace', borderLeft: '1px solid #333' }}>
                  <span style={{ color: '#c49bd4' }}>● </span>Antipositivismo
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVO.map((row, i) => (
                <tr key={row.aspecto} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f7f5f0]'}>
                  <td className="py-4 px-5 font-semibold text-[#1e1e1e] text-xs" style={{ fontFamily: 'JetBrains Mono, monospace', borderTop: '1px solid #e2ddd6' }}>
                    {row.aspecto}
                  </td>
                  <td className="py-4 px-5 text-[#374151] leading-relaxed" style={{ borderTop: '1px solid #e2ddd6', borderLeft: '1px solid #e2ddd6' }}>
                    {row.modernismo}
                  </td>
                  <td className="py-4 px-5 text-[#374151] leading-relaxed" style={{ borderTop: '1px solid #e2ddd6', borderLeft: '1px solid #e2ddd6' }}>
                    {row.positivismo}
                  </td>
                  <td className="py-4 px-5 text-[#374151] leading-relaxed" style={{ borderTop: '1px solid #e2ddd6', borderLeft: '1px solid #e2ddd6' }}>
                    {row.antipositivismo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────

function QuizSection() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUIZ_QUESTIONS.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [finished, setFinished] = useState(false)

  const q = QUIZ_QUESTIONS[current]
  const score = answers.filter((a, i) => a === QUIZ_QUESTIONS[i].ans).length

  const handleSelect = (idx: number) => {
    if (showResult) return
    setSelected(idx)
  }

  const handleConfirm = () => {
    if (selected === null) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)
    setShowResult(true)
  }

  const handleNext = () => {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  const handleReset = () => {
    setCurrent(0)
    setSelected(null)
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null))
    setShowResult(false)
    setFinished(false)
  }

  const percent = Math.round((score / QUIZ_QUESTIONS.length) * 100)

  return (
    <section id="quiz" className="py-20 scroll-mt-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <SectionBadge label="Evaluación" color="#b87333" />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mt-4 mb-3"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
        >
          Cuestionario interactivo
        </h2>
        <p className="text-lg text-[#6b7280] max-w-2xl mb-10 leading-relaxed">
          Ponés a prueba tus conocimientos sobre Modernismo, Positivismo y Antipositivismo.
        </p>

        {!finished ? (
          <div>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-1.5 bg-[#e2ddd6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#b87333] rounded-full transition-all duration-500"
                  style={{ width: `${((current) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#6b7280]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {current + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div className="bg-[#f7f5f0] rounded-2xl p-6 md:p-8">
              <p className="text-xs text-[#b87333] mb-4 font-semibold tracking-wider uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Pregunta {current + 1}
              </p>
              <h3 className="text-xl font-bold text-[#1e1e1e] mb-6 leading-snug" style={{ fontFamily: 'Playfair Display, serif' }}>
                {q.q}
              </h3>

              <div className="space-y-3 mb-6">
                {q.opts.map((opt, i) => {
                  let bg = 'bg-white border-[#e2ddd6] text-[#374151]'
                  let icon = ''
                  if (showResult) {
                    if (i === q.ans) { bg = 'bg-[#dcfce7] border-[#16a34a] text-[#166534]'; icon = '✓' }
                    else if (i === selected && i !== q.ans) { bg = 'bg-[#fee2e2] border-[#dc2626] text-[#991b1b]'; icon = '✗' }
                  } else if (i === selected) {
                    bg = 'bg-[#eff6ff] border-[#3b82f6] text-[#1d4ed8]'
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-all flex items-center gap-3 ${bg}`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ borderColor: 'currentColor', opacity: 0.5 }}
                      >
                        {icon || String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  )
                })}
              </div>

              {showResult && (
                <div className="bg-white border border-[#e2ddd6] rounded-xl px-4 py-3 mb-4">
                  <p className="text-xs font-semibold text-[#b87333] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Explicación</p>
                  <p className="text-sm text-[#374151] leading-relaxed">{q.exp}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                {!showResult ? (
                  <button
                    onClick={handleConfirm}
                    disabled={selected === null}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-[#1b3a5c] text-white disabled:opacity-40 hover:bg-[#0f2640] transition-colors"
                  >
                    Confirmar respuesta
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-[#1b3a5c] text-white hover:bg-[#0f2640] transition-colors"
                  >
                    {current < QUIZ_QUESTIONS.length - 1 ? 'Siguiente pregunta →' : 'Ver resultado final'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#f7f5f0] rounded-2xl p-8 text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-black"
              style={{
                background: percent >= 70 ? '#dcfce7' : percent >= 50 ? '#fef9c3' : '#fee2e2',
                color: percent >= 70 ? '#166534' : percent >= 50 ? '#854d0e' : '#991b1b',
                fontFamily: 'Playfair Display, serif',
              }}>
              {percent}%
            </div>
            <h3 className="text-2xl font-bold text-[#1e1e1e] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {percent >= 80 ? '¡Excelente resultado!' : percent >= 60 ? 'Buen trabajo' : 'Seguí estudiando'}
            </h3>
            <p className="text-[#6b7280] mb-6">
              Respondiste correctamente <strong>{score}</strong> de <strong>{QUIZ_QUESTIONS.length}</strong> preguntas.
            </p>
            <div className="grid grid-cols-8 gap-1 max-w-xs mx-auto mb-8">
              {QUIZ_QUESTIONS.map((q, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full"
                  style={{ backgroundColor: answers[i] === q.ans ? '#16a34a' : '#dc2626' }}
                />
              ))}
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 text-sm font-semibold rounded-xl bg-[#1b3a5c] text-white hover:bg-[#0f2640] transition-colors"
            >
              Reiniciar quiz
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── GLOSARIO ─────────────────────────────────────────────────────────────────

function GlosarioSection() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'Todos' | 'Modernismo' | 'Positivismo' | 'Antipositivismo' | 'General'>('Todos')

  const filters: { label: 'Todos' | 'Modernismo' | 'Positivismo' | 'Antipositivismo' | 'General'; color: string }[] = [
    { label: 'Todos', color: '#1e1e1e' },
    { label: 'Modernismo', color: '#2d6a4f' },
    { label: 'Positivismo', color: '#1b3a5c' },
    { label: 'Antipositivismo', color: '#7b2d8b' },
    { label: 'General', color: '#b87333' },
  ]

  const q = query.trim().toLowerCase()
  const results = GLOSARIO.filter((item) => {
    const matchesFilter = filter === 'Todos' || item.cat === filter
    const matchesQuery = q === '' || item.termino.toLowerCase().includes(q) || item.definicion.toLowerCase().includes(q)
    return matchesFilter && matchesQuery
  }).sort((a, b) => a.termino.localeCompare(b.termino, 'es'))

  return (
    <section id="glosario" className="py-20 scroll-mt-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionBadge label="Términos clave" color="#b87333" />
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mt-4 mb-3"
          style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}
        >
          Glosario
        </h2>
        <p className="text-lg text-[#6b7280] max-w-2xl mb-8 leading-relaxed">
          Consultá los conceptos fundamentales de las tres corrientes. Buscá por término o filtrá por corriente.
        </p>

        {/* Buscador */}
        <div className="relative mb-5">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7280] text-sm">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar un término o definición…"
            aria-label="Buscar en el glosario"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#e2ddd6] bg-[#f7f5f0] text-sm text-[#1e1e1e] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#b87333] focus:ring-2 focus:ring-[#b87333]/20 transition-all"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => {
            const activeF = filter === f.label
            return (
              <button
                key={f.label}
                onClick={() => setFilter(f.label)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  backgroundColor: activeF ? f.color : f.color + '12',
                  color: activeF ? '#ffffff' : f.color,
                  border: `1px solid ${f.color}${activeF ? '' : '30'}`,
                }}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Resultados */}
        {results.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {results.map((item) => (
              <div
                key={item.termino}
                className="bg-white border border-[#e2ddd6] rounded-2xl p-5 hover:shadow-md transition-shadow"
                style={{ borderLeft: `3px solid ${item.color}` }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold text-[#1e1e1e] text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {item.termino}
                  </h3>
                  <Tag color={item.color}>{item.cat}</Tag>
                </div>
                <p className="text-sm text-[#4b5563] leading-relaxed">{item.definicion}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#e2ddd6] rounded-2xl">
            <p className="text-[#6b7280] text-sm">
              No se encontraron términos para <strong className="text-[#1e1e1e]">&ldquo;{query}&rdquo;</strong>.
            </p>
          </div>
        )}

        <p className="text-xs text-[#9ca3af] mt-6" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          {results.length} de {GLOSARIO.length} términos
        </p>
      </div>
    </section>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<Section>('inicio')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id))
      const current = sections.reduce((acc, el) => {
        if (!el) return acc
        const rect = el.getBoundingClientRect()
        return rect.top <= 80 ? el.id as Section : acc
      }, 'inicio' as Section)
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(247,245,240,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 #e2ddd6' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center h-16 gap-6">
        <a
          href="#inicio"
          className="flex items-center gap-2 flex-shrink-0"
          onClick={() => setOpen(false)}
        >
          <div className="w-7 h-7 rounded-lg bg-[#1b3a5c] flex items-center justify-center">
            <span className="text-white text-xs font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>H</span>
          </div>
          <span className="font-bold text-[#1e1e1e] text-sm hidden sm:block" style={{ fontFamily: 'Playfair Display, serif' }}>
            Historia & Filosofía
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: active === item.id ? '#1b3a5c' : '#6b7280',
                background: active === item.id ? '#eef3f8' : 'transparent',
                fontWeight: active === item.id ? 600 : 400,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="ml-auto md:hidden p-2 rounded-lg hover:bg-[#e2ddd6] transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <div className="w-5 space-y-1">
            <span className={`block h-0.5 bg-[#1e1e1e] transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-[#1e1e1e] transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-[#1e1e1e] transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#f7f5f0] border-t border-[#e2ddd6] px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: active === item.id ? '#1b3a5c' : '#374151',
                background: active === item.id ? '#eef3f8' : 'transparent',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 pt-24 pb-16 scroll-mt-0">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#eef3f8] text-[#1b3a5c] text-xs px-3 py-1.5 rounded-full mb-6 animate-fadeup">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1b3a5c] inline-block" />
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>Filosofía · Historia · Pensamiento</span>
            </div>
            <h1
              className="text-5xl md:text-6xl font-black text-[#1e1e1e] mb-6 leading-[1.05] animate-fadeup-d1"
              style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.02em' }}
            >
              Tres corrientes que cambiaron el pensamiento moderno
            </h1>
            <p className="text-lg text-[#6b7280] leading-relaxed mb-8 max-w-lg animate-fadeup-d2">
              Explorá el <strong className="text-[#2d6a4f]">Modernismo</strong>, el <strong className="text-[#1b3a5c]">Positivismo</strong> y el <strong className="text-[#7b2d8b]">Antipositivismo</strong>: sus ideas, contextos históricos, autores clave y debates fundamentales.
            </p>
            <div className="flex flex-wrap gap-3 animate-fadeup-d3">
              <a
                href="#modernismo"
                className="px-5 py-2.5 text-sm font-semibold rounded-xl text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#1b3a5c' }}
              >
                Comenzar →
              </a>
              <a
                href="#quiz"
                className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-[#e2ddd6] text-[#374151] hover:bg-white transition-colors"
              >
                Ir al quiz
              </a>
            </div>
          </div>

          {/* Cards de navegación */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { id: 'modernismo', label: 'Modernismo', desc: 'Arte, estética y ruptura con el academicismo', color: '#2d6a4f', icon: '🌸', period: '1880–1920' },
              { id: 'positivismo', label: 'Positivismo', desc: 'La ciencia como único conocimiento válido', color: '#1b3a5c', icon: '🔬', period: '1830–1900' },
              { id: 'antipositivismo', label: 'Antipositivismo', desc: 'La comprensión y el significado humano', color: '#7b2d8b', icon: '🧠', period: '1880–1920' },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group bg-white border border-[#e2ddd6] rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: item.color + '12' }}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-[#1e1e1e] text-base" style={{ fontFamily: 'Playfair Display, serif' }}>{item.label}</h3>
                    <span className="text-xs text-[#6b7280]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{item.period}</span>
                  </div>
                  <p className="text-sm text-[#6b7280] leading-snug">{item.desc}</p>
                </div>
                <span className="text-[#e2ddd6] group-hover:text-[#b87333] transition-colors text-lg">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-[#6b7280]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>scroll</span>
        <div className="w-px h-8 bg-[#6b7280]" />
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[#e2ddd6] bg-[#f7f5f0] py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1b3a5c] flex items-center justify-center">
            <span className="text-white text-sm font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>H</span>
          </div>
          <div>
            <p className="font-bold text-[#1e1e1e] text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>Historia & Filosofía</p>
            <p className="text-xs text-[#6b7280]">Recurso educativo interactivo</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {NAV_ITEMS.slice(1).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-xs text-[#6b7280] hover:text-[#1b3a5c] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {item.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-[#6b7280]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>© 2026 — Uso educativo</p>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Nav />
      <main>
        <Hero />
        <ModernismoSection />
        <PositivismoSection />
        <AntiPositivismoSection />
        <TimelineSection />
        <ComparativoSection />
        <GlosarioSection />
        <QuizSection />
      </main>
      <Footer />
    </div>
  )
}
