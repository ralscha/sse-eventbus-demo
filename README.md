
A simple Spring Boot application that demonstrates the usage of 
the [sse-eventbus](https://github.com/ralscha/sse-eventbus) library.

The application uses the [ECharts](https://github.com/ecomfe/echarts) library
to visualise the data in the browser.

#### Run the demo

Install [Task](https://taskfile.dev/) first.

```
git clone https://github.com/ralscha/sse-eventbus-demo.git
cd sse-eventbus-demo
task demo
```

Open `http://localhost:5173` in your browser to see the demo in action. 

#### Development mode

Run the backend and Vite dev server in separate terminals:

```
task server
task client
```

The backend runs on `http://localhost:8080`, the Vite client runs on
`http://localhost:5173`, and Vite proxies `/register` to the Spring app so no
browser CORS configuration is required.


#### License
Code released under [the Apache license](http://www.apache.org/licenses/).
