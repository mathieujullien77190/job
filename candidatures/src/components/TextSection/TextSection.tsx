import { Editor, Preview } from './styles'
import type { TextSectionProps } from './types'

// Contenu d'un onglet : textarea modifiable (statut « étude »), textarea non modifiable (asField) ou texte en lecture seule.
// onSave : appelé sur Ctrl+S (ou Cmd+S) dans le textarea, à la place de l'enregistrement de la page par le navigateur.
export const TextSection = ({ title, value, editable, asField = false, rows = 10, onChange, onSave }: TextSectionProps) =>
  editable || asField ? (
    <Editor
      rows={rows}
      aria-label={title}
      spellCheck={false}
      placeholder={title}
      value={value ?? ''}
      readOnly={!editable}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (!onSave || !(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== 's') return
        e.preventDefault()
        onSave()
      }}
    />
  ) : (
    <Preview>{value}</Preview>
  )
