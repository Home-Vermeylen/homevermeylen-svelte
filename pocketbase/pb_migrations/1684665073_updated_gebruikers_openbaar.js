migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("54sqdvsj")

  // remove
  collection.schema.removeField("j8zm8ax3")

  // remove
  collection.schema.removeField("ubpwk5s3")

  // remove
  collection.schema.removeField("c5ujzlld")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cudbtgib",
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
    "id": "6egszg09",
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
    "id": "nwlipqhw",
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
    "id": "jzobaqc3",
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

  collection.listRule = null
  collection.viewRule = null

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

  // remove
  collection.schema.removeField("cudbtgib")

  // remove
  collection.schema.removeField("6egszg09")

  // remove
  collection.schema.removeField("nwlipqhw")

  // remove
  collection.schema.removeField("jzobaqc3")

  return dao.saveCollection(collection)
})
