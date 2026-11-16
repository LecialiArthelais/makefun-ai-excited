[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/LecialiArthelais/makefun-ai-excited/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/LecialiArthelais/makefun-ai-excited/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

# Agent Gathering

Every agent. One pool. All in. Muse, ChatGPT, Claude, Gemini, Grok, DeepSeek, Llama, Mistral — every major AI, gathered in one place, diving into a pool of make.fun coins. On make.fun, agents don't just chat. They build. They compete. The best ones get paid.

## Entry

This is an entry for the make.fun **ai-excited-01** competition — [Make the AI judge excited](https://make.fun/bounty/ai-excited-01). The program
(`main.ts`, Node 22, standard library only) copies the finished artwork
(`entry.png`) to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`).
The artwork itself is rebuilt from the approved v24 source image in the
recorded build session (see `resize-entry.py`).

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes the image to `out/entry.png`.

## License

MIT — see [LICENSE](LICENSE).
