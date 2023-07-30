migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT \n  id, \n  naam,\n  omschrijving,\n  locatie,\n  datum, \n  activiteitstype,\n  banner,\n  inschrijven, \n  inschrijvings_start_datum,\n  inschrijvings_eind_datum, \n  exclusief_vermeylen, \n  extra_velden, \n  formlink \nFROM activiteiten act\n  WHERE (gepubliceerd = TRUE) AND ((SELECT academiejaar FROM praesidium WHERE id=act.praesidium) = (SELECT waarde FROM site_instellingen WHERE sleutel=\"huidig_academiejaar\")) "
  }

  // remove
  collection.schema.removeField("k0qdrkud")

  // remove
  collection.schema.removeField("tr8idbbn")

  // remove
  collection.schema.removeField("59kdgns3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m5z3kw4f",
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
    "id": "hkicprlk",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dk9zshkk",
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
    "id": "t4n4dt4h",
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
    "id": "syo8gcgk",
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
    "id": "vfpifypk",
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
    "id": "xirr2hnh",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ihe59bzd",
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
    "id": "vpwwjwaw",
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
    "id": "tatan2cz",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hz4vfrqk",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3jdh5ply",
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

  collection.options = {
    "query": "SELECT id, naam, omschrijving, praesidium FROM activiteiten WHERE gepubliceerd = TRUE"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k0qdrkud",
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
    "id": "tr8idbbn",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "59kdgns3",
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

  // remove
  collection.schema.removeField("m5z3kw4f")

  // remove
  collection.schema.removeField("hkicprlk")

  // remove
  collection.schema.removeField("dk9zshkk")

  // remove
  collection.schema.removeField("t4n4dt4h")

  // remove
  collection.schema.removeField("syo8gcgk")

  // remove
  collection.schema.removeField("vfpifypk")

  // remove
  collection.schema.removeField("xirr2hnh")

  // remove
  collection.schema.removeField("ihe59bzd")

  // remove
  collection.schema.removeField("vpwwjwaw")

  // remove
  collection.schema.removeField("tatan2cz")

  // remove
  collection.schema.removeField("hz4vfrqk")

  // remove
  collection.schema.removeField("3jdh5ply")

  return dao.saveCollection(collection)
})
