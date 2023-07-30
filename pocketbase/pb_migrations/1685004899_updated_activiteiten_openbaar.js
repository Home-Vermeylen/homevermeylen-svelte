migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT \n  id, \n  naam,\n  omschrijving,\n  locatie,\n  datum, \n  activiteitstype,\n  banner,\n  inschrijven, \n  inschrijvings_start_datum,\n  inschrijvings_eind_datum, \n  exclusief_vermeylen, \n  extra_velden, \n  formlink \nFROM activiteiten\n  WHERE (gepubliceerd = TRUE) AND (SELECT academiejaar FROM praesidium WHERE id=praesidium.id) = (SELECT waarde FROM site_instellingen WHERE sleutel=\"huidig_academiejaar\")"
  }

  // remove
  collection.schema.removeField("w42yq3pw")

  // remove
  collection.schema.removeField("89cgecsl")

  // remove
  collection.schema.removeField("7p9puncr")

  // remove
  collection.schema.removeField("nurpumof")

  // remove
  collection.schema.removeField("3vvh2trh")

  // remove
  collection.schema.removeField("qkgmhdm4")

  // remove
  collection.schema.removeField("h9h9ff6n")

  // remove
  collection.schema.removeField("lxzerf7j")

  // remove
  collection.schema.removeField("kwzrpjwn")

  // remove
  collection.schema.removeField("yfyqlvlw")

  // remove
  collection.schema.removeField("mq7fuayg")

  // remove
  collection.schema.removeField("yexcusrz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rpduzaqi",
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
    "id": "rwzctqrc",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xl38oypq",
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
    "id": "7qsibwpl",
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
    "id": "hrkeyzhj",
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
    "id": "fbaoperj",
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
    "id": "6365j96k",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kliaf9ew",
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
    "id": "7dhmy1uo",
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
    "id": "dyp8fqnh",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fyf62kpa",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "shruhetl",
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
    "query": "SELECT \n  id, \n  naam,\n  omschrijving,\n  locatie,\n  datum, \n  activiteitstype,\n  banner,\n  inschrijven, \n  inschrijvings_start_datum,\n  inschrijvings_eind_datum, \n  exclusief_vermeylen, \n  extra_velden, \n  formlink \nFROM activiteiten\n  WHERE (gepubliceerd = TRUE) AND (SELECT academiejaar FROM praesidium WHERE id=praesidium.academiejaar) = (SELECT waarde FROM site_instellingen WHERE sleutel=\"huidig_academiejaar\")"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w42yq3pw",
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
    "id": "89cgecsl",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7p9puncr",
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
    "id": "nurpumof",
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
    "id": "3vvh2trh",
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
    "id": "qkgmhdm4",
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
    "id": "h9h9ff6n",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lxzerf7j",
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
    "id": "kwzrpjwn",
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
    "id": "yfyqlvlw",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mq7fuayg",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yexcusrz",
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
  collection.schema.removeField("rpduzaqi")

  // remove
  collection.schema.removeField("rwzctqrc")

  // remove
  collection.schema.removeField("xl38oypq")

  // remove
  collection.schema.removeField("7qsibwpl")

  // remove
  collection.schema.removeField("hrkeyzhj")

  // remove
  collection.schema.removeField("fbaoperj")

  // remove
  collection.schema.removeField("6365j96k")

  // remove
  collection.schema.removeField("kliaf9ew")

  // remove
  collection.schema.removeField("7dhmy1uo")

  // remove
  collection.schema.removeField("dyp8fqnh")

  // remove
  collection.schema.removeField("fyf62kpa")

  // remove
  collection.schema.removeField("shruhetl")

  return dao.saveCollection(collection)
})
