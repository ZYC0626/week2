import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'ggfish-winter',
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    checkAdmin() {
      // 檢查登入
      // 驗證是否有產品
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          // 檢查登入成功 開始抓取產品資料
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          //  無則重新導向 到登入頁
          window.location = 'login.html';
        })
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((response) => {
          // 寫入 產品資料
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    getProductDetail(item) {
      this.tempProduct = item;
    }
  },
  mounted() {
    // 掛載 生命週期 
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // Token 寫入 header
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}).mount('#app');