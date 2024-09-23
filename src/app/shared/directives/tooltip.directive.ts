import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  tooltipText: string = 'https://roadmap.sh/guides/what-is-internet';
  tooltipVisible = false;
  tooltipElement: HTMLElement | null = null;
  hideTimeout: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  @HostListener('mouseenter') onMouseEnter() {
    clearTimeout(this.hideTimeout);
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.startHideTimeout();
  }

  private createTooltip() {
    if (!this.tooltipElement) {
      this.tooltipElement = this.renderer.createElement('div');
      this.renderer.addClass(this.tooltipElement, 'custom-tooltip');
      this.renderer.setProperty(this.tooltipElement, 'innerHTML', `
        <button class="btn btn-link text-decoration-none text-white" onclick="javascript:window.open('${this.tooltipText}', '_blank')">Learn more</button>
      `);
      this.renderer.appendChild(document.body, this.tooltipElement);

      // Position tooltip
      const { left, top, height } = this.el.nativeElement.getBoundingClientRect();
      this.renderer.setStyle(this.tooltipElement, 'left', `${left + window.scrollX}px`);
      this.renderer.setStyle(this.tooltipElement, 'top', `${top + window.scrollY + height + 10}px`);
       // Add event listeners for the tooltip element
       this.renderer.listen(this.tooltipElement, 'mouseenter', () => {
        clearTimeout(this.hideTimeout);
      });

      this.renderer.listen(this.tooltipElement, 'mouseleave', () => {
        this.startHideTimeout();
      });
    }
  }

  private showTooltip() {
    if (!this.tooltipVisible) {
      this.createTooltip();
      this.tooltipVisible = true;
    }
  }

  private hideTooltip() {
    if (this.tooltipVisible && this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
      this.tooltipVisible = false;
    }
  }

  private startHideTimeout() {
    this.hideTimeout = setTimeout(() => {
      if (!this.tooltipElement?.matches(':hover') && !this.el.nativeElement.matches(':hover')) {
        this.hideTooltip();
      }
    }, 200);
  }

}
