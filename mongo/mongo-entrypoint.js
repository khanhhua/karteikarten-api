var db = connect("mongodb://localhost/karteikarten");

db.createUser({
  user: "webuser",
  pwd: "pa$$word",
  roles: [ { role: "readWrite", db: "karteikarten" } ]
});
