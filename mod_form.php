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
 * Add labelcollapsedcollapsed form
 *
 * @package    mod_labelcollapsed
 * @copyright  2011 Thomas Alsén
 * @copyright  2019 Lancaster University (http://www.lancaster.ac.uk/)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @author     Phil Devine <p.devine@lancaster.ac.uk>
 */

defined('MOODLE_INTERNAL') || die;

require_once($CFG->dirroot.'/course/moodleform_mod.php');

$PAGE->requires->jquery();
$PAGE->requires->js('/mod/labelcollapsed/js/colourpicker/jquery.simplecolorpicker.min.js', true);
$PAGE->requires->css('/mod/labelcollapsed/colourpicker/simplecolorpicker.css');

class mod_labelcollapsed_mod_form extends moodleform_mod {

    public function definition() {
        $mform = $this->_form;
        $mform->addElement('html', '<div class="form-group row  fitem">');
        $mform->addElement('html', '<div class="col-md-3"><label for="id_sectioncolor_choice">');
        $mform->addElement('static', 'sectionnumcolor', get_string('labelsectionnumcolor', 'labelcollapsed'));
        $mform->addElement('html', '</label></div>');
        $mform->addElement('html', '<div class="col-md-9 form-inline felement">');
        $mform->addElement('html',
        '<input type="text" id="id_sectioncolor_choice" name="fr_sectioncolor_choice" class="color-picker-input two" />');
        $mform->addElement('html', '</div>');
        $mform->addElement('html', '</div>');
        $mform->addElement('text', 'labelsection', get_string('labelsectionnum', 'labelcollapsed'));
        $mform->addRule('labelsection', get_string('maximumchars', '', 6), 'maxlength', 6, 'client');
        $mform->addElement('html', '<div class="form-group row  fitem">');
        $mform->addElement('html', '<div class="col-md-3">');
        $mform->addElement('html', '<span class="float-sm-right text-nowrap"></span>');
        $mform->addElement('html', '<label for="id_sectionbgcolor_choice">');
        $mform->addElement('static', 'sectionnumBGcolor', get_string('labelsectionnumBGcolor', 'labelcollapsed'));
        $mform->addElement('html', '</label>');
        $mform->addElement('html', '</div>');
        $mform->addElement('html', '<div class="col-md-9 form-inline felement">');
        $mform->addElement('html',
        '<input type="text" id="id_sectionbgcolor_choice" name="bg_sectioncolor_choice" class="color-picker-input two" />');
        $mform->addElement('html', '</div>');
        $mform->addElement('html', '</div>');
        $mform->addElement('html', '<div style="display: none;">');
        $mform->addElement('text', 'sectioncolor', get_string('labelsectioncolor', 'labelcollapsed'));
        $mform->setDefault('sectioncolor', '#000000');
        $mform->addElement('text', 'sectionbgcolor', get_string('labelsectionBGcolor', 'labelcollapsed'));
        $mform->setDefault('sectionbgcolor', '#ffffff');
        $mform->addElement('html', '</div>');
        $mform->addElement('text', 'name', get_string('labelcollapsedheader', 'labelcollapsed'), array('size' => '64'));
        $mform->addRule('name', null, 'required', null, 'client');
        $mform->addRule('name', get_string('maximumchars', '', 50), 'maxlength', 50, 'client');
        $this->standard_intro_elements();
        $mform->setType('labelsection', PARAM_TEXT);
        $mform->setType('sectioncolor', PARAM_TEXT);
        $mform->setType('sectionbgcolor', PARAM_TEXT);
        $mform->setType('name', PARAM_TEXT);
        $mform->addElement('static', null, '',
            '<script type="text/javascript">
            $(document).ready(function () {
            $(\'.color-picker-input.one\').simpleColorPicker();
            $(\'.color-picker-input.two\')
            .simpleColorPicker({cellHeight:40, cellWidth:40, columns:5, elWidth: 75,elHeight:75,iconPos:\'center\'});
            });
            </script>');
        $this->standard_coursemodule_elements();
        $this->add_action_buttons(true, false, null);
    }
}
