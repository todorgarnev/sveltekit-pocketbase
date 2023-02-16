migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1h10kmcoxeiada7")

  // update
  collection.schema.addField(new SchemaField({
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
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1h10kmcoxeiada7")

  // update
  collection.schema.addField(new SchemaField({
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
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
