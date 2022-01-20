<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Internal library of functions and constants for module labelcollapsed
 *
 * @package    mod_labelcollapsed
 * @copyright  2011 Thomas Alsén
 * @copyright  2019 Lancaster University (http://www.lancaster.ac.uk/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author     Phil Devine <p.devine@lancaster.ac.uk>
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Fetches and returns the content text icluding images etc.
 *
 * @param cm_info $cm
 * @return string $content
 */

function labelcollapsed_get_html_content(cm_info $cm) {
    global $DB;
    $content = "";
    $lc = $DB->get_record('labelcollapsed', array('id' => $cm->instance));
    $intro = format_module_intro('labelcollapsed', $lc, $cm->id);
    $javastr = 'javascript:toggle(\'lcc'.$cm->instance.'\',\'lch'.$cm->instance.'\');';
    $content .= html_writer::start_tag('h4', array(
        'role' => 'button',
        'class' => 'lc_section collapsed',
        'data-toggle' => 'collapse',
        'data-target' => '#lcc'.$cm->instance,
        'style' => 'padding:0; margin-bottom:8px;'));
    $secnum = $lc->labelsection;
    if ($secnum !== "") {
        $content .= html_writer::start_tag('span',
        array('style' => 'background-color:'.$lc->sectionbgcolor.';color:'.$lc->sectioncolor.';margin-right: 8px;padding:0px 4px;'
        ));
        $content .= $lc->labelsection;
        $content .= html_writer::end_tag('span');
    }
    $content .= $cm->name;
    $content .= html_writer::end_tag('h4');
    $content .= html_writer::start_tag('div',
    array('id' => 'lcc'.$cm->instance,  'class' => 'collapse', 'style' => 'padding-top:0;'));
    $content .= $intro;
    $content .= html_writer::end_tag('div');
    return $content;
}
