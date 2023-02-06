
<script lang="ts">
export default {
    data() {
        return {
        }
    },
    async setup() {
        const route = useRoute();
        const id = ref(route.params.id);
        const form = (await import(`./form.json`)).default
        return {
            form,
            id
        }
    },
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <h2>
                    {{ form.Отчеты.filter((v) => (v.id == id))[0].title }}
                </h2>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
@media print {

}
</style>