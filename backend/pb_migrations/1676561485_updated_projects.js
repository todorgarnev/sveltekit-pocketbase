migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1h10kmcoxeiada7")

  collection.updateRule = "@request.auth.id = user"
  collection.deleteRule = "@request.auth.id = user"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1h10kmcoxeiada7")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
