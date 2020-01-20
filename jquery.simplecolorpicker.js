/*!
 * jQuery Simple Color Picker v1.0
 * https://github.com/tomreid76/jquery-simplecolorpicker
 *
 * Copyright 2013 Tom Reid
 * Released under the MIT license
 */
(function ($, window) {

    // Our plugin constructor.
    var SimpleColorPicker = function (el, opts) {
        this.$el = $(el);
        this.options = opts;
        this.metadata = eval(this.$el.data('options'));
    };

    // The plugin prototype.
    SimpleColorPicker.prototype = {

        // Default options.
        defaults: {
            defaultColor: {name: 'default (white)', hex: 'fff'}, // Color used if input does not have a hex in the value attr.
            borderWidth: 1, // Border width for input and picker box.
            cellWidth: 20, // Width of the color cells.
            cellHeight: 20, // Height of the color cells.
            cellBorder: 1, // Border width of the color cells.
            elWidth: 25, // Overall width of the picker box.
            elHeight: 25, // Height of the input.
            cols: 8,// # of cols.
            colors: [
                {name: 'green',  hex: '00aa00'},
                {name: 'red',    hex: 'cc0000'},
                {name: 'aqua',   hex: '039799'},
                {name: 'pink',   hex: 'b0307a'},
                {name: 'purple', hex: '762ca7'},
                {name: 'orange', hex: 'cc6600'},
                {name: 'gray',   hex: '555555'},
                {name: 'black',  hex: '000000'},
                {name: 'blue',   hex: '0000dd'},
                {name: 'white',  hex: 'ffffff'},
                {name: 'LU secondry 1',  hex: '557869'},
                {name: 'LU secondry 2',  hex: '869978'},
                {name: 'LU secondry 3',  hex: 'e3cb8b'},
                {name: 'LU secondry 4',  hex: 'e1ab6c'},
                {name: 'LU secondry 5',  hex: '008375'},
                {name: 'LU secondry 6',  hex: '75BF9A'},
                {name: 'LU secondry 7',  hex: '64606c'},
                {name: 'LU secondry 8',  hex: 'c26763'},
                {name: 'LU secondry 9',  hex: '48B6AD'},
                {name: 'LU secondry 10',  hex: '81B8BB'},
                {name: 'LU secondry 11',  hex: 'FF7372'},
                {name: 'LU secondry 12',  hex: 'F9A98E'},
                {name: 'LU secondry 13',  hex: '006382'},
                {name: 'LU secondry 14',  hex: 'C4DAE5'},
                {name: 'LU secondry 15',  hex: '8A3E65'},
                {name: 'LU secondry 16',  hex: 'A4769A'},
                {name: 'LU secondry 17',  hex: '324147'},
                {name: 'LU secondry 18',  hex: '7faabe'},
                {name: 'LU secondry 19',  hex: 'bab6a2'},
                {name: 'LU Red',  hex: 'b5121b'},
                {name: 'LU Grey',  hex: 'bec0c2'},
                {name: 'LU Dark Grey',  hex: '555656'}
            ],
            iconPos: 'right',
            aniSpeed: 50, // Slide animation speed, set to 0 for no anim.
            lsClass: 'color-picker-chooser', // Css class for the picker.
            textCurrentColor: 'Current color: ' // Text shown in title attribute of input once a selection is made.
        },

        init: function () {

            // Reference to this.
            var _t = this;

            // Get all config and merge (options are passed in calling plugin function, metadata can be attached to DOM element).
            _t.config = $.extend(true, {}, _t.defaults, _t.options, _t.metadata);

            // Calculate dimensions of picker dropdown.
            _t.config.totalWidth = _t.config.cols * (_t.config.cellWidth + (2 * _t.config.cellBorder));
            _t.config.totalHeight = Math.ceil((_t.config.colors.length) / _t.config.cols) * (_t.config.cellHeight + (2 * _t.config.cellBorder));

            // Set CSS, bg-color, etc.
            _t.setupInputElement();

            // Get the picker.
            _t.$cp = _t.getPickerMenu();

            // Append the picker to body.
            $('body').append(_t.$cp);

            // Bind events.
            _t.bindPickerEvents();

            // Bind resize re-position picker.
            $(window).resize(function () {
                _t.setPickerPosition(_t.$cp);
            });
            return _t;
        },

        geticonPos: function() {
            var pos;
            switch (this.config.iconPos) {
                case 'center':
                    pos = 'center';
                    break;
                case 'left':
                    pos = '4px center';
                    break;
                case 'right':
                default:
                    pos = (this.config.elWidth - 20) + 'px';
                    break;
            }
            return pos;
        },

        setupInputElement: function() {
            var _t = this,
            defaultColor = (_t.$el.val() && _t.$el.val() !== '') ? _t.$el.val() : _t.config.defaultColor.hex;
            var title = _t.$el.attr( "name" );
            var str = title.substring(0, 2);
            if (str == "fr") {
                if($('#id_sectioncolor').val() != "") {
                    var _e = $('#id_sectioncolor').val();
                } else {
                    var _e = "#000000";
                }
                _t.$el.css({
                    'backgroundColor': _e,
                    'backgroundPosition': _t.geticonPos(),
                    'borderWidth': _t.config.borderWidth + 'px',
                    'width': _t.config.elWidth + 'px',
                    'height': _t.config.elHeight + 'px',
                    'color': '#' + _t.$el.val()
                });
            } else if (str == "bg") {
                if($('#id_sectionbgcolor').val() != "") {
                    var _e = $('#id_sectionbgcolor').val();
                } else {
                    var _e = "#ffffff";
                }
                _t.$el.css({
                    'backgroundColor': _e,
                    'backgroundPosition': _t.geticonPos(),
                    'borderWidth': _t.config.borderWidth + 'px',
                    'width': _t.config.elWidth + 'px',
                    'height': _t.config.elHeight + 'px',
                    'color': '#' + _t.$el.val()
                });
            }
        },
        // Close picker.
        close: function() {
            var _t = this;
            _t.$cp.slideUp(_t.config.aniSpeed).find('li').removeClass('selected');
            _t.$el.removeClass('open').focus();
            $(document).off('mouseup.cp' + _t.colorPickerInstance, 'html');
        },

        // Open picker.
        open: function() {
            var _t = this;
            _t.setPickerPosition(_t.$cp); // Reset picker position.
            _t.$el.addClass('open');
            _t.$cp.slideDown(_t.config.aniSpeed);
            $(document).on('mouseup.cp' + _t.colorPickerInstance, 'html',  function() {_t.close.call(_t)});
        },

        // Set position of picker to attach to bot-left of input.
        setPickerPosition: function($cp) {
            var _t = this,
                offset = _t.$el.offset(),
                height = _t.$el.height();
            $cp.css({
                'top': offset.top + height + _t.config.borderWidth,
                'left': offset.left
            });
        },

        // Creates the cell array and returns to caller.
        getCells: function() {
            var _t = this,
                cellCount = _t.config.colors.length,
                $cells = $('<div/>'),
                i,
                $cell;

            for (i = 0; i < cellCount; i++) {
                $cell = $("<li tabindex='0' title='" + _t.config.colors[i].name + "' data-color='" + _t.config.colors[i].hex + "'></li>");
                $cell.css({
                    'width': _t.config.cellWidth + 'px',
                    'height': _t.config.cellHeight + 'px',
                    'borderWidth': _t.config.cellBorder + 'px',
                    'backgroundColor': '#' + _t.config.colors[i].hex
                });

                $cells.append($cell);
            }
            return $cells;
        },

        // Create picker container.
        getPickerMenu: function() {
            var _t = this;
            _t.colorPickerInstance = $('.' + _t.config.lsClass).length + 1;
            var $cp = $("<ul class='" + _t.config.lsClass + "' id='cp-" + _t.colorPickerInstance + "' />"),
                $cells;

            _t.setPickerPosition($cp);
            $cp.css({
                'borderWidth': _t.config.borderWidth + 'px',
                // Drop calculated size.
                'width':'324px',
                // Drop height for natural sizing.
                'display': 'none'
            });
            // Get cells.
            $cells = _t.getCells();
            // Append cells.
            $cp.append($cells.children());
            // Return picker.
            return $cp;
        },

        // Bind events on input.
        bindPickerEvents: function() {
            var _t = this,
                $cell = _t.$cp.find('li');

            _t.$el.bind({
                mouseup: function (e) {
                    (_t.$cp.is(':visible')) ? _t.close() : _t.open();
                    e.stopPropagation();
                },
                keydown: function (e) {
                    switch (e.which) {
                        // Enter key.
                        case 13:
                            _t.$el.trigger('mouseup');
                            break;
                        // Escape.
                        case 27:
                            _t.close();
                            e.stopPropagation();
                            break;
                        // Down arrow.
                        case 40:
                            _t.open();
                            _t.$cp.find('li:first').focus().addClass('selected');
                            break;
                        case 9:
                            if (_t.$cp.is(':visible')) {
                                _t.$cp.find('li:first').focus().addClass('selected');
                                e.preventDefault();
                            }
                            break;
                    }
                }
            });
            $cell.bind({
                keydown: function (e) {
                    var $t = $(this),
                        $all = $t.siblings().addBack();

                    switch (e.which) {
                        // Enter key.
                        case 13:
                            $t.trigger('mouseup');
                            break;
                        // Escape key.
                        case 27:
                            $t.removeClass('selected');
                            _t.close();
                            e.stopPropagation();
                            break;
                        // Left arrow.
                        case 37:
                            if ($t.prevAll().length === 0) {
                                $t.removeClass('selected').siblings(':last').focus().addClass('selected');
                            } else {
                                $t.removeClass('selected').prev().focus().addClass('selected');
                            }
                            break;
                        // Up arrow.
                        case 38:
                            var pos = $all.index($t) - _t.config.cols;
                            if (pos > -1) {
                                $t.removeClass('selected');
                                $($all[pos]).addClass('selected').focus();
                            } else {
                                $t.removeClass('selected');
                                _t.close();
                            }
                            break;
                        // Right arrow and tab.
                        case 39: case 9:
                                if ($t.nextAll().length === 0) {
                                    $t.removeClass('selected').siblings(':first').focus().addClass('selected');
                                } else {
                                    $t.removeClass('selected').next().focus().addClass('selected');
                                }
                        break;
                        // Down arrow.
                        case 40:
                            var newPos = $all.index($t) + _t.config.cols;
                            if (newPos < $all.length) {
                                $t.removeClass('selected');
                                $($all[newPos]).addClass('selected').focus();
                            }
                            break;

                    }
                    return false;
                },
                mouseup: function (e) {
                    var $this = $(this);
                    $this.siblings().addBack().removeClass('selected');
                    // Chosen color.
                    var newColor = $this.attr('data-color'),
                        newColorName = $this.attr('title');
                    // Update input.
                    _t.$el.val(newColor).removeClass('open').focus().css({
                        'backgroundColor': '#' + newColor,
                        'color': '#' + newColor
                    }).attr({
                        title: _t.config.textCurrentColor + newColorName,
                        value: "#" + newColor
                            });
                    var title = _t.$el.attr( "name" );
                    var str = title.substring(0, 2);
                    if (str == "fr") {
                        $('#id_sectioncolor').val("#" + newColor);
                    } else if (str == "bg") {
                        $('#id_sectionbgcolor').val("#" + newColor);
                    }
                    _t.close();
                    e.stopPropagation();
                    return false;
                }
            });
        }
    };

    $.fn.simpleColorPicker = function(opts) {
        return this.each(function() {
            new SimpleColorPicker(this, opts).init();
        });
    };

})(jQuery, window);