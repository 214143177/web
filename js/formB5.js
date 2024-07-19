document.getElementById("submitB5").addEventListener("click", calculateB5);
function calculateB5() {
    const r0 = parseFloat(document.getElementById("B5_r0").value);// 重要系数
    const ft = parseFloat(document.getElementById("B5_ft").value);// 混凝土强度
    const fy = parseFloat(document.getElementById("B5_fy").value);// 钢筋强度
    const dm = parseFloat(document.getElementById("B5_dm").value);// 柱直径
    const lf = parseFloat(document.getElementById("B5_lf").value);// 分项系数
    const bd = parseFloat(document.getElementById("B5_bd").value);// 剪力标准值
    const sp = parseFloat(document.getElementById("B5_sp").value);// 箍筋间距

    const h0 = 1.6 * dm / 2;
    const b = 1.76 * dm / 2;
    const bs = r0 * lf * bd;
    const As = (bs * 1000 - 0.7 * ft * b * h0) / (fy * h0 * 2 / sp);

    console.log([r0, ft, fy, dm, lf, bd, sp, h0, b, bs, As].join("\n"));
    document.getElementById("output").innerHTML = `
    <h2>计算结果</h2>
    <p>所需箍筋面积：${As.toFixed(0)}mm²</p>`;

}