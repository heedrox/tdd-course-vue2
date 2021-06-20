import { mount } from '@vue/test-utils';
import App from '@/App';
import flushPromises from 'flush-promises';
import ZERO_ARTICLES from '../data/articles/zero-articles.json';
import ONE_ARTICLE from '../data/articles/one-article.json';

const FEED_POST_SELECTOR = '[data-testid=feed-post]';

describe('Global Feed', () => {

  it('shows 0 posts', async () => {
    mockAxios.onGet('/articles').reply(200, ZERO_ARTICLES);

    const app = mount(App);
    await flushPromises();

    expect(app.findAll(FEED_POST_SELECTOR).length).toEqual(0);
  });

  it('shows 1 post', async () => {
    mockAxios.onGet('/articles').reply(200, ONE_ARTICLE);

    const app = mount(App);
    await flushPromises();

    expect(app.findAll(FEED_POST_SELECTOR).length).toEqual(1);
  });

});
