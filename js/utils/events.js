/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Action on toggle button.
 *
 * @param {jQuery.Event|Event} event
 *
 * @typedef {PanelCollapse} Event.data The panel collapse instance
 */
export function onToggleAction(event) {
    event.data.toggle();
}
