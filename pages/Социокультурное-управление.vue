<script lang="ts" setup>
const route = useRoute();
const id = "Социокультурное-управление"
const form = (await import(`./${id}/form.json`)).default
const baseuri = form.uri
const outforms = form.Отчеты
</script>

<script lang="ts">

export default {
  data() {
    return {
      current: "",
      menu: true
    }
  },
}
</script>


<template>
  <div>
    <NuxtLayout>

      <v-app-bar flat dark color="primary" class="d-print-none"> <!-- TODO to components-->
        <v-toolbar-items>
          <v-btn icon=mdi-menu @click="menu = !menu"></v-btn>
          <v-btn icon=mdi-home to="/"></v-btn>
          <v-btn :to="encodeURI(`/add/${baseuri}`)">Внести данные</v-btn>
        </v-toolbar-items>

      </v-app-bar>

      <v-navigation-drawer class="d-print-none" v-model="menu"> <!-- TODO to components-->
        <v-list lines="one">
          <v-list-subheader>Выходные формы:</v-list-subheader>
          <v-list-item v-for="item in outforms" :key="item.id" :to="encodeURI(`/${baseuri}/out${item.id}`)"
            @click="current = item.id" rem--active="current==item.id">
            <v-list-item-title class="text-wrap">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>


