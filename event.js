/**
 * 事件管理组件
 *
 * 版权所有(C) 2013 EchoFUN (xukai.ken@gmail.com)
 * 
 * 2013.12.12 初始化文件。
 * 
 * Example:
 *   var test = document.getElementById('test');
 *   evt(test).bind('custom', function() {
 *
 *   })
 *
 *   evt(test).trigger('custom');
 *
 */

;var cacheId = 'cache' + setTimeout(function() {}, 0);

var evt = (function(global, cacheId) {
  'use strict';
  var isIE = !!document.attachEvent;
  var typeExpress = /^[a-z]+$/i;

  // 缓存所有的事件。
  var events = {};

  // 产生一个唯一的键值。
  var globalId = 1;

  function wrap(node) {
    return new _wrap(node);
  }

  function _wrap(node) {
    var _node = (node && node.nodeType == 1) ? node : '';
    if (!_node) {
      return 'Invalidate node !';
    }

    _node[cacheId] || (_node[cacheId] = globalId++);
    this._node = _node;
  }

  function _type(o) {
    var type = {}.toString.call(o);
    return type.slice(8, -1).toLowerCase();
  }

  var proto = _wrap.prototype;
  proto.bind = function(type, handle, capture) {
    if (_type(type) !== 'string' || !typeExpress.test(type) || _type(handle) !== 'function') {
      return 'Invalidate params !';
    }

    var node = this._node;
    if (isIE) {
      node.attachEvent('on' + type, handle);
    } else {
      node.addEventListener(type, handle, capture);
    }

    // 如果还未开始对这个对象有缓存，则加入缓存序列。
    if (!events[node[cacheId]]) {
      events[node[cacheId]] = {};
    }
    var evts = events[node[cacheId]];
    if (evts && evts[type]) {
      evts[type].push(handle);
    } else {
      evts[type] = [handle];
    }
    return this;
  };

  proto.unbind = function(type, handle, capture) {
    if (_type(type) !== 'string' || !typeExpress.test(type) || (handle && (_type(handle) !== 'function'))) {
      return 'Invalidate params !';
    }
    var node = this._node;
    var evts = events[node[cacheId]];
    if (!evts[type]) {
      return 'Not exist specified event !';
    }
    
    if (isIE) {
      node.detachEvent('on' + type, handle);
    } else {
      node.removeEventListener(type, handle, capture || false);
    }
    if (handle) {
      for (var i = 0; i < evts[type].length; i++) {
        if (evts[type][i] == handle) {
          evts[type].splice(i, 1);
        }
      }
    } else {
      evts[type] = [];
    }
    return this;
  };

  proto.trigger = function(type) {
    if (_type(type) !== 'string') {
      return 'Invalidate params !';
    }
    
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    var evts = events[this._node[cacheId]];
    if (evts[type]) {
      var evtsList = evts[type];
      for (var i in evtsList) {
        evtsList[i].apply(this._node, args);
      }
    }
    return this;
  };

  return wrap;
})(this, cacheId);