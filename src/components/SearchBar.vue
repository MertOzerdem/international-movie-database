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
            v-model="data.keyword"
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
        v-if="data.keyword && !data.isKeywordEdited"
        class="d-flex justify-center mt-6"
        flat
        tile>
            <h1>Search results for: {{ data.keyword }}</h1>
        </v-card>
        <ul 
        class="suggestion-list pa-2 ma-4" 
        v-if="suggestedResults[0] && data.isKeywordEdited && highlightSuggestedKeywords()">
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
import { onMounted, ref, reactive } from '@vue/composition-api'

export default {
    setup (props, {emit}) {
        const data = reactive({
            filterYear: '2020',
            keyword: '',
            isKeywordEdited: false,
            movies: [],
            searchDB: {}
        })
        const suggestedResults = ref([])

        onMounted(() => {
            data.searchDB = elasticlunr(function () {
                this.addField('title');
                this.setRef('id');
            });
        })

        const fetchKeywordEntered = () => {
            fetch('https://api.themoviedb.org/3/search/movie' + 
                '?api_key=c8468f73459078aba49ec924c8ffcf81&page=1&include_adult=false&year=2020&query=' +
                data.keyword, {
                method: 'get'
            }).then((response) => {
                return response.json();
            }).then((jsonData) => {
                data.movies = filterMoviesByYear(jsonData.results, data.filterYear);

                setMovieTitlesSearchList(data.movies, data.searchDB)

                emit('keywordEntered', data.movies)
            }).catch(error => {
                console.error('error occured while fetch: ', error)
            });

            data.isKeywordEdited = false
        }

        const filterMoviesByYear = (movieList, filterYear) => {
            const regex = new RegExp(filterYear, 'g')

            return movieList.filter(movie => ((movie || {}).release_date || '').match(regex))
        }

        const setMovieTitlesSearchList = (indexArray, searchList) => {
            indexArray.forEach((index) => {
                searchList.addDoc({
                    'title': index.title,
                    'id': index.id
                });
            })
        }

        const highlightSuggestedKeywords = () => {
            setTimeout(() => {
                let elements = document.getElementsByClassName('suggestion-text');
                let regexp = new RegExp('(' + data.keyword.trim() + ')', 'gi');
                elements.forEach(element => {
                    element.innerHTML = element.innerText
                        .replace(regexp, '<span style="background-color: #F7F499;">$1</span>');
                })
            },10)
            
            return true;
        }

        const setKeyword = (index) => {
            data.keyword = suggestedResults.value[index]
            data.isKeywordEdited = true

            fetchKeywordEntered()
        }

        const setRecommendation = () => {
            data.isKeywordEdited = true
            suggestedResults.value = []

            let searchResults = data.searchDB.search(data.keyword) || []

            for(let searchIndex = 0; searchIndex < 6; searchIndex++){
                if(searchResults[searchIndex]) {
                    suggestedResults.value[searchIndex] = (data.searchDB.documentStore
                        .getDoc(searchResults[searchIndex].ref) || {}).title
                    console.log('index: ', suggestedResults.value[searchIndex])
                } else {
                    break
                }
            }
        }

        return {
            data,
            suggestedResults,
            fetchKeywordEntered,
            highlightSuggestedKeywords,
            setKeyword,
            setRecommendation
        }
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
