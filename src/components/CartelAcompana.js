class CartelAcompana extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Atributos observados para reactividad
  static get observedAttributes() {
    return ['sede', 'sede-nombre'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  // Getters para atributos
  get sede() { return this.getAttribute('sede') ?? 'SG'; }
  get sedeNombre() { return this.getAttribute('sede-nombre') ?? 'Sede de Guanacaste'; }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>
        /* ── :host — el componente en sí ── */
        :host {
          --cartel-bg: #C8960A;
          --cartel-width: 420px;
          --cartel-radius: 4px;
          --color-morado: #7B2D8B;
          --color-rojo: #E63946;
          --color-teal: #2EC4B6;
          --color-texto-oscuro: #3D1F00;
          --color-qr-texto: #5a3800;
          --footer-bg: rgba(0,0,0,0.18);

          width: var(--cartel-width);
          min-height: 720px;
          background-color: var(--cartel-bg);
          background-image:
            radial-gradient(ellipse at 60% 30%, rgba(220,170,20,0.35) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(160,110,0,0.3) 0%, transparent 55%);
          border-radius: var(--cartel-radius);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 28px 0 28px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.35);
        }

        /* ── TÍTULO ── */
        .titulo-bloque {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          align-items: center;
          margin-bottom: 18px;
        }

        .titulo-bloque .excl-izq {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 2.2rem;
          color: #fff;
          line-height: 1;
          align-self: flex-end;
        }

        .tag {
          padding: 6px 14px;
          border-radius: 8px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.55rem;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tag-sede {
          background: var(--color-morado);
          color: #fff;
        }

        .tag-te {
          background: #fff;
          color: var(--color-rojo);
          font-style: italic;
        }

        .tag-acompana {
          background: var(--color-teal);
          color: #fff;
        }

        .titulo-bloque .excl-der {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 2.2rem;
          color: var(--color-rojo);
          line-height: 1;
          align-self: flex-end;
        }

        /* ── SUBTÍTULO ── */
        .subtitulo {
          text-align: center;
          margin-bottom: 16px;
        }

        /* Estilo para los slots del subtítulo */
        ::slotted([slot="subtitulo1"]) {
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 1.13rem;
          color: var(--color-texto-oscuro);
          display: block;
          margin-bottom: 2px;
        }

        ::slotted([slot="subtitulo2"]) {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.22rem;
          color: var(--color-morado);
          display: block;
        }

        /* ── QR ── */
        .qr-bloque {
          text-align: center;
          margin-bottom: 14px;
        }

        .qr-bloque p {
          font-size: 0.65rem;
          color: var(--color-qr-texto);
          margin-bottom: 5px;
        }

        .qr-container {
          width: 68px;
          height: 68px;
          background: #fff;
          border-radius: 6px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        /* Estilo para imagen QR pasada por slot */
        ::slotted([slot="qr"]) {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }

        /* QR placeholder por defecto */
        .qr-placeholder-svg {
          width: 60px;
          height: 60px;
        }

        /* ── PERSONAS ── */
        .personas {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 10px;
          margin-top: 4px;
          flex: 1;
        }

        ::slotted([slot="persona1"]),
        ::slotted([slot="persona2"]) {
          width: 175px;
          height: 300px;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        .persona-placeholder {
          width: 175px;
          height: 260px;
          background: rgba(0,0,0,0.12);
          border-radius: 8px 8px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.7);
          font-size: 0.75rem;
          gap: 8px;
        }

        .persona-placeholder svg {
          width: 40px;
          height: 40px;
          fill: rgba(255,255,255,0.5);
        }

        /* ── FOOTER ── */
        .footer {
          width: calc(100% + 56px);
          background: var(--footer-bg);
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .footer .logo-ucr {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.3rem;
          color: #fff;
          letter-spacing: 1px;
        }

        .footer-divider {
          width: 2px;
          height: 30px;
          background: rgba(255,255,255,0.4);
        }

        .footer-badge {
          background: var(--color-morado);
          border-radius: 4px;
          padding: 3px 6px;
          text-align: center;
        }

        .footer-badge span {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 0.55rem;
          color: #fff;
          letter-spacing: 0.5px;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .footer-sede {
          margin-left: auto;
          text-align: right;
        }

        .footer-sede .sg {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.1rem;
          color: #fff;
        }

        .footer-sede .sede-nombre {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.8);
          font-weight: 700;
        }

        /* ── ANIMACIONES ── */
        @keyframes entrada {
          from { opacity: 0; transform: translateY(-20px) scale(0.8); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulso {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }

        .excl-izq, .excl-der {
          animation: entrada 0.5s ease forwards;
        }

        .tag-sede, .tag-te, .tag-acompana {
          opacity: 0;
          animation:
            entrada 0.5s ease forwards,
            pulso 2.5s ease-in-out 1s infinite;
        }

        .tag-sede    { animation-delay: 0.2s, 1.2s; }
        .tag-te      { animation-delay: 0.4s, 1.4s; }
        .tag-acompana { animation-delay: 0.6s, 1.6s; }
      </style>

      <!-- TÍTULO — usa part para que desde fuera se pueda estilar cada tag -->
      <div class="titulo-bloque" part="titulo">
        <span class="excl-izq">¡</span>
        <span class="tag tag-sede" part="tag-sede">
          <slot name="titulo1">LA SEDE</slot>
        </span>
        <span class="tag tag-te" part="tag-te">
          <slot name="titulo2">TE</slot>
        </span>
        <span class="tag tag-acompana" part="tag-acompana">
          <slot name="titulo3">ACOMPAÑA</slot>
        </span>
        <span class="excl-der">!</span>
      </div>

      <!-- SUBTÍTULO — slots nombrados -->
      <div class="subtitulo" part="subtitulo">
        <slot name="subtitulo1"><p style="font-family:'Nunito',sans-serif;font-weight:800;font-size:1.13rem;color:var(--color-texto-oscuro);">El respeto no se negocia</p></slot>
        <slot name="subtitulo2"><p style="font-family:'Montserrat',sans-serif;font-weight:900;font-size:1.22rem;color:var(--color-morado);">¡Pará ya de acosar!</p></slot>
      </div>

      <!-- QR — slot para pasar imagen QR personalizada -->
      <div class="qr-bloque" part="qr">
        <p><slot name="qr-texto">Si necesitas ayuda, escánea este QR</slot></p>
        <div class="qr-container">
          <slot name="qr">
            <svg class="qr-placeholder-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="28" height="28" rx="3" fill="none" stroke="#000" stroke-width="4"/>
              <rect x="13" y="13" width="12" height="12" fill="#000"/>
              <rect x="47" y="5" width="28" height="28" rx="3" fill="none" stroke="#000" stroke-width="4"/>
              <rect x="55" y="13" width="12" height="12" fill="#000"/>
              <rect x="5" y="47" width="28" height="28" rx="3" fill="none" stroke="#000" stroke-width="4"/>
              <rect x="13" y="55" width="12" height="12" fill="#000"/>
              <rect x="47" y="47" width="8" height="8" fill="#000"/>
              <rect x="59" y="47" width="8" height="8" fill="#000"/>
              <rect x="47" y="59" width="8" height="8" fill="#000"/>
              <rect x="59" y="59" width="8" height="16" fill="#000"/>
            </svg>
          </slot>
        </div>
      </div>

      <!-- PERSONAS — slots para imágenes -->
      <div class="personas" part="personas">
        <div class="persona">
          <slot name="persona1">
            <div class="persona-placeholder">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span>Sin imagen</span>
            </div>
          </slot>
        </div>
        <div class="persona">
          <slot name="persona2">
            <div class="persona-placeholder">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
              <span>Sin imagen</span>
            </div>
          </slot>
        </div>
      </div>

      <!-- FOOTER — atributos para datos simples -->
      <div class="footer" part="footer">
        <span class="logo-ucr">UCR</span>
        <div class="footer-divider"></div>
        <div class="footer-badge">
          <span>UCR</span>
          <span>LIBRE DE</span>
          <span>ACOSO</span>
          <span>SEXUAL</span>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-sede">
          <div class="sg">${this.sede}</div>
          <div class="sede-nombre">${this.sedeNombre.replace(' ', '<br>')}</div>
        </div>
      </div>
    `;
  }
}

customElements.define('cartel-acompana', CartelAcompana);