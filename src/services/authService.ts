import api from './api';

// Types
export interface LoginCredentials {
  username?: string;
  email?: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  displayName?: string;
  gender?: string;
  dob?: string;
  country?: string;
  state?: string;
  district?: string;
  education?: string;
  profession?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    user: {
      id: string | number;
      username: string;
      email: string;
      firstName?: string;
      lastName?: string;
      displayName?: string;
      avatar?: string;
    };
    accessToken: string;
    refreshToken: string;
    dashboardRoute?: string;
    roles?: string[];
  };
}

// Authentication Service
class AuthService {
  /**
   * Admin Login
   * POST /api/auth/admin/login
   */
  async adminLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/admin/login', credentials);
    this.saveAuthData(response.data);
    return response.data;
  }

  /**
   * Group Admin Login
   * POST /api/auth/group-admin/login/:groupName
   */
  async groupAdminLogin(groupName: string, credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(`/auth/group-admin/login/${groupName}`, credentials);
    this.saveAuthData(response.data);
    return response.data;
  }

  /**
   * God Mode Login
   * POST /api/auth/god/login/:groupName/:subGroup
   */
  async godLogin(groupName: string, subGroup: string, credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(`/auth/god/login/${groupName}/${subGroup}`, credentials);
    this.saveAuthData(response.data);
    return response.data;
  }

  /**
   * Partner Login
   * POST /api/auth/partner/login
   */
  async partnerLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/partner/login', credentials);
    this.saveAuthData(response.data);
    return response.data;
  }

  /**
   * Reporter Login
   * POST /api/auth/reporter/login
   */
  async reporterLogin(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/reporter/login', credentials);
    this.saveAuthData(response.data);
    return response.data;
  }

  /**
   * Client Login
   * POST /api/auth/client/login/:groupName
   */
  async clientLogin(groupName: string, credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(`/auth/client/login/${groupName}`, credentials);
    this.saveAuthData(response.data);
    return response.data;
  }

  /**
   * Register User
   * POST /api/auth/register
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    this.saveAuthData(response.data);
    return response.data;
  }

  /**
   * Logout
   * POST /api/auth/logout
   */
  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      await api.post('/auth/logout', { refreshToken });
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Refresh Token
   * POST /api/auth/refresh
   */
  async refreshToken(): Promise<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post('/auth/refresh', { refreshToken });
    localStorage.setItem('accessToken', response.data.data.accessToken);
    return response.data.data;
  }

  /**
   * Save authentication data to localStorage
   */
  private saveAuthData(data: AuthResponse): void {
    if (data.success && data.data) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      if (data.data.roles) {
        localStorage.setItem('roles', JSON.stringify(data.data.roles));
      }
    }
  }

  /**
   * Clear authentication data from localStorage
   */
  private clearAuthData(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}

export default new AuthService();

