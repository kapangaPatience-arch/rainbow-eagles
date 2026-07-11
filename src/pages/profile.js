export function renderProfile() {
  return `
    <div class="breadcrumb">
      National Treasury / <strong>Profile</strong>
    </div>

    <section class="page-header">
      <h1>My Profile</h1>
      <p>Manage your account details</p>
    </section>

    <section class="profile-section">
      <div class="profile-card">
        <div class="profile-avatar">
          <i class="fa-solid fa-user"></i>
        </div>
        <h2>IVY WANJIKU NJUGUNA</h2>
        <p class="profile-dept">ICT Department</p>
        <p class="profile-email">ivy@gmail.com</p>

        <div class="profile-details">
          <div class="detail-row">
            <span class="detail-label">Employee ID</span>
            <span class="detail-value">NTE-2024-0042</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Role</span>
            <span class="detail-value">Staff</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Phone</span>
            <span class="detail-value">+254 712 345 678</span>
          </div>
        </div>

        <button class="btn-edit">
          <i class="fa-solid fa-pen-to-square"></i>
          Edit Profile
        </button>
      </div>
    </section>
  `;
}
