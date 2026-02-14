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

class SideBar extends HTMLElement {
  connectedCallback() {
    const btn = this.querySelector("button");
    const closeBtn = this.querySelector("#close-side-bar");
    const sideBarContent = this.querySelector(".side-bar-content");

    btn.addEventListener("click", () => {
      sideBarContent.classList.add("open");
    });

    closeBtn.addEventListener("click", (e) => {
      sideBarContent.classList.remove("open");
    });

    // Event bubbling: any click inside the sidebar that hits an anchor closes it and lets the browser navigate
    this.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (link) {
        sideBarContent.classList.remove("open");
      }
    });
  }
}

class TabsWrapper extends HTMLElement {
  connectedCallback() {
    const anchors = this.querySelectorAll("a");
    const contents = this.getElementsByClassName("tab-content");

    anchors.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        anchors.forEach((l) => l.classList.remove("active"));
        Array.from(contents).forEach((l) => l.classList.remove("active"));

        a.classList.add("active");
        const idx = Array.from(contents).findIndex(
          (c) => c.dataset.tab === a.dataset.tab,
        );
        if (idx === -1) return;

        contents[idx].classList.add("active");
      });
    });
  }
}

customElements.define("tabs-wrapper", TabsWrapper);
customElements.define("side-bar", SideBar);
customElements.define("theme-toggle", ThemeToggle);
