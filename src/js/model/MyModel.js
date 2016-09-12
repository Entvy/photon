import UIModel from 'photon/UIModel';

const myModel = new UIModel({
	schema: {
		id: {
			default: 0
		},
		age: {
			default: 0
		}
	}
});

export default myModel;