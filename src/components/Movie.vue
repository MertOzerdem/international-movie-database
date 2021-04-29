<template>
    <v-card class="pa-2 ma-2" outlined tile style="min-height:650px;">
        <v-card>
            <v-img 
            :src="'http://image.tmdb.org/t/p/w200' + poster" 
            class="my-3 grey lighten-2" 
            contain
            height="350" />
        </v-card>
        <v-card class="pa-2 ma-2 grey lighten-2" outlined tile>
            <v-row no-gutters class="line-limiter line-count-2">
                <v-col cols="12">
                    <v-card class="pa-2" outlined tile>
                        <h4>{{title}}</h4>
                    </v-card>
                </v-col>
            </v-row>
            <v-row no-gutters class="line-limiter line-count-5">
                <v-col cols="12">
                    <v-tooltip bottom max-width="300" class="grey lighten-6">
                        <template v-slot:activator="{ on, attrs }">
                            <v-card class="pa-2" outlined tile v-bind="attrs" v-on="on">
                                {{overview}}
                            </v-card>
                        </template>
                        <span>{{overview}}</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-row no-gutters>
                    <v-col cols="8">
                        <v-card class="pa-2" outlined tile>
                            {{year}}
                        </v-card>
                    </v-col>
                    <v-col cols="4">
                        <v-card class="pa-2" outlined tile>
                            {{voteAverage}}
                        </v-card>
                    </v-col>
                </v-row>
            </v-row>
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
        }
    }
}
</script>

<style>
.line-limiter {
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
    line-height: 1.6em;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
}

.line-count-5 {
    max-height: 8.3em;
    -webkit-line-clamp: 5;
}

.line-count-2 {
    max-height: 3.5em;
    -webkit-line-clamp: 2;
}
</style>