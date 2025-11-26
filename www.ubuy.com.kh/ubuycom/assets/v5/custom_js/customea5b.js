$(document).on('click', '.mobile-toggle', function () {
    $('.mobile-manu').toggleClass('open-menu');
    $('.menu-overlay').toggleClass('show');
    $('body').toggleClass('scroll-lock');
});

$(document).on('click', '.has-child-menu span', function () {
    if ($(this).parent().hasClass('main-li')) {
        $(document).find('#wsitem-loader').children('.main-li').removeClass('ws-link-active');
        $(this).parent().addClass('ws-link-active');
    }
    if ($(this).children('i').hasClass('fa-chevron-right')) {
        $(this).children('i').removeClass('fa-chevron-right');
        $(this).children('i').addClass('fa-chevron-down');
    } else {
        $(this).children('i').addClass('fa-chevron-right');
        $(this).children('i').removeClass('fa-chevron-down');
    }
    $(this).parent().children('.submenu').toggleClass('open-sub');
});

$(document).on('click', '.menu-close, .menu-overlay', function () {
    $('.mobile-manu').removeClass('open-menu');
    $('.menu-overlay').removeClass('show');
    $('body').removeClass('scroll-lock');
});

function showLoaderImage() {
    showLoaderImageAbs();
}

function hideLoaderImage() {
    hideLoaderImageAbs();
}

function showLoaderImageAbs() {
    jQuery(".loader-spin-overlay").addClass("loading");
    jQuery(".loader-spin-overlay").html('<span class="span_spinner"><i class="fa-solid fa-spinner"></i></span>');
}

function hideLoaderImageAbs() {
    jQuery(".loader-spin-overlay").removeClass("loading");
    jQuery(".loader-spin-overlay").find('.span_spinner').remove();
}

function showDotLoader() {
    jQuery("#dot-loader").show();
}

function hideDotLoader() {
    jQuery("#dot-loader").hide();
}

function showDivLoader(id) {
    jQuery(id).addClass("loading");
    jQuery(id).append('<span class="span_spinner"><i class="fa-solid fa-spinner"></i></span>');
}

function hideDivLoader(id) {
    jQuery(id).removeClass("loading");
    jQuery(id).find('.span_spinner').remove();
}


function serializeSearchUrl(obj) {
    var str = [];
    for (var p in obj) {
        //if (obj.hasOwnProperty(p) && obj[p].length) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + (obj[p]));
        }
    }
    return str.join("&");
}


function scrollFunction() {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        document.getElementById("go-to-top").style.display = "block";
    } else {
        document.getElementById("go-to-top").style.display = "none";
    }
}
jQuery.fn.niceScroll = function () {};

function newsletter_submit(genderVal) {
    jQuery("#newsletter_gender").val(genderVal);
}

