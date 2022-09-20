# local_sqs_worker

SQSのキューからメッセージを引っ張って、設定したエンドポイントにPOSTをするツールです。

## 必要

- CLIからAWSコマンドを実行できるような環境（通常のAWS環境変数、または aws-vault で）
- nodejs
- .env ファイル

## .envファイル

必要な設定は２つです。

- `QUEUE_URL` ：ポーリングしたいキューのURLです
- `API_ENDPOINT` ：HTTP POST先です。

例えば、下記のファイルにすると：

```
QUEUE_URL=https://sqs.ap-northeast-1.amazonaws.com/413751012345/test-photoruction-hoge
API_ENDPOINT=https://hoge.develop.photoruction.com/worker/zip/
```

`https://sqs.ap-northeast-1.amazonaws.com/413751012345/test-photoruction-hoge` のSQSキューからメッセージを取得して、メッセージの内容をJSONで `https://hoge.develop.photoruction.com/worker/zip/`　にPOSTします。
今回の例ではPOST先は `worker/zip` （`WorkerZip`の入口です）。
`WorkerCron`の場合は別の`API_ENDPOINT`のパスにしないといけません。
