<script lang="ts" setup>
const bases = [{
    uri: encodeURI('Социокультурное-управление'),
    title: "База данных формирования регистра сведений о подготовленности и реализации технологий социокультурного управления в здравоохранении"
}] 
</script>

<template>
    <v-card flat>
      <v-app-bar flat dark color="primary" class="d-print-none">
      <v-toolbar-items>
      <v-btn icon=mdi-home to="/"></v-btn>
        <v-btn :to="encodeURI('/catalogs/Организации')">Организации</v-btn>
      </v-toolbar-items>
      
    </v-app-bar>
    
        <v-list lines="one">
            <v-list-subheader> Анкеты </v-list-subheader>
            <v-list-item v-for="item in bases" :key="item.uri" :title="item.title" :to="item.uri"></v-list-item>
        </v-list>
    </v-card>
</template>

<style scoped>

</style>
