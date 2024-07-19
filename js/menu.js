// 给多个ul绑定点击事件，利用事件委托，给li绑定点击事件，显示对应的表单元素
document.addEventListener('DOMContentLoaded', function () {
    const uls = document.getElementsByClassName('menu');
    for (const ul of uls) {
        ul.addEventListener('click', function (e) {
            if (e.target.tagName === 'LI') {
                const data_form = e.target.getAttribute('data-form');
                const forms = document.getElementsByTagName('form');
                for (const form of forms) {
                    if (data_form === form.id) {
                        form.style.display = 'block';
                    } else {
                        form.style.display = 'none';
                        document.getElementById('output').innerHTML = '';
                    }
                }
            }
        })
    }
})
