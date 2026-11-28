# Form (表单容器)

> 基于 TanStack Form (@tanstack/react-form) 封装的类型安全表单容器与字段原语，内置同步/异步校验、服务端错误映射、细粒度状态订阅，无缝搭配 Input、Select、Textarea、Checkbox 等 Glaze 基础控件。

## Installation (shadcn CLI)

```bash
npx shadcn@latest add @glaze/form
```

- **Registry JSON**: `/r/form.json`
- **Import Path**: `@/components/ui/form`
- **Exports**: `createFormHook`, `createFormHookContexts`, `formOptions`, `revalidateLogic`, `useField`, `useForm`, `useStore`, `formatFormError`, `getFieldErrors`, `isFieldInvalid`, `useFormContext`, `useFormField`, `Form`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `FormErrors`, `FormSubscribe`, `FormSubmit`, `FormReset`
- **NPM Dependencies**: `@tanstack/react-form`, `cn`
- **Registry Dependencies**: `@glaze/button`

## API Reference

### createFormHook

Inherits standard Base UI / HTML element props.

### createFormHookContexts

Inherits standard Base UI / HTML element props.

### formOptions

Inherits standard Base UI / HTML element props.

### revalidateLogic

Inherits standard Base UI / HTML element props.

### useField

Inherits standard Base UI / HTML element props.

### useForm

Inherits standard Base UI / HTML element props.

### useStore

Inherits standard Base UI / HTML element props.

### formatFormError

Inherits standard Base UI / HTML element props.

### getFieldErrors

Inherits standard Base UI / HTML element props.

### isFieldInvalid

Inherits standard Base UI / HTML element props.

### useFormContext

Inherits standard Base UI / HTML element props.

### useFormField

Inherits standard Base UI / HTML element props.

### Form

Extends: `Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `form?` | `AnyFormApi` | — | TanStack Form instance created with `useForm()` |
| `onSubmit?` | `React.FormEventHandler<HTMLFormElement>` | — | Optional submit event handler invoked alongside `form.handleSubmit()` |
| `noValidate?` | `boolean` | — | Disable native browser validation popups (defaults to `true` when `form` is provided) |

### FormItem

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `field?` | `AnyFieldApi` | — | TanStack Form field API from `<form.Field>` or `useField()` |
| `invalid?` | `boolean` | — | Manually override invalid state |
| `disabled?` | `boolean` | `false` | Mark the field group as disabled |
| `errorVisibility?` | `FormErrorVisibility` | `'touched'` | Control when validation errors become visible |

### FormLabel

Extends: `React.LabelHTMLAttributes<HTMLLabelElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `required?` | `boolean` | `false` | Render a visual required indicator next to the label text |

### FormControl

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactElement<any>` | — | Single Glaze input/control element (e.g. Input, Textarea, Select) |

### FormDescription

Extends: `React.HTMLAttributes<HTMLParagraphElement>`

Inherits standard Base UI / HTML element props.

### FormMessage

Extends: `React.HTMLAttributes<HTMLParagraphElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `field?` | `AnyFieldApi` | — | Optional TanStack Form field override when rendered outside `<FormItem>` |
| `errorVisibility?` | `FormErrorVisibility` | `'touched'` | Control when validation errors become visible (used when `field` prop is passed directly) |
| `showAll?` | `boolean` | `false` | Join all error messages instead of showing only the first |
| `validatingText?` | `React.ReactNode` | — | Optional hint shown while an async field validator is pending |

### FormErrors

Extends: `React.HTMLAttributes<HTMLDivElement>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `form?` | `AnyFormApi` | — | Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) |

### FormSubscribe

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `form?` | `AnyFormApi` | — | Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) |
| `selector` | `(state: AnyFormApi['state']) => TSelected` | — | Selector deriving the subscribed slice from `form.state` |
| `children` | `(state: TSelected) => React.ReactNode` | — | Render callback receiving the selected form state slice |

### FormSubmit

Extends: `Omit<ButtonProps, 'form'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `form?` | `AnyFormApi` | — | Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) |
| `pendingText?` | `React.ReactNode` | — | Label rendered while `form.state.isSubmitting` is true |
| `disableWhenInvalid?` | `boolean` | `false` | Also disable the submit button whenever `form.state.canSubmit` is false |

### FormReset

