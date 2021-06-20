<template>
  <div id="app">
    <TopHeader />
    <div class="home-page">
      <AppBanner />

      <div class="container page">
        <div class="row">

          <div class="post-preview" data-testid="feed-post" v-for="article in articles" :key="article.slug">
            <div class="post-meta">
              <a href="profile.html"><img data-testid="author-image" :src="article.author.image" /></a>
              <div class="info">
                <a href="profile.html" class="author" data-testid="author-username">{{ article.author.username }}</a>
                <span class="date" data-testid="post-date">{{ toPrettyDate(article.createdAt) }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="post.html" class="preview-link">
              <h1>
                <i title="More than 30 likes!" class="text-primary ion-star mx-1"></i>
                The song you won't ever stop singing. No matter how hard you try.
              </h1>
              <p>In my demo, the holy grail layout is nested inside a document, so there's no body or main tags like shown above. Regardless, we're interested in the class names and the appearance of sections in the markup as opposed to the actual elements themselves. In particular, take note of the modifier classes used on the two sidebars, and the trivial order in which they appear in the markup. Let's break this down to paint a clear picture of what's happening...</p>
              <span>Read more...</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <BottomFooter />
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
