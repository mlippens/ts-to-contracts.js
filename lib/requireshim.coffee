root = this ? exports
_define = root.define
define = (name, deps, cb)->
  if not cb?
    if not deps?
      cb = name
    else
      cb = deps
      deps = name
  newroot = Object.create(root)

  callback = ->
    args = Array::slice.call(arguments)
    for arg in args
      if arg.global?
        for own prop, val of arg
          Object.defineProperty(newroot,prop, value: val)
    cb.apply newroot, arguments

  _define name, deps, callback

root.define = define

