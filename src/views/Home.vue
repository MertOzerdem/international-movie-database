<template>
    <v-container class="grey lighten-2">
        <SearchBar @keywordEntered="searchMovies"/>
        <v-row no-gutters>
            <v-col
            v-for="movie in movies"
            :key="movie.imdbID"
            cols="12"
            sm="3">
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
// import axios from "axios";

export default {
    components: {
        Movie,
        SearchBar
    },
    data () {
        return {
            movies: [],
        }
    },
    methods: {
        searchMovies (keyword) {
            fetch('https://api.themoviedb.org/3/search/movie?api_key=c8468f73459078aba49ec924c8ffcf81&page=1&include_adult=false&year=2020&query=' + keyword, {
                method: 'get'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.movies = jsonData.results;
            });

            // axios.get('http://www.omdbapi.com/?s=' + keyword + '&apikey=83e1fc9&y=2020&r=json')
            // .then(response => {
            //     this.movies = response.data.Search;
            //     console.log(this.movies)
            // })
            // .catch(error => {
            //     console.error('There is an error occured with movies: ', error);
            // })
            // .finally(() => {
            // });
        }
    },
    mounted () {
        // axios.get('http://www.omdbapi.com/?s=dawn&apikey=83e1fc9&y=2020&r=json')
        //     .then(response => {
        //         this.movies = response.data.Search;
        //         console.log(this.movies)
        //     })
        //     .catch(error => {
        //         console.error('There is an error occured with movies: ', error);
        //     })
        //     .finally(() => {
        //     });
    }
}
</script>

<style>
</style>