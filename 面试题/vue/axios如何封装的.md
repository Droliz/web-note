```js
// axios.js
import axios from axios
  
// 创建实例
const api = axios.create({
	// 公共请求地址
	baseURL: "",
	// 请求超时
	timeout: 5000
})
  
// 请求拦截
api.interceptors.request.use(
	config => {
		// 请求头添加token，等操作
		config.headers.Authorization = localStorage.getItem("token")
		return config
	}, error => {
		return Promise.reject(error)
	}
)
  
// 响应拦截
api.interceptors.response.use(
	response => {
		return response
	}, error => {
		return Promise.reject(error)
	}
)
  
export default api
```

```js
// request.js
import api from 'axios.js'

export const login = (params) => {
	url: "",
	method: "get",
	params
}
```

```js
// login.vue
import login from "request.js"
method: {
	login(...params).then({
		...
	})
}
```