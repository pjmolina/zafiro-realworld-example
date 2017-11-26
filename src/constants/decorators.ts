import { inject } from "inversify";
import { TYPE } from "./types";

export const accountRepository = inject(TYPE.AccountRepository);
export const tweetRepository = inject(TYPE.TweetRepository);
