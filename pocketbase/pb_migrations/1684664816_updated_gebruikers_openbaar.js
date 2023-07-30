migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  collection.options = {
    "query": "SELECT id, voornaam, familienaam, avatar FROM gebruikers"
  }

  // remove
  collection.schema.removeField("qsmiunup")

  // remove
  collection.schema.removeField("ptcidpt5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s9qrt2gu",
    "name": "voornaam",
    "type": "text",
    "required": false,
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
    "id": "gknnudsu",
    "name": "familienaam",
    "type": "text",
    "required": false,
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
    "id": "plfkux0a",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": null,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  collection.options = {
    "query": "SELECT id, voornaam, familienaam FROM gebruikers"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qsmiunup",
    "name": "voornaam",
    "type": "text",
    "required": false,
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
    "id": "ptcidpt5",
    "name": "familienaam",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("s9qrt2gu")

  // remove
  collection.schema.removeField("gknnudsu")

  // remove
  collection.schema.removeField("plfkux0a")

  return dao.saveCollection(collection)
})
