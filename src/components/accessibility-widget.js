const STORAGE_KEY = 'a11y-settings';

const FONT_SIZES = ['default', 'large', 'x-large', 'xx-large'];
const FONT_LABELS = { default: '100%', large: '115%', 'x-large': '130%', 'xx-large': '150%' };

let panelOpen = false;

function getStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function save(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function announce(message) {
  const el = document.getElementById('a11y-live');
  if (el) el.textContent = message;
}

function applySettings(settings) {
  const html = document.documentElement;

  // Font size
  if (settings.fontSize && settings.fontSize !== 'default') {
    html.setAttribute('data-font-size', settings.fontSize);
  } else {
    html.removeAttribute('data-font-size');
  }

  // Theme
  if (settings.highContrast) {
    html.setAttribute('data-theme', 'high-contrast');
  } else {
    html.removeAttribute('data-theme');
  }

  // Grayscale
  html.setAttribute('data-grayscale', settings.grayscale ? 'true' : 'false');

  // Dyslexia
  html.setAttribute('data-dyslexia', settings.dyslexia ? 'true' : 'false');

  // Line spacing
  html.setAttribute('data-line-spacing', settings.lineSpacing ? 'true' : 'false');

  // Highlight links
  html.setAttribute('data-highlight-links', settings.highlightLinks ? 'true' : 'false');

  // Big cursor
  html.setAttribute('data-big-cursor', settings.bigCursor ? 'true' : 'false');
}

function getFontSizeIndex(settings) {
  return FONT_SIZES.indexOf(settings.fontSize || 'default');
}

function updateFontSizeLabel(settings) {
  const label = document.getElementById('a11y-font-size-label');
  if (label) {
    label.textContent = FONT_LABELS[settings.fontSize || 'default'];
  }
}

function updateSwitches(settings) {
  const mapping = {
    'a11y-switch-contrast': settings.highContrast || false,
    'a11y-switch-grayscale': settings.grayscale || false,
    'a11y-switch-dyslexia': settings.dyslexia || false,
    'a11y-switch-spacing': settings.lineSpacing || false,
    'a11y-switch-links': settings.highlightLinks || false,
    'a11y-switch-cursor': settings.bigCursor || false,
  };

  for (const [id, value] of Object.entries(mapping)) {
    const input = document.getElementById(id);
    if (input) input.checked = value;
  }
}

function syncUI(settings) {
  updateFontSizeLabel(settings);
  updateSwitches(settings);
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(
    'button, input, [tabindex]:not([tabindex="-1"])'
  ));
}

function trapFocus(e) {
  if (!panelOpen) return;
  const panel = document.getElementById('a11y-panel');
  if (!panel) return;

  const focusable = getFocusableElements(panel);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape' && panelOpen) {
    closePanel();
    return;
  }
  trapFocus(e);
}

function openPanel() {
  const panel = document.getElementById('a11y-panel');
  const toggle = document.getElementById('a11y-toggle');
  if (!panel || !toggle) return;

  panelOpen = true;
  panel.setAttribute('data-open', 'true');
  toggle.setAttribute('aria-expanded', 'true');

  const firstFocusable = getFocusableElements(panel)[0];
  if (firstFocusable) firstFocusable.focus();
}

function closePanel() {
  const panel = document.getElementById('a11y-panel');
  const toggle = document.getElementById('a11y-toggle');
  if (!panel || !toggle) return;

  panelOpen = false;
  panel.setAttribute('data-open', 'false');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.focus();
}

function togglePanel() {
  if (panelOpen) {
    closePanel();
  } else {
    openPanel();
  }
}

function handleFontSize(direction) {
  const settings = getStored();
  let idx = getFontSizeIndex(settings);

  if (direction === 'up' && idx < FONT_SIZES.length - 1) {
    idx++;
  } else if (direction === 'down' && idx > 0) {
    idx--;
  }

  settings.fontSize = FONT_SIZES[idx];
  save(settings);
  applySettings(settings);
  syncUI(settings);
  announce(`Font size ${FONT_LABELS[settings.fontSize]}`);
}

function handleToggle(settingKey, label) {
  const settings = getStored();
  settings[settingKey] = !settings[settingKey];
  save(settings);
  applySettings(settings);
  syncUI(settings);
  announce(`${label} ${settings[settingKey] ? 'enabled' : 'disabled'}`);
}

function handleReset() {
  const settings = {
    fontSize: 'default',
    highContrast: false,
    grayscale: false,
    dyslexia: false,
    lineSpacing: false,
    highlightLinks: false,
    bigCursor: false,
  };
  save(settings);
  applySettings(settings);
  syncUI(settings);
  announce('All accessibility settings reset');
}

