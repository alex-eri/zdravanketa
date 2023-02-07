<script lang="ts" setup>

const route = useRoute();
//const ФормаId = "Социокультурное-управление"
const ФормаId = route.params.formid;
const h = useHandlers(ФормаId)
const Форма = h.json
const baseuri = Форма.uri
const outforms = Форма.Отчеты
</script>

<script lang="ts">

export default {
  data() {
    return {
      current: "",
      menu: true,
      Период: ref()
    }
  },
  computed: {
    pagekey () {
      console.log(this.$route.params.id)
      console.log(this.Период + this.$route.params.id)
      return this.Период + '/' + this.$route.params.id
    }
  }
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
        <v-text-field  single-line  hide-details autofocus
 variant="solo" density="compact" :type="Форма.Периодичность" r-label="Период анкетирования" v-model="Период">
          </v-text-field>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-toolbar-items>

          <v-btn :disabled="!$route.params.id" class="print-doc" href="javascript:(print());"> Распечатать</v-btn>
        </v-toolbar-items>

      </v-app-bar>

      <v-navigation-drawer class="d-print-none" v-model="menu"> <!-- TODO to components-->
        <v-list lines="one">
          <v-list-subheader>Выходные формы:</v-list-subheader>

          <v-list-item :disabled="!Период" v-for="item in outforms" :key="item.id" :to="encodeURI(`/${baseuri}/out${item.id}`)"
            @click="current = item.id" rem--active="current==item.id">
            <v-list-item-title class="text-wrap">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <NuxtPage :period="Период" :page-key="pagekey"/>
    </NuxtLayout>

  </div>
</template>


