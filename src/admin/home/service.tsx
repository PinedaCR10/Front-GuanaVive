export const adminService = {
  async fetchDashboardData() {
    return {
      users: 3,
      posts: 3,
      categories: 3,
      revenue: 1000,
    };
  },

  async fetchRequests() {
    return [];
  },

  async approveRequest() {
    // Simulación temporal hasta conectar al backend
    return { success: true };
  },

  async denyRequest() {
    // Simulación temporal
    return { success: true };
  },
};
