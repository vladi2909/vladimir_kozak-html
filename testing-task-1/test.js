describe("sum", function() {

  describe("for integer:", function() {

    it("test1", function() {
      assert.equal(sum(10, 10), 20);
    });

    it("test2", function() {
      assert.equal(sum(1e9, 1e9), 2e9);
    });

  });

  describe("for floats:", function() {

    it('test1', function() {
      assert.equal(sum(1.25, 3.35), 4.6);
    });

  });

  describe("number in a line:", function() {

    it('test1', function() {
      assert.equal(sum('3', 4), 7);
    });

  });

  describe("for line:", function() {

    it('test1', function() {
      assert.equal(sum('odin', 1), false);
    });

  });

  describe("null , undefined, true/false", function() {

    it('test1', function() {
      assert.equal(sum(null, 1), 1);
    });

    it('test2', function() {
      assert.equal(sum(true, false), 1);
    });

    it('test3', function() {
      assert.equal(sum(undefined, 1), false);
    });

  });

});
