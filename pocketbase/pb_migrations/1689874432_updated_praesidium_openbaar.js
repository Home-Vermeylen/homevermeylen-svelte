migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sw3784eivau94g8")

  // remove
  collection.schema.removeField("26skyw2p")

  // remove
  collection.schema.removeField("bvfjia1a")

  // remove
  collection.schema.removeField("mleplwky")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7or1skno",
    "name": "academiejaar",
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
    "id": "2322f7xu",
    "name": "praesidium_leden",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "r96nt7gpaoy6qzt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": [
        "voornaam",
        "familienaam",
        "praesidium"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e7vldah1",
    "name": "activiteiten",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "h0ad0pd3ntujvuy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sw3784eivau94g8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "26skyw2p",
    "name": "academiejaar",
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
    "id": "bvfjia1a",
    "name": "praesidium_leden",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "r96nt7gpaoy6qzt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mleplwky",
    "name": "activiteiten",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "h0ad0pd3ntujvuy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("7or1skno")

  // remove
  collection.schema.removeField("2322f7xu")

  // remove
  collection.schema.removeField("e7vldah1")

  return dao.saveCollection(collection)
})
