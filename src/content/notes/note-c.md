---
title: '捕获 CTRL-C'
date: 2024-06-01
tags: ['code']
authors: ['carlos']
---

使用 python 的异常 `KeyboardInterrupt`:

```python
try:
    while 1:
        pass
except KeyboardInterrupt:
    pass
```

使用 `signal` 模块:

```python
import signal

def _exit(signum, frame):
    print('You choose to stop me.')
    exit()

signal.signal(signal.SIGINT, _exit)
signal.signal(signal.SIGTERM, _exit)

while 1:
    pass
```