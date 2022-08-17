import { useObservableCallback } from 'observable-hooks'
import { pick } from 'ramda'
import { InputError } from './InputError'
import { InputProps } from './input.types'
import { tap } from 'rxjs'

/**
 * Input Component That allows for easy, but complex validation
 *
 * @example
 * const exampleForm = () => {
 *  const form = useForm()
 *  const onSubmit = console.log
 *
 *  return (
 *    <form onSubmit={form.handleSubmit(onSubmit)}>
 *      // required field
 *      <Input form={form} name="Required Field" required />
 *      // number field with min/max validation
 *      <Input form={form} type="number" name="Number Field" min={3} max={5} />
 *      // text field with length validation
 *      <Input form={form} name="Text Field" minLength={3} maxLength={5} />
 *      // field with custom validation
 *      <Input form={form} name="Custom Validation"
 *        validate={{
 *           the key is the message shown if the current value of the field does not pass the predicate
 *          'Greater Than 3': currFieldValue => currFieldValue > 3,
 *          'Must Equal Test': currFieldValue => currFieldValue === 'test',
 *        }}
 *       />
 *    </form>
 *  )
 * }
 */
export const Input = ({
  form,
  label,
  name,
  type,
  autoFocus,
  autoComplete,
  ...props
}: InputProps) => {
  const { register, watch, formState } = form

  const [onInput] = useObservableCallback((input$) =>
    input$.pipe(tap(console.log))
  )

  const validators = pick(
    ['min', 'max', 'minLength', 'maxLength', 'required', 'pattern', 'validate'],
    props
  )

  return (
    <div className={`mt-4 ${props.className}`}>
      <label
        className={`text-sm font-medium leading-5 text-gray-700 lock ${
          props.labelClasses
        } ${props.noLabel ? 'sr-only' : ''}`}
        htmlFor={label}
      >
        <span className='pl-2 m-0 text-gray-500 text-md'>
          <span className='pr-1 text-red-400'>
            {validators.required && '*'}
          </span>
          {label}
        </span>
      </label>

      <div
        className={`rounded-lg group shadow-sm flex border border-gray-300 bg-white focus-within:shadow-outline-blue focus-within:border-blue-300 overflow-hidden ${props.inputClasses}`}
      >
        {props.prependElement && props.prependElement}
        <input
          ref={register(name, validators).ref}
          onChange={(event) => {
            props.onChange
              ? props.onChange(event.target.value)
              : register(name, validators).onChange(event)
          }}
          onBlur={(event) => {
            props.onBlur
              ? props.onBlur(event.target.value)
              : register(name, validators).onBlur(event)
          }}
          className={`block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out outline-none appearance-none sm:text-sm sm:leading-5 ${props.inputClasses}`}
          id={label}
          type={type ? type : 'text'}
          name={name}
          placeholder={props.placeholder || label}
          autoFocus={autoFocus}
          autoComplete={autoComplete ? 'on' : 'off'}
          defaultValue={props.defaultValue}
          disabled={props.disabled}
        />
        {props.appendElement && props.appendElement}
      </div>

      <InputError
        isSubmitted={form.formState.isSubmitted}
        fieldValue={watch(name)}
        error={formState.errors[name]}
        validators={validators}
      />
    </div>
  )
}
