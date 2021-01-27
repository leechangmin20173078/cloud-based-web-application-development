var express = require('express'),
    request = require('request'),
    app = express();
    qs = require('querystring')

app.all('/api', function (req, res, next) {

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    const sidoName = req.query.sidoName || '경남';
    const serviceKey = '0ylCRbZzCz1fxqlgFMXSp8mCRJ%2BGZlwj3Dj%2Fz64Os7wtvYJFfvpW%2BdIHeNjyKkh1LREz9JhmEp5TIHtdTdutfA%3D%3D';
    const queryString = {
        dataTerm : '3MONTH',
        InformCode : 'PM10',
        numOfRows : 100,
        returnType : 'JSON',
        sidoName : sidoName
    };
    const targetUrl=`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${serviceKey}&${qs.stringify(queryString)}`;
    request(targetUrl, function(e,r,data) {
        res.json(JSON.parse(data));
    });
});

app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});