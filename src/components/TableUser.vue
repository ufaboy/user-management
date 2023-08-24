<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user'
import IconTrash from './IconTrash.vue'
import IconPencil from './IconPencil.vue'
import {getImageUrl} from '../utils/helper'
const props = defineProps<{
    lastnameShow: boolean
}>()

const emit = defineEmits<{
  (e: 'start-edit', id: number): void
}>()

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
</script>

<template>
        <table class="table-auto w-full text-sm text-center">
      <thead class="text-xs text-gray-700 uppercase  bg-gray-50 ">
        <th class="px-6 py-3">ID</th>
        <th class="px-6 py-3">Name</th>
        <th v-if="lastnameShow" class="px-6 py-3">Lastname</th>
        <th class="px-6 py-3">Phone</th>
        <th class="px-6 py-3">Avatar</th>
        <th class="px-6 py-3">Role</th>
        <th class="px-6 py-3" colspan="2">Action</th>
        <th class="px-6 py-3"></th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" class="bg-white border-b">
          <td class="text-center">{{ item.id }}</td>
          <td class="text-center">{{ item.name }}</td>
          <td v-if="lastnameShow" class="text-center">{{ item.lastname }}</td>
          <td class="text-center">{{ item.phone }}</td>
          <td class="text-center">
            <img v-if="item.avatar" :src="getImageUrl(item.avatar)" alt="" width="20" height="20" class="mx-auto">
          </td>
          <td class="text-center">{{ item.role }}</td>
          <td class="text-center w-10">
            <button @click="$emit('start-edit', index)">
              <IconPencil />
            </button>
          </td>
          <td class="text-center w-10">
            <button>
              <IconTrash @click="userStore.removeUser(index)" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</template>