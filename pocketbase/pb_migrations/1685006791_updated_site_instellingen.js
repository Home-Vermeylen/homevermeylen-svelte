migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rd6qq50m",
    "name": "waarde",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfbaz5drj603l73")

  // remove
  collection.schema.removeField("rd6qq50m")

  return dao.saveCollection(collection)
})
