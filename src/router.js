import { renderDashboard } from './pages/dashboard.js';
import { renderRequestAssistance } from './pages/request-assistance.js';
import { renderTicketHistory } from './pages/ticket-history.js';
import { renderProfile } from './pages/profile.js';

const routes = {
  '': renderDashboard,
  'dashboard': renderDashboard,
  'request-assistance': renderRequestAssistance,
  'ticket-history': renderTicketHistory,
  'profile': renderProfile,
};

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = location.hash.replace('#/', '').replace('#', '');
  const render = routes[hash] || routes['dashboard'];

  const content = document.getElementById('page-content');
  if (content) {
    content.innerHTML = render();
  }

  updateActiveLink(hash || 'dashboard');
}

function updateActiveLink(route) {
  document.querySelectorAll('.sidebar nav ul li').forEach(li => {
    li.classList.toggle('active', li.dataset.route === route);
  });
}
