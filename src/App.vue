<template>
  <header>
    <h1>퉁이리의 Movie</h1>
    <div>
      <input
        v-model="searchValue"
        placeholder="영화 제목"
        pattern="[A-Za-z]+"
      />
      <button @click="handleClick(searchValue)">검색</button>
    </div>
  </header>
  <li
    v-for="value in searchResult"
    :key="value.imdbID"
    @click="openMovieDetail(value.imdbID)"
  >
    <img
      :src="value.Poster"
      :alt="value.Title"
      v-if="value.Poster !== 'N/A'"
      width="150"
      height="150"
    />
    <div width="150" height="150" v-else>이미지 없어요</div>
    <div>{{ value.Title }}</div>
    <div v-if="value.imdbID in movieDetail">
      {{ movieDetail[value.imdbID] }}
    </div>
  </li>
</template>

<script>
import { search } from './utils/search.js';
import { searchDetail } from './utils/searchDetail.js';

export default {
  data() {
    return {
      searchValue: '',
      searchResult: {},
      movieDetail: {},
    };
  },
  methods: {
    openMovieDetail(id) {
      searchDetail(id).then((data) => {
        this.movieDetail[id] = data.Plot;
        this.$forceUpdate();
      });
    },
    handleClick(searchValue) {
      const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      if (!searchValue.trim().length) return alert('영화 제목을 입력해 주세요');

      if (regex.test(searchValue)) {
        this.searchValue = '';
        return alert('영어로 검색해 주세요');
      }

      search(searchValue).then((data) => (this.searchResult = data.Search));
    },
  },
};
</script>

<style scoped></style>
