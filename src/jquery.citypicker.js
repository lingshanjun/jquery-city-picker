;(function(window){
    var area = window.area;

    function CityPicker(options){
        if (typeof area == 'undefined' || (area.status !== 0 || area.message !== "query ok")) {
            throw new Error('"areaData.js" file required!');
        }

        var settings = $.extend({}, options);

        this.$province = settings.provinceId ? $('#'+settings.provinceId) : $('#province');
        this.$city = settings.cityId ? $('#'+settings.cityId) : $('#city');
        this.$district = settings.districtId ? $('#'+settings.districtId) : $('#district');

        this.provinces = area.result[0];
        this.citys = area.result[1];
        this.districts = area.result[2];

        this.initProvince = this.$province.data('province');
        this.initCity = this.$city.data('city');
        this.initDistrict = this.$district.data('district');

    };

    CityPicker.prototype = {
        init: function(){
            var self = this;

            self.$province.append('<option value="">请选择省</option>');
            self.$city.append('<option value="">请选择市</option>');
            self.$district.append('<option value="">请选择区</option>');

            $.each(self.provinces, function(i, item){
                var selected = (self.initProvince && self.initProvince === item.name)? 'selected' : '';
                var option = '<option value="'+ item.name +'" data-cidx="'+ item.cidx+'" '+selected+'>'+ item.name +'</option>';
                self.$province.append(option);
            });

            self.event();
            self.$province.change();
            self.$city.change();
        },
        event: function(){
            var self = this;
            var arr = ['北京', '天津', '上海', '重庆', '香港', '澳门'];

            self.$province.on('change', function(e){

                var $curOption = $(this).find('option:selected');

                self.$city.empty().show().append('<option value="">请选择市</option>');
                self.$district.empty().show().append('<option value="">请选择区</option>');

                if (!$curOption.val()) {
                    return false;
                }

                if ($.inArray($curOption.val(), arr) != -1) {
                    return self.$city.append($curOption.clone()[0]);
                }
                var cidx = $curOption.data('cidx');

                // cidx undefined处理 如台湾
                if (cidx == 'undefined') {
                    self.$city.hide();
                    self.$district.hide();
                    return false;
                }

                cidx = cidx.split(',');
                var citys = self.citys.slice(parseInt(cidx[0]), parseInt(cidx[1])+1);

                var repeatIds = ['659091', '659092', '659093', '659094', '659095', '659096', '659097', '659098'];

                $.each(citys, function(i, item){
                    if ($.inArray(item.id, repeatIds) != -1) {
                        return false;
                    }

                    var selected = (self.initCity && self.initCity === item.name)? 'selected' : '';
                    var option = '<option value="'+ item.name +'" data-cidx="'+ item.cidx +'" '+selected+'>'+ item.name +'</option>';
                    self.$city.append(option);
                });
            });

            self.$city.on('change', function(e){

                var $curOption = $(this).find('option:selected');

                self.$district.empty().show().append('<option value="">请选择区</option>');

                if (!$curOption.val()) {
                    return false;
                }

                var cidx = $curOption.data('cidx');

                if (cidx == 'undefined') {
                    self.$district.hide();
                    return false;
                }

                cidx = cidx.split(',');

                if ($.inArray($curOption.val(), arr) != -1) {
                    var districts = self.citys.slice(parseInt(cidx[0])+1, parseInt(cidx[1])+1);
                }else{
                    var districts = self.districts.slice(parseInt(cidx[0]), parseInt(cidx[1])+1);
                }

                $.each(districts, function(i, item) {
                    var selected = (self.initDistrict && self.initDistrict === item.fullname)? 'selected' : '';
                    var option = '<option value="'+ item.fullname +'" '+selected+'>'+ item.fullname +'</option>';
                    self.$district.append(option);
                });
            });
        }
    };

    window.CityPicker = CityPicker;

    // $(function(){
    //     new CityPicker().init();
    // });
})(window);