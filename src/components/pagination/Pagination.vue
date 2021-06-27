<template>
  <nav aria-label="Page navigation" data-testid="feed-pagination" v-if="numPages > 1">
    <ul class="pagination">
      <li class="page-item" v-if="ifPrevious" data-testid="pagination-previous"><a class="page-link" @click="selectPagination(activePage - 1)">Previous</a></li>
      <li :class="paginationClassesFor(page)" data-testid="page-number" v-for="page in pages" :key="`numpage-${page}`">
        <a class="page-link" @click="selectPagination(page)">{{ page }}</a>
      </li>
      <li class="page-item" v-if="ifNext" data-testid="pagination-next"><a class="page-link" @click="selectPagination(activePage + 1)">Next</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  emits: ['change-page'],
  computed: {
    numPages() { return Math.floor((this.articlesCount-1) / 10) + 1; },
    pages() { return [...Array(this.numPages).keys()].map((_, idx) => idx + 1); },
    ifPrevious() { return this.activePage > 1; },
    ifNext() { return this.activePage < this.numPages ; }
  },
  props: {
    articlesCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activePage : 1
    };
  },
  methods: {
    paginationClassesFor(page) {
      return {
        'page-item': true,
        'active': page === this.activePage
      };
    },
    async selectPagination(page) {
      this.activePage = page;
      this.$emit('change-page', page);
    }
  }
};
</script>
