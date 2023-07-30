migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  // remove
  collection.schema.removeField("e0h2fm1p")

  // remove
  collection.schema.removeField("21gh2hev")

  // remove
  collection.schema.removeField("qmm4wjmx")

  // remove
  collection.schema.removeField("1p0h83hq")

  // remove
  collection.schema.removeField("gsc2b5hn")

  // remove
  collection.schema.removeField("iz8w3mbn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oqkt1xtl",
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
    "id": "nqfjbty7",
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
    "id": "yqgzs9wr",
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
      "thumbs": [
        "50x50"
      ],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wuicuuc9",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hxt6rt8z",
    "name": "instagram",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wlitt6kp",
    "name": "beheerder_ad_interim",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e0h2fm1p",
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
    "id": "21gh2hev",
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
    "id": "qmm4wjmx",
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
    "id": "1p0h83hq",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gsc2b5hn",
    "name": "instagram",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iz8w3mbn",
    "name": "beheerder_ad_interim",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("oqkt1xtl")

  // remove
  collection.schema.removeField("nqfjbty7")

  // remove
  collection.schema.removeField("yqgzs9wr")

  // remove
  collection.schema.removeField("wuicuuc9")

  // remove
  collection.schema.removeField("hxt6rt8z")

  // remove
  collection.schema.removeField("wlitt6kp")

  return dao.saveCollection(collection)
})
