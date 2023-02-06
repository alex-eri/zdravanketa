<template>
    <v-container>
        <v-row>
            <v-col>
                <v-btn color="primary" block :to="encodeURI(`/add/${baseuri}`)">Внести данные</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
const form = (await import(`./form.json`)).default
const baseuri = form.uri
</script>