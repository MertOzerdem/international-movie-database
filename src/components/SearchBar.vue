<template>
    <v-card 
    class="pa-4 ma-2" 
    flat>
        <v-img 
        :src="require('../assets/logo.svg')" 
        class="mr-2 float-left" 
        contain 
        height="45px"
        width="45px"/>
        <v-toolbar 
        dense
        @keyup.enter="fetchKeywordEntered">
            <v-text-field 
            hide-details 
            prepend-icon="mdi-magnify" 
            single-line 
            @input="setRecommendation"
            v-model="keyword"
            placeholder="Enter a movie title to search">
            </v-text-field>
            <v-btn
            class="ml-2"
            color="#AEDDFF"
            elevation="2"
            @click="fetchKeywordEntered">
            Search
            </v-btn>
        </v-toolbar>
        <v-card 
        v-if="keyword && !isKeywordEdited"
        class="d-flex justify-center mt-6"
        flat
        tile>
            <h1>Search results for: {{ keyword }}</h1>
        </v-card>
        <ul 
        class="suggestion-list pa-2 ma-4" 
        v-if="suggestedResults[0] && isKeywordEdited && highlightSuggestedKeywords()">
            <li 
            class="suggestion" 
            v-for="(suggestedResult, index) in suggestedResults" :key="index"
            @click="setKeyword(index)">
                <div class="suggestion-text" v-if="suggestedResults[index]">{{suggestedResults[index]}}</div>
            </li>
        </ul>
    </v-card>
</template>

<script>
import elasticlunr from 'elasticlunr'

export default {
    data () {
        return {
            keyword: '',
            isKeywordEdited: false,
            filterYear: '2020',
            movies: [],
            searchDB: {},
            suggestedResults: Array
        }
    },
    methods: {
        fetchKeywordEntered () {
            fetch('https://api.themoviedb.org/3/search/movie' + 
                '?api_key=c8468f73459078aba49ec924c8ffcf81&page=1&include_adult=false&year=2020&query=' + this.keyword, {
                method: 'get'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                this.movies = this.filterMoviesByYear(jsonData.results, this.filterYear);

                this.setMovieTitlesSearchList(this.movies, this.searchDB)

                this.$emit('keywordEntered', this.movies)
            }).catch(error => {
                console.error('error occured while fetch: ', error)
            });

            this.isKeywordEdited = false
        },
        setRecommendation () {
            this.isKeywordEdited = true
            this.suggestedResults = []

            let searchResults = this.searchDB.search(this.keyword) || []

            for(let searchIndex= 0; searchIndex < 6; searchIndex++){
                if(searchResults[searchIndex]) {
                    this.suggestedResults[searchIndex] = (this.searchDB.documentStore
                        .getDoc(searchResults[searchIndex].ref) || {}).title
                } else {
                    break
                }
            }
        },
        setMovieTitlesSearchList (indexArray, searchList) {
            indexArray.forEach((index) => {
                searchList.addDoc({
                    'title': index.title,
                    'id': index.id
                });
            })
        },
        setKeyword (index) {
            this.keyword = this.suggestedResults[index]
            this.isKeywordEdited = true

            this.fetchKeywordEntered()
        },
        highlightSuggestedKeywords () {
            setTimeout(() => {
                let elements = document.getElementsByClassName('suggestion-text');
                let regexp = new RegExp('(' + this.keyword.trim() + ')', 'gi');
                elements.forEach(element => {
                    element.innerHTML = element.innerText
                        .replace(regexp, '<span style="background-color: #F7F499;">$1</span>');
                })
            },10)
            
            return true;
        },
        filterMoviesByYear (movieList, filterYear) {
            const regex = new RegExp(filterYear, 'g')

            return movieList.filter(movie => ((movie || {}).release_date || '').match(regex))
        }
    },
    mounted: function () {
        this.searchDB = elasticlunr(function () {
            this.addField('title');
            this.setRef('id');
        });
    }
}
</script>

<style scoped>
.suggestion-list {
    list-style: none;
    padding: 0;
    border: 1px solid #ccc;
    border-top: 0;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
    background: rgba(255, 255, 255, 0.98);
    position: absolute;
    z-index: 20;
    left: 100px;
    right: 0;
    top: 50px;
}

.suggestion {
    padding: 0.5em 1em;
    border-bottom: 1px solid #eee;
    cursor: pointer;
}

.suggestion:hover {
    background: rgba(224, 224, 224, 0.98);
}

.highlight {
    background-color: #F7F499;
}
</style>
