# wtv


## API endpoints
```
/sequri/<sequri>	primary endpoint
databases/		list of databases
databases/<dbid>	stats about database (no. ids, etc.)
```

### Query parameters
```
change=N1>N2		eg. C>T (or should this be change=N,M)
change=delN1		or should this be change=N,. (dot)
filter=db:dbname	or should this be db=dbname?
```

## Query URI possibilities
```
GET https://wtv.host.tld/grch37/chr17:123456789?C=T
GET https://wtv.host.tld/grch37/chr17:123456789?change=C>T
GET https://wtv.host.tld/wtv/v1/grch37/chr17:123456789?C=T
GET https://wtv.host.tld/sequri/grch37/chr17:123456789?C>T
GET https://wtv.host.tld/ids/grch37/chr17:123456789?C>T
```

## API Response
```
{ "status": "ok | error:<errmsg>",
  "query" : "sequri query string; should this include URI query params?",
  "results": [ { <results obj> }, { <results obj> }, ... ]
}

resultsobj:
{ "id": "database identifier, eg. rs#, COSMnnnnn, etc.",
  "database": "dbname, eg. dbsnp-141-all",
  "info": "INFO string from VCF, eg. AF=0.9,AF_CEU=0.8,AF_YRI=0.85..."
}

{ "status": "error:database not found" }

{ "status": "ok",
  "query": "grch37/chr17:123456789?C=T",
  "results": [ {"dbsnp-149-all": "rs987654321"},
               {"cosmic-v60-noncoding": "COSM54321"} ]
}

{ "status": "ok",
  "query": "grch37/chr17:123456789?C=T",
  "results": [ { "database": "dbsnp-149-all",
                 "id": "rs987654321",
                 "metadata": "AF=0.9,AF_CEU=0.8,AF_YRI=0.85" } ]
}
```

## Database documents

With flexible schema:
```
{ _id: rs#, COSM id, etc.,
  sequris: [ <sequri>, <sequri>, ... ]
  ref: ref nt
  alt: alt nt
  dbname: "INFO string",
  dbname: "INFO string",
  ...
}
```

With fixed schema:
```
{ _id: rs#, COSM id, etc.,
  sequris: [ <sequri>, <sequri>, ... ]
  ref: ref nt
  alt: alt nt
  databases: [ {"dbname": "dbsnp-141-all", "info": "INFO string"},...]
}
```

## Database map function

### view: sequris
```
for each doc
    for each {dbname type key in doc | database in databases}
emit k,v
with k: [build, chr, pos, ref, alt]
with v: {id=_id, db=dbname, info=info}
```

### view: databases
```
map
for each doc
    for each {dbname type key in doc | database in databases}
emit <[dbname,build], 1>
reduce: _count
```
