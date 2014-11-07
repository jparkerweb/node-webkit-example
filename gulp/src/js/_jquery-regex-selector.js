var $ = require('./_jquery.min');

// ---------------------------
// -- jQuery RegEx Selector --
// ---------------------------------------------------------------------
// -- http://james.padolsey.com/javascript/regex-selector-for-jquery/ --
// ---------------------------------------------------------------------
// -- example usage:                                                  --
// ---------------------------------------------------------------------
// -- // Select all elements with an ID starting a vowel:             --
// -- $(':regex(id,^[aeiou])');                                       --
// ---------------------------------------------------------------------
// -- // Select all DIVs with classes that contain numbers:           --
// -- $('div:regex(class,[0-9])');                                    --
// ---------------------------------------------------------------------
$.expr[':'].regex = function(elem, index, match) {
	var matchParams = match[3].split(','),
		validLabels = /^(data|css):/,
		attr = {
			method: matchParams[0].match(validLabels) ? matchParams[0].split(':')[0] : 'attr',
			property: matchParams.shift().replace(validLabels,'')
		},
		regexFlags = 'ig',
		regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);

	return regex.test($(elem)[attr.method](attr.property));
};
