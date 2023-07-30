migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT id, naam, omschrijving, praesidium FROM activiteiten"
  }

  // remove
  collection.schema.removeField("3d5azk0w")

  // remove
  collection.schema.removeField("ylxubwoe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mokkvssi",
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
    "id": "5wphoqlp",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1h1jhbqb",
    "name": "praesidium",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qiwewt6q0gm6zgy",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "academiejaar"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT id, naam, omschrijving FROM activiteiten"
  }

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

  // remove
  collection.schema.removeField("mokkvssi")

  // remove
  collection.schema.removeField("5wphoqlp")

  // remove
  collection.schema.removeField("1h1jhbqb")

  return dao.saveCollection(collection)
})
