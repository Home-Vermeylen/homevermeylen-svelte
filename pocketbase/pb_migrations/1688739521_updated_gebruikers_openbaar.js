migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "boqfgr8n",
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
    "id": "f1mlejwf",
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
    "id": "mnenm1bq",
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
        "50x50",
        "200x200"
      ],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cjgim4tk",
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
    "id": "lqee9mgz",
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
    "id": "u8j35nbh",
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

  // remove
  collection.schema.removeField("boqfgr8n")

  // remove
  collection.schema.removeField("f1mlejwf")

  // remove
  collection.schema.removeField("mnenm1bq")

  // remove
  collection.schema.removeField("cjgim4tk")

  // remove
  collection.schema.removeField("lqee9mgz")

  // remove
  collection.schema.removeField("u8j35nbh")

  return dao.saveCollection(collection)
})
