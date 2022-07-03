import { ControlsProps } from './Controls.types'

export const Controls = ({
  count,
  disabled,
  label,
  colors,
  variant,
  size
}: ControlsProps) => (
  <>
    <p>shit: {count}</p>
    <p>Disabled: {disabled ? 'yes' : 'no'}</p>
    <p>Label: {label}</p>
    <p>Colors: {colors.join(',')}</p>
    <p>Variant: {variant}</p>
    <p>Size: {size}</p>
  </>
)
