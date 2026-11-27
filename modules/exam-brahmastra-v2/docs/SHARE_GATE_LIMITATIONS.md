# WhatsApp share and channel gate limitations

A website cannot reliably inspect a user's private WhatsApp share activity or prove that the user followed a WhatsApp Channel.

The module therefore:
- Opens the native share intent / WhatsApp share URL when available.
- Opens the configured Channel URL separately.
- Asks the learner to self-confirm before continuing.
- Must label the state as user-confirmed, never verified.

A real verification flow would require an official supported provider mechanism; do not scrape WhatsApp or request account credentials.