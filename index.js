'use strict';
require('esfunctional');

let emailVerify = require('email-verify') [promisify]('verify');

spawn(function*() {
  let emails = process.argv.slice(2);

  yield Promise.all(emails [map]((email) => spawn(function*() {
    try {
      let result = yield emailVerify(email);
      console.log('email:', email, result.unknown ? '-- unknown' : result.success ? '-- exists' : '-- not exists');
    } catch (err) {
      switch (err.code) {
        case 'ENODATA': console.log('email:', email, '-- mail server for a domain is not found'); break;
        case 'ENOTFOUND': console.log('email:', email, '-- domain is not found'); break;
        default: console.log('email:', email, '-- unknown error:', err.message); break;
      }
    }
  })));

  console.log('=== All emails checked ===');
})

[thena](process.exit)

[catcha]((err) => {
  console.log(
    err.stack ||
    err.message ||
    ('Error: ' + JSON.stringify(err, null, 2))
  );

  process.exit(1);
});
