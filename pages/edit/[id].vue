<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from '@/shared/composables/useToast'
import UserForm from '@/entities/user/ui/UserForm.vue'

const store = useUserStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const id = route.params.id as string

const user = store.getUserById(id)
if (!user) router.push('/')

const handleSubmit = async (data: any) => {
  try {
    const { id: _, ...updateData } = data
    await store.updateUser(id, updateData)
    toast.success('Изменения сохранены!')
    router.push('/')
  } catch {
    toast.error('Ошибка валидации')
  }
}
</script>

<template>
  <div class="p-6" v-if="user">
    <h1 class="text-2xl font-bold mb-6">Редактирование</h1>
    <UserForm :initial-data="user" @submit="handleSubmit" />
  </div>
</template>