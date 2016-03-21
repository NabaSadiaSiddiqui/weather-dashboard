'use strict';

describe('weatherDashboard.version module', function() {
  beforeEach(module('weatherDashboard.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
