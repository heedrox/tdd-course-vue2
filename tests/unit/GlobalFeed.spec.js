import { mount } from '@vue/test-utils';
import App from '@/App';

describe('Global Feed', () => {
  it('is shown with 0 posts', () => {
    const app = mount(App);

    expect(app.findAll('.post-preview').length).toEqual(0);
  });

  it.skip('is shown with 1 post', () => {

    const app = mount(App);

    expect(app.findAll('.post-preview').length).toEqual(0);

  });
});
