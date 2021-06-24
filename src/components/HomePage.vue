<template>
  <div class="home-page">
    <AppBanner/>

    <div class="container page">
      <div class="row">

        <div class="col-md-12">
          <div v-if="state === 'LOADING'" data-testid="feed-loading">
            {{ $t('feed.loading') }}
          </div>
          <div class="post-preview" data-testid="feed-post" v-for="article in articles" :key="article.slug">
            <div class="post-meta">
              <a href="profile.html"><img data-testid="author-image" :src="article.author.image"/></a>
              <div class="info">
                <a href="profile.html" class="author" data-testid="author-username">{{ article.author.username }}</a>
                <span class="date" data-testid="post-date">{{ toPrettyDate(article.createdAt) }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" data-testid="post-favorites">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <a class="preview-link" data-testid="post-link" @click="clickPost(article.slug)">
              <h1 data-testid="post-title">
                <i v-if="article.favoritesCount >= 30" title="More than 30 likes!" class="text-primary ion-star mx-1"
                   data-testid="post-star"></i>
                {{ article.title }}
              </h1>
              <p data-testid="post-description">{{ article.description }}</p>
              <span data-testid="post-readmore">{{ $t('feed.post.read-more') }}</span>
            </a>
          </div>
          <nav aria-label="Page navigation example" data-testid="feed-pagination" v-if="articlesCount > 10">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#">Previous</a></li>
              <li :class="paginationClassesFor(page)" data-testid="page-number" v-for="page in pages" :key="`numpage-${page}`">
                <a class="page-link" @click="selectPagination(page)">{{ page }}</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppBanner from '@/components/AppBanner';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'App',
  components: {
    AppBanner,
  },
  computed: {
    numPages() { return Math.floor((this.articlesCount-1) / 10) + 1; },
    pages() { return [...Array(this.numPages).keys()].map((_, idx) => idx + 1); },
  },
  data() {
    return {
      state: 'LOADING',
      articles: [],
      articlesCount: 0,
      activePage : 1
    };
  },
  async mounted() {
    const articles = await axios.get('/articles', { params: { limit: 10 } });
    this.articles = articles.data.articles;
    this.articlesCount = articles.data.articlesCount;
    this.state = 'LOADED';
  },
  methods: {
    paginationClassesFor(page) {
      return {
        'page-item': true,
        'page-link': true,
        'active': page === this.activePage
      };
    },
    toPrettyDate(date) {
      moment.locale(this.$i18n.locale);
      return moment(date).format('MMMM Do, YYYY');
    },
    clickPost(slug) {
      this.$router.push({ path: `/post/${slug}` });
    },
    selectPagination(page) {
      this.activePage = page;
    }
  }
};
</script>
