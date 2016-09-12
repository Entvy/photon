import $ from 'jquery';
import UIBase from 'photon/UIBase';

// class UIView
// void hook(string evName, object args): Trigger custom event to pass View event to controller
class UIView extends UIBase {
	constructor(el, options = {}) {
		super(el, options);
	}
	hook(evName, args = {}) {
		this.el.trigger(evName, args);
	}
}

export default UIView;