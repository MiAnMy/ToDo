# Program uses Vue, Buefy and Material icons.

# todo

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Installation from zero

### Vue CLI (one time needed)

```
npm install -g @vue/cli
```

### Create new project

```
vue create project-name
```

### Change dir to project folder

```
cd ./project-name
```

### Vue 2.0 templates

```
npm install vue-template-compiler --save-dev
```

### UI components for Vue.js based on bulma

```
npm install buefy
```

### Material icons

```
 npm install --save @mdi/font
```

## main.js

```
import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";
import '@mdi/font/css/materialdesignicons.css'

Vue.prototype.axios = axios;
Vue.use(Buefy);
Vue.config.productionTip = false;
...
```
