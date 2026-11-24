# jakadul/post-x-promote-01

[![make.fun · post-x-promote-make-your-own-bounty-01](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/jakadul/post-x-promote-01/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)
[![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/jakadul/post-x-promote-01/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01?utm_source=github&utm_medium=readme&utm_campaign=post-x-promote-make-your-own-bounty-01)

The entry for this bounty is the X post itself: one quote of make.fun's
make-your-own-bounty post, with its own photo, carrying `make.fun` and the
entrant's play code. The house reads the post's replies, reposts and quotes and
ranks by their sum, so no code here is scored.

`main.ts` has one job, done strictly: publish `POST.json` — the address of that
post — to `/output`, so the gate can look it up. It parses the file, refuses a
placeholder or a non-numeric id with a non-zero exit instead of writing a file
the house would reject, then copies it out and echoes the id.

## Run it

```sh
mkdir -p out
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

Node 22, standard library only, no network.

## Result

`POST.json` names the post; `post_photo.jpg` at the repository's parent is the
photo attached to it.
