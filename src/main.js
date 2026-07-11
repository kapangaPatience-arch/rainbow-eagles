import { initRouter } from './router.js';
import { renderLayout } from './components/layout.js';
import { initAccessibility } from './components/accessibility-widget.js';
import './styles/accessibility.css';

initAccessibility();
renderLayout();
initRouter();
