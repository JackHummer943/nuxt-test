<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import UserForm from '@/entities/user/ui/UserForm.vue'

import type { User, UserCreate } from '@/entities/user/model/types'

const store = useUserStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const id = route.params.id as string

const user = store.getUserById(id) as User | undefined

if (!user) router.push('/')

const handleSubmit = async (data: UserCreate) => {
  try {
    await store.updateUser(id, data)
    toast.success('Изменения сохранены!')
    router.push('/')
  } catch {
    toast.error('Ошибка валидации')
  }
}
</script>

<template>
  <div v-if="user" class="p-6">
    <h1 class="text-2xl font-bold mb-6">Редактирование</h1>
    <UserForm :initial-data="user" @submit="handleSubmit" />
  </div>
</template>