Extends: `Omit<ButtonProps, 'form'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `form?` | `AnyFormApi` | — | Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) |
| `disableWhenPristine?` | `boolean` | `false` | Disable the reset button when the form has no unsaved changes (`!isDirty`) |

### Supporting Types

#### `FormFieldContextValue`

| Property | Type | Required |
| --- | --- | --- |
| `id` | `string` | Yes |
| `controlId` | `string` | Yes |
| `descriptionId` | `string` | Yes |
| `messageId` | `string` | Yes |
| `name` | `string` | Yes |
| `field` | `AnyFieldApi` | No |
| `invalid` | `boolean` | Yes |
| `isValidating` | `boolean` | Yes |
| `errors` | `string[]` | Yes |
| `disabled` | `boolean` | Yes |

### Data Attributes (Base UI State)

| Attribute | Description |
| --- | --- |
| `data-invalid` | 字段校验未通过（自动同步至 FormItem、FormLabel 与 FormControl 子控件） |
| `data-valid` | 字段已触碰且校验通过 |
| `data-dirty` | 字段值相对默认值已发生变更 |
| `data-touched` | 字段已被触碰或失焦 |
| `data-validating` | 异步校验器正在执行 |
| `data-submitting` | FormSubmit 处于异步提交进行中 |

## Source Code

```tsx
import * as React from 'react'
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
  revalidateLogic,
  useField,
  useForm,
  useStore,
  type AnyFieldApi,
  type AnyFormApi,
  type DeepKeys,
  type DeepValue,
  type FieldApi,
  type FormOptions,
  type ReactFormExtendedApi,
} from '@tanstack/react-form'
import { cn } from 'cn'
import { Button, type ButtonProps } from '@/components/ui/button'

export {
  createFormHook,
  createFormHookContexts,
  formOptions,
  revalidateLogic,
  useField,
  useForm,
  useStore,
}

export type {
  AnyFieldApi,
  AnyFormApi,
  DeepKeys,
  DeepValue,
  FieldApi,
  FormOptions,
  ReactFormExtendedApi,
}

// ============================================================================
// Contexts & Utilities
// ============================================================================

export type FormErrorVisibility = 'touched' | 'blurred' | 'submitted' | 'always'

const FormContext = React.createContext<AnyFormApi | null>(null)

export interface FormFieldContextValue {
  /** Base DOM id shared by label, control, description and error message */
  id: string
  /** Control element id bound to FormLabel htmlFor */
  controlId: string
  /** Description element id for aria-describedby */
  descriptionId: string
  /** Error message element id for aria-describedby */
  messageId: string
  /** TanStack Form field name */
  name: string
  /** Bound TanStack Form field API instance */
  field?: AnyFieldApi
  /** Whether the field should display its invalid state */
  invalid: boolean
  /** Whether an async field validator is currently running */
  isValidating: boolean
  /** Normalized error messages from the field's validation meta */
  errors: string[]
  /** Whether the field item is marked disabled */
  disabled: boolean
}

const FormItemContext = React.createContext<FormFieldContextValue | null>(null)

/**
 * Normalize a TanStack Form error entry (string, Standard Schema issue object, or Error)
 * into a displayable message string.
 */
export function formatFormError(error: unknown): string | null {
  if (error == null || error === false) return null
  if (typeof error === 'string') {
    const trimmed = error.trim()
    return trimmed.length > 0 ? trimmed : null
  }
  if (typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === 'string' && message.trim().length > 0) {
      return message.trim()
    }
  }
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message.trim()
  }
  return String(error)
}

/**
 * Extract deduplicated, human-readable error strings from a TanStack Form field.
 */
export function getFieldErrors(field?: AnyFieldApi): string[] {
  if (!field) return []
  const rawErrors = field.state.meta.errors ?? []
  const messages: string[] = []
  const seen = new Set<string>()

  for (const entry of rawErrors) {
    const items = Array.isArray(entry) ? entry : [entry]
    for (const item of items) {
      const formatted = formatFormError(item)
      if (formatted && !seen.has(formatted)) {
        seen.add(formatted)
        messages.push(formatted)
      }
    }
  }

  return messages
}

/**
 * Determine whether a TanStack Form field should currently display invalid styling & errors.
 */
