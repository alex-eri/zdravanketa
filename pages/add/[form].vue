
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
            saved: false,
            nextdelay: null
        }
    },

    async setup() {
        const route = useRoute();
        const ФормаId = route.params.form as string;
        const h = useHandlers(ФормаId)
        const Форма = h.json
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
                return
            }

            if (event.key == "Enter" && this.step == -1) {
                this.next()
                this.saved = false
                return
            }
            if (event.key == "Enter" && this.step == -2) {
                if (this.saved) {
                    this.ОрганизацияId = null
                    this.Период = null
                    this.step = -1
                }
                else
                    this.save()
                return
            }

            if (event.key == "Enter" && !this.nextdelay && this.Ответы[this.ВопросId].value) {
                const self = this
                this.nextdelay = setTimeout(()=>{
                    self.next()
                    this.nextdelay=null
                }, 100)
                return
            }


        },


        async save() {
            this.saved = await $fetch(`/api/forms/${this.Анкета.id}`, {
                method: 'POST',
                body: Array.from(Object.entries(this.Ответы), ([k, v]) => ({ Вопрос: k, Значение: v.value }))
            })
        },

        async next() {

            if (this.step < this.Форма.Вопросы.length - 1) {

                if (this.Период && this.ОрганизацияId) {
                    if (this.step < 0) {
                        this.Анкета = await $fetch(`/api/forms`, {
                            method: 'POST',
                            body: { ОрганизацияId: this.ОрганизацияId, Период: this.Период },
                        })
                        const СохраненныеОтветы = await $fetch(`/api/forms/${this.Анкета.id}`)
                        for (const Вопрос of (this.Форма.Вопросы as Array<Вопрос>)) {
                            this.Ответы[Вопрос.id].value = null
                        }

                        for (const Ответ of СохраненныеОтветы) {
                            this.Ответы[Ответ.Вопрос].value = Ответ.Значение
                        }

                    }

                    this.step += 1
                    this.ВопросId = this.Форма.Вопросы[this.step].id
                }
            } else {
                this.step = -2
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
        <v-card flat rounded="false">
            <v-app-bar flat dark color="primary" class="d-print-none">
                <v-toolbar-items>
                    <v-btn icon=mdi-home to="/"></v-btn>
                    <v-btn icon="mdi-skip-previous" @click="previous" :disabled="step < 0"></v-btn>
                    <v-btn icon="mdi-skip-next" @click="next" :disabled="step >= Форма.Вопросы.length"></v-btn>
                    <v-btn icon="mdi-upload" @click="save" :disabled="step != -2"></v-btn>
                </v-toolbar-items>

            </v-app-bar>
            <v-card-item v-if="step == -2">

                <v-alert color="success" v-if="saved">Сохраненно!</v-alert>
                <v-card-actions v-else><v-btn @click="save">Сохранить</v-btn></v-card-actions>
            </v-card-item>


            <v-card-item v-if="step == -1">
                <v-row class="mt-1">
                    <v-col cols="12" sm="6" md="9">
                        <v-autocomplete :items="Организации" item-title="Наименование" item-value="id"
                            variant="outlined" :filter-keys='["ИНН", "ОГРН", "Наименование", "ПолноеНаименование"]'
                            label="Организация" v-model="ОрганизацияId"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">

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
