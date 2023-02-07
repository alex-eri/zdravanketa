
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
                <v-table>
                    <thead v-html="outdata.thead" border="1">

                    </thead>
                    <tbody>

                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
@media print {}
</style>