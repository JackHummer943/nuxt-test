<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const search = ref('')
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref<{ key: string; order: 'asc' | 'desc' }[]>([])

watch(itemsPerPage, () => { page.value = 1 })

const headers = [
  { title: 'ФИО', key: 'fullName', sortable: true },
  { title: 'Дата рождения', key: 'dateOfBirth', sortable: true },
  { title: 'Email', key: 'email', sortable: false },
  { title: 'Телефон', key: 'phone', sortable: false },
  { title: 'Действия', key: 'actions', sortable: false }
]

const filteredUsers = computed(() => {
  let result = [...store.users]

  if (search.value) {
    const q = search.value.trim().toLowerCase()
    const qClean = q.replace(/[-\s]/g, '')
    result = result.filter(u => {
      const fullName = u.fullName.toLowerCase()
      const email = u.email.toLowerCase()
      const phone = u.phone.replace(/[-\s]/g, '')
      const dob = new Date(u.dateOfBirth).toLocaleDateString('ru-RU')
      return fullName.includes(q) || email.includes(q) || phone.includes(qClean) || dob.includes(q)
    })
  }

  const sort = sortBy.value[0]
  if (sort && sort.key !== 'email' && sort.key !== 'phone') {
    const { key, order } = sort
    result = result
      .slice()
      .sort((a, b) => {
        const aVal = a[key as keyof typeof a]
        const bVal = b[key as keyof typeof b]
        return order === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
      })
  }

  return result
})

const totalItems = computed(() => filteredUsers.value.length)

const paginatedUsers = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  const sliced = filteredUsers.value.slice(start, end)
  return sliced.length > 0 ? sliced : []
})

const updateOptions = (options: {
  page: number
  itemsPerPage: number
  sortBy: { key: string; order: 'asc' | 'desc' }[]
}) => {
  page.value = options.page;
  if (options.itemsPerPage > 0) {
    itemsPerPage.value = options.itemsPerPage
  }
  sortBy.value = options.sortBy || []

  const maxPage = Math.ceil(totalItems.value / itemsPerPage.value)
  if (page.value > maxPage && maxPage > 0) page.value = maxPage
};

const editUser = (id: string) => router.push(`/edit/${id}`)

const deleteDialog = ref(false)
const userToDelete = ref<string | null>(null)
const openDeleteDialog = (id: string) => {
  userToDelete.value = id
  deleteDialog.value = true
}

const confirmDelete = () => {
  if (userToDelete.value) {
    store.deleteUser(userToDelete.value)
    const maxPage = Math.ceil(totalItems.value / itemsPerPage.value)
    if (page.value > maxPage && maxPage > 0) page.value = maxPage
  }
  deleteDialog.value = false
  userToDelete.value = null
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Список пользователей</h1>
      <v-btn color="primary" @click="router.push('/create')">Добавить</v-btn>
    </div>

    <v-text-field v-model="search" label="Поиск" prepend-inner-icon="mdi-magnify" class="mb-6" variant="outlined"
      clearable />

    <v-data-table v-if="$vuetify.display.smAndUp" class="min-w-full divide-y divide-gray-300" :headers="headers"
      :items="paginatedUsers" :items-per-page="itemsPerPage" :page="page" :items-length="totalItems" show-current-page
      @update:options="updateOptions">
      <template #[`item.dateOfBirth`]="{ item }">
        {{ new Date(item.dateOfBirth).toLocaleDateString('ru-RU') }}
      </template>
      <template #[`item.actions`]="{ item }">
        <v-btn icon size="small" class="mr-2" @click="editUser(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon size="small" color="error" @click="openDeleteDialog(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <div v-else class="flex flex-col gap-6">
      <div v-for="user in paginatedUsers" :key="user.id"
        class="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="grid gap-4 text-sm">
            <div>
              <span class="font-medium text-muted-foreground">ФИО:</span>
              <span class="ml-2">{{ user.fullName }}</span>
            </div>
            <div>
              <span class="font-medium text-muted-foreground">Дата рождения:</span>
              <span class="ml-2">{{ new Date(user.dateOfBirth).toLocaleDateString('ru-RU') }}</span>
            </div>
            <div>
              <span class="font-medium text-muted-foreground">Email:</span>
              <span class="ml-2">{{ user.email }}</span>
            </div>
            <div>
              <span class="font-medium text-muted-foreground">Телефон:</span>
              <span class="ml-2">{{ user.phone }}</span>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <v-btn icon size="small" @click="editUser(user.id)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon size="small" color="error" @click="openDeleteDialog(user.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
      <div class="flex-wrap justify-center gap-4 mt-4 mb-6">
        <span class="text-sm text-gray-600 whitespace-nowrap">Показать:</span>
        <div>
          <v-btn v-for="option in [10, 25, 50, 100,{ text: 'Все', value: -1 }]"
            :key="typeof option === 'object' ? option.value : option" size="small"
            :color="itemsPerPage === (typeof option === 'object' ? option.value : option) ? 'primary' : 'default'"
            @click="itemsPerPage = typeof option === 'object' ? option.value : option" class="min-w-[40px]">
            {{ typeof option === 'object' ? option.text : option }}
          </v-btn>
        </div>
      </div>
    </div>
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Подтверждение удаления</v-card-title>
        <v-card-text class="flex flex-col gap-2">
          <div>Вы уверены, что хотите удалить этого пользователя?</div>
          <div class="font-bold">Это действие нельзя отменить.</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Отмена</v-btn>
          <v-btn color="error" variant="elevated" @click="confirmDelete">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>