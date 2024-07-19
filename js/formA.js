document.getElementById("submitA1").addEventListener("click", calculateA1);
document.getElementById("submitA2").addEventListener("click", calculateA2);
document.getElementById("submitA3").addEventListener("click", calculateA3);
document.getElementById("submitA4").addEventListener("click", calculateA4);
document.getElementById("submitA5").addEventListener("click", calculateA5);
// 暗挖断面深孔注浆
function calculateA1() {
    const volume1 = parseFloat(document.getElementById("volume1").value);// 体积
    const Slurry1 = parseFloat(document.getElementById("Slurry1").value);// 泥浆单价
    const porosity1 = parseFloat(document.getElementById("porosity1").value);// 孔隙率
    const filling1 = parseFloat(document.getElementById("filling1").value);// 填充系数
    const loss1 = parseFloat(document.getElementById("loss1").value);// 损失系数
    const result1 = volume1 * Slurry1 * porosity1 * filling1 * loss1;
    document.getElementById("output").innerHTML = `
    <h2>计算结果</h2>
     <p>加固土体体积：${volume1}m³</p>
     <p>浆液单价：${Slurry1}元/m³</p>
     <p>合计：${result1.toFixed(0)}元</p>`;

}
// 盾构小导管径向注浆
function calculateA2() {
    const total2 = parseFloat(document.getElementById("total2").value);// 总量
    const length2 = parseFloat(document.getElementById("length2").value);// 长度
    const pipe2 = parseFloat(document.getElementById("pipe2").value);// 管道直径
    const price2 = parseFloat(document.getElementById("price2").value);// 单价
    const radius2 = parseFloat(document.getElementById("radius2").value);// 半径
    const porosity2 = parseFloat(document.getElementById("porosity2").value);// 孔隙率
    const filling2 = parseFloat(document.getElementById("filling2").value);// 填充系数
    const loss2 = parseFloat(document.getElementById("loss2").value);// 损失系数
    const result2 = (total2 * length2 * pipe2) + (Math.PI * radius2 * radius2 * length2 * total2 * price2 * porosity2 * filling2 * loss2);
    document.getElementById("output").innerHTML = `
    <h2>计算结果</h2>
     <p>小导管总量：${total2}根</p>
     <p>浆液单价：${price2}元/m³</p>
     <p>合计：${result2.toFixed(0)}元</p>`;
}
// 地面袖阀管注浆
function calculateA3() {
    const length3 = parseFloat(document.getElementById("length3").value);
    const width3 = parseFloat(document.getElementById("width3").value);
    const height3 = parseFloat(document.getElementById("height3").value);
    const depth3 = parseFloat(document.getElementById("depth3").value);
    const distance3 = parseFloat(document.getElementById("distance3").value);
    const kPrice3 = parseFloat(document.getElementById("kPrice3").value);
    const sPrice3 = parseFloat(document.getElementById("sPrice3").value);
    const radius3 = parseFloat(document.getElementById("radius3").value);
    const porosity3 = parseFloat(document.getElementById("porosity3").value);
    const filling3 = parseFloat(document.getElementById("filling3").value);
    const loss3 = parseFloat(document.getElementById("loss3").value);
    const sum3 = 2 / distance3 / distance3 * length3 * width3;
    const result3 = (sum3 * depth3 * kPrice3) + (Math.PI * radius3 * radius3 * height3 * sum3 * sPrice3 * porosity3 * filling3 * loss3);
    document.getElementById("output").innerHTML = `
    <h2>计算结果</h2>
    <p>合计：${result3.toFixed(0)}元</p>`;

}
// 旋喷加固注浆
function calculateA4() {
    const length4 = parseFloat(document.getElementById("length4").value);
    const width4 = parseFloat(document.getElementById("width4").value);
    const height4 = parseFloat(document.getElementById("height4").value);
    const depth4 = parseFloat(document.getElementById("depth4").value);
    const diameter4 = parseFloat(document.getElementById("diameter4").value);
    const distance4 = parseFloat(document.getElementById("distance4").value);
    const kPrice4 = parseFloat(document.getElementById("kPrice4").value);
    const zPrice4 = parseFloat(document.getElementById("zPrice4").value);
    const sum4 = 1 / distance4 / distance4 * length4 * width4;
    const result4 = (sum4 * (depth4 + height4) * kPrice4) + (Math.PI * diameter4 * diameter4 / 4 * height4 * zPrice4 * sum4);
    document.getElementById("output").innerHTML = `
    <h2>计算结果</h2>
    <p>合计：${result4.toFixed(0)}元</p>`;
}
// 隔离桩加固
function calculateA5() {
    const length5 = parseFloat(document.getElementById("length5").value);
    const width5 = parseFloat(document.getElementById("width5").value);
    const height5 = parseFloat(document.getElementById("height5").value);
    const depth5 = parseFloat(document.getElementById("depth5").value);
    const diameter5 = parseFloat(document.getElementById("diameter5").value);
    const distance5 = parseFloat(document.getElementById("distance5").value);
    const kPrice5 = parseFloat(document.getElementById("kPrice5").value);
    const zPrice5 = parseFloat(document.getElementById("zPrice5").value);
    const sum5 = 1 / distance5 * width5 * length5;
    const result5 = (sum5 * (depth5 + height5) * kPrice5) + (Math.PI * diameter5 * diameter5 / 4 * height5 * zPrice5 * sum5);
    document.getElementById("output").innerHTML = `
    <h2>计算结果</h2>
    <p>合计：${result5.toFixed(0)}元</p>`;
}

