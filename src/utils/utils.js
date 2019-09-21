import pathToRegexp from "path-to-regexp";

export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[ key ] = key
      }
    }
  }
  return mirrored
}

/**
 * 解析时间
 * @param time
 * @param cFormat
 * @returns {*}
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = array.map(item => ({ ...item }))
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[ data[ index ][ id ] ] = data[ index ]
  })

  data.forEach((item) => {
    let hashVP = hash[ item[ pid ] ]
    if (hashVP) {
      !hashVP[ children ] && (hashVP[ children ] = [])
      hashVP[ children ].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function getCurrentMenu (location, arrayMenu) {
  if (!!arrayMenu) {
    let current = []
    for (let i = 0; i < arrayMenu.length; i++) {
      const e = arrayMenu[ i ];
      const child = getCurrentMenu(location, e.children);
      if (!!child && child.length > 0) {
        child.push({ ...e, children: null });
        return child;
      }
      if (e.href && pathToRegexp(e.href).exec(location)) {
        current.push({ ...e, children: null });
        return current;
      }
    }
    return current;
  }
  return null;
}

/**
 * 过滤JS数组中的空值，返回新的数组
 * @param array 需要过滤的数组
 * @returns {Array} []
 */
export function clearArrTrim(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == "" || typeof(array[i]) == "undefined") {
      array.splice(i, 1);
      i = i - 1;
    }
  }
  return array;
}


/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 *
 * @param fmt
 * @returns {*}
 */
export function dateFormat(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }

  return fmt;
}



/**
 * node数组转化成树形结构
 * @param nodes
 * @param parentId
 * @returns {*}
 */
export function createTreeData(nodes, parentId) {
  var groups = {};
  // 按父节点将节点分组
  for (var i in nodes) {
    //第一次进来新创建一个数组
    if (!groups[nodes[i].pId]) {
      groups[nodes[i].pId] = [];
    }
    let treeData = {
      id: nodes[i].id,
      pid: nodes[i].pId,
      label: nodes[i].name,
      isLeaf: !nodes[i].isParent,
      disabled: false
    }
    groups[nodes[i].pId].push(treeData);
    if (parentId && parentId === nodes[i].id) { // 发现传入的根节点id作为节点id时，将根节点设置为该节点的父节点
      parentId = nodes[i].pId;
    }
  }

  var rootNodes = groups[parentId];
  groups[parentId] = null; // [SAFEGUARD]防止自为父节点或互为父节点（有环图结构）导致的死循环
  function traverseTreeNodeGroup(treeNodeGroup) {
    for (var i in treeNodeGroup) {
      var node = treeNodeGroup[i];
      if (groups[node.id]) {
        node.children = groups[node.id];
        groups[node.id] = null; // [SAFEGUARD]防止自为父节点或互为父节点（有环图结构）导致的死循环
        traverseTreeNodeGroup(node.children);
      }
    }
  }

  traverseTreeNodeGroup(rootNodes);
  return rootNodes;
}

