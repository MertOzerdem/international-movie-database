<template>
    <v-container class="grey lighten-2">
        <SearchBar @keywordEntered="searchMovies"/>
        <v-row no-gutters>
            <v-col
            v-for="movie in movies"
            :key="movie.imdbID"
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

export default {
    components: {
        Movie,
        SearchBar
    },
    data () {
        return {
            movies: [],
            searchDB: {}
        }
    },
    methods: {
        searchMovies (movies) {
            this.movies = movies
        },
        indexMovieTitles (indexArray, searchList) {
            indexArray.forEach((index) => {
                searchList.addDoc({
                    'title': index.title,
                    'id': index.id
                });
            })
        }
    }
}
</script>

<style>
</style>