# **Various UI v0.0.1**

一个 Vue.js 3 的 UI 库 <br>

## **安装**

---

使用 npm 安装

```
$ npm i -g npm
$ npm i --save various-ui
```

## **使用**

---

### 全部引入

```
import App from "./App.vue";
import VariousUI from 'various-ui'

import { createApp } from 'vue'

const app = createApp(App)

app.use(VariousUI)
```

### 按需引入

```
import App from "./App.vue";

import { UiIcon } from 'various-ui'
import { createApp } from 'vue'

const app = createApp(App)

app.component(UiIcon.name, UiIcon)
```
