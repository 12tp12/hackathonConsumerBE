const express = require('express')
var bodyParser = require('body-parser');
var crypto = require('crypto');

const app = express()
const port = 4004

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', 
(req, res) => {
    console.log(JSON.stringify(req.headers));
    res.send('Hello World!' + JSON.stringify(req.headers))
}
)

app.post('/', 
(req, res) => {
    console.log(JSON.stringify(req.headers, null, "  "));
    console.log(JSON.stringify(req.body, null, "  "));
    if(req.headers["x-hook-secret"]){
    res.setHeader("x-hook-secret", req.headers["x-hook-secret"]);
}
verifyTrelloWebhookRequest(req, "mjcW8iT5sEDAwzzxfXLIGHlwMssNjQ25AFnBCoabsgSnFL84QtV6YeaBdUtAPKd91jnSv4SkE9F");
    res.send('Hello World!' + JSON.stringify(req.headers, null, "  ") + "\n body: \n" + JSON.stringify(req.body, null, "  "))
}
)
//    res.setHeader("x-hook-secret", req.headers["x-hook-signature"]);

function verifyTrelloWebhookRequest(request, secret) {
    var base64Digest = function (s) {
      return crypto.createHmac('sha256', secret).update(s).digest('base64');
    }
    var content = JSON.stringify(request.body);
    var doubleHash = base64Digest(content);
    var headerHash = request.headers['x-hook-signature'];
    return doubleHash == headerHash;
  }

app.listen(port, () => console.log(`Example app listening on port ${port}!`))