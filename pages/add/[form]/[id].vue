<script lang="ts">
export default {
    data() {

        return {
            step: 0,
            ВопросId: this.Форма.Вопросы[0].id,
            Ответ: null,
            keylistener: null,
            saved: false,
            nextdelay: null,
            console: console,
            Номер:0
        }
    },

    async setup() {
        const route = useRoute();
        const ФормаId = route.params.form as string;
        const h = useHandlers(ФормаId)
        const Форма = h.json
        var Ответы = {}

        for (const Вопрос of (Форма.Вопросы as Array<Вопрос>)) {
            Ответы[Вопрос.id] = ref(null);
        }

        var Анкета= { id: route.params.id }

        const СохраненныеОтветы = await $fetch(`/api/forms/${Анкета.id}`) as Array<object>
        for (const Ответ of СохраненныеОтветы) {
            console.log(Ответ.Вопрос, Ответ.Значение)
            Ответы[Ответ.Вопрос].value = Ответ.Значение
        }
        return {
            Форма, Ответы, Анкета
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
                    this.$router.push(`/add/${this.$route.params.form}`)
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
                    this.step += 1
                    this.ВопросId = this.Форма.Вопросы[this.step].id
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
                    <v-btn icon="mdi-home" to="/"></v-btn>
                    <v-btn icon="mdi-skip-previous" @click="previous" :disabled="(step <= 0)"></v-btn>
                    <v-btn icon="mdi-skip-next" @click="next" :disabled="(step >= Форма.Вопросы.length) || (step == -2)"></v-btn>
                    <v-btn icon="mdi-upload" @click="save" :disabled="step != -2"></v-btn>
                </v-toolbar-items>

            </v-app-bar>

            <v-card-item v-if="step == -2">
                <v-list>
                    <v-list-item v-for="(Ответ,ВопросId) of Ответы">
                      
                    <p v-if="Форма.Вопросы[ВопросId]">
                    {{ Форма.Вопросы[ВопросId].Вопрос }}:
                     <span v-if="Ответ.value" class="font-weight-bold"> {{ Форма.Вопросы[ВопросId].Варианты[Ответ.value] }} </span>
                     <span v-else class="text-warning">Нет ответа</span> 
                    </p>
                </v-list-item>
                </v-list>

                <v-alert color="success" v-if="saved">Сохраненно!</v-alert>
                <v-card-actions v-else>
                    <v-btn variant="elevated" color="primary"  @click="save" append-icon="mdi-upload">Сохранить</v-btn>
                    <v-btn variant="outlined" @click="step=0">Исправить</v-btn>
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
