import { Injectable } from '@nestjs/common'

import axios, { AxiosInstance } from 'axios'

import { HttpAdapter } from '../interfaces/http-adapter.interface'

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url)

      return data
    } catch (error) {
      throw new Error('Somthing went wrong during axios request')
    }
  }
  post<T>(url: string, payload: any): Promise<T> {
    throw new Error('Method not implemented.')
  }
  delete<T>(url: string): Promise<T> {
    throw new Error('Method not implemented.')
  }
  patch<T>(url: string, payload: any): Promise<T> {
    throw new Error('Method not implemented.')
  }
  put<T>(url: string, payload: any): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
