migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lwkoligq",
    "name": "waard",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lwkoligq",
    "name": "waarde",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
