import { Fancybox } from "@fancyapps/ui";
import $ from 'jquery';

$(window).on('load', function () {
	Fancybox.bind("[data-fancybox]", {width: '100%'});
})