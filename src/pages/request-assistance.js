export function renderRequestAssistance() {
  return `
    <div class="breadcrumb">
      National Treasury / <strong>Request Assistance</strong>
    </div>

    <section class="page-header">
      <h1>Request Assistance</h1>
      <p>Submit a new IT support ticket</p>
    </section>

    <section class="form-section">
      <form class="ticket-form" onsubmit="return false;">
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" placeholder="Brief description of your issue">
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <select id="category">
            <option value="">Select category</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
            <option value="email">Email</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="priority">Priority</label>
          <select id="priority">
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" rows="5" placeholder="Provide details about your issue..."></textarea>
        </div>
        <button type="submit" class="btn-submit">
          <i class="fa-solid fa-paper-plane"></i>
          Submit Ticket
        </button>
      </form>
    </section>
  `;
}
