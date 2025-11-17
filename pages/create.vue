<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import UserForm from '@/entities/user/ui/UserForm.vue'
import type { UserCreate } from '@/entities/user/model/types'

const store = useUserStore()
const router = useRouter()
const toast = useToast()

const handleSubmit = async (data: UserCreate) => {
  try {
    await store.addUser(data)
    toast.success('Пользователь создан!')
    router.push('/')
  } catch {
    toast.error('Ошибка валидации')
  }
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Создание пользователя</h1>
    <UserForm @submit="handleSubmit" />
  </div>
</template>