function renderWidget() {
  const settings = getStored();

  return `
    <div class="a11y-sr-only" aria-live="polite" id="a11y-live"></div>

    <button
      id="a11y-toggle"
      class="a11y-toggle"
      type="button"
      aria-label="Accessibility options"
      aria-expanded="false"
      aria-controls="a11y-panel"
    >
      <i class="fa-solid fa-universal-access" aria-hidden="true"></i>
    </button>

    <div
      id="a11y-panel"
      class="a11y-panel"
      role="dialog"
      aria-label="Accessibility settings"
      data-open="false"
    >
      <div class="a11y-panel-header">
        <h3>Accessibility</h3>
        <button
          class="a11y-close"
          type="button"
          aria-label="Close accessibility settings"
        >
          <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
      </div>

      <div class="a11y-group">
        <span class="a11y-group-label" id="a11y-font-label">Font Size</span>
        <div class="a11y-font-size" role="group" aria-labelledby="a11y-font-label">
          <button
            class="a11y-font-btn"
            type="button"
            aria-label="Decrease font size"
            data-action="font-down"
          >A−</button>
          <span class="a11y-font-label" id="a11y-font-size-label">${FONT_LABELS[settings.fontSize || 'default']}</span>
          <button
            class="a11y-font-btn"
            type="button"
            aria-label="Increase font size"
            data-action="font-up"
          >A+</button>
        </div>
      </div>

      <div class="a11y-group" role="group" aria-label="Display settings">
        <label class="a11y-row" for="a11y-switch-contrast">
          <span class="a11y-row-left">
            <span class="a11y-row-icon contrast" aria-hidden="true"><i class="fa-solid fa-circle-half-stroke"></i></span>
            <span class="a11y-row-text">High Contrast</span>
          </span>
          <span class="a11y-switch">
            <input type="checkbox" id="a11y-switch-contrast" role="switch" aria-pressed="${settings.highContrast || false}" data-setting="highContrast">
            <span class="a11y-switch-track" aria-hidden="true"></span>
          </span>
        </label>

        <label class="a11y-row" for="a11y-switch-grayscale">
          <span class="a11y-row-left">
            <span class="a11y-row-icon grayscale" aria-hidden="true"><i class="fa-solid fa-palette"></i></span>
            <span class="a11y-row-text">Grayscale</span>
          </span>
          <span class="a11y-switch">
            <input type="checkbox" id="a11y-switch-grayscale" role="switch" aria-pressed="${settings.grayscale || false}" data-setting="grayscale">
            <span class="a11y-switch-track" aria-hidden="true"></span>
          </span>
        </label>

        <label class="a11y-row" for="a11y-switch-dyslexia">
          <span class="a11y-row-left">
            <span class="a11y-row-icon dyslexia" aria-hidden="true"><i class="fa-solid fa-font"></i></span>
            <span class="a11y-row-text">Dyslexia Font</span>
          </span>
          <span class="a11y-switch">
            <input type="checkbox" id="a11y-switch-dyslexia" role="switch" aria-pressed="${settings.dyslexia || false}" data-setting="dyslexia">
            <span class="a11y-switch-track" aria-hidden="true"></span>
          </span>
        </label>

        <label class="a11y-row" for="a11y-switch-spacing">
          <span class="a11y-row-left">
            <span class="a11y-row-icon spacing" aria-hidden="true"><i class="fa-solid fa-arrows-up-down"></i></span>
            <span class="a11y-row-text">Line Spacing</span>
          </span>
          <span class="a11y-switch">
            <input type="checkbox" id="a11y-switch-spacing" role="switch" aria-pressed="${settings.lineSpacing || false}" data-setting="lineSpacing">
            <span class="a11y-switch-track" aria-hidden="true"></span>
          </span>
        </label>

        <label class="a11y-row" for="a11y-switch-links">
          <span class="a11y-row-left">
            <span class="a11y-row-icon links" aria-hidden="true"><i class="fa-solid fa-link"></i></span>
            <span class="a11y-row-text">Highlight Links</span>
          </span>
          <span class="a11y-switch">
            <input type="checkbox" id="a11y-switch-links" role="switch" aria-pressed="${settings.highlightLinks || false}" data-setting="highlightLinks">
            <span class="a11y-switch-track" aria-hidden="true"></span>
          </span>
        </label>

        <label class="a11y-row" for="a11y-switch-cursor">
          <span class="a11y-row-left">
            <span class="a11y-row-icon cursor" aria-hidden="true"><i class="fa-solid fa-arrow-pointer"></i></span>
            <span class="a11y-row-text">Big Cursor</span>
          </span>
          <span class="a11y-switch">
            <input type="checkbox" id="a11y-switch-cursor" role="switch" aria-pressed="${settings.bigCursor || false}" data-setting="bigCursor">
            <span class="a11y-switch-track" aria-hidden="true"></span>
          </span>
        </label>
      </div>

      <button class="a11y-reset" type="button" aria-label="Reset all accessibility settings">
        <i class="fa-solid fa-rotate-left" aria-hidden="true"></i>
        Reset All
      </button>
    </div>
  `;
}

function bindEvents() {
  const toggle = document.getElementById('a11y-toggle');
  const closeBtn = document.querySelector('.a11y-close');
  const resetBtn = document.querySelector('.a11y-reset');

  if (toggle) {
    toggle.addEventListener('click', togglePanel);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closePanel);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', handleReset);
  }

  document.querySelectorAll('.a11y-font-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      handleFontSize(action === 'font-up' ? 'up' : 'down');
    });
  });

  document.querySelectorAll('.a11y-switch input').forEach(input => {
    input.addEventListener('change', () => {
      const key = input.getAttribute('data-setting');
      const label = input.closest('.a11y-row').querySelector('.a11y-row-text').textContent;
      handleToggle(key, label);
    });
  });

  document.addEventListener('keydown', handleKeydown);
}

export function initAccessibility() {
  const settings = getStored();
  applySettings(settings);
}

export function getAccessibilityWidgetHTML() {
  return renderWidget();
}

export function bindAccessibilityEvents() {
  bindEvents();
}
