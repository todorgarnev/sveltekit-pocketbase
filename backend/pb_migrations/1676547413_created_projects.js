migrate((db) => {
  const collection = new Collection({
    "id": "1h10kmcoxeiada7",
    "created": "2023-02-16 11:36:53.641Z",
    "updated": "2023-02-16 11:36:53.641Z",
    "name": "projects",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qyhrshul",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "e6ntyusc",
        "name": "tagline",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 2,
          "max": 64,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "z4lebu7l",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 2,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "pdmnxbof",
        "name": "url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "lvyiwvmf",
        "name": "thumbnail",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/jpeg",
            "image/svg+xml",
            "image/gif",
            "image/webp"
          ],
          "thumbs": [
            "80x80"
          ]
        }
      },
      {
        "system": false,
        "id": "xgywkveq",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": [
            "id",
            "email",
            "name",
            "avatar"
          ]
        }
      }
    ],
    "listRule": null,
    "viewRule": "",
    "createRule": "@request.auth.id != \"\" && @request.auth.id = @request.data.user",
    "updateRule": "@request.auth.id != user",
    "deleteRule": "@request.auth.id != user",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1h10kmcoxeiada7");

  return dao.deleteCollection(collection);
})
