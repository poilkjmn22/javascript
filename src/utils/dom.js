/* 
 * @Author: fangqi
 * @Date: 2021-12-15 17:51:57
 * @LastEditors: fangqi
 * @LastEditTime: 2021-12-15 17:51:57
 * @Description: Dom相关的方法
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */

function empty(el) {
  const childNodes = [...el.childNodes]
  for(let i = 0; i < childNodes.length; i++) {
    el.removeChild(childNodes[i])
  }
}

export {
  empty
}
