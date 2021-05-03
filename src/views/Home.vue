<template>
    <v-container class="grey lighten-2">
        <SearchBar @keywordEntered="setResultMovies"/>
        <v-row no-gutters>
            <v-col
            v-for="movie in movies"
            :key="movie.id"
            cols="12"
            xl="2"
            lg="3"
            md="4"
            sm="6">
                <Movie 
                :poster="movie.poster_path" 
                :title="movie.title" 
                :overview="movie.overview"
                :year="movie.release_date"
                :voteAverage="movie.vote_average"
                :id="movie.id">
                </Movie>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Movie from '@/components/Movie'
import SearchBar from '@/components/SearchBar'
import { ref } from '@vue/composition-api'

export default {
    components: {
        Movie,
        SearchBar
    },
    setup () {
        const movies = ref([])

        const setResultMovies = (searchedMovies) => {
            movies.value = searchedMovies
        }

        return { 
            movies,
            setResultMovies
        }
    }
}
</script>

<style>
</style>