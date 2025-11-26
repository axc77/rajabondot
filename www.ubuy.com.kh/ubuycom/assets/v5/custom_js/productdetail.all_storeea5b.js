jQuery(document).on("submit", "#product_addtocart_form", function (e) {
    e.preventDefault();
    if (automotiveDetail() == false) {
        return false;
    } else {
        showLoaderImage();
        var data = jQuery('#product_addtocart_form').serialize();
        var pId = jQuery('#p_full_id').val();
        jQuery.ajax({
            url: jQuery(this).attr('action'), //cart_url,
            dataType: 'json',
            type: 'post',
            data: data,
            success: function (response) {
                if (response.success == true) {
                    if (response.error != 0) {

                    } else {
                        var product_price = p_price ? p_price : 0.00;
                        FBAddtoCart({
                            content_ids: pId,
                            content_type: 'product',
                            value: product_price,
                            currency: p_currency_iso_symbol
                        }, 1);
                        var qty = jQuery('#qty').val();
                        setProductQty(qty);
                        if (response.buy_now == "yes") {
                            seoProductBuyNow();
                        } else {
                            seoProductCartAdd();
                        }
                    }
                    checkShppingDiscountEligible();
                }
                if (response.buy_now == "yes" && response.success == true) {
                    redirectToCheckout();
                } else {
                    jQuery("#buy_now_product").val("no");
                    showAddCartPopUp(response);
                    hideLoaderImage();
                }
            },
            error: function () {
                hideLoaderImage();
            }
        });
    }
});

function checkShppingDiscountEligible(){
    var csrftoken = '';
    var entity = '';
    if (typeof (csrftoken_common) != "undefined" && csrftoken_common !== null) {
        csrftoken = csrftoken_common;
    }
    if (typeof (entity_id) != "undefined" && entity_id !== null) {
        entity = entity_id;
    }
    if(jQuery("#shipping_discount").length > 0){
        jQuery.ajax({
            url: jQuery("#shipping_discount").data('url'), //cart_url,
            type: 'post',
            dataType: 'html',
            data: {ajax_request:"ajax_request",csrf_token: csrftoken,entity_id: entity},
            success: function(response){
                if(response){
                    jQuery("#shipping_discount").html(response); 
                }
            }
        });
    }
}

function redirectToCheckout(){
    var url = base_url + "ubcheckout/onepage";
    location.href = url;
}

function FBAddtoCart(addtoCartDataObj, i) {
    if (i > 5)
        return;
    try {
        fbq('track', 'AddToCart', addtoCartDataObj);
    } catch (error) {
        i++;
        setTimeout(function () { FBAddtoCart(addtoCartDataObj, i); }, 2000);
    }
}


// New variant call for radio button
jQuery(document).on("click", "input[class='input_radio']", function () {
    if (!($(this).attr("checked") == "checked")) {
        showLoaderImageAbs();
        selected_asin = jQuery(this).attr("asin");
        parent_asin = jQuery("#parent_asin").val();
        var customer_id  = jQuery('#customer_id').val();
        is_custom_id_product = jQuery("#is_custom_id_product").val();  
        var csrftoken = '';
        if (typeof (csrftoken_fetch) != "undefined" && csrftoken_fetch !== null) {
            csrftoken = csrftoken_fetch;
        }
        var entityId = "";
        if (typeof (entity_id) != "undefined" && entity_id !== null) {
            entityId = entity_id;
        }
        if (typeof (is_one_search) == "undefined") {
            is_one_search = "";
        }
        if (typeof (is_show) == "undefined") {
            is_show = "";
        }
        if (typeof (is_scrap) == "undefined") {
            is_scrap = "";
        }
        if (typeof (source) == "undefined") {
            source = "";
        }
        product_id = jQuery("#p_full_id").val();
        var fetch_data = {
            dir:dir,
            fn:fn,
            d: device, 
            sku: selected_asin, 
            p_sku: parent_asin, 
            id: entityId,
            sname: storename,
            sbname: substorename, 
            pid: product_id,
            c_id: is_custom_id_product, 
            sid: s_id, 
            lng: lang, 
            token: csrftoken,
            lv:lv,
            customer_id:customer_id,
            is_one_search: is_one_search,
            is_show: is_show,
            is_scrap: is_scrap,
            source: source
        };
        if (typeof(debugpsr) != "undefined" && debugpsr != "") {
            fetch_data.debugpsr = debugpsr;
        }
        if(cur != ""){
            fetch_data.cur = cur;
        }
        if(typeof(gllocation) != "undefined" && gllocation != ""){
            fetch_data.gllocation = gllocation;
        }
        if(typeof(is_deal_active) != "undefined" && is_deal_active == true){
            fetch_data.is_deal_active = is_deal_active;
        }
        fetch_data = btoa(JSON.stringify(fetch_data));
        jQuery.ajax({
            type: "GET",
            headers: {
                'Cache-Control': 'max-age=10'
            },
            url: ajax_url,
            data: { fetch_data:fetch_data },
            success: function (response, textStatus, jqXHR) {
                if (response) {
                    jQuery('#product-view-full').html(response);
                    wishlistCheck();
                    hideLoaderImageAbs();                    
                    if(jQuery("#shipping_discount").length > 0 && jQuery("#progress-bar-container").length <= 0){
                        checkShppingDiscountEligible();
                    }                 
                }else{
                    window.location.reload();
                }

                if (jqXHR.status === 204) {
                    window.location.reload();
                }
            }
        });
    }
});

