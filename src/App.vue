<template>
	<div class="wrapper">
		<div class="container">
			<h1 class="title">{{ $t('title') }}</h1>
			<SwitchLanguage/>
			<div class="input">
				<label :class="{active: isActiveInput}">{{ $t('input') }}</label>
				<input
					type="text"
					v-model="inputValue"
					@focus="isActiveInput = true"
					@blur="inputOnBlur"
				>
			</div>
			<div class="code">
				<div class="hidden">
					<vue-qrcode
						:value="qrCodeValue"
						:options="{
						width: 280,
					}"
					/>
				</div>
				<vue-qrcode
					:value="qrCodeValue"
					:options="{
						width: 280,
					}"
					tag="svg"
				/>
			</div>
			<div class="download">
				<div class="button" @click="downloadImage('png')">
					{{ $t('download', { type: 'png' }) }}
				</div>
				<div class="button" @click="downloadImage('jpeg')">
					{{ $t('download', { type: 'jpeg' }) }}
				</div>
				<div class="button" @click="downloadSvg">
					{{ $t('download', { type: 'svg' }) }}
				</div>
				<div class="button" @click="downloadPdf">
					{{ $t('download', { type: 'pdf' }) }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import SwitchLanguage from "./components/SwitchLanguage.vue";

import { ref, watch, onMounted } from 'vue'
import { jsPDF } from "jspdf";

let qrCodeValue = ref('https://github.com/MMaakkss')
let isActiveInput = ref(false)
let inputValue = ref('')
let canvas

const inputOnBlur = () => {
	if (!inputValue.value.length) isActiveInput.value = false
}

const downloadImage = (type) => {
	let downloadLink = document.createElement('a')
	downloadLink.href = canvas.toDataURL(`image/${type}`)
	downloadLink.download = 'qrcode'
	downloadLink.click()
}

const downloadSvg = () => {
	let svgEl = document.getElementsByTagName('svg')[0]
	svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg")
	const svgData = svgEl.outerHTML
	const preface = '<?xml version="1.0" standalone="no"?>\r\n'
	const svgBlob = new Blob([preface, svgData], {type: "image/svg+xml;charset=utf-8"})
	const svgUrl = URL.createObjectURL(svgBlob)
	const downloadLink = document.createElement("a")
	downloadLink.href = svgUrl
	downloadLink.download = 'qrcode.svg'
	document.body.appendChild(downloadLink)
	downloadLink.click()
	document.body.removeChild(downloadLink)
}

const downloadPdf = () => {
	const imgData = canvas.toDataURL('image/png')
	const doc = new jsPDF()
	doc.addImage(imgData, 'PNG', 10, 10);
	doc.save('qrcode' + '.pdf')
}

watch(inputValue, () => {
	const timeoutId = window.setTimeout(() => {
	}, 0)
	for (let id = timeoutId; id >= 0; id -= 1) {
		window.clearTimeout(id)
	}

	setTimeout(() => {
		if (inputValue.value.length) {
			qrCodeValue.value = inputValue.value
		} else {
			qrCodeValue.value = 'https://github.com/MMaakkss'
		}
	}, 400)
})

onMounted(() => canvas = document.getElementsByTagName('canvas')[0])
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100vw;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	.container {
		min-width: 800px;
		padding: 20px;

		@media (max-width: 880px) {
			min-width: unset;
			width: 100%;
		}

		.title {
			text-align: center;
			margin-bottom: 10px;
			
			@media (max-width: 390px) {
				font-size: 28px;
			}
		}

		.input {
			position: relative;

			input {
				display: block;
				width: 100%;
				padding: 10px 15px;
				font-size: 16px;
				border-radius: 10px;
				border: 1.5px solid #dddddd;
				transition: 0.2s;

				&:focus {
					outline: none;
					border: 1.5px solid #09b6ff;
				}
			}

			label {
				padding: 0 5px;
				font-size: 13px;
				position: absolute;
				top: 13px;
				left: 15px;
				transition: 0.2s;
				color: #9f9f9f;

				&.active {
					top: -6px;
					background-color: #ffffff;
				}
			}
		}

		.code {
			text-align: center;

			.hidden {
				display: none;
			}
		}

		.download {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 12px;
		}

		.button {
			padding: 8px 18px;
			border-radius: 10px;
			border: 1.5px solid #dddddd;
			transition: 0.3s;
			cursor: pointer;

			&:hover {
				border: 1.5px solid #09b6ff;
				background-color: #09b6ff;
				color: #ffffff;
			}
		}
	}
}
</style>
