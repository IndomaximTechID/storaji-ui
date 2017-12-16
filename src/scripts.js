$(function() {
  const notyf = new Notyf();
  // Sidebar Toggler
  function sidebarToggle(toogle) {
    var sidebar = $('#sidebar');
    var padder = $('.content-padder');

    if( toogle ) {
      sidebar.css({'display': 'block', 'x': -300});
      sidebar.transition({opacity: 1, x: 0}, 250, 'in-out', function(){
        sidebar.css('display', 'block');
      });

      if( $( window ).width() > 960 ) {
        padder.transition({marginLeft: '300px'}, 250, 'in-out');
      }
    } else {
      sidebar.css({'display': 'block', 'x': '0px'});
      sidebar.transition({x: -300, opacity: 0}, 250, 'in-out', function(){
        sidebar.css('display', 'none');
      });
      padder.transition({marginLeft: 0}, 250, 'in-out');
    }
  }

  $('body').on('click', '#sidebar_toggle', function() {
    var sidebar = $('#sidebar');
    var padder = $('.content-padder');

    if( sidebar.css('x') == '-300px' || sidebar.css('display') == 'none' ) {
      sidebarToggle(true);
    } else {
      sidebarToggle(false);
    }
  });

  function resize(){
    var sidebar = $('#sidebar');
    var padder = $('.content-padder');
    padder.removeAttr( 'style' );

    if( $( window ).width() < 960 && sidebar.css('display') == 'block' ) {
			sidebarToggle(false);
		} else if( $( window ).width() > 960 && sidebar.css('display') == 'none' ) {
			sidebarToggle(true);
		}
  }

  if($( window ).width() < 960) {
    sidebarToggle(false);
  }else{
    sidebarToggle(true);
  }

	$( window ).resize(function() {
		resize();
  });

  $('body').on('click', '.content-padder', function() {
    if( $( window ).width() < 960 ) {
      sidebarToggle(false);
    }
  });
  $('body').on('keypress keyup blur', 'input[type="number"]', function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
  });
});
