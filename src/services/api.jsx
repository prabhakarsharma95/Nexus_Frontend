import axios from "axios"

//const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"


// const API_URL = import.meta.env.VITE_API_URL || "https://nexus-backend-8cc3.onrender.com/api"

const API_URL = import.meta.env.VITE_API_URL || "https://nexus-backend-rouge.vercel.app//api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config

    // Handle authentication errors
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

// Auth services
export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials)
    if (response.data.token) {
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data
  },

  logout: async () => {
    await api.get("/auth/logout")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me")
    return response.data
  },
}

// Job services
export const jobService = {
  getAllJobs: async (params) => {
    try {
      const response = await api.get("/jobs", { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },

  getJobById: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      throw error;
    }
  },

  createJob: async (jobData) => {
    try {
      const response = await api.post("/jobs", jobData);
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  updateJob: async (id, jobData) => {
    try {
      const response = await api.put(`/jobs/${id}`, jobData);
      return response.data;
    } catch (error) {
      console.error(`Error updating job ${id}:`, error);
      throw error;
    }
  },

  deleteJob: async (id) => {
    try {
      const response = await api.delete(`/jobs/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting job ${id}:`, error);
      throw error;
    }
  },

  applyForJob: async (id, applicationData) => {
    try {
      const response = await api.post(`/jobs/${id}/apply`, applicationData);
      return response.data;
    } catch (error) {
      console.error(`Error applying to job ${id}:`, error);
      throw error;
    }
  },

  getEmployerJobs: async () => {
    try {
      const response = await api.get("/jobs/employer/jobs");
      return response.data;
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      throw error;
    }
  },

  getJobApplicants: async (id) => {
    try {
      const response = await api.get(`/jobs/${id}/applicants`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching applicants for job ${id}:`, error);
      throw error;
    }
  },

  updateApplicantStatus: async (jobId, applicantId, status) => {
    try {
      const response = await api.put(
        `/jobs/${jobId}/applicants/${applicantId}`,
        { status }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating applicant ${applicantId} status for job ${jobId}:`,
        error
      );
      throw error;
    }
  },
};
// User services
export const userService = {
  getUserProfile: async () => {
    const response = await api.get("/users/profile")
    return response.data
  },

  updateUserProfile: async (userData) => {
    const response = await api.put("/users/profile", userData)
    return response.data
  },

  changePassword: async (passwordData) => {
    const response = await api.put("/users/change-password", passwordData)
    return response.data
  },

  saveJob: async (jobId) => {
    const response = await api.post(`/users/jobs/${jobId}/save`)
    return response.data
  },

  unsaveJob: async (jobId) => {
    const response = await api.delete(`/users/jobs/${jobId}/save`)
    return response.data
  },

  getSavedJobs: async () => {
    const response = await api.get("/users/saved-jobs")
    return response.data
  },

  getAppliedJobs: async () => {
    try {
      const response = await api.get("/users/applications")
      return response.data
    } catch (error) {
      console.error("Error fetching applied jobs:", error)
      // Return a default structure to prevent undefined errors
      return { applications: [] }
    }
  },
  // getUserProfile: async () => {
  //   try {
  //     const response = await api.get("/users/profile")
  //     return response.data
  //   } catch (error) {
  //     console.error("Error fetching user profile:", error)
  //     // Return a default structure to prevent undefined errors
  //     return {
  //       success: false,
  //       user: {
  //         firstName: "",
  //         lastName: "",
  //         email: "",
  //         role: "",
  //         location: "",
  //         position: "",
  //         skills: [],
  //         company: "",
  //         bio: "",
  //         savedJobs: [],
  //         appliedJobs: [],
  //       },
  //     }
  //   }
  // },

}

export default api
