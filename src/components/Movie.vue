<template>
    <v-card class="pa-2 ma-2" outlined tile>
        <v-card>
            <v-img 
            :src="'http://image.tmdb.org/t/p/w200' + poster" 
            class="my-3 grey lighten-2" 
            contain max-height="450" 
            min-height="450" 
            info:title/>
        </v-card>
        <v-card class="pa-2 ma-2 grey lighten-2" outlined tile max-height="200">
            <v-row no-gutters>
                <v-col cols="12">
                    <v-card class="pa-2" outlined tile>
                        {{title}}
                    </v-card>
                </v-col>
            </v-row>
            <v-card>
                    <v-row no-gutters>
                        <v-col cols="4">
                            <v-card class="pa-2" outlined tile>
                                {{overview}}
                            </v-card>
                        </v-col>
                        <v-col cols="8">
                            <v-card class="pa-2" outlined tile>
                                Released in:<br>{{year}}
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card>
        </v-card>
    </v-card>
</template>

<script>
export default {
    props: {
        poster: {
            type: String,
            require: true,
        },
        title: {
            type: String,
            required: true
        },
        overview: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        voteAverage: {
            type: Number,
            required: false
        },
        id: {
            type: Number,
            required: true
        },
    }
}
</script>

<style>

</style>