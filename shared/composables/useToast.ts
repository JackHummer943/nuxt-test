import { useNuxtApp } from '#app'

export const useToast = () => {
  const { $vuetify } = useNuxtApp()

  const add = (options: {
    text: string
    color?: 'success' | 'error' | 'info' | 'warning'
    timeout?: number
    closeable?: boolean
  }) => {
    const snackbar = ($vuetify as any)?.snackbar
    if (snackbar?.add) {
      snackbar.add({
        text: options.text,
        color: options.color || 'info',
        timeout: options.timeout ?? 4000,
        location: 'top',
        closeable: options.closeable ?? true,
      })
    } else {
      alert(options.text)
    }
  }

  return {
    success: (msg: string) => add({ text: msg, color: 'success', timeout: 4000 }),
    error: (msg: string) => add({ text: msg, color: 'error', timeout: 5000 }),
    info: (msg: string) => add({ text: msg, color: 'info', timeout: 3000 }),
  }
}