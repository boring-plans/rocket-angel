import store from '../store';

let intervalHandle = null;

export const showLoading = () => {
  // maybe old timer exists
  intervalHandle && clearInterval(intervalHandle);

  let progress = 0;
  store.commit('app/SET_LOADING', { isLoading: true, progress });
  intervalHandle = setInterval(() => {
    if (process.env.NODE_ENV === 'development') console.log('[DEBUG] loading timer is working..');
    if (!store.state.app.loading.isLoading || progress >= 80 || store.state.app.loading.progress > progress) {
      intervalHandle && clearInterval(intervalHandle);
      return;
    }
    store.commit('app/SET_LOADING', { isLoading: true, progress: ++progress });
  }, 100);
};

export const hideLoading = () => {
  // 此处的 400 ms 延时，是因为 showLoading 执行之后，很快便要执行 hideLoading
  // 一点延时，使得 laoding 效果更明显，改善体验
  setTimeout(() => {
    store.commit('app/SET_LOADING', { isLoading: true, progress: 100 });
    setTimeout(() => {
      store.commit('app/SET_LOADING', { isLoading: false, progress: 0 });
    }, 200);
  }, 400);
};
