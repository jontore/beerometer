for each (reading in event) {
  var newBeers = ctx.get('new_beers') || 0;
  var partyLevel = ctx.get("party_level") || 0;
  var partyDecreaser = ctx.get("party_decreaser") || 0;
  var now = (new Date()).getTime();
  var lastMessage = ctx.get("last_message") || now;
  if (reading.meaning === 'party') {
    var beerCount = reading.value;
    if (beerCount === 1) {
      partyLevel++;
      ctx.put("party_level", partyLevel);
      ctx.put("party_decreaser", 1);
      ctx.put("last_message", now);
      newBeers--;
      ctx.put('new_beers', newBeers);
    }
  }

  if (reading.meaning === 'newBeers') {
    ctx.put("new_beers", parseInt(reading.value, 10));
  }

  var diff = now - lastMessage;
  if (diff > 20000) {
    partyLevel -= partyDecreaser;
    partyDecreaser = 2*partyDecreaser;
    if (partyLevel < 0) {
      partyLevel = 0;
      partyDecreaser = 1;
    }
    ctx.put("party_level", partyLevel);
    ctx.put("party_decreaser", partyDecreaser);
   }
   	return GenerateDeviceReading("cc76c893-3267-4690-a719-337bcb4702cb", {
      'meaning': 'partyLevel',
      'value': partyLevel
    });
}
