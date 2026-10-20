export type TextSectionProps = {
  title: string
  value?: string
  editable: boolean // textarea modifiable ; sinon texte en lecture seule
  asField?: boolean // non modifiable mais affiché dans un textarea (sélection et copie faciles)
  rows?: number
  onChange: (value: string) => void
  onSave?: () => void // Ctrl+S / Cmd+S dans le textarea
}
