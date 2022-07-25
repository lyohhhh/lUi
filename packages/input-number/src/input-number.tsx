import { LIcon, LInput } from '../../components';
import { computed, defineComponent } from 'vue';
import { InputNumberProps } from './input-number-props';
import '../styles/input-number.scss';
import { throttle } from '@/_utils';
export default defineComponent({
	name: 'InputNumber',
	props: InputNumberProps,
	emits: ['update:modelValue', 'focus', 'blur', 'change'],
	setup(props, { emit }) {
		const defaultNumber = props.modelValue;

		const emitChange = (num: number) => {
			emit('update:modelValue', num);
			emit('change', num);
		};
		const emitFocus = (args: number) => {
			emit('focus', args);
		};
		const emitBlur = (args: number) => {
			emit('focus', args);
		};

		const num = computed<number>(() => {
			return isNumber.value ? +props.modelValue : defaultNumber;
		});

		const isNumber = computed<boolean>(() => {
			return !isNaN(+props.modelValue);
		});

		// 减
		const minusHandle = throttle(() => {
			emit('update:modelValue', num.value - 1);
		}, 100);

		// 加
		const addHandle = throttle(() => {
			emit('update:modelValue', num.value + 1);
		}, 100);
		return () => (
			<>
				<div class='l-input-number'>
					<span class='l-input-number__prefix'>
						<LIcon icon='henggang' onClick={minusHandle}></LIcon>
					</span>
					<span class='l-input-number__suffix'>
						<LIcon icon='jiahao' onClick={addHandle}></LIcon>
					</span>
					<LInput
						type='number'
						v-model={props.modelValue}
						onChange={emitChange}
						onFocus={emitFocus}
						onBlur={emitBlur}
						clearable={false}
					></LInput>
				</div>
			</>
		);
	},
});
