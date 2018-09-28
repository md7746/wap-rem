difine(function() {
    return {
        trim : function(str) { return str.replace(/(^\s*)|(\s*$)/g, ""); },

        isEmail: function(value) {
            if (value.search(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) == -1)
                return false;
            else
                return true;
        },

        isTelphone:function(value) {
            if (value.search(/^(\d{3}-\d{8}|\d{4}-\d{7}|\d{4}-\d{8})$/) == -1)
                return false;
            else
                return true;
        },

        isMobilePhone:function(value) {
            if (value.search(/^(\+\d{2,3})?\d{11}$/) == -1)
                return false;
            else
                return true;
        },

        isQQ:function(value) {
            if (value.search(/^[1-9][0-9]{4,}$/) == -1)
                return false;
            else
                return true;
        },

        isNumber:function(value, length) {
            var regx;
            if (length == 0)
                regx = new RegExp("^\\d*$");
            else
                regx = new RegExp("^\\d{" + length + "}$");
            if (value.search(regx) == -1)
                return false;
            else
                return true;
        }
    }
});