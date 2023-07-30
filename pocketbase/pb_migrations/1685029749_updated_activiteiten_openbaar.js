migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("yqwneexq")

  // remove
  collection.schema.removeField("h3gzg6ey")

  // remove
  collection.schema.removeField("lpzffylb")

  // remove
  collection.schema.removeField("j30ipaot")

  // remove
  collection.schema.removeField("o1twul4x")

  // remove
  collection.schema.removeField("hbxnham8")

  // remove
  collection.schema.removeField("9zwqdkw6")

  // remove
  collection.schema.removeField("vj9z0pca")

  // remove
  collection.schema.removeField("idqtgbm5")

  // remove
  collection.schema.removeField("gy8a8td5")

  // remove
  collection.schema.removeField("twlpbwch")

  // remove
  collection.schema.removeField("c0g41fcp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p2hbcngf",
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
    "id": "y6w6wtbp",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r5mwkeiu",
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
    "id": "aszys0gb",
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
    "id": "gw6bmigq",
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
    "id": "dhnplvzt",
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
    "id": "0bkeowqo",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ikcvsky2",
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
    "id": "7qcnmfet",
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
    "id": "i2nfwjq8",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oow77yfn",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "atmblvwj",
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

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yqwneexq",
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
    "id": "h3gzg6ey",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lpzffylb",
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
    "id": "j30ipaot",
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
    "id": "o1twul4x",
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
    "id": "hbxnham8",
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
    "id": "9zwqdkw6",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vj9z0pca",
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
    "id": "idqtgbm5",
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
    "id": "gy8a8td5",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "twlpbwch",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c0g41fcp",
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
  collection.schema.removeField("p2hbcngf")

  // remove
  collection.schema.removeField("y6w6wtbp")

  // remove
  collection.schema.removeField("r5mwkeiu")

  // remove
  collection.schema.removeField("aszys0gb")

  // remove
  collection.schema.removeField("gw6bmigq")

  // remove
  collection.schema.removeField("dhnplvzt")

  // remove
  collection.schema.removeField("0bkeowqo")

  // remove
  collection.schema.removeField("ikcvsky2")

  // remove
  collection.schema.removeField("7qcnmfet")

  // remove
  collection.schema.removeField("i2nfwjq8")

  // remove
  collection.schema.removeField("oow77yfn")

  // remove
  collection.schema.removeField("atmblvwj")

  return dao.saveCollection(collection)
})