export function isFieldInvalid(
  field?: AnyFieldApi,
  visibility: FormErrorVisibility = 'touched',
): boolean {
  if (!field) return false
  const errors = getFieldErrors(field)
  if (errors.length === 0) return false

  const meta = field.state.meta
  const hasSubmitted = (field.form?.state?.submissionAttempts ?? 0) > 0
  const hasServerError = Boolean(meta.errorMap?.onServer)

  if (hasServerError) return true

  switch (visibility) {
    case 'always':
      return true
    case 'submitted':
      return hasSubmitted
    case 'blurred':
      return meta.isBlurred || hasSubmitted
    case 'touched':
    default:
      return meta.isTouched || hasSubmitted
  }
}

/**
 * Access the TanStack Form instance provided by the nearest `<Form form={form}>`.
 */
export function useFormContext(): AnyFormApi {
  const form = React.useContext(FormContext)
  if (!form) {
    throw new Error('useFormContext must be used within a <Form form={form}> component.')
  }
  return form
}

/**
 * Access the current field metadata & accessibility ids inside `<FormItem>`.
 */
export function useFormField(): FormFieldContextValue {
  const ctx = React.useContext(FormItemContext)
  if (!ctx) {
    throw new Error('useFormField must be used within a <FormItem> component.')
  }
  return ctx
}

// ============================================================================
// Form Container
// ============================================================================

export interface FormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** TanStack Form instance created with `useForm()` */
  form?: AnyFormApi
  /** Optional submit event handler invoked alongside `form.handleSubmit()` */
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  /** Disable native browser validation popups (defaults to `true` when `form` is provided) */
  noValidate?: boolean
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(
  { form, noValidate, onSubmit, onReset, className, children, ...props },
  ref,
) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    if (form) {
      event.preventDefault()
      event.stopPropagation()
      onSubmit?.(event)
      void form.handleSubmit()
      return
    }
    onSubmit?.(event)
  }

  const handleReset: React.FormEventHandler<HTMLFormElement> = (event) => {
    if (form) {
      event.preventDefault()
      form.reset()
      onReset?.(event)
      return
    }
    onReset?.(event)
  }

  const element = (
    <form
      ref={ref}
      noValidate={noValidate ?? Boolean(form)}
      onSubmit={handleSubmit}
      onReset={handleReset}
      className={cn('flex w-full flex-col gap-4', className)}
      {...props}
    >
      {children}
    </form>
  )

  if (!form) return element

  return <FormContext.Provider value={form}>{element}</FormContext.Provider>
})

// ============================================================================
// Field Layout & Accessibility Primitives
// ============================================================================

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** TanStack Form field API from `<form.Field>` or `useField()` */
  field?: AnyFieldApi
  /** Manually override invalid state */
  invalid?: boolean
  /** Mark the field group as disabled */
  disabled?: boolean
  /** Control when validation errors become visible */
  errorVisibility?: FormErrorVisibility
}

