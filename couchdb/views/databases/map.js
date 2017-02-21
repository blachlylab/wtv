function(doc) {
	if (doc.type === 'XXX') {
        for (var i=0; i<doc.databases.length;i++) {
            emit( doc.databases[i].dbname, 1);
        } 
	}
}
