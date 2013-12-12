/**
 * Example:
 *   var test = document.getElementById('test');
 *   evt(test).bind('custom', function() {
 *
 *   })
 *
 *   evt(test).trigger('custom');
 *
 */

;
var evt = (function(global) {'use strict';
  var isIE = !!document.all;

  function wrap(node) {
    return new _wrap(node);
  }

  function _wrap(node) {
    var _node = (node && nodeType == 1) ? node : '';
    if (!_node) {
      return 'Invalidate node !';
    }

    // 缓存自定义事件，以及当前的node对象。
    this._events = {};
    this._node = _node;
  }

  function _type(o) {
    var type = {}.toString.call(o);
    return type.slice(7, -1).toLowerCase();
  }

  var proto = _wrap.prototype;
  proto.bind = function(type, handle, capture) {
    if (_type(type) !== 'string' || _type(type) !== 'function') {
      return 'Invalidate params !';
    }
    var node = this._node;
    if (isIE) {
      var events = this._events;
      node.attachEvent('on' + type, handle);
    } else {
      node.addEventListener(type, handle, capture);
    }
    if (!events[type]) {
      events[type] = [handle];
    } else {
      events[type].push(handle);
    }
    return 1;
  };

  proto.unbind = function(type, handle) {
    if ((_type(type) !== 'string') || (handle && _type(handle) !== 'function')) {
      return 'Invalidate params !';
    }
    var events = this._events;
    if (!events[type]) {
      return 'Not exist specified event !';
    }
    for (var i = 0; i < events[type].length; i++) {
      if (events[i] == handle) {
        events.splice(i, 1);
      }
    }
    return 1;
  };

  proto.trigger = function() {

    // 使用原生的customEvent对象，createEvent已经不推荐被使用。
    try {
      
    } catch (e) {
      ;
    }

    return 1;
  };

  return wrap;

})(this);

