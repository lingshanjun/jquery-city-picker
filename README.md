# jquery-city-picker
一个省市区的联动选择插件，基于jquery+腾讯api行政区划接口数据
### Use
1. 在浏览器端依次引入如下三个文件：
    - `<script src="path/to/jquery-1.11.3.min.js"></script>`
    - `<script src="path/to/areaData.min.js"></script>`
    - `<script src="path/to/jquery.citypicker.min.js"></script>`
2. 实例化对象
    `
    $(function(){
        new CityPicker().init();
    });
    `
    
    注意：为保证正常加载插件数据，需在dom加载完成后实例化对象，即在`$(document).ready()`内实例化对象。
3. html的代码片段如下所示：
    - `<select name="province" id="province" data-province="北京"></select>`
    - `<select name="city" id="city" data-city="北京"></select>`
    - `<select name="district" id="district" data-district="朝阳区"></select>`
    
    注意：
    1. 此插件只针对`select`标签和其`option`标签有效，请不要用于其他的HTML标签中。
    2. 默认省市区的`select`的id属性分别为`province`, `city`, `district`, 也可以在实例化对象时自由配置`id`属性值，如：
    
        `new CityPicker({
            provinceId: 'xxxx',
            cityId: 'xxxx',
            districtId: 'xxxx'
         }).init();
         `
    3. 通过为各`select`添加`data-province`, `data-city`, `data-district`属性，实现初始值设置功能。


