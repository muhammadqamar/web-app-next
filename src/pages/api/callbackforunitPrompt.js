export default function handler(req, res) {
  if (req.method === 'POST') {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'X-Postmark-Server-Token',
      process.env.NEXT_PUBLIC_EMAIL_KEY
    );

    var raw = JSON.stringify({
      From: 'qammar@curriki.org',
      To: 'qammar@curriki.org',
      Subject: 'Postmark test',
      TextBody: 'Hello dear Postmark user.',
      HtmlBody: `<html><body><strong>Hello</strong>
    <h1>email: ${req.query.email}</h1>
    <p>${JSON.stringify(req.body)}</p>
    </body></html>`,
      MessageStream: 'outbound',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://api.postmarkapp.com/email', requestOptions)
      .then((response) => response.text())
      .then((result) => res.status(200).json({ response: 'message sent' }))
      .catch((error) => res.status(500).json({ response: error }));
  } else {
    res.status(500).json({ message: 'method not required' });
  }
}
