express = require("express")
fs = require("fs")
path = require("path")
http = require("http")
_ = require("lodash")

#configure app
app = express()

app.configure ->
  #app vars
  app.set "port", process.env.PORT or 3000
  #app middleware
  app.use express.logger("dev")
  app.use express.compress()
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser("s3cr3t")
  app.use express.session()
  app.use app.router
  app.use express.static path.join(__dirname, "public")

#dev only
app.configure "development", ->
  app.use express.errorHandler()

#routes
app.get "/", (req, res) ->
  res.json { hello: "world" }

#start!
http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

