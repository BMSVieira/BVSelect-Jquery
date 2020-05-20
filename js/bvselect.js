(function($) {
    $.fn.BVSelect = function(parameters) {

        var selectorID = $(this).attr("id"); // SELECTOR ID
        var select = $(this); // NATIVE SELECT OBJECT
        var randomID = Math.floor(Math.random() * (9999 - 0 + 1)) + 0; // RANDOM ID GENERATED

        // SETUP LIST
        function SetListBV(options) {

            options.find("option").each(function(index, element) {
                // Separator Element
                if (element.disabled == true) { var is_disabled = "bv_disabled" } else { is_disabled = "" }
                // Disabled Element   
                if ($(this).data('separator') == true) { var is_separator = "bv_separator" } else { is_separator = "" }
                // Check for Image  
                if($(this).data('img')){  var has_img = "<img src="+$(this).data('img')+">"; } else { var has_img = "";}
                // Apend li to ul
                $("#ul_" + randomID).append("<li class='" + is_disabled + " " + is_separator + "'  > "+has_img+" " + $(this).text() + "</li>");
            });

            // ** MAIN DIV CLICK ** 
            $("#main_" + randomID).click(function() {
                // Check if it is open, if yes, close it.
                if ($("#ul_" + randomID).css('display') == 'block') {
                    $(".bv_ul_inner").slideUp("fast");
                    $(".arrows_bv").removeClass("up").addClass("down");
                } else {
                    $(".bv_ul_inner").hide();
                    $("#ul_" + randomID).slideDown("fast");
                    $(".arrows_bv").removeClass("up").addClass("down");
                    $("#arrow_" + randomID).removeClass("down").addClass("up");
                }
            });

            // ** LIST LI CLICK ** 
            $("#ul_" + randomID).children().click(function() {
                if ($(this).hasClass("nofocus") == false) {
                    var index = $(this).index();
                    if ($(this).hasClass("bv_disabled")) {} else {
                        $("#main_" + randomID).html($(this).text() + " <i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>");
                        $("#" + selectorID).prop("selectedIndex", index).trigger("change");
                        $("#ul_" + randomID).slideUp("fast");
                        $("#input_" + randomID).val("").keyup();
                    }
                }
            });

            // ** SEARCHBAR  **
            $("#input_" + randomID).on("keyup", function() {
                var value = this.value.toLowerCase().trim();
                $("#ul_" + randomID + " li").show().filter(function() {
                    if ($(this).hasClass("nofocus") == false) { // Se tiver classe nofocus, não procura nesse.
                        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
                    }
                }).hide();
            });

            // ** HIDE WHEN CLICK OUTSIDE ** 
            $(document).on('click.bv_mainselect', function(event) {
                if ($(event.target).closest('.bv_mainselect').length === 0) {
                    $("#ul_" + randomID).hide();
                    $("#arrow_" + randomID).removeClass("up").addClass("down");
                    $(".bv_input").val("").keyup();
                }
            });
        }

        // SETUP BASE DIV
        function SetBaseBV(options, config) {

            options.after($('<div id="bv_' + randomID + '" data-search="' + config.searchbox + '" style="width:' + config.width + ';"></div>').addClass('bv_mainselect ').addClass(options.attr('class') || '').addClass(options.attr('disabled') ? 'disabled' : '').attr('tabindex', options.attr('disabled') ? null : '0'));
            $("#bv_" + randomID).append('<div id="main_' + randomID + '" class="bv_atual bv_background"></div><ul id="ul_' + randomID + '" class="bv_ul_inner bv_background"></ul>');

            if (config.searchbox == true) {
                $("#ul_" + randomID).prepend('<li class="nofocus"><div class="innerinput"><input placeholder="Search..." class="bv_input" id="input_' + randomID + '" type="text"></div</li>');
            }

            var select_width = $("#main_" + randomID).width();
            $("#ul_" + randomID).css("width", select_width + 20 + "px");

            var selected_option = options.find("option:selected").text();
            $("#main_" + randomID).html(selected_option + "<i id='arrow_" + randomID + "' class='arrows_bv arrow down'></i>");

            // Append List
            SetListBV(options);
        }

        // ** ---------- METHODS ----------- **
        if (typeof parameters == 'string') {

            // ** DESTROY **
            if (parameters == 'destroy') {
                this.each(function() {
                    var divselect = $(this).next('.bv_mainselect');
                    if (divselect.length > 0) {
                        divselect.remove();
                        select.css('display', 'block');
                    }
                });
            }
            // ** UPDATE **  
            if (parameters == 'update') {
                this.each(function() {

                    var current_id = $(this).next(".bv_mainselect").children().attr("id").match(/\d+/);
                    var current_searchbox = $(this).next(".bv_mainselect").data('search');

                    randomID = current_id;

                    // Remove all lines without .nofocus class (search input)
                    $("#ul_" + current_id + " li:not(.nofocus)").remove();
                    $("#main_" + current_id).off();

                    // Fetches fields and append to main div
                    SetListBV(select);
                });
            }
            return this;
        } else {

            // Default Parameters
            var defaults = {
                width : "100%", // Width 100%
                searchbox : false // Searchbox not included
            }

            var parameters = $.extend({}, defaults, parameters); 
        }
        // ** ---------- END METHODS ----------- **

        // Hide Native Select
        $(this).hide();

        // Setup main div
        SetBaseBV(select, parameters);

        return this;
    };
}(jQuery));