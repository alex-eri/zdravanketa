
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
            nextdelay: null,
            console: console,
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


            if (event.key == "Enter" ) {
                this.next()
                return
            }




        },


        async next() {


                if (this.Период && this.ОрганизацияId) {
                        this.Анкета = await $fetch(`/api/forms`, {
                            method: 'POST',
                            body: { ОрганизацияId: this.ОрганизацияId, Период: this.Период },
                        })
                        this.$router.push(`/add/${this.$route.params.form}/${this.Анкета.id}`)
                }
    
        },
        async previous() {
        },
        keyup(event: Event) {
        }
    }

}
</script>

<template>
    <v-form @submit.prevent="next">
        <v-card flat rounded="false">
            <v-app-bar flat dark color="primary" class="d-print-none">
                <v-toolbar-items>
                    <v-btn icon="mdi-home" to="/"></v-btn>
                    <v-btn icon="mdi-skip-previous" @click="previous" :disabled="(step < 0)"></v-btn>
                    <v-btn icon="mdi-skip-next" @click="next" :disabled="(step >= Форма.Вопросы.length) || (step == -2)"></v-btn>
                    <v-btn icon="mdi-upload" @click="save" :disabled="step != -2"></v-btn>
                </v-toolbar-items>

            </v-app-bar>

            <v-card-item v-if="step == -2">
                <v-list>
                    <v-list-item v-for="(Ответ,ВопросId) of Ответы">
                      
                    <p v-if="Форма.Вопросы[ВопросId]">
                    {{ Форма.Вопросы[ВопросId].Вопрос }}: <span v-if="Ответ.value" class="font-weight-bold"> {{ Форма.Вопросы[ВопросId].Варианты[Ответ.value] }} </span>
                     <span v-else class="text-warning">Нет ответа</span> 
                    </p>
                </v-list-item>
                </v-list>

                <v-alert color="success" v-if="saved">Сохраненно!</v-alert>
                <v-card-actions v-else>
                    <v-btn variant="elevated" color="primary"  @click="save" append-icon="mdi-upload">Сохранить</v-btn>
                    <v-btn variant="outlined" @click="step=0">Перепроверить</v-btn>
                </v-card-actions>
                
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
                    <!-- <v-col cols="12" sm="6" md="3">
                        <v-text-field variant="outlined" type="number" label="Номер бланка"
                            v-model="Номер">
                        </v-text-field>
                    </v-col> -->
                </v-row>
                <v-card-actions>
                        <v-btn variant="elevated" color="primary"  append-icon="mdi-skip-next" @click="next">Приступить к заполнению</v-btn>
                    </v-card-actions>
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
