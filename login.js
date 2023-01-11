import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, this.user).then((response) => {
        // 登入成功
        // ES6 解構賦值
        const { token, expired } = response.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        // 導向 product.html 頁面
        window.location = 'product.html';
      }).catch((err) => {
        // 跳出警告視窗 顯示登入失敗錯誤訊息
        alert(err.response.data.message);
      });
    },
  },
}).mount('#app');