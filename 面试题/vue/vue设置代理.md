代理主要用于解决跨域问题

前端地址：`localhost:8080`
后端地址：`localhost:8888/test`

## vue-cli

```js
// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {    //只要有api就走这
                target: 'http://localhost:8888/',    //目标地址
                changeOrigin: true,    //是否开启跨域
                pathRewrite: {
                    '^/api': ''    //将api替换成''
                }
            }
        }
    }
} 
```

axios

```javascript
import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 3000
})

export default request
```

```js
import request from './request/index.js'
export default {
  name: 'App',
  created() {
    this.getData()
  },
  methods: {
    //获取后端数据
    async getData() {
	  // 相当于请求 localhost:8080/api/test 代理后就是 localhost:8888/test
      let res = await request({
        url: '/test',  
        method: 'GET',
      })
      console.log('res:', res)
    }
  }
}
```

## vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {    //只要有api就走这
        target: 'http://localhost:8888/',    //目标地址
        changeOrigin: true,    //是否开启跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

axios

```javascript
import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 3000
})

export default request
```

```js
import request from './request';
import { onMounted } from 'vue'
//获取数据
const getData = async () => {
  let res = await request({
    url: '/test',
    method: 'GET'
  })
  console.log('res:', res)
}
onMounted(() => {
  getData()
})
```