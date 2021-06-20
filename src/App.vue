<template>
  <div id="app">
    <TopHeader/>
    <router-view></router-view>
    <BottomFooter/>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader';
import BottomFooter from '@/components/BottomFooter';

export default {
  name: 'App',
  components: {
    BottomFooter,
    TopHeader
  }
};
</script>
