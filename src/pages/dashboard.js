export function renderDashboard() {
  const hour = new Date().getHours();
  let greeting = 'GOOD MORNING';
  if (hour >= 12 && hour < 17) greeting = 'GOOD AFTERNOON';
  if (hour >= 17) greeting = 'GOOD EVENING';

  return `
    <div class="breadcrumb">
      Rainbow eagles/ <strong>Employee Dashboard</strong>
    </div>

    <section class="hero">
      <div>
        <p>${greeting}</p>
        <h1>Dear sir.</h1>
        <span>ICT Department &bull; rainboweagles@gmail.com</span>
      </div>
      <div class="hero-buttons">
        <button class="btn-ticket">
          <i class="fa-solid fa-circle-plus"></i>
          Raise a Ticket
        </button>
        <button class="btn-profile">
          <i class="fa-solid fa-user"></i>
          My Profile
        </button>
      </div>
    </section>

    <section class="cards">
      <div class="card card-total">
        <i class="fa-regular fa-circle"></i>
        <h2>0</h2>
        <p>Total Raised</p>
      </div>
      <div class="card card-open">
        <i class="fa-regular fa-clock"></i>
        <h2>0</h2>
        <p>Open</p>
      </div>
      <div class="card card-progress">
        <i class="fa-solid fa-spinner"></i>
        <h2>0</h2>
        <p>In Progress</p>
      </div>
      <div class="card card-resolved">
        <i class="fa-regular fa-circle-check"></i>
        <h2>0</h2>
        <p>Resolved</p>
      </div>
    </section>

    <section class="content">
      <div class="table-box">
        <h2>Ticket History</h2>
        <table>
          <thead>
            <tr>
              <th>DATE/TIME</th>
              <th>TICKET ID</th>
              <th>ISSUE</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="6" class="empty">No tickets found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="quick">
        <h3>Quick Actions</h3>
        <a href="#/request-assistance" class="action">
          <i class="fa-solid fa-circle-question"></i>
          <p>Request Assistance</p>
        </a>
        <a href="#/ticket-history" class="action">
          <i class="fa-solid fa-clock-rotate-left"></i>
          <p>Ticket History</p>
        </a>
        <a href="#/profile" class="action">
          <i class="fa-solid fa-user"></i>
          <p>My Profile</p>
        </a>
      </div>
    </section>
  `;
}
