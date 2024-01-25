let baseURL: string
if (import.meta.env.MODE === 'development') {
  baseURL = '/api'
} else {
  baseURL = 'http://127.0.0.1:8080'
}
export default baseURL
