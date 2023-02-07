
<script lang="ts">
export default {
    data() {
        return {

        }
    },
    async setup() {
        const route = useRoute();
        const id = ref(route.params.id);
        const $attrs = useAttrs()
        const ФормаId = route.params.formid;
        const h = useHandlers(ФормаId)
        const Форма = h.json
        console.log($attrs.period)

        const outdata = (await $fetch(encodeURI(`/api/out/${Форма.id}/${id.value}?period=${$attrs.period}`)))

        const Отчет = Форма.Отчеты.filter((v) => (v.id == id.value))[0]
        return {
            id, Форма, outdata, Отчет
        }
    },
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <h2 class="d-print-none">
                    {{ Отчет.title }} <span v-if="$attrs.period">за {{ $attrs.period }}</span>
                </h2>
                <span v-if="!$attrs.period">Укажите период отчета</span>

                <h3 v-html="outdata.subtitle" v-if="$attrs.period">
                </h3>
            </v-col>
        </v-row>
        <v-row v-if="$attrs.period">
            <v-col>
                <v-table class="elevation-1" id="data">
                    <thead v-html="outdata.thead">
                    </thead>
                    <tbody>
                        <tr v-for="row of outdata.data">
                            <td v-for="col of row" :class="typeof(col) =='number'? 'text-right': ''">{{ col }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<style >
@media print {
    main.v-main {
        padding-left: 0px !important;

    }
    .v-container {
    width: 100%;
    padding: 16px;
    margin-right: 0;
    margin-left: 0;
}


table,tr,td,th {
  border: 1px solid !important;
  border-collapse: collapse;
}
}
</style>

<style scoped>

</style>