export function renderTicketHistory() {
  return `
    <div class="breadcrumb">
      Rainbow eagles/ <strong>Ticket History</strong>
    </div>

    <section class="page-header">
      <h1>Ticket History</h1>
      <p>View all your submitted tickets</p>
    </section>

    <section class="content">
      <div class="table-box">
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
    </section>
  `;
}