export function FormItem({
  field,
  invalid,
  disabled = false,
  errorVisibility = 'touched',
  className,
  ...props
}: FormItemProps) {
  const reactId = React.useId()
  const name = field ? String(field.name) : ''
  const id = name ? `glaze-form-${name}-${reactId}` : `glaze-form-${reactId}`
  const errors = getFieldErrors(field)
  const computedInvalid = invalid ?? isFieldInvalid(field, errorVisibility)
  const isValidating = Boolean(field?.state.meta.isValidating)
  const isTouched = Boolean(field?.state.meta.isTouched)
  const isDirty = Boolean(field?.state.meta.isDirty)
  const isValid = Boolean(field && !computedInvalid && isTouched && errors.length === 0)

  const contextValue = React.useMemo<FormFieldContextValue>(
    () => ({
      id,
      controlId: id,
      descriptionId: `${id}-description`,
      messageId: `${id}-message`,
      name,
      field,
      invalid: computedInvalid,
      isValidating,
      errors,
      disabled,
    }),
    [id, name, field, computedInvalid, isValidating, errors, disabled],
  )

  return (
    <FormItemContext.Provider value={contextValue}>
      <div
        data-invalid={computedInvalid ? '' : undefined}
        data-valid={isValid ? '' : undefined}
        data-dirty={isDirty ? '' : undefined}
        data-touched={isTouched ? '' : undefined}
        data-validating={isValidating ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        className={cn('flex w-full flex-col gap-1.5', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Render a visual required indicator next to the label text */
  required?: boolean
}

export function FormLabel({
  required = false,
  htmlFor,
  className,
  children,
  ...props
}: FormLabelProps) {
  const item = React.useContext(FormItemContext)

  return (
    <label
      htmlFor={htmlFor ?? item?.controlId}
      data-invalid={item?.invalid ? '' : undefined}
      className={cn(
        'inline-flex items-center gap-1 text-[13px] font-semibold text-[#1B1F27]',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="text-[#E5603B]">
          *
        </span>
      )}
    </label>
  )
}

export interface FormControlProps {
  /** Single Glaze input/control element (e.g. Input, Textarea, Select) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: React.ReactElement<any>
}

export function FormControl({ children }: FormControlProps) {
  const item = React.useContext(FormItemContext)

  if (!item || !React.isValidElement(children)) {
    return children
  }

  const existingProps = children.props as Record<string, unknown>
  const existingDescribedBy =
    typeof existingProps['aria-describedby'] === 'string'
      ? existingProps['aria-describedby']
      : undefined
  const describedBy = [
    existingDescribedBy,
    item.descriptionId,
    item.invalid ? item.messageId : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
    id: existingProps.id ?? item.controlId,
    'aria-invalid': existingProps['aria-invalid'] ?? (item.invalid || undefined),
    'aria-describedby': describedBy || undefined,
    'data-invalid': existingProps['data-invalid'] ?? (item.invalid ? '' : undefined),
  })
}

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormDescription({ className, id, ...props }: FormDescriptionProps) {
  const item = React.useContext(FormItemContext)

  return (
    <p
      id={id ?? item?.descriptionId}
      className={cn('m-0 text-[12px] text-[#6B7280]', className)}
      {...props}
    />
  )
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Optional TanStack Form field override when rendered outside `<FormItem>` */
  field?: AnyFieldApi
  /** Control when validation errors become visible (used when `field` prop is passed directly) */
  errorVisibility?: FormErrorVisibility
  /** Join all error messages instead of showing only the first */
  showAll?: boolean
  /** Optional hint shown while an async field validator is pending */
  validatingText?: React.ReactNode
}

export function FormMessage({
  field: fieldProp,
  errorVisibility = 'touched',
  showAll = false,
  validatingText,
  id,
  className,
  children,
  ...props
}: FormMessageProps) {
  const item = React.useContext(FormItemContext)
  const errors = fieldProp ? getFieldErrors(fieldProp) : (item?.errors ?? [])
  const invalid = fieldProp
    ? isFieldInvalid(fieldProp, errorVisibility)
    : (item?.invalid ?? false)
  const isValidating = fieldProp
    ? Boolean(fieldProp.state.meta.isValidating)
    : (item?.isValidating ?? false)

  if (children != null) {
    return (
      <p
        role="alert"
        id={id ?? item?.messageId}
        className={cn('m-0 text-[12px] font-medium text-[#A6360F]', className)}
        {...props}
      >
        {children}
      </p>
    )
  }

  if (isValidating && validatingText) {
    return (
      <p
        id={id ?? item?.messageId}
        className={cn('m-0 text-[12px] text-[#6B7280]', className)}
        {...props}
      >
        {validatingText}
      </p>
    )
  }

  if (!invalid || errors.length === 0) {
    return null
  }

  const text = showAll ? errors.join('；') : errors[0]

  return (
    <p
      role="alert"
      id={id ?? item?.messageId}
      className={cn('m-0 text-[12px] font-medium text-[#A6360F]', className)}
      {...props}
    >
      {text}
    </p>
  )
}

// ============================================================================
// Form-Level Reactive Components (Errors, Subscribe, Submit, Reset)
// ============================================================================

export interface FormErrorsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) */
  form?: AnyFormApi
}

function FormErrorsBound({
  form,
  className,
  children,
  ...props
}: FormErrorsProps & { form: AnyFormApi }) {
  const rawErrors = useStore(form.store, (state) => state.errors)

  const messages = React.useMemo(() => {
    const list: string[] = []
    const seen = new Set<string>()
    for (const entry of rawErrors ?? []) {
      const items = Array.isArray(entry) ? entry : [entry]
      for (const item of items) {
        const formatted = formatFormError(item)
        if (formatted && !seen.has(formatted)) {
          seen.add(formatted)
          list.push(formatted)
        }
      }
    }
    return list
  }, [rawErrors])

  if (children == null && messages.length === 0) return null

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col gap-1 rounded-[14px] bg-[#FDE5DC] px-3.5 py-2.5 text-[13px] font-medium text-[#A6360F]',
        className,
      )}
      {...props}
    >
      {children ??
        messages.map((msg) => (
          <p key={msg} className="m-0">
            {msg}
          </p>
        ))}
    </div>
  )
}

