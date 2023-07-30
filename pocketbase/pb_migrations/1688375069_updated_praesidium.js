migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7ru42fyz",
    "name": "vriendschapsnetwerk",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qiwewt6q0gm6zgy")

  // update
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
})
