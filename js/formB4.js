document.getElementById("submitB4").addEventListener("click", calculateB4);
function calculateB4() {
    const r0 = parseFloat(document.getElementById("B4_r0").value);// 重要系数
    const fc = parseFloat(document.getElementById("B4_fc").value);// 混凝土强度
    const fy = parseFloat(document.getElementById("B4_fy").value);// 钢筋强度
    const dm = parseFloat(document.getElementById("B4_dm").value);// 柱直径
    const lf = parseFloat(document.getElementById("B4_lf").value);// 分项系数
    const tk = parseFloat(document.getElementById("B4_tk").value);// 保护层厚度
    const bd = parseFloat(document.getElementById("B4_bd").value);// 弯矩标准值
    const gj = parseFloat(document.getElementById("B4_gj").value);// 钢筋直径
    const bs = r0 * lf * bd;
    const A = Math.PI * dm ** 2 / 4;
    const rs = dm / 2 - tk - gj;
    var x = 0.25;
    var xt = undefined;
    var As = undefined;
    var M = undefined;
    while (true) {
        xt = x > 0.625 ? 0 : 1.25 - 2 * x;
        As = (x * fc * A * (1 - Math.sin(2 * Math.PI * x) / (2 * Math.PI * x))) / fy / (xt - x);
        M = ((2 / 3 * fc * A * dm / 2 * (Math.sin(Math.PI * x) ** 3) / Math.PI) + (fy * As * rs * (Math.sin(Math.PI * x) + Math.sin(Math.PI * xt)) / Math.PI)) / 1000000;
        console.log([bs, x, xt, As, M].join("\n"));
        if (M >= bs) {
            break;
        }
        x += 0.001;
    }
    console.log([bs, x, xt, As, M].join("\n"));
    const P = As / (Math.PI * dm ** 2 / 4) * 100;// 计算配筋率
    const ang = 2 * Math.PI * x / Math.PI * 180;// 计算受压区混凝土截面面积的圆心角
    const Asi = { d12: 113.1, d14: 153.9, d16: 201.1, d18: 254.5, d20: 314.2, d22: 380.1, d25: 490.9, d28: 615.8, d32: 804.2 };
    if (isNaN(r0) || isNaN(fc) || isNaN(fy) || isNaN(dm) || isNaN(lf) || isNaN(tk) || isNaN(bd)) { alert("请输入正确的数值"); };
    // 计算配筋
    document.getElementById("output").innerHTML = `
    <h1>钢筋混凝土圆柱受弯设计</h1> 
    <h2>一、主要设计参数</h2>
    <p>综合分项系数：${lf}</p>
    <p>支护结构重要性系数：${r0}</p>
    <p>混凝土强度等级：${document.getElementById('B4_fc').options[document.getElementById('B4_fc').selectedIndex].text}</p>
    <p>钢筋型号种类：${document.getElementById('B4_fy').options[document.getElementById('B4_fy').selectedIndex].text}</p>
    <p>混凝土柱直径：${dm}mm</p>
    <p>混凝土保护层：${tk}mm</p>
    <p>弯矩标准值：${bd}kN-m</p> 
    <h2>二、计算结果</h2>
    <p>弯矩设计值：${bs.toFixed(0)}kN-m</p> 
    <p>受压区混凝土截面面积的圆心角：${ang.toFixed(1)}°</p> 
    <p>计算纵向钢筋面积：${As.toFixed(0)}mm² 
    <p>计算纵向钢筋配筋率ρ：${P.toFixed(2)}(%)</p> 
    <h2>三、配筋方案选择</h2>
    <table id="myTable" border="1" width="500" height="200" cellspacing="0">
        <tbody>
            <tr>
                <td>直径D(mm)</td>
                <td>数量(根)</td>
                <td>面积As(mm²)</td>
                <td>U(%)</td>
                <td>弧向间距(mm)</td>
            </tr>
            <tr>
                <td>12</td>
                <td>${Math.ceil(As / Asi.d12)}</td>
                <td>${(Math.ceil(As / Asi.d12) * Asi.d12).toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d12) * Asi.d12 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 12) / (Math.ceil(As / Asi.d12))).toFixed(0)}</td>
            </tr>
            <tr>
                <td>14</td>
                <td>${Math.ceil(As / Asi.d14)}</td>
                <td>${Math.ceil(As / Asi.d14) * Asi.d14.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d14) * Asi.d14 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 14) / (Math.ceil(As / Asi.d14))).toFixed(0)}</td>
            </tr>
            <tr>
                <td>16</td>
                <td>${Math.ceil(As / Asi.d16)}</td>
                <td>${Math.ceil(As / Asi.d16) * Asi.d16.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d16) * Asi.d16 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 16) / (Math.ceil(As / Asi.d16))).toFixed(0)}</td>
            </tr>
            <tr>
                <td>18</td>
                <td>${Math.ceil(As / Asi.d18)}</td>
                <td>${Math.ceil(As / Asi.d18) * Asi.d18.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d18) * Asi.d18 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 18) / (Math.ceil(As / Asi.d18))).toFixed(0)}</td>
            </tr>
               <td>20</td>
                <td>${Math.ceil(As / Asi.d20)}</td>
                <td>${Math.ceil(As / Asi.d20) * Asi.d20.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d20) * Asi.d20 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 20) / (Math.ceil(As / Asi.d20))).toFixed(0)}</td>
            </tr>
               <td>22</td>
                <td>${Math.ceil(As / Asi.d22)}</td>
                <td>${Math.ceil(As / Asi.d22) * Asi.d22.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d22) * Asi.d22 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 22) / (Math.ceil(As / Asi.d22))).toFixed(0)}</td>
            </tr>
               <td>25</td>
                <td>${Math.ceil(As / Asi.d25)}</td>
                <td>${Math.ceil(As / Asi.d25) * Asi.d25.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d25) * Asi.d25 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 25) / (Math.ceil(As / Asi.d25))).toFixed(0)}</td>
            </tr>
                <td>28</td>
                <td>${Math.ceil(As / Asi.d28)}</td>
                <td>${Math.ceil(As / Asi.d28) * Asi.d28.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d28) * Asi.d28 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 28) / (Math.ceil(As / Asi.d28))).toFixed(0)}</td>
            </tr>
                <td>32</td>
                <td>${Math.ceil(As / Asi.d32)}</td>
                <td>${Math.ceil(As / Asi.d32) * Asi.d32.toFixed(0)}</td>
                <td>${(Math.ceil(As / Asi.d32) * Asi.d32 / (Math.PI * dm ** 2 / 4) * 100).toFixed(2)}</td>
                <td>${(Math.PI * (dm - 2 * tk - 32) / (Math.ceil(As / Asi.d32))).toFixed(0)}</td>
            </tr>
        </tbody>
    </table> `

}

