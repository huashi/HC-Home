(function () {
    $(function () {
        return $(".contact-form").each(function () {
            var $this, requiredFields, validate;
            return $this = $(this), validate = function (field) {
                return "" !== field.val().trim() ? (field.removeClass("is-invalid"), !0) : (field.addClass("is-invalid"), !1)
            }, requiredFields = $this.find(".js-required"), requiredFields.each(function () {
                return $(this).on("blur change", function () {
                    return validate($(this))
                })
            }), $this.on("submit", function (e) {
                var bad, field, _i, _len;
                for (bad = null, _i = 0, _len = requiredFields.length; _len > _i; _i++)field = requiredFields[_i], validate($(field)) || (null == bad && (bad = field), e.preventDefault());
                return bad ? $(document).slideTo(bad, {
                    offset: -24, onAfter: function () {
                        return bad.focus()
                    }
                }) : void 0
            }), $this.find("select").heapbox({effect: {type: "standard"}})
        })
    })
}).call(this), function () {
}.call(this);
