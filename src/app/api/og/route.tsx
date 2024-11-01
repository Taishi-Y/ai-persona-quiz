import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'AIペルソナ診断';
  const description = searchParams.get('description') ?? 'あなたのAIとの関わり方を診断します';
  const badges = searchParams.get('badges')?.split(',') ?? [];
  
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            backgroundImage: 'linear-gradient(to bottom right, #EEF2FF, #E0E7FF)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <h1
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
                background: 'linear-gradient(to right, #7C3AED, #2563EB)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {type}
            </h1>
            <p
              style={{
                fontSize: 30,
                textAlign: 'center',
                marginBottom: '10px',
                color: '#4B5563',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              {badges.map((badge, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: '#DBEAFE',
                    color: '#2563EB',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: 20,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}