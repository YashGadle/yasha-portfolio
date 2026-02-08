class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.root = document.documentElement;
  }
  connectedCallback() {
    this.initTheme();
    this.addEventListener("click", this.toggleTheme);
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => this.applyTheme(this.getSystemTheme()));
  }

  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(theme) {
    this.root.setAttribute("data-theme", theme);
    const metaTheme = this.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.content = theme === "dark" ? "#1a1a1a" : "#f5f5f5";
  }

  initTheme() {
    this.applyTheme(this.getSystemTheme());
  }

  toggleTheme() {
    const current = this.root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    this.applyTheme(next);
  }
}

class ToolTip extends HTMLElement {
  connectedCallback() {
    this.addEventListener("mouseenter", this.showToolTip);
    this.addEventListener("mouseleave", this.hideToolTip);
  }

  disconnectedCallback() {
    this.removeEventListener("mouseenter", this.showToolTip);
    this.removeEventListener("mouseleave", this.hideToolTip);
  }

  showToolTip = (e) => {
    const contentNode = this.querySelector("tool-tip-content");
    if (!contentNode) return;

    contentNode.classList.add("show-tooltip");
  };
  hideToolTip = (e) => {
    const contentNode = this.querySelector("tool-tip-content");
    if (!contentNode) return;

    contentNode.classList.remove("show-tooltip");
  };
}

class ToolTipContent extends HTMLElement {}

customElements.define("tool-tip", ToolTip);
customElements.define("tool-tip-content", ToolTipContent);
customElements.define("theme-toggle", ThemeToggle);