export function FormErrors({ form: formProp, ...props }: FormErrorsProps) {
  const contextForm = React.useContext(FormContext)
  const resolvedForm = formProp ?? contextForm
  if (!resolvedForm) return null
  return <FormErrorsBound form={resolvedForm} {...props} />
}

export interface FormSubscribeProps<TSelected = unknown> {
  /** Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) */
  form?: AnyFormApi
  /** Selector deriving the subscribed slice from `form.state` */
  selector: (state: AnyFormApi['state']) => TSelected
  /** Render callback receiving the selected form state slice */
  children: (state: TSelected) => React.ReactNode
}

export function FormSubscribe<TSelected = unknown>({
  form: formProp,
  selector,
  children,
}: FormSubscribeProps<TSelected>) {
  const contextForm = React.useContext(FormContext)
  const resolvedForm = formProp ?? contextForm
  if (!resolvedForm) {
    throw new Error('FormSubscribe must be used inside <Form form={form}> or receive a `form` prop.')
  }
  const selected = useStore(resolvedForm.store, selector)
  return <>{children(selected)}</>
}

export interface FormSubmitProps extends Omit<ButtonProps, 'form'> {
  /** Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) */
  form?: AnyFormApi
  /** Label rendered while `form.state.isSubmitting` is true */
  pendingText?: React.ReactNode
  /** Also disable the submit button whenever `form.state.canSubmit` is false */
  disableWhenInvalid?: boolean
}

function FormSubmitBound({
  form,
  pendingText,
  disableWhenInvalid = false,
  disabled,
  focusableWhenDisabled = true,
  children,
  ...props
}: FormSubmitProps & { form: AnyFormApi }) {
  const canSubmit = useStore(form.store, (state) => state.canSubmit)
  const isSubmitting = useStore(form.store, (state) => state.isSubmitting)

  const isDisabled = Boolean(
    disabled || isSubmitting || (disableWhenInvalid && !canSubmit),
  )

  return (
    <Button
      type="submit"
      disabled={isDisabled}
      focusableWhenDisabled={focusableWhenDisabled}
      data-submitting={isSubmitting ? '' : undefined}
      {...props}
    >
      {isSubmitting && pendingText != null ? pendingText : children}
    </Button>
  )
}

export function FormSubmit({
  form: formProp,
  pendingText,
  disableWhenInvalid = false,
  ...props
}: FormSubmitProps) {
  const contextForm = React.useContext(FormContext)
  const resolvedForm = formProp ?? contextForm

  if (!resolvedForm) {
    return <Button type="submit" {...props} />
  }

  return (
    <FormSubmitBound
      form={resolvedForm}
      pendingText={pendingText}
      disableWhenInvalid={disableWhenInvalid}
      {...props}
    />
  )
}

export interface FormResetProps extends Omit<ButtonProps, 'form'> {
  /** Optional TanStack Form instance (defaults to nearest `<Form form={form}>`) */
  form?: AnyFormApi
  /** Disable the reset button when the form has no unsaved changes (`!isDirty`) */
  disableWhenPristine?: boolean
}

function FormResetBound({
  form,
  disableWhenPristine = false,
  variant = 'secondary',
  disabled,
  onClick,
  ...props
}: FormResetProps & { form: AnyFormApi }) {
  const isDirty = useStore(form.store, (state) => state.isDirty)
  const isDisabled = Boolean(disabled || (disableWhenPristine && !isDirty))

  return (
    <Button
      type="button"
      variant={variant}
      disabled={isDisabled}
      onClick={(event) => {
        form.reset()
        onClick?.(event)
      }}
      {...props}
    />
  )
}

export function FormReset({
  form: formProp,
  disableWhenPristine = false,
  variant = 'secondary',
  ...props
}: FormResetProps) {
  const contextForm = React.useContext(FormContext)
  const resolvedForm = formProp ?? contextForm

  if (!resolvedForm) {
    return <Button type="reset" variant={variant} {...props} />
  }

  return (
    <FormResetBound
      form={resolvedForm}
      disableWhenPristine={disableWhenPristine}
      variant={variant}
      {...props}
    />
  )
}
```
