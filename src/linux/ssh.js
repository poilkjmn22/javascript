/*
 * @Author: fangqi
 * @Date: 2023-10-19 20:31:58
 * @LastEditors: fangqi
 * @LastEditTime: 2023-10-19 20:31:58
 * @Description:
 * @Copyright(c) 2021 CMIM Network Co.,Ltd. All Rights Reserve
 */

function ssh(elContainer) {
  elContainer.innerHTML = `<pre>
    ssh fangqi@192.168.3.25 -p 22<br />
    </pre>
  `;
}

function ssh_keygen(elContainer) {
  elContainer.innerHTML = `<pre>
    ssh_keygen<br />
    cat .ssh/id_rsa.pub | ssh fangqi@192.168.3.25 -p 22 "cat >> .ssh/authorized_keys"<br />
    </pre>
  `;
}

export { ssh, ssh_keygen };
