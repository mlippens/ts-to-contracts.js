walk = require '../lib/walk'
expect = require("chai").expect
assert = require("chai").assert

beforeEach (done)->
  walk.Utils.resetRegisteredVariables()
  done()

describe "Testing the scope mechanism", ->
  it "should make a top level scope", (done)->
    s = new walk.Scope(walk.Scope.top_level);
    expect(s.level).to.be.equal(0)
    expect(s.parent).to.be.null
    expect(s.frame).to.be.a 'array'
    expect(s.registered_frame).to.be.a 'object'
    done()

  it "should enter a new scope", (done)->
    s = new walk.Scope(walk.Scope.top_level)
    second = s.enter_scope()
    expect(second.parent).to.be.equal(s)
    expect(second.level).to.be.equal(s.level + 1)
    done()

  it "should register a new variable in the top scope", (done)->
    s = new walk.Scope(walk.Scope.top_level)
    id = {}
    s.register "foo", id
    expect(s.frame).to.have.length 1
    expect(s.frame[0]).to.be.equal("foo")
    expect(walk.Scope.getScopeMap().get(id)).to.be.equal(s)
    expect(s.registered_frame).to.have.a.property "foo"
    done()

  it "should lookup a registered variable in the same scope", (done)->
    s = new walk.Scope(walk.Scope.top_level)
    id = {}
    s.register "foo", id
    lookup = s.lookup "foo"
    expect(lookup).to.be.defined
    expect(lookup).to.be.equal("foo")
    done()

  it "should lookup a registered variable in a higher scope", (done)->
    s = new walk.Scope(walk.Scope.top_level)
    id = {}
    s.register "foo", id
    second = s.enter_scope()
    lookup = second.lookup "foo"
    expect(lookup).to.be.defined
    expect(lookup).to.be.equal("foo")
    lookup = s.lookup "foo"
    expect(lookup).to.be.defined
    expect(lookup).to.be.equal("foo")
    done()

  it "should lookup an unregistered variable in own scope and out of scope", (done)->
    s = new walk.Scope(walk.Scope.top_level)
    id = {}
    s.register "foo", id
    lookup = s.lookup "bar"
    expect(lookup).to.be.false
    second = s.enter_scope()
    second.register "bar", id
    lookup = s.lookup "bar"
    expect(lookup).to.be.false
    done()

