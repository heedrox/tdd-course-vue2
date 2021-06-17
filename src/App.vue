<template>
  <div id="app">
    <TopHeader />
    <div class="home-page">
      <AppBanner />
    </div>

    <BottomFooter />
  </div>
</template>

<script>
import TopHeader from './components/TopHeader';
import BottomFooter from '@/components/BottomFooter';
import AppBanner from '@/components/AppBanner';

export default {
  name: 'App',
  components: {
    AppBanner,
    BottomFooter,
    TopHeader
  }
};
</script>