jQuery(document).on("mouseenter", ".input_radio", function () {
    var title = $(this).val();
    var parentElement = jQuery(this).parents(".variations-item");
    var headingElement = parentElement.find(".variations-button");
    var headingTitle = headingElement.find("strong");
    headingTitle.text(title);
    //jQuery(this).parent().removeClass("blur_entity");
});

jQuery(document).on("mouseleave", ".input_radio", function () {
    var parentElement = jQuery(this).parents(".variations-item");
    var headingElement = parentElement.find(".variations-button");
    var headingSpan = headingElement.find("strong");
    var originalTitle = headingElement.attr("data-heading");
    headingSpan.text(originalTitle);    
});

jQuery(document).on("click", "a[data-toggle='locale'], span[data-toggle='locale']", function () {
    lang = jQuery(this).data("code");
    var url_key = jQuery('#url_key').val();
    var csrftoken = '';
    if (typeof (csrftoken_fetch) != "undefined" && csrftoken_fetch !== null) {
        csrftoken = csrftoken_fetch;
    }
    var parentAsin = "";
    if (typeof (parent_asin) != "undefined" && parent_asin !== null) {
        parentAsin = parent_asin;
    } else {
        parentAsin = selected_asin
    }
    tUrlKey = "";
    var tUrlKey = "";
    if (typeof (url_key) != "undefined" && url_key !== null) {
        tUrlKey = url_key;
    }

    showLoaderImageAbs();
    var fetch_data = {cur_url: current_url,
        id: entity_id,
        sku: selected_asin,
        p_sku: parent_asin,
        c_id: is_custom_id_product,
        sname: storename,
        sbname: substorename,
        is_ajax: is_ajax,
        pid: product_id,
        s_id: s_id,
        can_url: canonical_url,
        lng: lang,
        lang: lang,
        dir: dir,
        fn: fn,
        token: csrftoken_fetch,              
        d: device, 
        lv:lv       
    };    
    if(cur != ""){
        fetch_data.cur = cur;
    }   
    if(typeof (url_key) != "undefined" && url_key !== null){
        fetch_data.url_key =  url_key;
    }
    if(typeof(is_deal_active) != "undefined" && is_deal_active == true){
        fetch_data.is_deal_active = is_deal_active;
    }
    fetch_data = btoa(JSON.stringify(fetch_data));
    jQuery.ajax({
        type: "GET",
        headers: {
            'Cache-Control': 'max-age=10'
        },
        url: ajax_url,
        data: {fetch_data: fetch_data},
        success: function (response, textStatus, jqXHR) {
            if (response) {
                isVariationOpen = false;
                hideLoaderImageAbs();
                jQuery('#product-view-full').html(response);                   

                if(jQuery("#shipping_discount").length > 0 && jQuery("#progress-bar-container").length <= 0){
                    checkShppingDiscountEligible();
                }
            } else {
                window.location.reload();
            }
            if (jqXHR.status === 204) {
                window.location.reload();
            }
        },
        error: function () {
            hideLoaderImageAbs();
        }
    });
});

function buyNow() {    
    jQuery("#buy_now_product").val("yes");
    jQuery('#product_addtocart_form').submit();
}