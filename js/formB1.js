document.getElementById("submitB1").addEventListener("click", calculateB1);
function calculateB1() {
    const r0 = parseFloat(document.getElementById("r0").value);// 重要性系数
    const dm = parseFloat(document.getElementById("dm").value);// 外径
    const wt = parseFloat(document.getElementById("wt").value);// 壁厚
    const sp = parseFloat(document.getElementById("sp").value);// 间距
    const ang = parseFloat(document.getElementById("ang").value);// 角度
    const lx = parseFloat(document.getElementById("lx").value);// 竖向长度
    const ol = document.getElementById("ol").checked;// 重叠
    const lf = parseFloat(document.getElementById("lf").value);// 荷载分项数
    const st = parseFloat(document.getElementById("st").value);// 标准值
    const sg = parseFloat(document.getElementById("sg").value);// 施工荷载
    const fi = parseFloat(document.getElementById("fi").value);// 等效弯矩系数
    const el = parseFloat(document.getElementById("el").value);// 弹性模量
    const Nd = st * r0 * lf * sp / Math.sin(ang * Math.PI / 180);// 轴力设计值
    const F = wt <= 16 ? 215 : 205; // 钢材抗拉、压、弯强度设计值
    const Fv = wt <= 16 ? 125 : 120;// 钢材抗剪强度
    const Fy = wt <= 16 ? 235 : 225;// 钢材屈服强度
    const Ek = Math.sqrt(235 / Fy);// 钢号修正系数
    const Dtd = 100 * Ek ** 2;// 修正直径厚度比值系数
    const X = (dm - 2 * wt) / dm; // 内径外径比例系数
    const An = Math.PI * dm ** 2 / 4 * (1 - X ** 2); // 净截面面积
    const Wn = Math.PI * dm ** 3 / 32 * (1 - X ** 4);//净截面抗弯模量
    const Uw = An / 10 ** 6 * 7850 * 10 / 1000;// 单位质量
    const I = 0.25 * dm * Math.sqrt(1 + X ** 2);// 回转半径
    const Dt = dm / wt;// 直径厚度比值系数
    const Rm = Dt < An ? 1.15 : 1;// 圆管截面构件的塑性发展系数
    const Mx = r0 * lf * ((7850 * An / 1000 / 100000) + sg) * (lx ** 2 / 8);// 由自重、施工荷载引起的竖向平面内弯矩值
    const E0 = 1 / 1000 > 0.04 ? 1 / 1000 : 0.04;// 偏心距
    const Mxe = E0 * Nd;// 由施工误差引起的水平、竖向平面内附加弯矩值
    const MABx = Mx + Mxe;// 构件AB两端关于x轴弯矩
    const MABy = Mxe;// 构件AB两端关于y轴弯矩
    const M = Math.sqrt(MABx ** 2 + MABy ** 2);// 计算双向压弯圆管构件整体稳定时的M值
    const Rx = lx / I * 1000;// X方向长细比
    const Ry = ol ? lx * 1.5 * 1000 / I : lx / I * 1000;// Y方向长细比
    const R = Rx > Ry ? Rx : Ry;// 长细比取大值
    const Rn = R * Math.sqrt(Fy / el) / Math.PI;// 钢管长细比稳定系数
    const YT = Rn > 0.215 ? ((0.965 + 0.3 * Rn + Rn ** 2) - ((0.965 + 0.3 * Rn + Rn ** 2) ** 2 - 4 * Rn ** 2) ** 0.5) / (2 * Rn ** 2) : 1 - 0.65 * Rn ** 2;// 轴心受压构件的整体稳定系数φ
    const Fg = (Nd * 1000 / An) + (M * 1000000 / Wn / Rm);// 钢管的强度验算值于215比较
    const Ne = Math.PI ** 2 * el * 0.001 * An / R ** 2;// 最大长细比的欧拉力
    const Nex = Ne / 1.1;// 欧拉临界力
    const ztwdx = ((Nd * 1000 / An / YT) + ((fi * M * 1000 * 1000) / (Wn * Rm * (1 - 0.8 * (Nd / Nex))))) / F;// 整体稳定性验算
    console.log([ol,Nd, F, Fv, Fy, Ek, Dtd, X, An, Wn, Uw, I, Dt, Rm, Mx, E0, Mxe, MABx, MABy, M, Rx, Ry, R, Rn, YT, Fg, Ne, Nex, ztwdx].join('\n'));
    document.getElementById("output").innerHTML = `
    <h1>钢管支撑强度及稳定性计算</h1> 
    <h2>一、主要参数</h2>
    <p>结构重要性系数γ<sub>0</sub>：${r0}</p>
    <p>荷载分项系数：${lf}</p>
    <p>钢支撑长度L：${lx}m&nbsp&nbsp重叠：${ol ? '是' : '否'}</p>
    <p>钢支撑角度A：${ang}°</p>
    <p>钢支撑直径D：${dm}mm</p>
    <p>钢支撑壁厚t：${wt}mm</p>
    <p>钢支撑间距S：${sp}m</p>
    <p>钢材弹性模量E：${el}N/mm²</p>
    <p>轴力标准值N<sub>k</sub>：${st}kN²</p>
    <p>施工荷载q<sub>0</sub>：${sg}kN/m²</p>
    <p>等效弯矩系数β：${fi}</p>
    <h2>二、计算过程</h2>
    <p>轴力设计值N<sub>d</sub>：${Nd.toFixed(0)}kN</p>
    <p>钢材的屈服强度f<sub>y</sub>：${Fy}N/mm²</p>
    <p>钢号修正系数ε<sub>k</sub>：${Fy}N/mm²</p>
    <p>由自重、施工荷载引起的竖向平面内弯矩值M<sub>x</sub>：${Mx.toFixed(0)}KN·m</p>
    <p>钢支撑偏心距e<sub>0</sub>：${E0}m</p>
    <p>施工误差引起的竖向平面内附加弯矩值M<sub>xe</sub>：${Mxe.toFixed(0)}KN·m</p>
    <p>构件AB两端关于x轴弯矩M<sub>ABx</sub>：${MABx.toFixed(0)}KN·m</p>
    <p>构件AB两端关于y轴弯矩M<sub>ABy</sub>：${MABy.toFixed(0)}KN·m</p>
    <p>构件双向压弯整体稳定时的弯矩值M：${M.toFixed(0)}KN·m</p>
    <p>b类型截面λ<sub>n</sub>：${Rn.toFixed(3)}</p>
    <p>轴心受压构件的整体稳定系数φ：${YT.toFixed(3)}</p>
    <p>构件最大长细比计算的欧拉力N<sub>e</sub>：${Ne.toFixed(0)}KN</p>
    <p>构件最大长细比计算的欧拉临界力N<sub>ex</sub>：${Nex.toFixed(0)}KN</p>
    <h2>三、计算结果</h2>
    `
    // 输出结果
    const resultB1 = [];
    if (ztwdx <= 1) {
        resultB1.push(`整体稳定性验算${ztwdx.toFixed(3)} < 1：满足`);
    } else {
        resultB1.push(`整体稳定性验算${ztwdx.toFixed(3)} > 1：不满足`);
    }
    if (Fg <= 215) {
        resultB1.push(`钢管的强度验算${Fg.toFixed(1)} < 215：满足`);
    } else {
        resultB1.push(`钢管的强度验算${Fg.toFixed(1)} > 215：不满足`);
    }
    if (R <= 150) {
        resultB1.push(`长细比${R.toFixed(1)} < 150：满足`);
    } else {
        resultB1.push(`长细比${R.toFixed(1)} > 150：不满足`);
    }
    if (Dt <= Dtd) {
        resultB1.push(`径厚比${Dt.toFixed(1)} < ${Dtd}：满足`);
    } else {
        resultB1.push(`径厚比${Dt.toFixed(1)} > ${Dtd}：不满足`);
    }
    document.getElementById("output").innerHTML += resultB1.join("<br>");
}


