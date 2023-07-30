migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  // remove
  collection.schema.removeField("nh8bla9d")

  // remove
  collection.schema.removeField("ll3nfehj")

  // remove
  collection.schema.removeField("wyluit7w")

  // remove
  collection.schema.removeField("nmnhefbm")

  // remove
  collection.schema.removeField("69ealog9")

  // remove
  collection.schema.removeField("rawxphkt")

  // remove
  collection.schema.removeField("htl0vgiz")

  // remove
  collection.schema.removeField("dtp9b5gn")

  // remove
  collection.schema.removeField("moxiipny")

  // remove
  collection.schema.removeField("8rxlmd4l")

  // remove
  collection.schema.removeField("lttmotho")

  // remove
  collection.schema.removeField("arznuejc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6s5tjocx",
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
    "id": "82kp6amn",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9rqvcrbr",
    "name": "locatie",
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
    "id": "dtcrv5pa",
    "name": "datum",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kvmib1pa",
    "name": "activiteitstype",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "BAR",
        "CANTUS",
        "SPORT",
        "CULTUUR",
        "FUIF",
        "ANDERE"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kl5l19b9",
    "name": "banner",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pw4hjn2z",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0upx3jup",
    "name": "inschrijvings_start_datum",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vjyajlu0",
    "name": "inschrijvings_eind_datum",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mo5azxcm",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dmktpilz",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ndk2tzys",
    "name": "formlink",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nh8bla9d",
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
    "id": "ll3nfehj",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wyluit7w",
    "name": "locatie",
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
    "id": "nmnhefbm",
    "name": "datum",
    "type": "date",
    "required": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "69ealog9",
    "name": "activiteitstype",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "BAR",
        "CANTUS",
        "SPORT",
        "CULTUUR",
        "ANDERE"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rawxphkt",
    "name": "banner",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "htl0vgiz",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dtp9b5gn",
    "name": "inschrijvings_start_datum",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "moxiipny",
    "name": "inschrijvings_eind_datum",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8rxlmd4l",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lttmotho",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "arznuejc",
    "name": "formlink",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": [],
      "onlyDomains": []
    }
  }))

  // remove
  collection.schema.removeField("6s5tjocx")

  // remove
  collection.schema.removeField("82kp6amn")

  // remove
  collection.schema.removeField("9rqvcrbr")

  // remove
  collection.schema.removeField("dtcrv5pa")

  // remove
  collection.schema.removeField("kvmib1pa")

  // remove
  collection.schema.removeField("kl5l19b9")

  // remove
  collection.schema.removeField("pw4hjn2z")

  // remove
  collection.schema.removeField("0upx3jup")

  // remove
  collection.schema.removeField("vjyajlu0")

  // remove
  collection.schema.removeField("mo5azxcm")

  // remove
  collection.schema.removeField("dmktpilz")

  // remove
  collection.schema.removeField("ndk2tzys")

  return dao.saveCollection(collection)
})