jQuery(document).ready(function () {
    /* ========== search box side category select START============*/
    jQuery(".search-category-item").click(function () {
        var current_search_category = jQuery(this).text();
        jQuery("#search-select-category").text(current_search_category);
        jQuery("#search-select-category-sm").text(current_search_category);
    });
    /* ========== search box side category select END============*/
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
        scrollFunction();
    };

    jQuery('.view-more').on('click', function () {
        jQuery('.hide-links').slideToggle('slow');
        jQuery('.view-more-icon').toggleClass('fa-angle-double-down fa-angle-double-up');

        if (!jQuery(".hide-links").hasClass("img-loaded")) {
            jQuery(".hide-links").find("img.lazy-img").each(function () {
                jQuery(this).attr("src", jQuery(this).attr("data-src")).removeAttr("data-src");
            });
            jQuery(".hide-links").addClass("img-loaded");
        }
    });

    /* go to top script */
    jQuery(".go-top").click(function () {
        jQuery("html, body").animate({scrollTop: 0}, 1000);
    });

    /*-----touch disable on scroll----*/
    /*============main banner=================*/
    setTimeout(function () {
        jQuery(".owl-carousel-main-banner").removeClass("hidden-main-banner");
    }, 500);

    /*============nav-bar toggle=================*/

    jQuery(".navbar-toggle,.drawer_close").click(function () {
        jQuery('.sidebar').toggleClass('show-overlay');
        jQuery('.sidebar-desc').toggleClass('right-side-bar');
    });
    jQuery(".drawer_close").click(function () {
        jQuery('body').removeClass('modal-open');
    });
    jQuery(".navbar-toggle").click(function () {
        jQuery('body').addClass('modal-open');
    });
    jQuery(".close-sidebar").click(function () {
        jQuery('.sidebar').removeClass('show-overlay');
        jQuery('.sidebar-desc').removeClass('right-side-bar');
        jQuery('body').removeClass('modal-open');
    });
    /*============nav-bar toggle=================*/
    /*============us-store selecter=================*/
    jQuery("#us-store-selector").click(function () {
        jQuery('.select-ubuy-store').toggleClass('slide-down-store-selector');
        jQuery('.order-from-store').toggleClass('add-block');
    });
    /*============us-store selecter=================*/
    jQuery(document).on("keypress", "#newsletter-subscribe-email #newsletter,.email-valid", function (event) {
        if (event.which == 32) {
            event.preventDefault();
        }
    });
    jQuery(document).on("paste", "#newsletter-subscribe-email #newsletter,.email-valid", function (e) {
        var text = e.originalEvent.clipboardData.getData('Text');
        if (text.substring(text.indexOf(' ')).length) {
            jQuery(this).val(text.replaceAll(' ', ''));
            e.preventDefault();
        }
    });
    jQuery(document).on("submit", "#newsletter-subscribe-email", function (e) {
        e.preventDefault();

        var email = jQuery(this).find('input[name="email"]').val().trim();
        var pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        var is_valid = false;
        if (pattern.test(email)) {
            is_valid = true;
        } else {
            var msg = jQuery("#validate-newsletter").attr("data-msg");
            jQuery("#validate-newsletter").html(msg).show().delay(3000).fadeOut(400);
        }

        if (email !== '' && is_valid) {
            newsletterLoaderShow();
            var data = jQuery('#newsletter-subscribe-email').serialize();
            jQuery.ajax({
                url: jQuery(this).attr('action'),
                dataType: 'json',
                type: 'post',
                data: data,
                success: function (response) {
                    if (response.success) {
                        jQuery("#validate-newsletter").hide();
                        if (response.auto_confirm) {
                            jQuery("#ub-newsletter-coupon-code").modal('show');
                        } else {
                            jQuery("#subscribe_modal").modal('show');
                        }
                        jQuery('#newsletter-subscribe-email')[0].reset();

                    } else {
                        jQuery("#validate-newsletter").removeClass('success').addClass('error');
                        jQuery("#validate-newsletter").html(response.message).show().delay(3000).fadeOut(400);
                    }

                    newsletterLoaderHide();
                },
                error: function () {
                    newsletterLoaderHide();
                }
            });
        }
    });
});

function newsletterLoaderShow() {
    jQuery('#newsletter-subscribe-email #newsletter').attr('readonly', 1);
    jQuery("#newsletter-submit-btn input").addClass('disabled').attr('disabled', 1);
    jQuery("#newsletter-submit-btn em").addClass('fa-circle-notch fa-spin').removeClass('fa-angle-right');
}

function newsletterLoaderHide() {
    jQuery('#newsletter-subscribe-email #newsletter').removeAttr('readonly');
    jQuery("#newsletter-submit-btn input").removeClass('disabled').removeAttr('disabled');
    jQuery("#newsletter-submit-btn em").removeClass('fa-circle-notch fa-spin').addClass('fa-angle-right');
}

var store_offsetY = window.pageYOffset;

function storeModalClose() {
    jQuery('body').removeAttr("style");
    // Allow scrolling again
    jQuery('body').css({
        'position': 'static'
                //'padding-right': '0px'
    }).removeClass("stuck-here");
    jQuery(window).scrollTop(store_offsetY);
}

jQuery(document).on("click", ".storeswap", function () {
    store_offsetY = window.pageYOffset;
    // Block scrolling
    jQuery('body').css({
        'position': 'fixed',
        'width': '100%',
        //'padding-right': '17px',
        'top': -store_offsetY + 'px'
    }).addClass("stuck-here");
});
jQuery("#storeChangeModal").click(function () {
    storeModalClose();
});
jQuery("a[data-dismiss='modal'],button[data-dismiss='modal']").click(function () {
    storeModalClose();
});

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

