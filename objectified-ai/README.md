# objectified-ai

This is the AI powered project that accompanies Objectified, offering observability and
query functionality into data stored in Objectified databases.

This current version utilizes `ollama` models, but can be retrofitted to use other
libraries such as `bedrock` on Amazon, and other sources.

The recommended data sources are either `llama3.3` or `deepseek-r1`, depending on the
pattern of AI model you prefer.

## Scripts

There are a number of scripts that take care of numerous functions.

These scripts are:

- `update-instance-current-embeddings`: This updates the `instance_current` table's embedding
  columns with up-to-date embeddings for AI LLM model queries.
