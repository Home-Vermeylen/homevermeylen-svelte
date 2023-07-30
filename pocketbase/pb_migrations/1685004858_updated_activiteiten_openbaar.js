migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT \n  id, \n  naam,\n  omschrijving,\n  locatie,\n  datum, \n  activiteitstype,\n  banner,\n  inschrijven, \n  inschrijvings_start_datum,\n  inschrijvings_eind_datum, \n  exclusief_vermeylen, \n  extra_velden, \n  formlink \nFROM activiteiten\n  WHERE (gepubliceerd = TRUE) AND (SELECT academiejaar FROM praesidium WHERE id=praesidium) = (SELECT waarde FROM site_instellingen WHERE sleutel=\"huidig_academiejaar\")"
  }

  // remove
  collection.schema.removeField("etifo0rx")

  // remove
  collection.schema.removeField("3ggaopxa")

  // remove
  collection.schema.removeField("x1vjv5vp")

  // remove
  collection.schema.removeField("2z8xpq8m")

  // remove
  collection.schema.removeField("d0sttiht")

  // remove
  collection.schema.removeField("k6kdcnsg")

  // remove
  collection.schema.removeField("aeritz4o")

  // remove
  collection.schema.removeField("5a6n7994")

  // remove
  collection.schema.removeField("peufr952")

  // remove
  collection.schema.removeField("knn9lzpw")

  // remove
  collection.schema.removeField("g9buikp9")

  // remove
  collection.schema.removeField("aeucj3gc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xgpcuq9a",
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
    "id": "ihk4gzna",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "haftfgsj",
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
    "id": "n2gtbnc9",
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
    "id": "njhmj0qu",
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
    "id": "7udypego",
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
    "id": "8jm2utrh",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfoijgl6",
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
    "id": "kzw0x8gr",
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
    "id": "bzantqsd",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5kwbj6gj",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aldnh1kc",
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
    "query": "SELECT \n  id, \n  naam,\n  omschrijving,\n  locatie,\n  datum, \n  activiteitstype,\n  banner,\n  inschrijven, \n  inschrijvings_start_datum,\n  inschrijvings_eind_datum, \n  exclusief_vermeylen, \n  extra_velden, \n  formlink \nFROM activiteiten\n  WHERE (gepubliceerd = TRUE) AND (SELECT academiejaar FROM praesidium WHERE id=activiteiten.praesidium) = (SELECT waarde FROM site_instellingen WHERE sleutel=\"huidig_academiejaar\")"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "etifo0rx",
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
    "id": "3ggaopxa",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x1vjv5vp",
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
    "id": "2z8xpq8m",
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
    "id": "d0sttiht",
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
    "id": "k6kdcnsg",
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
    "id": "aeritz4o",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5a6n7994",
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
    "id": "peufr952",
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
    "id": "knn9lzpw",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g9buikp9",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aeucj3gc",
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
  collection.schema.removeField("xgpcuq9a")

  // remove
  collection.schema.removeField("ihk4gzna")

  // remove
  collection.schema.removeField("haftfgsj")

  // remove
  collection.schema.removeField("n2gtbnc9")

  // remove
  collection.schema.removeField("njhmj0qu")

  // remove
  collection.schema.removeField("7udypego")

  // remove
  collection.schema.removeField("8jm2utrh")

  // remove
  collection.schema.removeField("hfoijgl6")

  // remove
  collection.schema.removeField("kzw0x8gr")

  // remove
  collection.schema.removeField("bzantqsd")

  // remove
  collection.schema.removeField("5kwbj6gj")

  // remove
  collection.schema.removeField("aldnh1kc")

  return dao.saveCollection(collection)
})
