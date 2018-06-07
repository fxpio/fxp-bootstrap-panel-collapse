/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import pluginify from '@fxp/jquery-pluginify';
import BasePlugin from '@fxp/jquery-pluginify/js/plugin';
import 'jquery';
import {onToggleAction} from "./utils/events";

/**
 * Panel Collapse class.
 */
export default class PanelCollapse extends BasePlugin
{
    /**
     * Constructor.
     *
     * @param {HTMLElement} element The DOM element
     * @param {object}      options The options
     */
    constructor(element, options = {}) {
        super(element, options);

        this.$toggle = $(this.options.collapseSelector, this.$element);
        this.$toggle.on('click.fxp.panelcollapse', null, this, onToggleAction);
    }

    /**
     * Toggles the panel collapse.
     */
    toggle() {
        this.$element.toggleClass(this.options.classCollapse);
    }

    /**
     * Opens the panel collapse.
     */
    open() {
        this.$element.removeClass(this.options.classCollapse);
    }

    /**
     * Closes the panel collapse.
     */
    close() {
        this.$element.addClass(this.options.classCollapse);
    }

    /**
     * Destroy the instance.
     */
    destroy() {
        this.$toggle.off('click.fxp.panelcollapse', onToggleAction);

        super.destroy();
    }
}

/**
 * Defaults options.
 */
PanelCollapse.defaultOptions = {
    classCollapse:       'panel-collapsed',
    collapseSelector: '> .panel-heading > .panel-actions > .btn-panel-collapse'
};

pluginify('panelCollapse', 'fxp.panelcollapse', PanelCollapse, true, '[data-panel-collapse="true"]');
