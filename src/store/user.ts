import { defineStore } from 'pinia';
import { ref } from 'vue';
import { User } from '../interfaces/user-types';

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);

  function addUser(newUser: User) {
    users.value.push({...newUser, id: users.value.length + 1});
  }
  function updateUser(user: User ) {
    const index = users.value.findIndex(item => item.id === user.id)
    if(Number.isInteger(index) && index >= 0 ) {
      users.value[index] = user
    }
  }
  function removeUser(index: number) {
    users.value?.splice(index, 1);
  }

  return { users, addUser, updateUser, removeUser };
});
