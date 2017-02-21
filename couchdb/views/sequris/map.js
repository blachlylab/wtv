function(doc) {
	if (doc.type === 'XXX') {
        for (var j=0; i<doc.sequris.length; j++) {
            for (var i=0; i<doc.databases.length; i++) {
                
                // split the sequri
                var split1 = sequri.split("/");
                var build = split1[0];
                var split2 = split1.split(":");
                var chrom = split2[0];
                var pos = split2[1];

                // TODO
                var ref = "X";
                var alt = "Y";

                var key = [build, chrom, pos, ref, alt];
                var val = { "id": doc._id,
                            "db": doc.databases[i].dbname,
                            "info": doc.databases[i].info }
                emit( key, val );
            } // i (databases)
        } // j (sequris)
	}
}