/* ===Language change dropdown header START===*/
jQuery('.header-country-language-option, .header-language-country-list, .init').on("click", function (e) {
    e.stopPropagation();
});
jQuery('.header-language-country-list .init').on("click", function () {
    jQuery(this).parent().find('li:not(.init)').toggle();
});
var allOptions = jQuery("ul.prod-gram").children('li:not(.init)');
/* === Change language country START===*/
jQuery("ul.prod-gram").on("click", "li:not(.init)", function () {
    var $this = jQuery(this);
    var language_website_id = $this.attr("data-website-id");
    var language_code = $this.attr("data-lang-code");
    var language_name = $this.attr("data-lang-name");
    language_code = "en";
    window.location = base_url + "regionandcities/customer/redirect/goto/" + language_website_id + "/lan/" + language_code;

    var lang_option = "<option>English</option>";
    lang_option += '<option value="' + language_code + '" data-website-id="' + language_website_id + '" data-language-code="' + language_code + '">' + language_name + '</option>';
    jQuery(".header-country-language-option").html(lang_option);
    allOptions.removeClass('selected');
    jQuery(this).addClass('selected');
    jQuery(this).parent().children('.init').html(jQuery(this).html());
    jQuery(this).parent().find('li:not(.init)').toggle();
});
/* === Change language country END===*/
/* === Change language option after country select START===*/
jQuery('body').on('change', '.header-country-language-option', function () {
    var $option = jQuery(this).find('option:selected');
    var language_website_id = $option.attr("data-website-id");
    var language_code = $option.attr("data-language-code");
    var data_url = $option.attr("data-url");

    if (language_code == undefined) {
        window.location = "";
    } else {
        //window.location = base_url + "regionandcities/customer/redirect/goto/" + language_website_id + "/lan/" + language_code;
        window.location = data_url;
    }

});
jQuery('body').on('click', '.header-country-language-option-v1 .dropdown-item', function () {
    var data_url = jQuery(this).attr("data-url");
    var is_selected = jQuery(this).attr("selected");

    if (is_selected == undefined && data_url != undefined) {
        window.location = data_url;
    } else {
        //window.location = "";
    }
});

jQuery('body').on('keyup', '.search-box-text', function () {
    var search_val = jQuery(this).val();
    if (search_val != "") {
        jQuery(".search-product-v1").addClass("active");
    } else {
        jQuery(".search-product-v1").removeClass("active");
    }
});
/* === Change language option after country select END===*/
/* === Left side filter search START===*/
jQuery('body').on('keyup input', '.filter-search-input', function (e) {
    var $this = jQuery(this);
    var filter_search_keword = $this.val();
    filter_search_keword = jQuery.trim(filter_search_keword)
    var filter_parent_div = $this.closest(".checkbox-filter");
    var filter_div = filter_parent_div.find(".input-checkbox");
    var view_more = filter_parent_div.find(".view_more");
    var value = jQuery(this).text().toLowerCase();
    var filter_show_count = 0;
    view_more.addClass("d-none");
    if (filter_search_keword != "") {
        filter_search_keword = filter_search_keword.toLowerCase();
        //case 1 when keyword is not empty
        jQuery(filter_div).each(function (index) {
            if (jQuery(this).text().toLowerCase().indexOf(filter_search_keword) > -1) {
                jQuery(this).removeClass("d-none");
            } else {
                jQuery(this).addClass("d-none");
            }
        });
    } else {
        //case 2 when keyword is empty
        jQuery(filter_div).each(function (index) {
            jQuery(this).removeClass("d-none");
            filter_show_count++;
            if (filter_show_count > 7) {
                // jQuery(this).addClass("hide_li");
                view_more.removeClass("d-none");
            }
        });
    }
});
/* === Left side filter search END===*/
jQuery('body').on('click', '.add-to-wishlist', function () {
    var current_item = jQuery(this);
    var $this = current_item.parent().find(".hide");
    var jsonObj = {};
    $this.find("input").each(function () {
        var attr_name = jQuery(this).attr("name");
        var attr_val = jQuery(this).val();
        jsonObj[attr_name] = attr_val;
    });
    var wish_variation_sku = $this.find("input[name=variation_sku]").val();

    //hit wishlist url using ajax.
    var wishlist_url = base_url + "ubuywishlist/index/add-to-wishlist/variation_sku/" + wish_variation_sku + "/parent_sku/" + wish_variation_sku;
    jQuery.ajax({
        type: "POST",
        url: wishlist_url,
        dataType: "json",
        data: jsonObj,
        success: function (response) {
            if (response.is_wishlist == 1) {
                current_item.find(".fa-heart").removeClass("far");
                current_item.find(".fa-heart").addClass("fas");
                current_item.addClass("active");
                if (typeof seoProductAddToWishlist === 'function') {
                    seoProductAddToWishlist(jsonObj);
                }
                success_flash_message(response.message);
            } else {
                current_item.find(".fa-heart").removeClass("fas");
                current_item.find(".fa-heart").addClass("far");
                current_item.removeClass("active");
                error_flash_message(response.message);
            }
            if (response.is_login == 1) {
                jsonObj.ubuy_store = jsonObj.ubuy_store ? jsonObj.ubuy_store : response.ubuy_store;
                ubaAddtoWishlist(jsonObj, response.is_wishlist, current_item);
            }
        },
        error: function () {
            console.log("error");
        }
    });
});

