/*
 * This file is part of the Sonatra package.
 *
 * (c) François Pluchino <francois.pluchino@sonatra.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/*global define*/
/*global jQuery*/
/*global window*/
/*global PanelCollapse*/

/**
 * @param {jQuery} $
 *
 * @typedef {object}        define.amd
 * @typedef {PanelCollapse} PanelCollapse
 */
(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
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
        this.options    = $.extend(true, {}, PanelCollapse.DEFAULTS, options);
        this.$element   = $(element);
        this.$toggle    = $(this.options.collapseSelector, this.$element);

        this.$element.on('click.st.panelcollapse', this.$toggle.selector, this, onToggleAction);
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
        this.$element.off('click.st.panelcollapse', this.$toggle.selector, onToggleAction);
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
                data = new PanelCollapse(this, options);
                $this.data('st.panelcollapse', data);
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

}));
