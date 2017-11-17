//
// Copyright © 2017-Present, Gaurav D. Sharma
// All rights reserved.
//
'use strict';

import React from 'react';
import { Animated, Easing } from 'react-native';

const transitionSpec = {
	duration: 300,
	easing: Easing.out(Easing.poly(4)),
	timing: Animated.timing
};

const animateBottom2Top = sceneProps => {
	const { layout, position, scene: { index } } = sceneProps;

	const height = layout.initHeight;
	const translateY = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [height, 0, 0]
	});

	const opacity = position.interpolate({
		inputRange: [index - 1, index - 0.99, index],
		outputRange: [0, 1, 1]
	});

	return { opacity, transform: [{ translateY }] };
};

const animateTop2Bottom = sceneProps => {
	const { layout, position, scene: { index } } = sceneProps;

	const height = layout.initHeight;
	const translateY = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [-height, 0, height]
	});

	const opacity = position.interpolate({
		inputRange: [index - 1, index - 0.99, index],
		outputRange: [0, 1, 1]
	});

	return { opacity, transform: [{ translateY }] };
};

const animateRight2Left = sceneProps => {
	const { layout, position, scene: { index } } = sceneProps;

	const width = layout.initWidth;
	const translateX = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [width, 0, -width]
	});

	const opacity = position.interpolate({
		inputRange: [index - 1, index - 0.99, index],
		outputRange: [0, 1, 1]
	});

	return { opacity, transform: [{ translateX }] };
};

const animateLeft2Right = sceneProps => {
	const { layout, position, scene: { index } } = sceneProps;

	const width = layout.initWidth;
	const translateX = position.interpolate({
		inputRange: [index - 1, index, index + 1],
		outputRange: [-width, 0, width]
	});

	const opacity = position.interpolate({
		inputRange: [index - 1, index - 0.99, index],
		outputRange: [0, 1, 1]
	});

	return { opacity, transform: [{ translateX }] };
};

const _transitionType = (path, sceneProps) => {
	const { scenes } = sceneProps;
	const { route: { routeName } } = scenes[scenes.length - 1];
	if (Object.keys(path).includes(routeName)) {
		return path[routeName];
	}
	return 'push';
};

const handleAnimation = (sceneProps, path) => {
	switch (_transitionType(path, sceneProps)) {
		case 'present':
			return animateBottom2Top(sceneProps); // present / model
		case 'dismiss':
			return animateTop2Bottom(sceneProps);
		case 'pop':
			return animateLeft2Right(sceneProps);
		default:
			return animateRight2Left(sceneProps); // push
	}
};

const transitionConfig = (path, transition = {}) => {
	return {
		transitionSpec: { ...transitionSpec, ...transition },
		screenInterpolator: sceneProps => handleAnimation(sceneProps, path)
	};
};

// Props helper
const paramsToProps = SomeComponent => {
	return class extends React.Component {
		render() {
			const { navigation: { state: { params } } } = this.props;
			return <SomeComponent {...params} {...this.props} />;
		}
	};
};

const setInitParamsToProps = SomeComponent => {
	return class extends React.Component {
		render() {
			const { screenProps } = this.props;
			return <SomeComponent {...screenProps} {...this.props} />;
		}
	};
};

const exportStackNavigator = SomeComponent => {
	return class extends React.Component {
		render() {
			return <SomeComponent screenProps={this.props} />;
		}
	};
};

module.exports = {
	transitionSpec,
	animateBottom2Top,
	animateTop2Bottom,
	animateRight2Left,
	animateLeft2Right,
	handleAnimation,
	transitionConfig,
	/// Props helper
	paramsToProps,
	setInitParamsToProps,
	exportStackNavigator
};
