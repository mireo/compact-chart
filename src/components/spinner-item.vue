<template>
<div class="spinner">
	<div class="loader"><div></div><div></div><div></div></div>
</div>
</template>

<style lang='scss'>
.spinner {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;

	position: relative;
	flex: 1 0 auto;
	white-space: nowrap;
	padding: 0px;
	margin: 0px;
	font-size: 12px;

	.loader {
		position: absolute;
	}
}

.disabled-input {
    pointer-events: none;
    opacity: 0.6;
}

.loader, .loader:before, .loader:after {
	background: #41b883;
	-webkit-animation: load1 1s infinite ease-in-out;
	animation: load1 1s infinite ease-in-out;
	width: 1em;
	height: 1em;
}
.loader {
	color: #41b883;
	text-indent: -9999em;
	margin: 0px auto 0px;
	position: relative;
	font-size: 11px;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
	-webkit-animation-delay: -0.16s;
	animation-delay: -0.16s;
}
.loader:before, .loader:after {
	position: absolute;
	top: 0;
	content: '';
}
.loader:before {
	left: -1.5em;
	-webkit-animation-delay: -0.32s;
	animation-delay: -0.32s;
}
.loader:after {
	left: 1.5em;
}

@-webkit-keyframes load1 {
	0%, 80%, 100% {
		box-shadow: 0 0;
		height: 1em;
	}
	40% {
		box-shadow: 0 -1em;
		height: 1.3em;
	}
}

@keyframes load1 {
	0%, 80%, 100% {
		box-shadow: 0 0;
		height: 1em;
	}
	40% {
		box-shadow: 0 -1em;
		height: 1.3em;
	}
}
</style>