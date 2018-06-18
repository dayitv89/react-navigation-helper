# react-navigation-helper
![version](https://img.shields.io/badge/version-1.0.3-green.svg)

react-navigation StackNavigator Helper as convert screensProps, params to props as React prefer component props style.

## Why this required?
`StackNavigator` of `react-navigation` has initial some headache about where to pass screenProps, params etc. Where `react` componet does know `props` only. By Implementation of `react-navigation-helper`, you can use your react component with / without `react-navigation` with `props` style.

As assume your 3 component as `MyComponent1, MyComponent2, MyComponent3` expect a props to work. But while using
`StackNavigator`, you have to convert as initial component receives `props` as `props.screenProps`, and pushed element will receive props as `props.navigation.state.params`, which ends up your component independence.

`react-navigation-helper` makes your life easier to provide you component as everything as props and as `StackNavigator` way to. And now your component free to worried about only `props` independently.

Additionally, added some animation types available for screen transition:
1. push(default): right to left,
1. pop: left to right,
1. present: bottom to top,
1. dismiss: top to bottom,

### Implementation
```javascipt
/// AppNavigation.js
import { StackNavigator } from 'react-navigation';
import { StackNavigatorHelper } from 'react-navigation-helper';

import { MyComponent1, MyComponent2, MyComponent3, MyComponent4 } from './src';

export default StackNavigatorHelper.exportStackNavigator(
	StackNavigator(
		{
			MyComponent1: { screen: StackNavigatorHelper.setInitParamsToProps(MyComponent1) },
			MyComponent2: { screen: StackNavigatorHelper.paramsToProps(MyComponent2) },
			MyComponent3: { screen: StackNavigatorHelper.paramsToProps(MyComponent3) },
			MyComponent4: { screen: StackNavigatorHelper.paramsToProps(MyComponent4) }
		},
    {
  		headerMode: 'none',
  		cardStyle: {
        backgroundColor: 'transparent',
        shadowColor: 'transparent'
  		},
  		transitionConfig: () =>
  			StackNavigatorHelper.transitionConfig({
  				MyComponent3: 'present',
          			MyComponent4: 'pop'
  			})
	   }
	)
);
```

### Uses
```javascipt
/// App.js
import React from 'react';
import { AppRegistry } from 'react-native';
import AppNavigation from './AppNavigation';

const MyApp = props => (<AppNavigation {...props} />);
AppRegistry.registerComponent('MyApp', () => MyApp);
```
