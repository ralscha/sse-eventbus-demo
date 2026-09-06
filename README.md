
A simple Spring Boot application that demonstrates the usage of 
the [sse-eventbus](https://github.com/ralscha/sse-eventbus) library.

The application uses the [ECharts](https://github.com/ecomfe/echarts) library
to visualise the data in the browser. Events have IDs, so the in-memory replay
store can resume an interrupted connection from the browser's `Last-Event-ID`.
Heartbeat comments keep otherwise idle connections alive.

#### Run the demo

Install [Task](https://taskfile.dev/) first.

```
git clone https://github.com/ralscha/sse-eventbus-demo.git
cd sse-eventbus-demo
task demo
```

Open `http://localhost:5173` in your browser to see the demo in action. 

To build a self-contained executable jar that includes the frontend:

```
task package
java -jar target/sse-eventbus-demo.jar
```

Then open `http://localhost:8080`.

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
