import * as mockData from './mockData';
import config from '../config';
import logger from '../logger';

/**
 * API client for fetching data
 * Uses mock data in test environment and when explicitly enabled
 */
class ApiService {
  private baseUrl: string;
  private useMocks: boolean;
  private environment: string;

  constructor() {
    // Initialize with default config
    this.baseUrl = config.apiUrl;
    this.useMocks = config.useMocks;
    this.environment = config.env;
    
    // Check for environment override if in browser
    if (typeof window !== 'undefined') {
      try {
        const envOverride = localStorage.getItem('env_override');
        if (envOverride) {
          this.environment = envOverride;
          
          // Use mocks in test environment
          if (envOverride === 'test') {
            this.useMocks = true;
          }
          
          // Adjust baseUrl based on environment
          switch(envOverride) {
            case 'development':
              this.baseUrl = 'https://api.dev.example.com';
              break;
            case 'test':
              this.baseUrl = 'https://api.test.example.com';
              break;
            case 'production':
              this.baseUrl = 'https://api.example.com';
              break;
          }
          
          logger.info(`API Service using overridden environment: ${this.environment}`);
        }
      } catch (error) {
        // Ignore localStorage errors (might happen in test contexts)
        logger.warn('Error accessing localStorage for environment override', error);
      }
    }
    
    // For tests running with npm run dev:test, ensure mocks are used
    if (process.env.NEXT_PUBLIC_ENV === 'test' || process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
      this.useMocks = true;
    }
    
    logger.info(`API Service initialized for ${this.environment} environment`);
    if (this.useMocks) {
      logger.info('Using mock data');
    } else {
      logger.info('Using real API endpoints');
    }
  }

  /**
   * Generic fetch method with logging
   */
  private async fetchWithLogging<T>(
    url: string, 
    method = 'GET', 
    body?: unknown
  ): Promise<T> {
    const fullUrl = `${this.baseUrl}${url}`;
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    // Log the request in development
    logger.logApiRequest(method, fullUrl, body);

    try {
      const response = await fetch(fullUrl, options);
      const data = await response.json();
      
      // Log the response in development
      logger.logApiResponse(method, fullUrl, response.status, data);
      
      if (!response.ok) {
        const error = new Error(`API error: ${response.status} ${response.statusText}`);
        logger.error('API request failed', { 
          url: fullUrl, 
          status: response.status, 
          statusText: response.statusText,
          data 
        });
        throw error;
      }
      
      return data as T;
    } catch (error) {
      logger.error(`Error fetching from ${fullUrl}`, error);
      throw error;
    }
  }

  /**
   * Get team members data
   */
  async getTeamMembers() {
    if (this.useMocks) {
      logger.debug('Using mock team data in test environment');
      return mockData.teamMembers;
    }

    try {
      // In real implementation, this would fetch from API
      // return this.fetchWithLogging('/api/team');
      
      // For now, return real data
      logger.debug('Returning hardcoded team members data');
      return [
        {
          id: 1,
          name: "Jane Doe",
          role: "CEO & Founder",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at eros eu justo faucibus varius."
        },
        {
          id: 2,
          name: "John Smith",
          role: "CTO",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at eros eu justo faucibus varius."
        },
        {
          id: 3,
          name: "Emily Johnson",
          role: "Design Lead",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at eros eu justo faucibus varius."
        }
      ];
    } catch (error) {
      logger.error('Error fetching team members', error);
      throw error;
    }
  }

  /**
   * Get company information
   */
  async getCompanyInfo() {
    if (this.useMocks) {
      logger.debug('Using mock company data in test environment');
      return mockData.companyInfo;
    }

    try {
      // In real implementation, this would fetch from API
      // return this.fetchWithLogging('/api/company');
      
      // For now, return real data
      logger.debug('Returning hardcoded company info');
      return {
        name: "Next App",
        founded: 2023,
        mission: "At Next App, we're dedicated to building modern, performant web applications that deliver exceptional user experiences. Our mission is to create technology that empowers businesses and delights users."
      };
    } catch (error) {
      logger.error('Error fetching company info', error);
      throw error;
    }
  }

  /**
   * Get blog posts
   */
  async getBlogPosts() {
    if (this.useMocks) {
      logger.debug('Using mock blog posts in test environment');
      return mockData.blogPosts;
    }

    try {
      // In real implementation, this would fetch from API
      // return this.fetchWithLogging('/api/blog');
      
      // For now, return empty array since we don't have a blog yet
      logger.debug('No blog posts available yet');
      return [];
    } catch (error) {
      logger.error('Error fetching blog posts', error);
      throw error;
    }
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService; 