<template>
  <div id="app">
    <TopHeader/>
    <router-view></router-view>
    <BottomFooter/>
  </div>
</template>

<script>
import TopHeader from './components/common/TopHeader';
import BottomFooter from '@/components/common/BottomFooter';

export default {
  name: 'App',
  components: {
    BottomFooter,
    TopHeader
  }
};
</script>
