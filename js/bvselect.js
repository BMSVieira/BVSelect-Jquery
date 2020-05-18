
(function($) {

  $.fn.BVSelect = function(parameters) {

      var selectorID = $(this).attr("id");
        var select = $(this);
        var selected = $("option", this);
        var randomID = Math.floor(Math.random() * (1000 - 0 + 1) ) + 0;

        // ** ---------- INICIO METODOS ----------- **
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

			 		var maindiv = $(this).next(".bv_mainselect");
			 		var width_existente = $(this).next(".bv_mainselect").width() + "px"; 
              	var id_generated = $(this).next(".bv_mainselect").children().attr("id");
              	id_generated = id_generated.replace("main_", "ul_");

             	maindiv.remove();

              	// Configurações do Element existente
                var parameters = {
				    	width: width_existente 
				}
				console.log(parameters);
        		// Chama a função para começar a fazer o update
       		    CriarBVSelect(select, parameters);
            });
          } 
          return this;
        }
        // ** ---------- FIM METODOS ----------- **
        // Esconde o select nativo 
        $(this).hide();
        
        // Chama a função para começar a fazer o update
        CriarBVSelect(select, parameters);

        function CriarBVSelect(options, config)
        {
              // ** CONSTROI ELEMENTOS ** 
                options.after($('<div style="width:'+config.width+';"></div>')
                    .addClass('bv_mainselect ')
                    .addClass(options.attr('class') || '')
                    .addClass(options.attr('disabled') ? 'disabled' : '')
                    .attr('tabindex', options.attr('disabled') ? null : '0')
                    .html('<div id="main_'+randomID+'" class="bv_atual bv_background"></div><ul id="ul_'+randomID+'" class="bv_ul_inner bv_background"></ul>')
                 );

              var select_width = $("#main_"+randomID).width();
              $( "#ul_"+randomID).css("width", select_width+20+"px");

              var selected_option = options.find("option:selected").text();
              $("#main_"+randomID).html(selected_option+"<i id='arrow_"+randomID+"' class='arrows_bv arrow down'></i>");
            
              options.find("option").each(function(index,element) 
              { 
                if(element.disabled == true) { var is_disabled = "bv_disabled"} else { is_disabled = ""}
                if($(this).data('separator') == true) { var is_separator = "bv_separator"} else { is_separator = ""}

                    $( "#ul_"+randomID).append("<li class='"+ is_disabled  +" "+ is_separator  +"'  >"+$(this).text()+"</li>");
              });

              // ** ESCONDE OPCOES ** 
              $("#main_"+randomID).click(function () {

                $(".bv_ul_inner").hide();
                $("#ul_"+randomID).slideDown("fast");
                $(".arrows_bv").removeClass("up").addClass("down");
                $("#arrow_"+randomID).removeClass("down").addClass("up");

              });

              // ** MUDA OPCAO ** 
              $("#ul_"+randomID).children().click(function () {

                var index = $(this).index();

                if($(this).hasClass("bv_disabled") || $(this).hasClass("bv_separator"))
                {} else {

                  $("#main_"+randomID).html($(this).text()+" <i id='arrow_"+randomID+"' class='arrows_bv arrow down'></i>");
                  $("#"+selectorID).prop("selectedIndex", index).trigger("change");
                  $("#ul_"+randomID).slideUp("fast");
                }
              });

              // ** ESCONDE QUANDO CLICA FORA ** 
              $(document).on('click.bv_mainselect', function(event) {
                if ($(event.target).closest('.bv_mainselect').length === 0) {
                $("#ul_"+randomID).hide();
                $("#arrow_"+randomID).removeClass("up").addClass("down");
                }
              });
        }

    return this;

  };

}(jQuery));