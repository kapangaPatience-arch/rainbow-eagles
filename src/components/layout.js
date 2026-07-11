import { renderSidebar } from './sidebar.js';
import { getAccessibilityWidgetHTML, bindAccessibilityEvents } from './accessibility-widget.js';

export function renderLayout() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="container">
      ${renderSidebar()}
      <main id="page-content"></main>
    </div>
    ${getAccessibilityWidgetHTML()}
  `;
  bindAccessibilityEvents();
}
