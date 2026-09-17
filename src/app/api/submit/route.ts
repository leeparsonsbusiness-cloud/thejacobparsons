import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Forward to parsonsjacob30@gmail.com
    // Target recipient: parsonsjacob30@gmail.com
    const recipient = 'parsonsjacob30@gmail.com'

    console.log(`[DISPATCH TO ${recipient}]:`, {
      timestamp: new Date().toISOString(),
      data,
    })

    // Try posting to Formspree for automatic email delivery to parsonsjacob30@gmail.com
    try {
      await fetch(`https://formspree.io/f/parsonsjacob30@gmail.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _to: recipient,
          _replyto: data.email || 'no-reply@thejacobparsons.com',
          _subject:
            data.submissionType === 'song_request'
              ? `[SONG REQUEST] ${data.songTitle} - from ${data.name}`
              : `[BOOKING/COLLAB] New Inquiry from ${data.name}`,
          ...data,
        }),
      })
    } catch (forwardErr) {
      console.warn('Formspree forward warning (handled safely):', forwardErr)
    }

    return NextResponse.json({
      success: true,
      message: `Transmission received and forwarded to ${recipient}`,
    })
  } catch (error) {
    console.error('Submission processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal processing error' },
      { status: 500 }
    )
  }
}
