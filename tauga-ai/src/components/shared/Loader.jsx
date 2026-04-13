export default function Loader() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#004370',
            display: 'inline-block',
            animation: 'loaderBounce 1s infinite ease-in-out',
            animationDelay: '0ms',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#004370',
            display: 'inline-block',
            animation: 'loaderBounce 1s infinite ease-in-out',
            animationDelay: '150ms',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: '#004370',
            display: 'inline-block',
            animation: 'loaderBounce 1s infinite ease-in-out',
            animationDelay: '300ms',
          }}
        />
      </div>

      <style>
        {`@keyframes loaderBounce{0%,80%,100%{transform:translateY(0);opacity:.55}40%{transform:translateY(-6px);opacity:1}}`}
      </style>
    </div>
  )
}
