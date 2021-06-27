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
         <Pagination :articles-count="articlesCount" @change-page="changePagination"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppBanner from '@/components/AppBanner';
import Pagination from '@/components/pagination/Pagination';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'App',
  components: {
    AppBanner,
    Pagination
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
    await this.loadArticles(1);
    this.state = 'LOADED';
  },
  methods: {
    toPrettyDate(date) {
      moment.locale(this.$i18n.locale);
      return moment(date).format('MMMM Do, YYYY');
    },
    clickPost(slug) {
      this.$router.push({ path: `/post/${slug}` });
    },
    async changePagination(page) {
      this.activePage = page;
      await this.loadArticles(page);
    },
    async loadArticles(numPage) {
      const articles = await axios.get('/articles', { params: { limit: 10, offset: (numPage-1) * 10 } });
      this.articles = articles.data.articles;
      this.articlesCount = articles.data.articlesCount;
    }
  }
};
</script>
