

<script lang="ts">



export default {
  data() {

    const организация: Организация = {
      Наименование: null,
      ПолноеНаименование: null,
      id: "new",
      ИНН: null,
      КПП: null,
      ОГРН: null,
      КодРегиона: null,
    }

    return {
      dialog: false,
      valid: false,
      организация
    }
  },

  async setup() {
    const организации: Array<Организация> = shallowReactive(await $fetch('/api/orgs'));
    const Регионы = (await import("./Регионы.json")).default
    return { организации, Регионы }
  },

  methods: {

    async reload() {
      Object.assign(this.организации, await $fetch('/api/orgs'));
    },

    async close() { this.reload(); this.dialog = false; },
    async add() {
      this.организация = {
        Наименование: null,
        ПолноеНаименование: null,
        id: 'new',
        ИНН: null,
        КПП: null,
        ОГРН: null,
        КодРегиона: "37",
      };
      this.dialog = true;
    },
    async edit(id: string) {
      this.организация = await $fetch(`/api/orgs/${id}`);
      if (this.организация.id)
        this.dialog = true;
    },
    async save(id: string | null) {
      this.организация = await $fetch(`/api/orgs/${id}`, {
        method: 'POST',
        body: this.организация,
      })
    }
  },
}
</script>

<template>
  <v-card flat>
    <v-toolbar>
      <v-toolbar-items>
        <v-btn icon=mdi-home to="/"></v-btn>

        <v-btn @click="add">Добавить</v-btn>
        <v-btn icon="mdi-reload" @click="reload"></v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Наименование
          </th>
          <th class="text-left">
            ИНН
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in организации" :key="item.id" :to="item.id">
          <td @click="edit(item.id)">{{ item.Наименование }}</td>
          <td>{{ item.ИНН }} {{ item.КПП }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="dialog">
      <v-form v-model="valid">
        <v-card>
          <v-toolbar>
            <v-toolbar-items>
              <v-btn color="primary" @click="save(организация.id)">Сохранить</v-btn>
              <v-btn color="" @click="close">Закрыть</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-item>
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-autocomplete clearable variant="outlined" label="Регион" :items="Регионы" item-value="Код"
                    item-title="Наименование" :filter-keys='["title","value"]'
                    v-model="организация.КодРегиона"
                    ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field label="Наименование" v-model="организация.Наименование"
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field label="Полное Наименование" v-model="организация.ПолноеНаименование"
                    variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field label="ИНН" v-model="организация.ИНН" variant="outlined"></v-text-field>

                </v-col>
                <v-col>
                  <v-text-field label="КПП" v-model="организация.КПП" variant="outlined"></v-text-field>

                </v-col>
                <v-col>
                  <v-text-field label="ОГРН" v-model="организация.ОГРН" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-item>

        </v-card>
      </v-form>
    </v-dialog>
  </v-card>
</template>

<style scoped>

</style>
