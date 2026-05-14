class LetreroDirecciones extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  // Reactividad: re-render si cambian atributos
  static get observedAttributes() {
    return ['titulo'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  get titulo() { return this.getAttribute('titulo') ?? 'UCR'; }

  render() {
    this.shadowRoot.innerHTML = /* html */`
      <style>
        :host {
          --letrero-bg: #1a3a5c;
          --letrero-logo-bg: #0f2540;
          --letrero-width: 320px;
          --letrero-radius: 6px;
          --letrero-color: #fff;
          --letrero-divider: rgba(255,255,255,0.1);
          --letrero-font-size: 0.95rem;
          --letrero-flecha-size: 1.3rem;

          width: var(--letrero-width);
          background-color: var(--letrero-bg);
          border-radius: var(--letrero-radius);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 8px 40px rgba(0,0,0,0.35);
          align-self: center;
        }

        /* Contenedor de filas — el slot default va aquí */
        .filas-container {
          display: flex;
          flex-direction: column;
        }

        /* Estilar los elementos hijos pasados por slot (nivel 1) */
        ::slotted(.letrero-fila) {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid var(--letrero-divider);
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: var(--letrero-font-size);
          color: var(--letrero-color);
          gap: 12px;
        }

        ::slotted(.letrero-fila:last-of-type) {
          border-bottom: none;
        }

        .letrero-logo {
          background-color: var(--letrero-logo-bg);
          text-align: center;
          padding: 12px;
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.4rem;
          color: var(--letrero-color);
          letter-spacing: 2px;
        }
      </style>

      <!-- SLOT DEFAULT: las filas se pasan como hijos directos -->
      <div class="filas-container" part="filas">
        <slot></slot>
      </div>

      <!-- LOGO: slot nombrado o fallback al atributo -->
      <div class="letrero-logo" part="logo">
        <slot name="logo">${this.titulo}</slot>
      </div>
    `;
  }
}

customElements.define('letrero-direcciones', LetreroDirecciones);