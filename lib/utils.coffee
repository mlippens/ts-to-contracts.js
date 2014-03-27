define = require('amdefine')(module) if typeof define isnt 'function'

define (require)->
  C = require('contracts-js')

  makeArrContract = (type)->
    (a)-> typeof a.length isnt 'undefined' and typeof a.length is 'number' and (allInstanceOf(a,type) or a.length is 0)

  makeArrTypeContract = (t)->
    (a)-> typeof a.length isnt 'undefined' and typeof a.length is 'number' and (allTypeOf(a,t) or a.length is 0)

  allTypeOf = (a,type)->
    for i in [0..a.length-1]
      if not (typeof a[i] is type)
        return false
    return true

  allInstanceOf = (a,type)->
    for i in [0..a.length-1]
      if not (a[i] instanceof type)
        return false
    return true

  Arr = C.obj({length: ((x)-> typeof x is "number").toContract()}, {})
  Arr_like = ((x)-> typeof x.length isnt 'undefined').toContract()

  Arr: Arr
  Arr_like: Arr_like
  makeArrContract: makeArrContract
  makeArrTypeContract: makeArrTypeContract

