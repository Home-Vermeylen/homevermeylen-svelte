migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT id, naam, omschrijving FROM activiteiten"
  }

  // remove
  collection.schema.removeField("wndabbmp")

  // remove
  collection.schema.removeField("wpi8srpw")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3d5azk0w",
    "name": "naam",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ylxubwoe",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT \"naam\", \"omschrijving\", \"id\" FROM activiteiten"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wndabbmp",
    "name": "naam",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wpi8srpw",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("3d5azk0w")

  // remove
  collection.schema.removeField("ylxubwoe")

  return dao.saveCollection(collection)
})
