# realworld-vue

This project is the main repo for Jordi Martí (@itortv)'s TDD course for VueJS + Jest.

In this TDD course, the goal is to implement a "Medium"-like app, through the existing RealWorld app example.

In order to do that you can find the styled HTML pages that we are going to use in html/ directory. You can
execute and see those htmls in action with python 2 and executing:
```
cd docs/html
./ssi-server/ssi_server.py
```

This uses ssi-server to run a SimpleHttpServer from python 2.

You can open the served pages through a browser with the URL http://localhost:8000

In case you don't have Python2 , you can execute these on a Apache Http Server.

The htmls are quite easy, as each of them only include the header and the footer.

## API

During the course we will make these HTML pages alive, through an already hosted RealWorld Example app.
You can find this app here: https://demo.realworld.io/#/

The API is hosted on: https://conduit.productionready.io/api/, for example: https://conduit.productionready.io/api/tags/

The API spec is here: https://github.com/gothinkster/realworld/tree/master/api

You can visually see the API:
- open https://editor.swagger.io/
- import docs/api/swagger.json file

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
