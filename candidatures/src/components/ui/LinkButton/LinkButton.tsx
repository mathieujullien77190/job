import { Button } from './styles'
import type { LinkButtonProps } from './types'

const LinkButton = ({ tone, ...rest }: LinkButtonProps) => (
  <Button type="button" $danger={tone === 'danger'} {...rest} />
)

export default LinkButton
