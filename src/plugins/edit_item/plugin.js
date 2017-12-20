/**
 * Plugin: "edit_item" (selectize.js)
 * Copyright (c) 2017 Philipp Siegmund
 *
 * @author Philipp Siegmund <me@psgmnd.de>
 */

Selectize.define('edit_item', function(options) {
	var self = this;
	
	this.setup = (function() {
		var original = self.setup;
		
		return function() {
			original.apply(this, arguments);
			// Add hidden field for ID processing
			$('<input>').attr({ type: 'hidden', id: 'selectize-LastEditId', name: 'selectize-LastEditId' }).appendTo(this.$wrapper);
		};
	})();

	this.setupTemplates = (function() {
		var original = self.setupTemplates;
		
		return function() {
			original.apply(this, arguments);
			// Add option to global templates
			var templates = {
				'option_edit': function(data, escape) {
					var html = $('<div class="edit" >Edit <strong>' + escape(data.input) + '</strong>&hellip;</div>');
					return html;
				}
			};
			self.settings.render = $.extend({}, templates, self.settings.render);
		};
	})();
	
	this.setupCallbacks = (function() {
		var original = self.setupCallbacks;
		
		return function() {
			original.apply(this, arguments);
			// Add callback for event handling
			var key, fn, callbacks = {
					'option_edit' : 'onOptionEdit'
				};
		
				for (key in callbacks) {
					if (callbacks.hasOwnProperty(key)) {
						fn = self.settings[callbacks[key]];
						if (fn) self.on(key, fn);
					}
				}
		};
		
	})();

	this.refreshOptions = (function() {
		var original = self.refreshOptions;
		
		return function() {
			original.apply(this, arguments);
			// Add edit option
			var query = $.trim(self.$control_input.val());
			var has_edit_option = self.canCreate(query);
			if (has_edit_option) {
				self.$dropdown_content.prepend(self.render('option_edit', {input: query}));
				self.$create = $(self.$dropdown_content[0].childNodes[0]);
			}
		};
	})();
	
	this.render = (function() {
		var original = self.render;

		return function(){
			var html = original.apply(this, arguments);
			var templateName = arguments[0];
			var data = arguments[1];

			// add mandatory attributes
			if (templateName === 'option_edit') {
				if (!data[self.settings.disabledField]) {
					$(html).attr('data-selectable', '');
				}
			}

			return html;
		};
	})();

	this.onOptionSelect = (function() {
		var original = self.onOptionSelect;

		return function(){
			var consoleInput = self.$control_input.val();
			var $target = $(arguments[0].currentTarget);

			original.apply(this, arguments);

			if ($target.hasClass('option')) {
				self.$wrapper.find('#selectize-LastEditId').val($target.data('value'));
				self.close();
			}

			if ($target.hasClass('edit')) {
				console.log('EDIT dataObj');
				var dataObj = new Object();
				dataObj.tagId = self.$wrapper.find('#selectize-LastEditId').val();
				dataObj.tagName = consoleInput;
				self.trigger('option_edit', JSON.stringify(dataObj) );
				self.close();
			}

			if ($target.hasClass('create')) {
				console.log('CREATE dataObj');
				var dataObj = new Object();
				dataObj.tagId = 0;
				dataObj.tagName = consoleInput;
				self.trigger('item_add', JSON.stringify(dataObj) );
				self.close();
			}
		};
	})();

});
