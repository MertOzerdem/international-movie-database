<template>
    <v-card class="pa-4 ma-2" flat>
        <v-img 
        :src="require('../assets/logo.svg')" 
        class="mr-2 float-left" 
        cols="2"
        contain 
        height="45px"
        width="45px"/>
        <v-toolbar 
        dense 
        @keyup.enter="targetKeywordEntered">
            <v-text-field 
            hide-details 
            prepend-icon="mdi-magnify" 
            single-line 
            @change="keyword = $event"
            placeholder="Enter a movie title to search">
            </v-text-field>
        </v-toolbar>
        <v-card v-if="keyword"
        class="d-flex justify-center mt-6"
        flat
        tile
        ><h1>Search results for: {{ keyword }}</h1></v-card>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            keyword: ''
        }
    },
    methods: {
        targetKeywordEntered () {
            this.$emit('keywordEntered', this.keyword)
        }
    }
}
</script>

<style>

</style>