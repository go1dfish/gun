
    const SEA = require('./root')
    const Buffer = require('./buffer')
    const api = {Buffer: Buffer}
    var o = {};

    if(SEA.window){
      api.crypto = window.crypto || window.msCrypto;
      api.subtle = (api.crypto||o).subtle || (api.crypto||o).webkitSubtle;
      api.TextEncoder = window.TextEncoder;
      api.TextDecoder = window.TextDecoder;
      api.random = (len) => Buffer.from(api.crypto.getRandomValues(new Uint8Array(Buffer.alloc(len))))
    }
    if(!api.crypto){try{
      var crypto = require('crypto');
      const { TextEncoder, TextDecoder } = require('text-encoding')
      Object.assign(api, {
        crypto,
        //subtle,
        TextEncoder,
        TextDecoder,
        random: (len) => Buffer.from(crypto.randomBytes(len))
      });
      //try{
        const WebCrypto = require('node-webcrypto-ossl');
        api.ossl = api.subtle = new WebCrypto({directory: 'ossl'}).subtle // ECDH
      //}catch(e){
        //console.log("node-webcrypto-ossl is optionally needed for ECDH, please install if needed.");
      //}
    }catch(e){
      console.log("node-webcrypto-ossl and text-encoding may not be included by default, please add it to your package.json!");
      OSSL_WEBCRYPTO_OR_TEXT_ENCODING_NOT_INSTALLED;
    }}

    module.exports = api
  
