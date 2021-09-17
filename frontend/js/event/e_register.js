import Swal from 'sweetalert2'
import { ERROR_CHK, ec_with_singer, accounts } from "../metamask.js"

(function () {
    let deploy_url = window.location.href
    let deploy_cursor_cid = deploy_url.indexOf("cid")
    let deploy_cursor_decode = deploy_url.indexOf("decode")
    let deploy_cid = deploy_url.slice(deploy_cursor_cid+4, deploy_cursor_decode - 1)
    let deploy_decode = deploy_url.slice(deploy_cursor_decode+7)


    let p = document.createElement('p');
    p.setAttribute("class", "alert alert-primary display")
    p.setAttribute("role", "alert")
    p.innerHTML = `Your ETP's decoded HEX without prefix 0x1220 is <br> <b>${deploy_decode}</b> <br>` +
                    `Your IPFS CID is <br> <b>${deploy_cid}</b>`;

    let b = document.querySelector('.py-5, .text-center')

    b.appendChild(p)
})();

const btn_reg = document.querySelector('#etp-reg-eth');
btn_reg.addEventListener('click', async ()=>{
    let deploy_url = window.location.href
    let deploy_cursor_decode = deploy_url.indexOf("decode")
    let deploy_decode = deploy_url.slice(deploy_cursor_decode+7)
    await ec_with_singer.mintBatch(accounts[0], [`0x${deploy_decode}`], '0x00')

    Swal.fire({
        position: 'center',
        icon: 'success',
        html: '<h4>Your ETP is registered to Ethereum!</h4><br>',
        showConfirmButton: true,
      })
})

const btn_reg_chk = document.querySelector('#etp-check');
btn_reg_chk.addEventListener('click', async ()=> {
    let deploy_url = window.location.href
    let deploy_cursor_decode = deploy_url.indexOf("decode")
    let deploy_decode = deploy_url.slice(deploy_cursor_decode+7)
    let res = await ec_with_singer.isEtpValid(`0x${deploy_decode}`)

    if (res === true) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            html: '<h4>Your ETP status is valid!</h4><br>',
            showConfirmButton: true,
          })
    }
    else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            html: '<h4>ETP registration process was reverted</h4><br>',
            showConfirmButton: true,
          })
    }
})