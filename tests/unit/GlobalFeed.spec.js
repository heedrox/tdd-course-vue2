import { mount } from '@vue/test-utils';
import App from '@/App';

describe('Global Feed', () => {
  it('is shown', () => {
    const app = mount(App);

    expect(app.findAll('.post-preview').length).toEqual(2);
  });
});
