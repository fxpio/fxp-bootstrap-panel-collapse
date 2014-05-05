/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global jQuery*/
/*global window*/
/*global PanelCollapse*/

/**
 * @param {jQuery} $
 *
 * @typedef {PanelCollapse} PanelCollapse
 */
(function ($) {
    'use strict';

    /**
     * Action on toggle button.
     *
     * @param {jQuery.Event|Event} event
     *
     * @typedef {PanelCollapse} Event.data The panel collapse instance
     *
     * @private
     */
    function onToggleAction(event) {
        event.data.toggle();
    }

    // PANEL COLLAPSE CLASS DEFINITION
    // ===============================

    /**
     * @constructor
     *
     * @param {string|elements|object|jQuery} element
     * @param {object}                        options
     *
     * @this PanelCollapse
     */
    var PanelCollapse = function (element, options) {
        this.guid       = jQuery.guid;
        this.options    = $.extend({}, PanelCollapse.DEFAULTS, options);
        this.$element   = $(element);
        this.$toggle    = $(this.options.collapseSelector, this.$element);

        this.$element.on('click.st.panelcollapse', this.options.collapseSelector, this, onToggleAction);
    },
        old;

    /**
     * Defaults options.
     *
     * @type {object}
     */
    PanelCollapse.DEFAULTS = {
        classCollapse:       'panel-collapsed',
        collapseSelector: '> .panel-heading > .panel-actions > .btn-panel-collapse'
    };

    /**
     * Toggles the panel collapse.
     *
     * @this PanelCollapse
     */
    PanelCollapse.prototype.toggle = function () {
        this.$element.toggleClass(this.options.classCollapse);
    };

    /**
     * Opens the panel collapse.
     *
     * @this PanelCollapse
     */
    PanelCollapse.prototype.open = function () {
        this.$element.removeClass(this.options.classCollapse);
    };

    /**
     * Closes the panel collapse.
     *
     * @this PanelCollapse
     */
    PanelCollapse.prototype.close = function () {
        this.$element.addClass(this.options.classCollapse);
    };

    /**
     * Destroy instance.
     *
     * @this PanelCollapse
     */
    PanelCollapse.prototype.destroy = function () {
        this.$element.off('click.st.panelcollapse', this.options.collapseSelector, onToggleAction);
        this.$element.removeData('st.panelcollapse');
    };


    // PANEL COLLAPSE PLUGIN DEFINITION
    // ================================

    function Plugin(option, value) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('st.panelcollapse'),
                options = typeof option === 'object' && option;

            if (!data && option === 'destroy') {
                return;
            }

            if (!data) {
                $this.data('st.panelcollapse', (data = new PanelCollapse(this, options)));
            }

            if (typeof option === 'string') {
                data[option](value);
            }
        });
    }

    old = $.fn.panelCollapse;

    $.fn.panelCollapse             = Plugin;
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
            Plugin.call($this, $this.data());
        });
    });

}(jQuery));
