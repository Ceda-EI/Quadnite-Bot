# Quadnite-Bot

Source code for [@quadnite\_bot](https://t.me/quadnite_bot)

## Running your own instance

Quadnite bot depends on [Ugoki](https://gitlab.com/ceda_ei/ugoki) for providing
roleplay gifs. Once you have an instance of Ugoki (and optionally
[Ugoki Frontend](https://gitlab.com/ceda_ei/ugoki-frontend)) running:

- Clone this repo
- `npm install`
- `export BOT_API_KEY="your-token-for-bot"`
- `export FEEDBACK_ID="chat-id-where-feedback-is-forwarded-to"`
- `export UGOKI_ROOT="https://root.of.ugoki.api/server/"`
- `export RATE_TIMEFRAME=5000 # rate limit time interval in milliseconds`
- `export RATE_LIMIT=5 # number of requests allowed in the timeframe`
- `npm start`
