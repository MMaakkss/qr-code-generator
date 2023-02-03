<template>
	<div class="language">
		<h4>{{ $t('selectLanguage') }}</h4>
		<div class="locale" :class="{active: isActive}">
			<h3 class="item current" @click="toggle">
				{{ $t(locale) }}
			</h3>
			<h3 class="item list" @click="switchLanguage">
				<template v-if="locale === 'en'">
					{{ $t('ua') }}
				</template>
				<template v-else>
					{{ $t('en') }}
				</template>
			</h3>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n()

let isActive = ref(false)
const toggle = () => {
	isActive.value = !isActive.value
	document.addEventListener("click", close)
}

const close = (e) => {
	if (!e.target.closest(".locale")) {
		isActive.value = false
		document.removeEventListener("click", close)
	}
}

const switchLanguage = () => {
	isActive.value = false;
	if (locale.value === 'en') {
		locale.value = 'ua'
		localStorage.setItem('language', 'ua')
	} else {
		locale.value = 'en'
		localStorage.setItem('language', 'en')
	}
}
</script>

<style lang="scss" scoped>
.language {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 50px;

	.locale {
		margin-left: 4px;
		position: relative;

		&.active {
			.list {
				border-radius: 0 0 4px 4px;
				top: 100%;
			}

			.current {
				border-radius: 4px 4px 0 0;
			}
		}

		.item {
			width: 100px;
			padding: 4px 10px;
			text-align: center;
			background-color: #09b6ff;
			color: #ffffff;
			border-radius: 4px;
			cursor: pointer;
		}

		.list {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			transition: 0.2s;
			border-top: 0.5px solid #ffffff;

			&:hover {
				opacity: 0.8;
			}
		}

		.current {
			position: relative;
			z-index: 2;
		}
	}
}
</style>