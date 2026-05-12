import { APIRequestContext, APIResponse, test } from '@playwright/test';

export class APIClient {
  readonly request: APIRequestContext;
  readonly baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  setAuthorizationHeader(token: string) {
    this.defaultHeaders['Cookie'] = `token=${token}`;
  }

  clearHeaders() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async get(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
    });
    return response;
  }

  async post(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.post(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
      data,
    });
    return response;
  }

  async put(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.put(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
      data,
    });
    return response;
  }

  async patch(endpoint: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.patch(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
      data,
    });
    return response;
  }

  async delete(endpoint: string, headers?: Record<string, string>): Promise<APIResponse> {
    const response = await this.request.delete(`${this.baseURL}${endpoint}`, {
      headers: { ...this.defaultHeaders, ...headers },
    });
    return response;
  }

  private async logResponse(response: APIResponse) {
  }
}
