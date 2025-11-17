import { useNuxtApp } from '#app';

interface SnackbarOptions {
  text: string
  color?: 'success' | 'error' | 'info' | 'warning'
  timeout?: number
  location?: 'top' | 'bottom'
  closeable?: boolean
}

interface SnackbarInstance {
  add: (options: SnackbarOptions) => void
}

interface ToastPlugin {
  snackbar?: SnackbarInstance
}

declare module '#app' {
  interface NuxtApp {
    $toast: ToastPlugin
  }
}

export const useToast = () => {
  const { $toast } = useNuxtApp();

  const add = (options: SnackbarOptions) => {
    const snackbar = $toast?.snackbar;
    if (snackbar?.add) {
      snackbar.add({
        text: options.text,
        color: options.color ?? 'info',
        timeout: options.timeout ?? 4000,
        location: 'top',
        closeable: options.closeable ?? true,
      });
    } else {
       
      alert(options.text);
    }
  };

  return {
    success: (text: string, timeout = 4000) =>
      add({ text, color: 'success', timeout }),

    error: (text: string, timeout = 6000) =>
      add({ text, color: 'error', timeout }),

    info: (text: string, timeout = 3000) =>
      add({ text, color: 'info', timeout }),

    warning: (text: string, timeout = 5000) =>
      add({ text, color: 'warning', timeout }),

    add,
  };
};

export type UseToastReturn = ReturnType<typeof useToast>