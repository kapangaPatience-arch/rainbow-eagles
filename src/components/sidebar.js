export function renderSidebar() {
  return `
    <aside class="sidebar">
      <div class="logo">
        <h3 class="logo-text"><i class="fa-solid fa-headset"></i> ICT HELPDESK</h3>
      </div>

      <nav>
        <ul>
          <li data-route="dashboard">
            <a href="#/dashboard">
              <i class="fa-solid fa-table-columns"></i>
              Dashboard
            </a>
          </li>
          <li data-route="request-assistance">
            <a href="#/request-assistance">
              <i class="fa-solid fa-circle-question"></i>
              Request Assistance
            </a>
          </li>
          <li data-route="ticket-history">
            <a href="#/ticket-history">
              <i class="fa-solid fa-clock-rotate-left"></i>
              Ticket History
            </a>
          </li>
          <li data-route="profile">
            <a href="#/profile">
              <i class="fa-solid fa-user"></i>
              Profile
            </a>
          </li>
        </ul>
      </nav>

      <button class="logout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        Logout
      </button>
    </aside>
  `;
}
