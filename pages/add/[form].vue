
<script lang="ts">
export default {
    data() {
        return {
            step: -1,
        }
    },

    async setup() {
        const route = useRoute();
        const formid = route.params.form;
        const form = (await import(`~~/pages/${formid}/form.json`)).default
        return {
            form
        }
    },

    methods: {
        async next() { this.step += 1 },
        async previous() { this.step -= 1 },
        keyup(event:Event) {
            console.log(event)
        }
    }

}
</script>

<template>
    <v-form @keyup="keyup">
        <v-card flat>
            <v-toolbar>
                <v-toolbar-items>
                    <v-btn icon=mdi-home to="/"></v-btn>
                    <v-btn icon="mdi-skip-previous" @click="previous" v-if="step>0"></v-btn>
                    <v-btn icon="mdi-skip-next" @click="next" v-if="step+1< form.Вопросы.length"></v-btn>
                </v-toolbar-items>

            </v-toolbar>

            <v-card-item v-if="step >= 0">
                <v-card-text>
                    <h2>{{ form.Вопросы[step].Вопрос }}</h2>
                </v-card-text>
                <v-radio-group>
                    <v-radio v-for="(описание, значение) in form.Вопросы[step].Варианты"
                        :label="`${значение} — ${описание}`" :value="значение"
                        :accesskey="значение"
                        
                        ></v-radio>
                </v-radio-group>
            </v-card-item>

            <v-card-text>
                {{ form.Вопросы }}
            </v-card-text>
        </v-card>
    </v-form>
</template>
