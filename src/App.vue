<template>
  <div id="app">
    <TopHeader/>
    <div class="home-page">
      <AppBanner/>

      <div class="container page">
        <div class="row">

          <div class="col-md-12">
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
              <a href="post.html" class="preview-link">
                <h1 data-testid="post-title">
                  <i v-if="article.favoritesCount >= 30" title="More than 30 likes!" class="text-primary ion-star mx-1" data-testid="post-star"></i>
                  {{ article.title }}
                </h1>
                <p data-testid="post-description">{{ article.description }}</p>
                <span data-testid="post-readmore">{{ $t('feed.post.read-more') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BottomFooter/>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader';
import BottomFooter from '@/components/BottomFooter';
import AppBanner from '@/components/AppBanner';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'App',
  components: {
    AppBanner,
    BottomFooter,
    TopHeader
  },
  data() {
    return {
      articles: []
    };
  },
  async mounted() {
    const articles = await axios.get('/articles');
    this.articles = articles.data.articles;
  },
  methods: {
    toPrettyDate(date) {
      moment.locale(this.$i18n.locale);
      return moment(date).format('MMMM Do, YYYY');
    }
  }
};
</script>
