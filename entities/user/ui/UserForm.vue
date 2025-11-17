<script setup lang="ts">
import { ref } from 'vue'
import { userSchema } from '../model/schema'
import type { UserCreate } from '../model/types'

const props = defineProps<{ initialData?: Partial<UserCreate> }>()
const emit = defineEmits<{
  (e: 'submit', data: UserCreate): void
}>()

const form = ref<UserCreate>({
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  ...(props.initialData || {})
})

const errors = ref<Record<string, string>>({})

const validate = async () => {
  try {
    await userSchema.validate(form.value, { abortEarly: false })
    errors.value = {}
    return true
  } catch (err: any) {
    const errObj: Record<string, string> = {}
    err.inner.forEach((e: any) => {
      errObj[e.path] = e.message
    })
    errors.value = errObj
    return false
  }
}

const formatPhone = (v: string) => {
  const digits = v.replace(/\D/g, '')
  if (digits.length <= 11) {
    return digits.replace(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/, '+7-$2-$3-$4-$5').slice(0, 18)
  }
  return v.slice(0, 18)
}

const submit = async () => {
  if (await validate()) emit('submit', form.value)
}
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-text-field v-model="form.fullName" label="ФИО" :error-messages="errors.fullName" required />
    <v-text-field v-model="form.email" label="Email" type="email" :error-messages="errors.email" required />
    <v-text-field v-model="form.phone" @input="form.phone = formatPhone($event.target.value)" label="Телефон"
      placeholder="+7-999-123-45-67" :error-messages="errors.phone" required />
    <v-text-field v-model="form.dateOfBirth" label="Дата рождения" type="date" :error-messages="errors.dateOfBirth"
      required />

    <div class="flex gap-2 mt-4">
      <v-btn type="submit" color="primary">Сохранить</v-btn>
      <v-btn @click="$router.back()" variant="outlined">Отмена</v-btn>
    </div>
  </v-form>
</template>