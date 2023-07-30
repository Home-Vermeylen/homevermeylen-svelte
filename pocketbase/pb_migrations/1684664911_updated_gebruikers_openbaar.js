migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  collection.options = {
    "query": "SELECT id, voornaam, familienaam, avatar, praesidiumlid FROM gebruikers"
  }

  // remove
  collection.schema.removeField("s9qrt2gu")

  // remove
  collection.schema.removeField("gknnudsu")

  // remove
  collection.schema.removeField("plfkux0a")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "54sqdvsj",
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
    "id": "j8zm8ax3",
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
    "id": "ubpwk5s3",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c5ujzlld",
    "name": "praesidiumlid",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "r96nt7gpaoy6qzt",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "functie",
        "praesidium"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  collection.options = {
    "query": "SELECT id, voornaam, familienaam, avatar FROM gebruikers"
  }

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

  // remove
  collection.schema.removeField("54sqdvsj")

  // remove
  collection.schema.removeField("j8zm8ax3")

  // remove
  collection.schema.removeField("ubpwk5s3")

  // remove
  collection.schema.removeField("c5ujzlld")

  return dao.saveCollection(collection)
})
