
var ldap  = require('LDAP');

//http://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/
//Server Information (read-only access):
//Port: 389
//Bind DN: cn=read-only-admin,dc=example,dc=com
//Bind Password: password
//All user passwords are password.
//You may also bind to individual Users (uid) or the two Groups (ou) that include:
//ou=mathematicians,dc=example,dc=com
    //riemann
    //gauss
    //euler
    //euclid
//ou=scientists,dc=example,dc=com
    //einstein
    //newton
    //galieleo
    //tesla

//test from command line:
//ldapsearch -W -h ldap.forumsys.com -D "uid=tesla,dc=example,dc=com" -b "dc=example,dc=com"

//#### Test server on internet

var user       =  'uid=euclid,dc=example,dc=com';
var pass       = "password";
var server     = "ldap.forumsys.com";
//var server     = "23.20.46.132";

var search_options = {
    base: 'ou=mathematicians,dc=example,dc=com',
    scope: '',
    filter: 'cn=*',
    attrs: ''
}

//#### Server in corporate network
//var user       = "USERID@DOMAIN";
//var pass       = "YOUR_PASSWORD";
//var server     = "server_name.domain.net";

//var search_options = {
    //base: 'ou=group,dc=domain,dc=net',
    //scope: '2',
    //filter: 'cn=*',
    //attrs: 'sAMAccountName,mail,cn'
//}

console.log("LDAP Test Application");

var server_uri = "ldap://" + server;

var ldapObj = new ldap({ uri: server_uri , version: 3});


var bind_options = {
    binddn: user,
    password: pass
}

//check your connection
ldapObj.open(function(err) {
    if (err) {
        console.log("Connection error [" + err + "]");
        throw new Error('Connection problem occured!');
    }
    console.log("Connected to ldap [ OK ]");
    ldapObj.simplebind(bind_options,
       function(err){
           if (err) {
               console.log("bind filed, error [" + err + "]");
               throw new Error('bind filed');
           } else {
               console.log("Bind  ldap [ OK ]");
               console.log("Search: STARTED");
               ldapObj.search(search_options, function(err, data){
                   if (err) {
                       throw new Error('Search filed');
                   } else {
                       console.log("######### RESULT #########");
                       console.log( JSON.stringify(data));
                       console.log("##########################");
                   }
                   console.log("Search [DONE]");
                   process.exit(0);
               });
           }
       });
});
