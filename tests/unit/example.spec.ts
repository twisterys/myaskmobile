import { mount } from '@vue/test-utils';
import HomePage from '@/views/HomePage.vue';

describe('HomePage', () => {
  it('renders correctly', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.exists()).toBe(true);
  });
});
