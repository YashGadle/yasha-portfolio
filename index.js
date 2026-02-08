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
