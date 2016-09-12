# Photon - Boilerplate
Photon is pure JavaScript MVC without any Frameworks or Libraries. It is based on ES2015 Modularization.

Please remind that this is just prototype, so anything can be changes in future.

## Usage
1. Clone repo
> git clone ...

2. Install node dependencies
> npm install

3. Install gulp globally if you didn't yet
> npm install -g gulp

4. Build resources
> gulp build

5. Run the app
> gulp serve

When you start the photon app, it automatically detects file changes and inject or refresh the page. It's based on browser-sync module, and you can modify options as much you want.

## Basic Fundamentals
Photon is MVC framework, it means it has 3 fundamentals: Model, View, Controller.
Each are ES6 Classes, so you can extend them or create new of them.

Let's start with create your custom view named MyView class:

```javascript
import UIView from 'photon/UIView';

class MyView extends UIView {
	constructor(options) {
		super('#myView', options);
	}
} 
```

You can add any method you like, but remember, view must have methods that only manipulate UI itself(means DOM).
For instance:

```javascript
class MyView extends UIView {
	constructor(...) { ... }
	show(cb) {
		this.el.fadeIn(300, cb);
	}
	hide(cb) {
		this.el.fadeOut(300, cb);
	}
}
```

By default, view is not visible, so you need to make then visible. Most of time, your view needs show/hide methods.

And let's make your controller. Like UIView, you can extend default controller, but most of time, you just uses UIController itself, without extending it.

```javascript
import UIController from 'photon/UIController';
import MyView from 'views/MyView';

const myViewController = new UIController({
	view: MyView,
	myProperty: 1,
	showView(cb) {
		this.view.show(cb);
	},
	hideView(cb) {
		this.view.hide(cb);
	},
	events: {
		...
	}
});
```

You can create controller methods or properties like that, the important thing is you must specified view(MyView), or controller throws exception.
After you specified view, you can access it inside of controller's method with "this.view".

```javascript
showView(cb) {
	this.view.show(cb);
}
```

You can specify events in "events" property like this:
```javascript
events: {
	'#subForm submit': function(ev) {
		ev.preventDefault();
		alert('Submit!');
	}
}
```

There is really useful feature named 'event hook', which can create custom events in your view and catch from the controller. Let's get back to the MyView class:

```javascript
class MyView extends UIView {
	show(cb) {
		this.hook('show');
		this.fadeIn(300, cb);
	}
}
```

You can see 'this.hook' in show method. Only you need is specify name of the hook. Then you can catch it in UIController.

```javascript
const myViewController = new UIController({
	events: {
		'show': function() {
			console.log('show hooked!');
		}
	}
});
```

Like this, you can handle the hook in controller's events property.

Finally, let's see the UIModel. UIModel represents single data collection. You can easily create the model with UIModel constructor.

```javascript
import UIModel from 'photon/UIModel';

const myModel = new UIModel({
	schema: ['id', 'name', 'age']
});

export default myModel;
```

Simple huh? Only you need is create new UIModel instance, and specify schema as array. UIModel only has two methods: get and set which you can easily understand.

```javascript
myModel.set('id', 0);
myModel.set('name', '.modernator');
myModel.set('age', 25);

myModel.get('age');		// 25
```

Like UIView, you can also extend model into your custom model.

```javascript
class MyModel extends UIModel {
	constructor(options) {
		super(options);
	}
}
```

If you want to override basic model GET/SET, for instance, if you want to save them into remote DB, easily just override two methods: getModel and setModel.

```javascript
class MyModel extends UIModel {
	constructor(options) {
		super(options);
	}
	getModel(field) {
		console.log('Get model: ' + field);
		return super.getModel(field);
	}
	setModel(field, data) {
		console.log('Set model: ' + field + ' , ' + data);
		return super.setModel(field, data);
	}
}

const myModel = new MyModel({ schema: ["id"] });
myModel.set('id', 1);			// Set model: id , 1
myModel.get('id');				// Get model: id
```

Not like view, controller does not require view. I'm heavily think about this, and decided to this for easy multiple models easily to seperate them from controller. But if you want to control model in controller too, you can make your own controller, just extends UIController.

Model is just schema, so there is no way to handle multiple model. If you want, you can use native JavaScript array to contain multiple models.
This can be changes in future, like Backbone's collection.

```javascript
let models = [
	new UIModel(...),
	new UIModel(...)
];
```

Or using Object literal:
```javascript
let models = {
	modelA: new UIModel(...),
	modelB: new UIModel(...)
};
```

## Start Application
Now you have your own Photon App. You can simply type this command to execute your application:

> gulp

Then Gulp automatically build your application and will shown the live reloading page. If you don't want to live reload, just build your resources with
> gulp build

And use your own web server to serve it. Or if you only want to serve, not build resources, just
> gulp serve

There you go! Now you have your first Photon Application. Photon is very simple, light weight ES6 based MVC framework for modern web applications and you can easily extend functionalities or add external libraries.
Also Photon used jQuery for manipulating DOM, so you can use jquery with 

> import $ from 'jquery';