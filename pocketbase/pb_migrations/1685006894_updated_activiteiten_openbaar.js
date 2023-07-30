migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT \n  id, \n  naam,\n  omschrijving,\n  locatie,\n  datum, \n  activiteitstype,\n  banner,\n  inschrijven, \n  inschrijvings_start_datum,\n  inschrijvings_eind_datum, \n  exclusief_vermeylen, \n  extra_velden, \n  formlink \nFROM activiteiten\n  WHERE (gepubliceerd = TRUE) AND (SELECT academiejaar FROM praesidium WHERE id=praesidium) = (SELECT waarde FROM site_instellingen WHERE sleutel=\"huidig_academiejaar\")"
  }

  // remove
  collection.schema.removeField("lxccurjz")

  // remove
  collection.schema.removeField("mmsvgdy2")

  // remove
  collection.schema.removeField("pcccdyn5")

  // remove
  collection.schema.removeField("zjdouuid")

  // remove
  collection.schema.removeField("bfhzlg0z")

  // remove
  collection.schema.removeField("tuxrdcfq")

  // remove
  collection.schema.removeField("zron47jz")

  // remove
  collection.schema.removeField("lzvxvtnx")

  // remove
  collection.schema.removeField("ogflfyjw")

  // remove
  collection.schema.removeField("v6kehag9")

  // remove
  collection.schema.removeField("gnpw0e4e")

  // remove
  collection.schema.removeField("4ybio9mv")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0kdf14cy3mzd0pu")

  collection.options = {
    "query": "SELECT \n  id, \n  naam,\n  omschrijving,\n  locatie,\n  datum, \n  activiteitstype,\n  banner,\n  inschrijven, \n  inschrijvings_start_datum,\n  inschrijvings_eind_datum, \n  exclusief_vermeylen, \n  extra_velden, \n  formlink \nFROM activiteiten\n  WHERE (gepubliceerd = TRUE) AND (SELECT academiejaar FROM praesidium WHERE id=praesidium.id) = (SELECT waarde FROM site_instellingen WHERE sleutel=\"huidig_academiejaar\")"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lxccurjz",
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
    "id": "mmsvgdy2",
    "name": "omschrijving",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pcccdyn5",
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
    "id": "zjdouuid",
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
    "id": "bfhzlg0z",
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
    "id": "tuxrdcfq",
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
    "id": "zron47jz",
    "name": "inschrijven",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lzvxvtnx",
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
    "id": "ogflfyjw",
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
    "id": "v6kehag9",
    "name": "exclusief_vermeylen",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gnpw0e4e",
    "name": "extra_velden",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4ybio9mv",
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

  return dao.saveCollection(collection)
})
