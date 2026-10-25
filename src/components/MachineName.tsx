/** Renders a machine name, keeping hyphenated model codes such as 21C-S on one line. */
export function MachineName({ name }: { name: string }) {
  return (
    <>
      {name.split(' ').map((word, index) => (
        <span key={index} style={word.includes('-') ? { whiteSpace: 'nowrap' } : undefined}>
          {index > 0 && ' '}
          {word}
        </span>
      ))}
    </>
  )
}
