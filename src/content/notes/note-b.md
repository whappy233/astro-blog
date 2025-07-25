---
title: '字典的只读代理对象'
date: 2023-07-20
tags: ['code']
authors: ['carlos']
---

```python
from types import MappingProxyType

a = {'x': 1, 'y': 1, 'z': 3}
a_proxy = MappingProxyType(a)

a_proxy['x']  # 1

a_proxy['x'] = 2
TypeError: 'mappingproxy' object does not support item assignment

a['x'] = 2
a_proxy['x']  # 2
```
