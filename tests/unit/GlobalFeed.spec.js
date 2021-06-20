import { mount } from '@vue/test-utils';
import App from '@/App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import flushPromises from 'flush-promises';
import ZERO_ARTICLES from '../data/articles/zero-articles.json';
import ONE_ARTICLE from '../data/articles/one-article.json';

let mock;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.restore();
});

describe('Global Feed', () => {
  it('shows 0 posts', async () => {
    mock.onGet("/articles").reply(200, ZERO_ARTICLES);
    const app = mount(App);
    await flushPromises();

    expect(app.findAll('.post-preview').length).toEqual(0);
  });

  it('shows 1 post', async () => {
    mock.onGet("/articles").reply(200, ONE_ARTICLE);

    const app = mount(App);
    await flushPromises();
    expect(app.findAll('.post-preview').length).toEqual(1);
  });
});
