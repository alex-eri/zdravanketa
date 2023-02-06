
<script lang="ts">
export default {
    data() {

        return {
            step: -1,
            Период: null,
            ОрганизацияId: null,
            Анкета: { id: 'new' },
            ВопросId: null,
            Ответ: null,
            keylistener: null,
        }
    },

    async setup() {
        const route = useRoute();
        const formid = route.params.form;
        const Форма = (await import(`~~/pages/${formid}/form.json`)).default
        const Организации = await $fetch('/api/orgs') as Array<Организация>

        var Ответы = {}

        for (const Вопрос of (Форма.Вопросы as Array<Вопрос>)) {
            Ответы[Вопрос.id] = ref(null);
        }

        return {
            Форма, Организации, Ответы
        }
    },

    mounted() {
        addEventListener('keypress', this.keypress);
    },

    unmounted() {
        removeEventListener('keypress', this.keypress)
    },

    methods: {
        keypress(event) {
            console.log(event.key)
            if (this.step >= 0 && event.key in this.Форма.Вопросы[this.step].Варианты) {
                this.Ответы[this.ВопросId].value = event.key;
                // this.Ответы
            }
            if (event.key == "Enter" && this.Ответы[this.ВопросId].value != null)
                this.next()
        },


        async save() {

        },

        async next() {

            if (this)

                if (this.Период && this.ОрганизацияId) {
                    if (this.step < 0) {
                        this.Анкета = await $fetch(`/api/forms/${this.Анкета.id}`, {
                            method: 'POST',
                            body: { ОрганизацияId: this.ОрганизацияId, Период: this.Период },
                        })
                        const СохраненныеОтветы = {}
                    }

                    this.step += 1
                    this.ВопросId = this.Форма.Вопросы[this.step].id
                }
        },
        async previous() {
            this.step -= 1
            this.ВопросId = this.Форма.Вопросы[this.step].id

        },
        keyup(event: Event) {
            console.log(event)
        }
    }

}
</script>

<template>
    <v-form @submit.prevent="next">
        <v-card flat>
            <v-toolbar>
                <v-toolbar-items>
                    <v-btn icon=mdi-home to="/"></v-btn>
                    <v-btn icon="mdi-skip-previous" @click="previous" :disabled="step < 0"></v-btn>
                    <v-btn icon="mdi-skip-next" @click="next" :disabled="step >= Форма.Вопросы.length - 1"></v-btn>
                    <v-btn icon="mdi-upload" @click="save" :disabled="step < Форма.Вопросы.length"></v-btn>
                </v-toolbar-items>

            </v-toolbar>

            <v-card-item v-if="step < 0">
                <v-row class="mt-1">
                    <v-col>
                        <v-autocomplete :items="Организации" item-title="Наименование" item-value="id"
                            variant="outlined" :filter-keys='["ИНН", "ОГРН", "Наименование", "ПолноеНаименование"]'
                            label="Организация" v-model="ОрганизацияId"></v-autocomplete>
                    </v-col>
                    <v-col>
                        <v-text-field variant="outlined" :type="Форма.Периодичность" label="Период анкетирования"
                            v-model="Период">
                        </v-text-field>
                    </v-col>

                </v-row>
            </v-card-item>

            <v-card-item v-if="step >= 0 && step < Форма.Вопросы.length">
                <v-card-text>
                    <h2>{{ Форма.Вопросы[step].Вопрос }}</h2>
                </v-card-text>
                <v-radio-group v-model="Ответы[ВопросId].value">

                    <v-radio v-for="(описание, значение) of Форма.Вопросы[step].Варианты"
                        :label="`${значение} — ${описание}`" :value="значение"></v-radio>
                </v-radio-group>
            </v-card-item>

        </v-card>
    </v-form>
</template>
