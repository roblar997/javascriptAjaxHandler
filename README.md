Ajax function that takes list of expected keys, and return what keys from json response it can find. There is  a test html file included, and
a debug option; to print out random values corresponding to expected json response.

Why?

- Dynamic change in data given.
- Mismatch between json respons and expected json respons; it makes it more flexible to detecting and updating mismatches.
- More easily adaptive to change on backend, conserning code

