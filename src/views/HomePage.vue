<template>
  <ion-card class="task-card">
    <div class="card-body">
      <div class="task-body">
        <div class="task" v-for="task in tasks" :key="task.id">
          <span class="title">{{ task.title }}</span>
        </div>
      </div>
    </div>
  </ion-card>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import store from '@/store';
import axios from 'axios';

const currentDate = ref('');
const tasks = ref([]);
const user = ref(null);

const fetchTasks = async () => {
  try {
    const fetchedUser = store.getters['auth/user'];
    user.value = JSON.parse(fetchedUser);

    const res = await axios.get('http://127.0.0.1:8000/api/get-tasks');
    tasks.value = res.data;
    console.log(tasks.value);
  } catch (e) {
    console.error(e);
  }
};

onMounted(fetchTasks);
</script>




<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
