import { config } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

config.mocks.$t = key => key;

beforeEach(() => {
  global.mockAxios = new MockAdapter(axios);
});

afterEach(() => {
  global.mockAxios.restore();
});

