import { mount, config, createLocalVue } from '@vue/test-utils';
import App from '@/App';
import flushPromises from 'flush-promises';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import VueRouter from 'vue-router';
import ZERO_ARTICLES from '../data/articles/zero-articles.json';
import ONE_ARTICLE from '../data/articles/one-article.json';
import TWO_ARTICLES from '../data/articles/two-articles.json';
import HomePage from '@/components/HomePage';

const FEED_POST_SELECTOR = '[data-testid=feed-post]';
const LOADING_SELECTOR = '[data-testid=feed-loading]';


describe('Global Feed', () => {

  let localVue;
  const router = new VueRouter({ routes: [ { path: '/', component: HomePage } ] } );

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(VueRouter);
  });

  it('shows 0 posts', async () => {
    mockAxios.onGet('/articles').reply(200, ZERO_ARTICLES);

    const app = mount(App, { localVue, router });
    await flushPromises();

    expect(app.findAll(FEED_POST_SELECTOR).length).toEqual(0);
    expect(app.find(LOADING_SELECTOR).exists()).toBeFalsy();
  });

  it('shows 1 post', async () => {
    mockAxios.onGet('/articles').reply(200, ONE_ARTICLE);

    const app = mount(App, { localVue, router });
    await flushPromises();

    expect(app.findAll(FEED_POST_SELECTOR).length).toEqual(1);
    expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=author-image]').attributes('src')).toBe('image1');
    expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=author-username]').text()).toBe('author1');
    expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=post-favorites]').text()).toBe('0');
    expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=post-title]').text()).toBe('title-1');
    expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=post-description]').text()).toBe('description-1');
    expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=post-readmore]').text()).toBe('feed.post.read-more');
  });

  it('shows a star if post has more than 30 favorites', async () => {
    mockAxios.onGet('/articles').reply(200, TWO_ARTICLES);
    TWO_ARTICLES.articles[0].favoritesCount = 29;
    TWO_ARTICLES.articles[1].favoritesCount = 30;

    const app = mount(App, { localVue, router });
    await flushPromises();

    expect(app.findAll(FEED_POST_SELECTOR).length).toEqual(2);
    expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=post-star]').exists()).toBeFalsy();
    expect(app.findAll(FEED_POST_SELECTOR).at(1).find('[data-testid=post-star]').exists()).toBeTruthy();
  });

  describe('Shown dates are locale based', () => {
    it('shows dates in english', async () => {
      mockAxios.onGet('/articles').reply(200, ONE_ARTICLE);
      config.mocks.$i18n.locale = 'en';

      const app = mount(App, { localVue, router });
      await flushPromises();

      expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=post-date]').text()).toBe('June 20th, 2021');
    });

    it('shows dates in Spanish', async () => {
      mockAxios.onGet('/articles').reply(200, ONE_ARTICLE);
      config.mocks.$i18n.locale = 'es';

      const app = mount(App, { localVue, router });
      await flushPromises();

      expect(app.findAll(FEED_POST_SELECTOR).at(0).find('[data-testid=post-date]').text()).toBe('junio 20º, 2021');
    });

  });

  it('shows loading until page is loaded', async () => {
    jest.useFakeTimers();
    const mockAxiosDelayed = new MockAdapter(axios, { delayResponse: 2000 });
    mockAxiosDelayed.onGet('/articles').reply(200, ONE_ARTICLE);

    const app = mount(App, { localVue, router });
    await flushPromises();

    expect(app.find(LOADING_SELECTOR).exists()).toBeTruthy();

    jest.advanceTimersByTime(2001);
    await flushPromises();

    expect(app.find(LOADING_SELECTOR).exists()).toBeFalsy();
  });

  it.skip('links to posts - asi era al principio sin localVue y sin router-view', async () => {
    mockAxios.onGet('/articles').reply(200, ONE_ARTICLE);
    config.mocks.$i18n.locale = 'es';
    const $router = { push: jest.fn() };
    const app = mount(App, {
      router,
      mocks: {
          $router
        }
    });
    await flushPromises();

    await app.findAll('[data-testid=post-link]').at(0).trigger('click');

    expect($router.push).tohaveBeenCalledWith({ path: '/post/slug-1 '});
  });

  it('links to posts', async () => {
    mockAxios.onGet('/articles').reply(200, ONE_ARTICLE);
    config.mocks.$i18n.locale = 'es';
    const app = mount(App, {
      localVue,
      router
    });
    await flushPromises();

    await app.findAll('[data-testid=post-link]').at(0).trigger('click');

    expect(app.vm.$route.path).toBe('/post/slug-1');
  });
});