function ubaAddtoWishlist(jsonObj, is_added, current_item) {
    if (typeof ubaaddtowishlist != 'undefined') {
        var asin = jsonObj.variation_sku ? jsonObj.variation_sku : '';
        var parent_asin = jsonObj.parent_sku ? jsonObj.parent_sku : '';
        var product_id = jsonObj.id ? jsonObj.id : '';
        var product_name = jsonObj.title ? jsonObj.title : '';
        var product_url = jsonObj.product_url ? jsonObj.product_url : '';
        if (current_item.parent().find('a.goos-tag-product').length && product_url == '') {
            product_url = current_item.parent().find('a.goos-tag-product').attr('href');
        }
        if (jQuery('.detail-page').length && product_url == '') {
            product_url = window.location.href;
        }

        var product_image = jsonObj.image ? jsonObj.image : '';
        var product_store = jsonObj.ubuy_store ? jsonObj.ubuy_store : '';
        var status = is_added ? 'add' : "remove";

        var track_addtocart_product_data = {
            "asin": asin,
            "parent_asin": parent_asin,
            "product_id": product_id,
            "product_name": product_name,
            "product_url": product_url,
            "product_image": product_image,
            "product_store": product_store,
            "status": status
        };
        ubaaddtowishlist(track_addtocart_product_data);
    }
}

function success_flash_message(message) {
    jQuery(".popup-messages").remove();
    var html = '<div class="popup-messages container-fluid"><div class="row"><div class="col-md-12 pd-0"><ul class="messages" style="display:none;"><li class="success-msg"><ul><li class="d-flex"><i class="fas fa-check-circle ml-2 mr-3 align-self-center"></i><span>' + message + '</span></li></ul></li></ul></div></div>';
    jQuery("body").append(html);
    jQuery(".popup-messages .messages").delay(100).slideDown(500);
    jQuery(".popup-messages .messages").delay(4000).slideUp(500);
}

function error_flash_message(message) {
    jQuery(".popup-messages").remove();
    var html = '<div class="popup-messages container-fluid"><div class="row"><div class="col-md-12 pd-0"><ul class="messages" style="display:none;"><li class="success-msg"><ul><li class="d-flex"><i class="fas fa-exclamation-circle ml-2 mr-3 align-self-center"></i><span>' + message + '</span></li></ul></li></ul></div></div>';
    jQuery("body").append(html);
    jQuery(".popup-messages .messages").delay(100).slideDown(500);
    jQuery(".popup-messages .messages").delay(4000).slideUp(500);
}

/*mini cart js*/
function showMcartLoader(id) {
    jQuery(id).append('<span class="loading"><span class="span_spinner"><i class="fa-solid fa-spinner"></i></span></span>');
}

function hideMcartLoader(id) {
    jQuery(id).find('.loading').remove();
}


function show_cart_popup() {
    jQuery('.cart-overlay').addClass('visible');
    jQuery('.mini-cart-wrap').addClass('open');
}

var closeCart = jQuery('.close-cart, .cart-overlay');
var miniCartWrap = jQuery('.mini-cart-wrap');

closeCart.on('click', function (e) {
    e.preventDefault();
    jQuery("body").removeClass("stuck-here modal-open");
    jQuery('.cart-overlay').removeClass('visible');
    miniCartWrap.removeClass('open');
});

