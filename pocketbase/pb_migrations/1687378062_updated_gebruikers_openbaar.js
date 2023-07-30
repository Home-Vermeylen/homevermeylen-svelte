migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  collection.options = {
    "query": "SELECT id, voornaam, familienaam, avatar, praesidiumlid, instagram, beheerder_ad_interim FROM gebruikers"
  }

  // remove
  collection.schema.removeField("pdlrduyl")

  // remove
  collection.schema.removeField("fohnspdo")

  // remove
  collection.schema.removeField("lwpkrjbj")

  // remove
  collection.schema.removeField("i0rruy9p")

  // remove
  collection.schema.removeField("eyxzs6tg")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("kh98ktzpc17hc8g")

  collection.options = {
    "query": "SELECT id, voornaam, familienaam, avatar, praesidiumlid, beheerder_ad_interim FROM gebruikers"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pdlrduyl",
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
    "id": "fohnspdo",
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
    "id": "lwpkrjbj",
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
    "id": "i0rruy9p",
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
    "id": "eyxzs6tg",
    "name": "beheerder_ad_interim",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

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

  return dao.saveCollection(collection)
})
