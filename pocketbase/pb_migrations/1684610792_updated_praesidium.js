migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7ru42fyz",
    "name": "muilboom",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  // remove
  collection.schema.removeField("7ru42fyz")

  return dao.saveCollection(collection)
})
