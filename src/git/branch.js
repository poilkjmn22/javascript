/*
 * @Author: fangqi
 * @Date: 2022-03-11 16:03:26
 * @LastEditors: fangqi
 * @LastEditTime: 2022-03-11 16:18:28
 * @Description: git 分支命令
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */

function noteBranch(elContainer) {
  elContainer.innerHTML = `<pre>
    git remote add origin ...<br />
    git branch --set-upstream-to=origin/branchName branchName
    git checkout -b xxx origin/xxx <br />
    </pre>
  `;
}

function noteRoolback(elContainer) {
  elContainer.innerHTML = `<ul>
    <li>1、自己的分支回滚直接用reset。</li>
    <li>2、公共分支回滚用revert</li>
    <li>3、错的太远了直接将代码全部删掉，用正确代码替代</li>
    </ul>
  `;
}

export { noteBranch, noteRoolback };
