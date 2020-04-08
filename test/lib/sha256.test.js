var should = require('should');
var rewire = require("rewire");

const sha256Module = rewire("../../src/lib/sha256.js");

describe('Lib - sha256', function() {
  describe('#sha256()', function() {
    const sha256 = sha256Module.__get__('sha256');
    const hashSet = [
      {entry: 'test1@mapotempo.com', result: 'c1e38fd06a2afc0414b551d4ed79e00d508fd9a456e2158eb44a5d6dd95e704c'},
      {entry: 'toto@mapotempo.com', result: 'b0e83b22d23c9dcb3ed42fc3f2b89e87c17e3f729f8f68dc38d719d9644f5e44'},
      {entry: 'blablabl', result: '0f804b092f2d5b14f0115b67928fd17ecab7172be0138e11c5770556c155edaf'},
      {entry: 'azertyuiop', result: 'aa3d2fe4f6d301dbd6b8fb2d2fddfb7aeebf3bec53ffff4b39a0967afa88c609'},
      {entry: '789dhajzi123456', result: 'ca052e3412df37d8c14cbd94f795a7b88f6f19087d4fd7c07d2596b1511a80c0'},
      {entry: 'test espace test', result: '3c343379249ed3214726d903640ca7ea691318bfd084b701e542008b4e3ad2f5'},
    ];
    it('should return true crypt', function() {
      hashSet.forEach(test => should.equal(sha256(test.entry), test.result));
    });
  });
});
