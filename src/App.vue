<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from './store/user'
import { getImageUrl } from './utils/helper'

import { Role, type User } from './interfaces/user-types';
import TableUser from './components/TableUser.vue'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const user = ref<User>()
const lastnameShow = ref(true)
const userDialog = ref<InstanceType<typeof HTMLDialogElement>>();

function startCreateUser() {
  user.value = {
    name: undefined,
    lastname: undefined,
    avatar: undefined,
    role: Role.employer,
    phone: undefined
  }
  userDialog.value?.showModal()
}
function startEditUser(index: number) {
  user.value = {...users.value[index]}
  userDialog.value?.showModal()
}
function addUser() {
  if (user.value) {
    userStore.addUser(user.value)
    closeDialog()
  }
}
function fileUploadHandler(event: Event) {
  const fileList = (event.target as HTMLInputElement).files
  if (fileList && user.value && fileList[0]) {
    user.value.avatar = fileList[0]
  }
  console.log('fileUploadHandler', fileList);
}
function confirmDialog() {
  if (user.value && user.value.id) {
    userStore.updateUser(user.value)
  } else {
    addUser()
  }
  closeDialog()
}
function closeDialog() {
  userDialog.value?.close()
}
</script>

<template>
  <div class="container p-10">
    <div class="flex items-center mb-4">
      <button class="btn mr-5 mb-0" @click="startCreateUser">Add user</button>
      <label for="lastname-show" class="label mr-1 cursor-pointer mb-0">Show lastname</label>
      <input id="lastname-show" type="checkbox" class="w-4 h-4" v-model="lastnameShow">
    </div>
    <TableUser :lastnameShow="lastnameShow" @start-edit="startEditUser" />
    <dialog ref="userDialog">
      <form v-if="user" method="dialog" @submit.prevent="confirmDialog" class="flex flex-row flex-wrap justify-around gap-2 p-4 max-w-xs">
        <label for="avatar"
          class="w-40 h-40 rounded-full border border-3 flex items-center justify-center cursor-pointer relative">
          <input type="file" id="avatar" @input="fileUploadHandler" class="" hidden>
          <span class="m-auto bg-white rounded-md text-lg p-1">Upload Avatar</span>
          <img v-if="user.avatar" :src="getImageUrl(user.avatar)" alt="avatar"
            class="absolute top-0 left-0 -z-10 w-full h-full object-cover rounded-full">
        </label>
        <label for="name" class="label w-full">Name</label>
        <input type="text" id="name" class="input w-full" required v-model="user.name">
        <label for="lastname" class="label w-full">Lastname</label>
        <input type="text" id="lastname" class="input w-full" required v-model="user.lastname">
        <label for="lastname" class="label w-full">Role</label>
        <select name="" id="role" class="select w-full" :disabled="!!user.id" v-model="user.role">
          <option v-for="item in Role">{{ item }}</option>
        </select>
        <template v-if="user && user.role === Role.employer">
          <label for="lastname" class="label w-full">Phone</label>
          <input type="tel" class="input mb-5" v-model="user.phone">
        </template>
        <button type="button" class="w-1/3 btn-light" @click="closeDialog">Close</button>
        <button type="submit" class="w-1/3 btn-green">{{ user.id ? 'Save' : 'Create' }}</button>
      </form>
    </dialog>
  </div>
</template>