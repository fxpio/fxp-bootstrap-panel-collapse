/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

+function ($) {
    'use strict';

    // PANEL COLLAPSE CLASS DEFINITION
    // ===============================

    /**
     * @constructor
     *
     * @param htmlString|Element|Array|jQuery element
     * @param Array                           options
     *
     * @this
     */
    var PanelCollapse = function (element, options) {
        this.guid       = jQuery.guid;
        this.options    = $.extend({}, PanelCollapse.DEFAULTS, options);
        this.$element   = $(element);
        this.$toggle    = $(this.options.collapseSelector, this.$element);

        this.$element.on('click.st.panelcollapse', this.options.collapseSelector, $.proxy(onToggleAction, this));
    };

    /**
     * Defaults options.
     *
     * @type Array
     */
    PanelCollapse.DEFAULTS = {
        classCollapse:       'panel-collapsed',
        collapseSelector: '> .panel-heading > .panel-actions > .btn-panel-collapse'
    };

    /**
     * Toggles the panel collapse.
     *
     * @this
     */
    PanelCollapse.prototype.toggle = function () {
        this.$element.toggleClass(this.options.classCollapse);
    };

    /**
     * Opens the panel collapse.
     *
     * @this
     */
    PanelCollapse.prototype.open = function () {
        this.$element.removeClass(this.options.classCollapse);
    };

    /**
     * Closes the panel collapse.
     *
     * @this
     */
    PanelCollapse.prototype.close = function () {
        this.$element.addClass(this.options.classCollapse);
    };

    /**
     * Destroy instance.
     *
     * @this
     */
    PanelCollapse.prototype.destroy = function () {
        this.$element.off('click.st.panelcollapse', this.options.collapseSelector, $.proxy(onToggleAction, this));
        this.$element.removeData('st.panelCollapse');
    };

    /**
     * Action on toggle button.
     *
     * @param jQuery.Event event
     *
     * @this
     * @private
     */
    function onToggleAction (event) {
        this.toggle();
    }


    // PANEL COLLAPSE PLUGIN DEFINITION
    // ================================

    var old = $.fn.panelCollapse;

    $.fn.panelCollapse = function (option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('st.panelCollapse');
            var options = typeof option == 'object' && option;

            if (!data && option == 'destroy') {
                return;
            }

            if (!data) {
                $this.data('st.panelCollapse', (data = new PanelCollapse(this, options)));
            }

            if (typeof option == 'string') {
                data[option]();
            }
        });
    };

    $.fn.panelCollapse.Constructor = PanelCollapse;


    // PANEL COLLAPSE NO CONFLICT
    // ==========================

    $.fn.panelCollapse.noConflict = function () {
        $.fn.panelCollapse = old;

        return this;
    };


    // PANEL COLLAPSE DATA-API
    // =======================

    $(window).on('load', function () {
        $('[data-panel-collapse="true"]').each(function () {
            var $this = $(this);
            $this.panelCollapse($this.data());
        });
    });

}(jQuery);
