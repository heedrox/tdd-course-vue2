<template>
  <div id="app">
    <TopHeader />
    <div class="home-page">
      <AppBanner />

      <div class="container page">
        <div class="row">

          <div class="post-preview" v-for="article in articles" :key="article.slug">
            x
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
  }
};
</script>