function get_cart_items() {
    if (typeof isCartPage !== 'undefined' && isCartPage == '1') {
        return false;
    }
    jQuery.ajax({
        url: base_url + "ubcheckout/cart/show-cart",
        dataType: 'html',
        type: 'GET',
        data: "",
        beforeSend: function (xhr) {
            jQuery('.show-cart-popup').css("pointer-events", "none");
            showMcartLoader(jQuery('.show-cart-popup'));
        },
        success: function (resp) {
            jQuery("body").addClass("stuck-here modal-open");
            hideMcartLoader(jQuery('.show-cart-popup'));
            jQuery("#cart-popup-items").html(resp);
            show_cart_popup();
        },
        complete: function () {
            jQuery(".vehicles").hide();
            hideMcartLoader(jQuery('.show-cart-popup'));
            jQuery('.show-cart-popup').css("pointer-events", "");
        },
        error: function () {
            hideMcartLoader(jQuery('.show-cart-popup'));
        }
    });
}
jQuery('body').on('click', '.show-cart-popup', function (e) {
    e.preventDefault();
    get_cart_items();
});

jQuery('body').on('click', '.delete-product-cart', function () {
    var delete_id = jQuery(this).attr("data-id");
    var cartItemRemoveBtn = jQuery(this);
    jQuery.ajax({
        url: base_url + "ubcheckout/cart/delete-cart-item?item_id=" + delete_id,
        dataType: 'html',
        type: 'GET',
        data: "",
        dataType: 'json',
        success: function (resp) {
            if (resp.status == 1) {
                get_cart_items();
                getCartData();
            }
        },
        complete: function () {}
    });
});

jQuery('body').on('click', '.add-to-cart-popup-quantity', function () {
    var item_id = jQuery(this).parent().attr("data-id");
    var item_sku = jQuery(this).parent().attr("data-sku");
    var item_quantity = jQuery(this).attr("data-quantity");
    jQuery.ajax({
        url: base_url + "ubcheckout/cart/update-item-quantity",
        dataType: 'html',
        type: 'POST',
        data: "item_id=" + item_id + "&item_sku=" + item_sku + "&item_quantity=" + item_quantity,
        dataType: 'json',
        success: function (resp) {
            if (resp.success == true) {
                get_cart_items(); //get cart items popup list
                getCartData(); //get cart items count
                success_flash_message(resp.message);
            } else {
                error_flash_message(resp.message);
            }
        },
        complete: function () {}
    });
});
/*mini cart js end */

jQuery(".vehicles").hide();
jQuery(document).on("click", ".view-vehicle-detail", function () {
    let id = $(this).data('id');
    if ($(this).children().hasClass('rotated')) {
        $(this).children().removeClass('rotated');
    } else {
        $(this).children().addClass('rotated');
    }
    $(".vehicle-detail-" + id).toggle();
})

// INPUT NUMBER MAX LENGHT
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}

function spinner() {
    if (jQuery("#spinner").length == 0) {
        //this is not used moslty in detail page -- previously used to show the qty dropdown
        return false;
    }
    //  SPINNER
    jQuery("#spinner").spinner();
    //  INPUT ONLY NUMBERS
    jQuery('#spinner').keyup(function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

function addSpinner(id) {
    //  SPINNER
    jQuery(id).spinner();
    //  INPUT ONLY NUMBERS
    jQuery(id).keyup(function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

function setSortByFilterText() {
    jQuery(".sort-by-item").removeClass("active");
    jQuery(".sort-by-item").each(function (index, value) {
        var sort_by_item = jQuery(this).attr('data-value');
        if (sort_by_item == sort_by) {
            var sort_by_item = jQuery(this).text();
            sort_by_text = sort_by_item;
            jQuery(this).addClass("active");
            jQuery("#sort-by-button").html(sort_by_item);
            return false;
        }
    });
}

function removeFilterSidebarMobile() {
    if (jQuery("body").hasClass("open-menu")) {
        jQuery(".closeMore").click();
    }
}

function objectValues(obj) {
    var res = [];
    for (var i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
            res.push(obj[i]);
        }
    }
    return res;
}

$(document).on('click', '.custom_back', function () {
    history.go(-1);
})

function showMoreFilter(e) {
    jQuery(e).parent().find(".hide_li").slideToggle("slow");
    var t = jQuery(e).parent().find(".view_more"),
      s = jQuery(e).attr("data-less-text"),
      a = jQuery(e).attr("data-more-text");
    t.hasClass("plus")
      ? (t.removeClass("plus").addClass("minus"), t.html(s))
      : (t.removeClass("minus").addClass("plus"), t.html(a));
}